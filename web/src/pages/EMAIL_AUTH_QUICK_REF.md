# Email Authentication - Quick Reference

## 🚀 Quick Start

### Using the Main Page
```jsx
<Route path="/auth/email" element={<ContinueWithEmail />} />
```

### Embedding in Modal
```jsx
import MagicEmailForm from './components/MagicEmailForm';

<MagicEmailForm
  onSubmit={async (email) => {
    await supabase.auth.signInWithOtp({ email });
  }}
  message={message}
  onMessageChange={setMessage}
/>
```

---

## 📚 Utility Functions

### Email Validation
```javascript
import { isValidEmail, sanitizeEmail } from './utils/email';

if (isValidEmail('user@example.com')) {
  const clean = sanitizeEmail(userInput); // Trim & lowercase
}
```

### Cooldown Management
```javascript
import { getRemainingCooldown, setCooldown, formatCooldownTime } from './utils/email';

const remaining = getRemainingCooldown();           // milliseconds
setCooldown(30000);                                  // Set 30s cooldown
const display = formatCooldownTime(remaining);     // "0:05"
```

---

## 🎨 Message Format

```javascript
const message = {
  type: 'error' | 'success' | 'info',
  text: 'Your message here'
};

// Display with FormMessage component
<FormMessage message={message} />
```

---

## 🔧 Component Props

### ContinueWithEmail
No props - stands alone

### MagicEmailForm
```javascript
{
  onSubmit: async (email) => void,        // Required
  placeholder: string = 'you@example.com',
  buttonText: string = 'Continue',
  loading: boolean = false,
  message: { type, text } | null = null,
  onMessageChange: (msg) => void = () => {},
  cooldownDuration: number = 30000
}
```

### FormMessage
```javascript
{
  message: { type, text } | null,
  ref: React.Ref // Forward ref for focus
}
```

---

## 🎯 Common Tasks

### Set Custom Cooldown
```javascript
const COOLDOWN_60S = 60000;
setCooldown(COOLDOWN_60S);
```

### Clear Cooldown
```javascript
import { clearCooldown } from './utils/email';
clearCooldown();
```

### Check Email Domain
```javascript
import { getEmailDomain, isDomainBlocked } from './utils/email';

const domain = getEmailDomain('user@example.com');  // 'example.com'
if (isDomainBlocked(domain)) {
  // Block disposable email
}
```

### Format Cooldown Display
```javascript
import { formatCooldownTime } from './utils/email';

const ms = 45000;
const display = formatCooldownTime(ms);  // '0:45'
```

---

## ⚠️ Common Issues

### Cooldown Not Clearing
→ Clear localStorage: `localStorage.removeItem('email_auth_cooldown')`

### Email Validation Too Strict
→ Edit regex in `isValidEmail()` function

### Button Not Disabling
→ Ensure `isEmailValid` state is correct

### Message Not Showing
→ Check `aria-live="polite"` on message element

---

## 🔒 Security Checklist

- [ ] Emails are sanitized (trim + lowercase)
- [ ] Cooldown persists in localStorage
- [ ] Rate limiting active (3 attempts/min)
- [ ] Errors don't expose sensitive data
- [ ] Supabase credentials protected in environment
- [ ] OTP redirect URL is secure

---

## ♿ Accessibility Checklist

- [ ] ARIA labels on all inputs
- [ ] Live region for messages
- [ ] Focus management
- [ ] Color not only indicator of state
- [ ] Icons have aria-hidden
- [ ] Error messages linked with aria-describedby

---

## 🧪 Test Cases

```javascript
// Test valid email
'user@example.com' ✅

// Test invalid emails
'userexample.com'   ❌
'user@'             ❌
'@example.com'      ❌
'user name@ex.com'  ❌

// Test cooldown
setCooldown(5000);      // 5 second cooldown
getRemainingCooldown(); // Should show ~5000ms

// Test persistence
// Page reload → cooldown should still exist
```

---

## 📱 Responsive Breakpoints

- Mobile: < 640px (full width, padding)
- Tablet: 640px - 1024px (max-w-md)
- Desktop: > 1024px (max-w-md centered)

---

## 🎨 Color Scheme

| State | Color | Class |
|-------|-------|-------|
| Primary (Active) | Blue | `bg-primary-600` |
| Success | Green | `bg-emerald-500` |
| Error | Red | `bg-red-500` |
| Warning | Amber | `bg-amber-500` |
| Disabled | Gray | `opacity-50` |

---

## 📞 Support

1. Check browser console for errors
2. Verify Supabase configuration
3. Review EMAIL_AUTH_GUIDE.md for detailed docs
4. Check REFACTOR_SUMMARY.md for implementation details

---

**Version:** 1.0  
**Last Updated:** November 27, 2025  
**Status:** Production Ready ✅
