const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send payment confirmation email
const sendPaymentConfirmationEmail = async (userEmail, userName, paymentDetails) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: userEmail,
      subject: '🎉 Payment Successful - Welcome to LiveEazy!',
      html: generatePaymentConfirmationHTML(userName, userEmail, paymentDetails)
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Payment confirmation email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
    return { success: false, error: error.message };
  }
};

// Generate HTML template for payment confirmation
const generatePaymentConfirmationHTML = (userName, userEmail, paymentDetails) => {
  const { productName, amount, currency, paymentId, orderId, purchaseDate } = paymentDetails;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Confirmation</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e9ecef;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        .success-icon {
          font-size: 48px;
          color: #28a745;
          margin-bottom: 15px;
        }
        .title {
          color: #28a745;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .subtitle {
          color: #6c757d;
          font-size: 16px;
        }
        .content {
          margin: 30px 0;
        }
        .greeting {
          font-size: 18px;
          margin-bottom: 20px;
        }
        .details-box {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          padding: 5px 0;
        }
        .detail-label {
          font-weight: 600;
          color: #495057;
        }
        .detail-value {
          color: #212529;
          font-weight: 500;
        }
        .amount {
          font-size: 24px;
          font-weight: bold;
          color: #28a745;
        }
        .features {
          background: #e8f5e8;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .features h3 {
          color: #155724;
          margin-bottom: 15px;
        }
        .features ul {
          list-style: none;
          padding: 0;
        }
        .features li {
          padding: 5px 0;
          color: #155724;
        }
        .features li:before {
          content: "✓ ";
          color: #28a745;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
          color: #6c757d;
          font-size: 14px;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 600;
          margin: 20px 0;
        }
        .support {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">NovaFuze-Tech</div>
          <div class="success-icon">🎉</div>
          <div class="title">Payment Successful!</div>
          <div class="subtitle">Your purchase has been confirmed</div>
        </div>

        <div class="content">
          <div class="greeting">
            Hello ${userName || 'Valued Customer'},
          </div>
          
          <p>Thank you for your purchase! We're excited to welcome you to the LiveEazy family. Your payment has been successfully processed and you now have lifetime access to all LiveEazy features.</p>

          <div class="details-box">
            <h3 style="margin-top: 0; color: #495057;">Purchase Details</h3>
            <div class="detail-row">
              <span class="detail-label">Product:</span>
              <span class="detail-value">${productName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount Paid:</span>
              <span class="detail-value amount">₹${amount}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Payment ID:</span>
              <span class="detail-value">${paymentId}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Order ID:</span>
              <span class="detail-value">${orderId}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Purchase Date:</span>
              <span class="detail-value">${new Date(purchaseDate).toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>

          <div class="features">
            <h3>🚀 What You Get with LiveEazy:</h3>
            <ul>
              <li>Smart home integration</li>
              <li>Personal assistant AI</li>
              <li>Automation workflows</li>
              <li>Lifestyle tracking</li>
              <li>Premium support</li>
              <li>Lifetime access - No recurring fees!</li>
            </ul>
          </div>

          <div style="text-align: center;">
            <a href="https://your-app-url.com" class="button">Access LiveEazy Now</a>
          </div>

          <div class="support">
            <strong>Need Help?</strong><br>
            Our support team is here to help you get started. Contact us at support@novafuze.com or visit our help center.
          </div>
        </div>

        <div class="footer">
          <p>This email was sent to ${userEmail}</p>
          <p>© ${new Date().getFullYear()} NovaFuze-Tech. All rights reserved.</p>
          <p>Thank you for choosing NovaFuze-Tech!</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = {
  sendPaymentConfirmationEmail
};