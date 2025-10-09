const express = require('express');
const admin = require('../firebase');
const { upsertFromDecodedToken } = require('../services/userService');
const verifySession = require('../middleware/verifySession');

const router = express.Router();

router.post('/sessionLogin', async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'idToken is required' } });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    await upsertFromDecodedToken(decodedToken);

    const expiresIn = Number(process.env.SESSION_EXPIRES_IN) || 5 * 24 * 60 * 60 * 1000;
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    };

    res.cookie(process.env.SESSION_COOKIE_NAME, sessionCookie, options);
    res.json({ status: 'ok', uid: decodedToken.uid });
  } catch (error) {
    console.error('Error in /sessionLogin:', error);
    res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid idToken' } });
  }
});

router.post('/sessionLogout', (req, res) => {
  const sessionCookie = req.cookies[process.env.SESSION_COOKIE_NAME] || '';
  res.clearCookie(process.env.SESSION_COOKIE_NAME);

  if (sessionCookie) {
    admin.auth().verifySessionCookie(sessionCookie)
      .then((decodedClaims) => admin.auth().revokeRefreshTokens(decodedClaims.sub))
      .then(() => {
        res.status(200).json({ status: 'ok' });
      })
      .catch((error) => {
        console.error('Error revoking session cookie:', error);
        res.status(200).json({ status: 'ok' }); // Still clear cookie on client
      });
  } else {
    res.status(200).json({ status: 'ok' });
  }
});

router.get('/me', verifySession, async (req, res) => {
    const userRef = admin.firestore().collection('users').doc(req.user.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
        return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'User not found' } });
    }

    res.json(userDoc.data());
});

module.exports = router;