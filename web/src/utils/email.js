/**
 * Email validation utilities
 * Provides robust email validation and formatting helpers
 */

/**
 * Validate email format using RFC 5322 compliant regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  // RFC 5322 simplified pattern (covers 99% of real-world emails)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed) && trimmed.length <= 254;
}

/**
 * Sanitize email by trimming and lowercasing
 * @param {string} email - Raw email input
 * @returns {string} - Sanitized email
 */
export function sanitizeEmail(email) {
  return (email || '').trim().toLowerCase();
}

/**
 * Get email domain for logging/analytics
 * @param {string} email - Email address
 * @returns {string} - Domain or empty string
 */
export function getEmailDomain(email) {
  const match = email.match(/@([^@]+)$/);
  return match ? match[1] : '';
}

/**
 * Check if email domain is in a blocklist (for anti-abuse)
 * TODO: Implement server-side domain verification and whitelist/blacklist
 * @param {string} domain - Email domain
 * @returns {boolean} - True if domain is blocked
 */
export function isDomainBlocked(domain) {
  // Common disposable email domains to block
  const blockedDomains = [
    'tempmail.com',
    'throwaway.email',
    '10minutemail.com',
    'mailinator.com',
  ];
  return blockedDomains.includes(domain.toLowerCase());
}

/**
 * Format email for display
 * @param {string} email - Email address
 * @returns {string} - Formatted email (e.g., masked for privacy)
 */
export function formatEmailDisplay(email) {
  if (!email) return '';
  const [local, domain] = email.split('@');
  if (!local || !domain) return email;
  // Mask local part: show first 2 chars, then dots
  const masked = local.substring(0, 2) + '*'.repeat(Math.max(0, local.length - 2));
  return `${masked}@${domain}`;
}

/**
 * Get remaining cooldown time from localStorage
 * @returns {number} - Milliseconds remaining (0 if no cooldown active)
 */
export function getRemainingCooldown() {
  try {
    const stored = localStorage.getItem('email_auth_cooldown');
    if (!stored) return 0;
    const cooldownEnd = parseInt(stored, 10);
    const now = Date.now();
    const remaining = Math.max(0, cooldownEnd - now);
    return remaining;
  } catch (err) {
    console.warn('Could not read cooldown from localStorage:', err);
    return 0;
  }
}

/**
 * Set cooldown period in localStorage
 * @param {number} durationMs - Duration of cooldown in milliseconds
 */
export function setCooldown(durationMs) {
  try {
    const cooldownEnd = Date.now() + durationMs;
    localStorage.setItem('email_auth_cooldown', String(cooldownEnd));
  } catch (err) {
    console.warn('Could not write cooldown to localStorage:', err);
  }
}

/**
 * Clear cooldown from localStorage
 */
export function clearCooldown() {
  try {
    localStorage.removeItem('email_auth_cooldown');
  } catch (err) {
    console.warn('Could not clear cooldown from localStorage:', err);
  }
}

/**
 * Format cooldown time for display (e.g., "2:34")
 * @param {number} ms - Milliseconds remaining
 * @returns {string} - Formatted time string
 */
export function formatCooldownTime(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
