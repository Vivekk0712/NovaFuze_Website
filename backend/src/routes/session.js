const express = require('express');
const admin = require('../firebase');
const { upsertFromDecodedToken } = require('../services/userService');
const verifySession = require('../middleware/verifySession');
const axios = require('axios');
const multer = require('multer');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Supported MIME types
    const SUPPORTED_MIME_TYPES = [
      // Document types
      'application/pdf',
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/vnd.ms-excel', 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'text/plain',
      
      // Web/Markup files
      'text/html',
      'application/json',
      'text/csv',
      'application/xml',
      'text/xml'
    ];

    if (SUPPORTED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}. Supported types: ${SUPPORTED_MIME_TYPES.join(', ')}`), false);
    }
  }
});

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

router.post('/chat', verifySession, async (req, res) => {
  const { message, metadata } = req.body;
  const firebaseUid = req.user.uid;
  
  // Get user information from Firebase token
  console.log('Firebase token user data:', JSON.stringify(req.user, null, 2));
  let userName = req.user.displayName || req.user.name || null;
  let userEmail = req.user.email || null;
  
  // If name/email not in token, try to get from Firestore
  if (!userName || !userEmail) {
    try {
      const userRef = admin.firestore().collection('users').doc(firebaseUid);
      const userDoc = await userRef.get();
      
      if (userDoc.exists) {
        const userData = userDoc.data();
        console.log('Firestore user data:', userData);
        userName = userName || userData.displayName || userData.name || null;
        userEmail = userEmail || userData.email || null;
      }
    } catch (error) {
      console.error('Error fetching user from Firestore:', error);
    }
  }
  
  console.log('Final extracted - Name:', userName, 'Email:', userEmail);

  try {
    const mcpResponse = await axios.post(process.env.MCP_SERVER_URL + '/mcp/query', {
      user_id: firebaseUid,
      message,
      metadata,
      user_name: userName,
      user_email: userEmail,
    });

    res.json(mcpResponse.data);
  } catch (error) {
    console.error('Error forwarding chat to MCP server:', error);
    res.status(500).json({ error: { code: 'MCP_SERVER_ERROR', message: 'Error forwarding chat to MCP server' } });
  }
});

router.get('/history', verifySession, async (req, res) => {
  const firebaseUid = req.user.uid;

  try {
    const mcpResponse = await axios.get(process.env.MCP_SERVER_URL + '/mcp/history?user_id=' + firebaseUid);
    res.json(mcpResponse.data);
  } catch (error) {
    console.error('Error fetching chat history from MCP server:', error);
    res.status(500).json({ error: { code: 'MCP_SERVER_ERROR', message: 'Error fetching chat history from MCP server' } });
  }
});

router.delete('/clear-chat', verifySession, async (req, res) => {
  const firebaseUid = req.user.uid;

  try {
    const mcpResponse = await axios.delete(process.env.MCP_SERVER_URL + '/mcp/clear-chat?user_id=' + firebaseUid);
    res.json(mcpResponse.data);
  } catch (error) {
    console.error('Error clearing chat history from MCP server:', error);
    res.status(500).json({ error: { code: 'MCP_SERVER_ERROR', message: 'Error clearing chat history from MCP server' } });
  }
});

// File Upload Routes
router.post('/upload-pdf', verifySession, upload.single('file'), async (req, res) => {
  const firebaseUid = req.user.uid;

  try {
    if (!req.file) {
      return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'No file uploaded' } });
    }

    // Create FormData for MCP server
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    const mcpResponse = await axios.post(
      process.env.MCP_SERVER_URL + '/mcp/upload-pdf?user_id=' + firebaseUid,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );
    res.json(mcpResponse.data);
  } catch (error) {
    console.error('Error uploading file to MCP server:', error);
    
    // Check if it's a Multer file filter error
    if (error.message.includes('Unsupported file type')) {
      return res.status(400).json({ 
        error: { 
          code: 'UNSUPPORTED_FILE_TYPE', 
          message: error.message 
        } 
      });
    }

    // Generic server error
    res.status(500).json({ 
      error: { 
        code: 'MCP_SERVER_ERROR', 
        message: 'Error uploading file to MCP server' 
      } 
    });
  }
});

router.get('/files', verifySession, async (req, res) => {
  const firebaseUid = req.user.uid;

  try {
    const mcpResponse = await axios.get(process.env.MCP_SERVER_URL + '/mcp/files?user_id=' + firebaseUid);
    res.json(mcpResponse.data);
  } catch (error) {
    console.error('Error fetching files from MCP server:', error);
    res.status(500).json({ error: { code: 'MCP_SERVER_ERROR', message: 'Error fetching files from MCP server' } });
  }
});

router.delete('/files/:fileId', verifySession, async (req, res) => {
  const firebaseUid = req.user.uid;
  const { fileId } = req.params;

  try {
    const mcpResponse = await axios.delete(process.env.MCP_SERVER_URL + `/mcp/files/${fileId}?user_id=${firebaseUid}`);
    res.json(mcpResponse.data);
  } catch (error) {
    console.error('Error deleting file from MCP server:', error);
    res.status(500).json({ error: { code: 'MCP_SERVER_ERROR', message: 'Error deleting file from MCP server' } });
  }
});

router.post('/search-files', verifySession, async (req, res) => {
  const firebaseUid = req.user.uid;
  const { query } = req.body;

  try {
    const mcpResponse = await axios.post(
      process.env.MCP_SERVER_URL + '/mcp/search-files?user_id=' + firebaseUid,
      { query }
    );
    res.json(mcpResponse.data);
  } catch (error) {
    console.error('Error searching files from MCP server:', error);
    res.status(500).json({ error: { code: 'MCP_SERVER_ERROR', message: 'Error searching files from MCP server' } });
  }
});

// Admin Routes (no session verification - admin auth handled by MCP server)
router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const mcpResponse = await axios.post(process.env.MCP_SERVER_URL + '/admin/login', {
      email,
      password
    });
    res.json(mcpResponse.data);
  } catch (error) {
    console.error('Error with admin login:', error);
    res.status(500).json({ error: { code: 'ADMIN_LOGIN_ERROR', message: 'Error with admin login' } });
  }
});

router.post('/admin/create', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const mcpResponse = await axios.post(process.env.MCP_SERVER_URL + '/admin/create', {
      email,
      password,
      name
    });
    res.json(mcpResponse.data);
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: { code: 'ADMIN_CREATE_ERROR', message: 'Error creating admin' } });
  }
});

router.get('/admin/files', async (req, res) => {
  const { authorization } = req.headers;

  try {
    const mcpResponse = await axios.get(process.env.MCP_SERVER_URL + '/admin/files', {
      headers: {
        'Authorization': authorization
      }
    });
    res.json(mcpResponse.data);
  } catch (error) {
    console.error('Error fetching admin files:', error);
    res.status(500).json({ error: { code: 'ADMIN_FILES_ERROR', message: 'Error fetching admin files' } });
  }
});

router.get('/admin/files/:fileId', async (req, res) => {
  const { fileId } = req.params;
  const { authorization } = req.headers;

  try {
    const mcpResponse = await axios.get(process.env.MCP_SERVER_URL + `/admin/files/${fileId}`, {
      headers: {
        'Authorization': authorization
      }
    });
    res.json(mcpResponse.data);
  } catch (error) {
    console.error('Error fetching admin file details:', error);
    res.status(500).json({ error: { code: 'ADMIN_FILE_ERROR', message: 'Error fetching admin file details' } });
  }
});

router.delete('/admin/files/:fileId', async (req, res) => {
  const { fileId } = req.params;
  const { authorization } = req.headers;

  try {
    const mcpResponse = await axios.delete(process.env.MCP_SERVER_URL + `/admin/files/${fileId}`, {
      headers: {
        'Authorization': authorization
      }
    });
    res.json(mcpResponse.data);
  } catch (error) {
    console.error('Error deleting admin file:', error);
    res.status(500).json({ error: { code: 'ADMIN_FILE_DELETE_ERROR', message: 'Error deleting admin file' } });
  }
});

router.get('/admin/stats', async (req, res) => {
  const { authorization } = req.headers;

  try {
    const mcpResponse = await axios.get(process.env.MCP_SERVER_URL + '/admin/stats', {
      headers: {
        'Authorization': authorization
      }
    });
    res.json(mcpResponse.data);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: { code: 'ADMIN_STATS_ERROR', message: 'Error fetching admin stats' } });
  }
});

// Update user profile
router.put('/profile', verifySession, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { displayName, email, phoneNumber } = req.body;

    // Validate input
    if (!displayName && !email && !phoneNumber) {
      return res.status(400).json({ 
        error: { code: 'BAD_REQUEST', message: 'At least one field is required' } 
      });
    }

    // Prepare update data
    const updateData = {};
    if (displayName) updateData.displayName = displayName.trim();
    if (email) updateData.email = email.trim().toLowerCase();
    if (phoneNumber) updateData.phoneNumber = phoneNumber.trim();
    
    updateData.updatedAt = new Date().toISOString();

    // Update user profile in Firestore
    const userRef = admin.firestore().collection('users').doc(userId);
    await userRef.update(updateData);

    // Get updated user data
    const updatedDoc = await userRef.get();
    const updatedUser = updatedDoc.data();

    console.log(`✅ Profile updated for user ${userId}:`, updateData);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ 
      error: { code: 'UPDATE_FAILED', message: 'Failed to update profile' } 
    });
  }
});

module.exports = router;