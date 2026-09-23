import { UserRole } from '../types';

export interface RegisteredAccount {
  email: string;
  fullName: string;
  role: UserRole;
  country?: string;
  city?: string;
  phone?: string;
  registeredAt: string;
  mentorData?: any;
  institutionData?: any;
}

const STORAGE_KEY = 'afriversity_registered_users';

/**
 * Derives a clean, capitalized human name from an email address
 * Handles cases like:
 * - asomaniasomani558@gmail.com -> "Asomani Asomani"
 * - kwame.mensah@gmail.com -> "Kwame Mensah"
 * - victoria_mensah@yahoo.com -> "Victoria Mensah"
 * - kofi-boateng@knust.edu.gh -> "Kofi Boateng"
 * - john558@gmail.com -> "John"
 */
export function formatNameFromEmail(email: string): string {
  if (!email || typeof email !== 'string') return 'User';
  
  const localPart = email.split('@')[0] || '';
  if (!localPart) return 'User';

  // Remove trailing numbers (e.g. asomaniasomani558 -> asomaniasomani)
  const withoutTrailingDigits = localPart.replace(/\d+$/, '');
  const cleanPart = withoutTrailingDigits || localPart;

  // Split on dots, underscores, dashes
  const rawSegments = cleanPart.split(/[._\-+]+/).filter(Boolean);

  const words: string[] = [];

  for (const seg of rawSegments) {
    // Check if segment is a repeated word (e.g., "asomaniasomani" -> length 14, two "asomani")
    let handledRepeat = false;
    const len = seg.length;
    if (len >= 6 && len % 2 === 0) {
      const half = len / 2;
      const part1 = seg.substring(0, half).toLowerCase();
      const part2 = seg.substring(half).toLowerCase();
      if (part1 === part2) {
        words.push(capitalizeWord(part1));
        words.push(capitalizeWord(part2));
        handledRepeat = true;
      }
    }

    if (!handledRepeat) {
      // Split camelCase if present (e.g. JohnMensah -> John Mensah)
      const subWords = seg.replace(/([a-z])([A-Z])/g, '$1 $2').split(/\s+/);
      for (const sw of subWords) {
        // Strip any remaining numbers
        const cleaned = sw.replace(/\d+/g, '').trim();
        if (cleaned.length > 0) {
          words.push(capitalizeWord(cleaned));
        } else if (sw.trim().length > 0) {
          words.push(capitalizeWord(sw.trim()));
        }
      }
    }
  }

  if (words.length === 0) {
    return capitalizeWord(localPart);
  }

  return words.join(' ');
}

function capitalizeWord(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Retrieve all registered users stored locally
 */
export function getAllRegisteredUsers(): Record<string, RegisteredAccount> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load registered users:', e);
    return {};
  }
}

/**
 * Retrieve a specific user by email
 */
export function getRegisteredUser(email: string): RegisteredAccount | null {
  if (!email) return null;
  const accounts = getAllRegisteredUsers();
  const normalized = email.toLowerCase().trim();
  return accounts[normalized] || null;
}

/**
 * Save or update a registered user account
 */
export function saveRegisteredUser(account: {
  email: string;
  fullName: string;
  role: UserRole;
  country?: string;
  city?: string;
  phone?: string;
  mentorData?: any;
  institutionData?: any;
}): void {
  if (!account.email) return;
  const normalized = account.email.toLowerCase().trim();
  const accounts = getAllRegisteredUsers();

  accounts[normalized] = {
    email: normalized,
    fullName: account.fullName.trim(),
    role: account.role,
    country: account.country || 'Ghana',
    city: account.city || '',
    phone: account.phone || '',
    registeredAt: accounts[normalized]?.registeredAt || new Date().toISOString(),
    mentorData: account.mentorData || accounts[normalized]?.mentorData,
    institutionData: account.institutionData || accounts[normalized]?.institutionData
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error('Failed to save registered user:', e);
  }
}

const PLACEHOLDER_NAMES = new Set([
  'kwesi appiah',
  'victoria mensah',
  'ug admissions representative',
  'university representative',
  'african student',
  'academic mentor',
  'university of ghana admissions office'
]);

/**
 * Resolves the genuine user full name
 * Prioritizes:
 * 1. User-typed valid name during registration or profile update
 * 2. Stored registered user full name from registration database
 * 3. Formatted name derived from email address (never random placeholder names)
 */
export function resolveUserFullName(email: string, providedName?: string): string {
  const trimmed = (providedName || '').trim();
  
  // If user provided a real name that isn't a hardcoded placeholder, use it
  if (trimmed && !PLACEHOLDER_NAMES.has(trimmed.toLowerCase())) {
    return trimmed;
  }

  // Check stored registered accounts for this exact email
  const registered = getRegisteredUser(email);
  if (registered && registered.fullName && !PLACEHOLDER_NAMES.has(registered.fullName.toLowerCase())) {
    return registered.fullName.trim();
  }

  // Derive human-readable name directly from the user's email address
  return formatNameFromEmail(email);
}
