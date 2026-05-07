# EmailJS Quick Setup Guide (5 Minutes)

## TL;DR - Fast Setup

### 1. Go to EmailJS
```
https://dashboard.emailjs.com
```

### 2. Sign Up (Free)
- Email / Google / GitHub account
- Verify email

### 3. Add Gmail Service
- Click "Email Services" → "Add New Service"
- Select "Gmail"
- Click "Connect with Gmail"
- Choose: ubgouthamdentalcare@gmail.com
- Click through permissions

**Copy the Service ID** ✓

### 4. Create Email Template
- Click "Email Templates" → "Create New"
- Template Name: `dental_appointment_request`
- Subject: `New Appointment Request from {{user_name}}`
- Body: 
```
Name: {{user_name}}
Phone: {{user_phone}}
Email: {{user_email}}
Treatment: {{treatment_needed}}

Message:
{{message}}
```

**Copy the Template ID** ✓

### 5. Get Public Key
- Click account icon (top right)
- Click "API Keys"
- Copy the Public Key

**Copy the Public Key** ✓

### 6. Update Your Website
Open `script.js` and find:

```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
  SERVICE_ID: 'YOUR_SERVICE_ID',
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID'
};
```

Replace with your values from above:
```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'paste_public_key_here',
  SERVICE_ID: 'paste_service_id_here',
  TEMPLATE_ID: 'paste_template_id_here'
};
```

### 7. Test
- Open your website
- Fill the contact form
- Click "Send Request"
- Check email

**Done!** ✓

---

## What You Get

✓ **Form Validation**
- Required fields checked
- Email format verified
- Phone number validated
- Message length checked

✓ **User Feedback**
- "Sending..." when submitting
- Success message when done
- Error messages if something fails
- Color-coded (green = good, red = error)

✓ **Security**
- Checks input before sending
- EmailJS handles safe transmission
- No sensitive data exposed

✓ **Mobile Ready**
- Works on phones and tablets
- Touch-friendly
- Responsive notifications

---

## Common Issues

**Form not sending?**
→ Check all 3 values are in script.js with no typos

**Email not receiving?**
→ Check Gmail account is connected in EmailJS

**Validation not working?**
→ Refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

**More issues?**
→ See EMAILJS_SETUP.md for troubleshooting

---

## Need Help?

1. **EmailJS Support:** https://www.emailjs.com/docs/
2. **Setup Guide:** Read EMAILJS_SETUP.md
3. **Technical Details:** Read IMPLEMENTATION_SUMMARY.md

---

## That's It!

Your form is now fully functional with:
- ✓ Professional validation
- ✓ Real-time error checking  
- ✓ Beautiful success/error messages
- ✓ Secure email transmission
- ✓ Mobile-friendly design

**Estimated time to set up: 5 minutes**
