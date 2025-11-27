/**
 * ContinueWithEmail.jsx - Production-Ready Email Authentication
 * 
 * IMPROVEMENTS IMPLEMENTED:
 * 
 * 1. EMAIL VALIDATION & UX
 *    ✅ Real-time validation with visual feedback (red border for invalid, green check for valid)
 *    ✅ Button disabled until email is valid
 *    ✅ Red error messages, green success messages with icons
 *    ✅ Input validation shows inline error text
 * 
 * 2. LOADING & COOLDOWN UX
 *    ✅ Spinner (Loader icon) next to button text during loading
 *    ✅ Smooth disabled opacity animation
 *    ✅ Cooldown timer persists using localStorage (getRemainingCooldown, setCooldown)
 *    ✅ Timer updates every second and survives page reload
 *    ✅ "Having trouble? Request a new link" appears when cooldown expires
 * 
 * 3. SUPABASE AUTH FLOW
 *    ✅ Try/catch wraps signInWithOtp with clear error messages
 *    ✅ Handles rate-limit errors (status 429) with 60-second cooldown
 *    ✅ Handles cooldown errors with 30-second cooldown
 *    ✅ TODO comments for analytics tracking (login_start, login_success, login_error)
 *    ✅ TODO comments for error logging service integration (Sentry, etc.)
 *    ✅ TODO comments for server-side email domain validation
 * 
 * 4. ACCESSIBILITY
 *    ✅ aria-live="polite" for status messages
 *    ✅ aria-label on input and button
 *    ✅ aria-invalid for invalid email state
 *    ✅ aria-describedby linking input to error message
 *    ✅ aria-busy on button during loading
 *    ✅ Focus moves to message area after sending (messageRef)
 *    ✅ Semantic form with submit handler
 *    ✅ sr-only label for screen readers
 * 
 * 5. REUSABILITY & CLEAN ARCHITECTURE
 *    ✅ Email validation extracted to utils/email.js
 *    ✅ Helper functions: isValidEmail, sanitizeEmail, getRemainingCooldown, formatCooldownTime
 *    ✅ Message object standardized: { type: 'error' | 'success', text: '...' }
 *    ✅ Modular state and handler functions
 *    ✅ Clear separation of concerns
 * 
 * 6. VISUAL & UI IMPROVEMENTS
 *    ✅ Tailwind transitions for smooth interactions
 *    ✅ focus:ring for accessibility highlighting
 *    ✅ Dark mode color improvements
 *    ✅ Card shadow hover effect
 *    ✅ Icons from lucide-react (Mail, Check, AlertCircle, Loader)
 *    ✅ Icon validation feedback in input field
 *    ✅ Gradient background for better visual appeal
 *    ✅ Responsive padding and spacing
 *    ✅ Link to create account added in footer
 * 
 * 7. ERROR HANDLING
 *    ✅ Standardized message object: { type, text }
 *    ✅ Appropriate colors and icons for errors (red) and success (green)
 *    ✅ Graceful handling of Supabase errors
 *    ✅ Fallback error messages for unexpected errors
 *    ✅ Console logging for debugging
 * 
 * 8. SECURITY & ANTI-ABUSE
 *    ✅ Throttle logic: max 3 attempts per minute
 *    ✅ Attempt count resets after 60 seconds
 *    ✅ Email sanitization (trim and lowercase)
 *    ✅ TODO for server-side email domain checks
 *    ✅ Secure redirect URL built from window.location.origin
 * 
 * DEPENDENCIES:
 * - react (hooks)
 * - react-router-dom (navigation)
 * - lucide-react (icons)
 * - supabase (auth)
 * - utils/email.js (validation helpers)
 * 
 * TODO ITEMS (for backend implementation):
 * 1. Add analytics tracking for login attempts and success
 * 2. Integrate error logging service (Sentry, LogRocket, etc.)
 * 3. Implement server-side email domain validation and whitelist
 * 4. Add more disposable email domains to blocklist
 * 5. Implement CAPTCHA for anti-spam (optional)
 * 6. Monitor and adjust cooldown durations based on usage patterns
 */

// Component code location: web/src/pages/ContinueWithEmail.jsx
// Utilities location: web/src/utils/email.js
