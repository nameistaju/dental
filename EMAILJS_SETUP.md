# EmailJS Integration Setup Guide

## Overview
Your dental clinic website's contact form is now fully integrated with EmailJS. This guide will walk you through the setup process to make the form fully functional.

---

## Step 1: Create an EmailJS Account

1. Visit [https://dashboard.emailjs.com](https://dashboard.emailjs.com)
2. Click **Sign Up** and create a free account
3. Verify your email address
4. Log in to your dashboard

---

## Step 2: Add an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your preferred email service:
   - **Gmail** (recommended for beginners)
   - Outlook
   - SendGrid
   - Custom SMTP
   - Or any other provider

### For Gmail:
- Click **Gmail**
- Click **Connect with Gmail**
- Sign in with your Gmail account (ubgouthamdentalcare@gmail.com)
- Grant EmailJS permission to send emails
- Copy the **Service ID** (you'll need this later)

---

## Step 3: Create an Email Template

1. Go to **Email Templates** in the EmailJS dashboard
2. Click **Create New Template**
3. Fill in the template details:

### Template Name
`dental_appointment_request`

### Template Subject
`New Appointment Request from {{user_name}}`

### Template Body
Copy and paste this template:

```
Subject: New Appointment Request

Name: {{user_name}}
Phone: {{user_phone}}
Email: {{user_email}}
Treatment: {{treatment_needed}}

Message:
{{message}}

---
This email was sent from your dental clinic website's contact form.
```

4. Make sure these **Template Variables** are used (they must match exactly):
   - `{{user_name}}` - Patient's full name
   - `{{user_phone}}` - Patient's phone number
   - `{{user_email}}` - Patient's email address
   - `{{treatment_needed}}` - Selected treatment
   - `{{message}}` - Patient's message

5. Click **Save Template**
6. Copy the **Template ID** (you'll need this later)

---

## Step 4: Get Your Public Key

1. Go to **Account Settings** (top right icon)
2. Click **API Keys**
3. You'll see your **Public Key** (starts with letters)
4. Copy this key (you'll need it in the next step)

---

## Step 5: Configure the Website Form

Open `script.js` in your text editor and find this section at the top:

```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',      // Get from EmailJS dashboard
  SERVICE_ID: 'YOUR_SERVICE_ID',      // Get from EmailJS dashboard
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID'     // Get from EmailJS dashboard
};
```

Replace the placeholder values with your actual credentials:

1. Replace `YOUR_PUBLIC_KEY` with your **Public Key** from Step 4
2. Replace `YOUR_SERVICE_ID` with your **Service ID** from Step 2
3. Replace `YOUR_TEMPLATE_ID` with your **Template ID** from Step 3

**Example (DO NOT USE - for reference only):**
```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'x_a1b2c3d4e5f6g7h8i9j0k1l2m',
  SERVICE_ID: 'service_abc123def456',
  TEMPLATE_ID: 'template_xyz789uvw012'
};
```

---

## Step 6: Test the Form

1. Open your website in a browser
2. Scroll to the **"Book Your Appointment"** section
3. Fill out all fields:
   - Full Name
   - Phone Number
   - Email Address
   - Select a Treatment
   - Enter a Message
4. Click **"Send Request"**
5. You should see a success message
6. Check your email (ubgouthamdentalcare@gmail.com) for the appointment request

---

## Form Features

### ✓ Validation
- **Required Fields**: All fields must be filled
- **Email Validation**: Checks for valid email format
- **Phone Validation**: Accepts various phone number formats
- **Character Limits**: Name (min 2), Message (min 5)
- **Real-time Feedback**: Errors appear as users interact with the form

### ✓ User Experience
- **Loading State**: Button shows "Sending..." with spinner during submission
- **Success Message**: Premium success toast notification
- **Error Handling**: User-friendly error messages with fallback options
- **Auto-reset**: Form clears automatically after successful submission
- **Smooth Animations**: Professional, polished interactions

### ✓ Security
- **Input Sanitization**: Prevents malicious input
- **Client-side Validation**: Checks before sending
- **Secure API**: EmailJS handles all email transmission securely
- **No Sensitive Data**: Your credentials aren't exposed in the form

---

## Troubleshooting

### Form Not Sending?

**1. Check EmailJS Configuration**
- Verify all three values are correctly entered in `script.js`
- Ensure there are no typos or extra spaces

**2. Check Browser Console**
- Open Developer Tools (F12)
- Go to Console tab
- Look for any error messages
- Share these errors if you need help

**3. Verify Email Service**
- Go to EmailJS dashboard
- Check if your Email Service is activated
- Verify the Gmail account is connected

**4. Test in EmailJS Dashboard**
- Go to Email Templates
- Find your template
- Click "Test it" button
- This helps identify template issues

### Emails Going to Spam?

- Check Gmail spam folder
- Mark emails as "Not Spam"
- EmailJS reputation should improve over time

### SSL Certificate Error?

- This is a browser security feature
- Update your browser to the latest version
- Clear browser cache and cookies
- Try in an incognito/private window

---

## Email Receiving (Optional)

By default, emails are sent to: **ubgouthamdentalcare@gmail.com**

To change the receiving email:
1. Go to EmailJS dashboard
2. Edit your Email Service settings
3. Update the recipient email address
4. Or modify the template to use different recipients

---

## Production Notes

### Before Going Live:
1. ✓ Test the form thoroughly with real data
2. ✓ Verify emails are being received
3. ✓ Check email formatting looks professional
4. ✓ Ensure error messages display correctly
5. ✓ Test on mobile devices

### Best Practices:
1. Monitor EmailJS usage (free plan has monthly limits)
2. Review spam complaints regularly
3. Keep credentials secure (never share PUBLIC_KEY publicly)
4. Back up your template settings
5. Test monthly to ensure continued functionality

---

## Free Plan Limits

EmailJS Free Plan includes:
- **200 emails per month**
- **500 API calls per month**
- **Unlimited templates**
- **24/7 support**

If you exceed limits, upgrade to a paid plan.

---

## Support & Documentation

- **EmailJS Docs**: https://www.emailjs.com/docs/
- **EmailJS Support**: support@emailjs.com
- **Your Website Contact**: ubgouthamdentalcare@gmail.com

---

## Quick Reference

| Item | Where to Find | Where to Use |
|------|--------------|-------------|
| Public Key | EmailJS Account Settings > API Keys | `script.js` line 11 |
| Service ID | EmailJS Email Services | `script.js` line 12 |
| Template ID | EmailJS Email Templates | `script.js` line 13 |
| Recipient Email | EmailJS Email Service Settings | Email template body |

---

## Summary

Your form now includes:
✓ Complete form validation
✓ Real-time error checking
✓ Phone number validation
✓ Email validation
✓ Loading state with spinner
✓ Premium success notifications
✓ Elegant error handling
✓ Professional toast messages
✓ Auto-reset on success
✓ Mobile-responsive design
✓ Secure email transmission

**Once configured, your form is production-ready!**
