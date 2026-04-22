import { z } from "zod";

// Common English words/names to validate "no random letters"
const commonWords = [
  "smart", "gesture", "hand", "tech", "blue", "red", "green", "star", "moon", "sun",
  "sky", "fire", "ice", "rock", "wave", "mind", "code", "data", "web", "app",
  "net", "bit", "byte", "pixel", "nova", "apex", "core", "link", "node", "path",
  "flow", "grid", "hub", "lab", "max", "ace", "pro", "top", "aim","cool", "best", 
  "fast", "gold", "hero", "king", "lion", "neat", "pure", "sage","true", "wise", 
  "zen", "bold", "dark", "deep", "epic", "free", "good", "high", "iron", "jade", 
  "keen", "last", "mild", "open", "peak", "rich", "safe", "vast", "able", "alex",
  "amit", "arun", "deep", "kiran", "maya", "neel", "priya", "raj", "rahul", "sam", 
  "sanjay", "suresh", "vijay", "ankit", "pooja", "rohan", "neha", "kumar", "singh", 
  "john", "jane", "mike", "sara", "adam", "emma", "jack", "lily", "mark", "rose", "will",
   "anna", "luke", "kate", "ryan", "zara", "aman", "ravi", "selva", "naveena",
];

const commonBigrams = [
  "an", "ar", "at", "av", "ay", "de", "dh", "el", "en", "er", "es", "ge", "ha", "he",
  "hu", "in", "io", "ir", "it", "ja", "ka", "ki", "ku", "la", "li", "lu", "ma", "mi",
  "na", "nd", "ne", "ng", "ni", "no", "oh", "on", "op", "or", "ou", "pa", "pr", "ra",
  "re", "ri", "ro", "rt", "sa", "se", "sh", "si", "sm", "st", "ta", "te", "th", "tr",
  "tu", "ul", "um", "us", "va", "vi", "ya",
];

const commonTrigrams = [
  "ank", "art", "ath", "ati", "ava", "aya", "dee", "esh", "est", "ges", "han", "ian",
  "ing", "ion", "ita", "iya", "kar", "kit", "kum", "man", "mar", "nti", "ohn", "ool",
  "pra", "rah", "ran", "ree", "ria", "rit", "roh", "san", "sha", "shr", "sma", "son",
  "tan", "ter", "thi", "tur", "ure", "vik", "yan",
];

function isNotRandom(str: string): boolean {
  const lower = str.toLowerCase();
  const lettersOnly = lower.replace(/[^a-z]/g, "");

  if (lettersOnly.length === 0) return false;

  // Check if the string itself or a significant portion is a known word
  if (commonWords.includes(lower)) return true;
  // Check if it contains at least one known word of 3+ chars
  for (const word of commonWords) {
    if (word.length >= 3 && lower.includes(word)) return true;
  }

  const countMatches = (value: string, patterns: string[]) => {
    let matches = 0;

    for (let i = 0; i <= value.length - 2; i++) {
      if (patterns.includes(value.slice(i, i + 2))) matches++;
    }

    return matches;
  };

  const countTrigramMatches = (value: string, patterns: string[]) => {
    let matches = 0;

    for (let i = 0; i <= value.length - 3; i++) {
      if (patterns.includes(value.slice(i, i + 3))) matches++;
    }

    return matches;
  };

  const bigramTotal = Math.max(lettersOnly.length - 1, 1);
  const trigramTotal = Math.max(lettersOnly.length - 2, 1);
  const bigramRatio = countMatches(lettersOnly, commonBigrams) / bigramTotal;
  const trigramRatio = countTrigramMatches(lettersOnly, commonTrigrams) / trigramTotal;

  if (bigramRatio < 0.5 || trigramRatio < 0.2) return false;

  // Check for pronounceable patterns (consonant-vowel alternation)
  const vowels = "aeiou";
  let vowelCount = 0;
  let consonantStreak = 0;
  let maxConsonantStreak = 0;
  for (const char of lettersOnly) {
    if (/[a-z]/.test(char)) {
      if (vowels.includes(char)) {
        vowelCount++;
        consonantStreak = 0;
      } else {
        consonantStreak++;
        maxConsonantStreak = Math.max(maxConsonantStreak, consonantStreak);
      }
    }
  }
  const vowelRatio = vowelCount / lettersOnly.length;
  // Pronounceable words have 20-60% vowels and no more than 3 consonants in a row
  return vowelRatio >= 0.2 && vowelRatio <= 0.7 && maxConsonantStreak <= 3;
}

export const usernameSchema = z
  .string()
  .min(5, "Username must be at least 5 characters")
  .max(15, "Username must be at most 15 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Username must not contain special characters")
  .refine((val) => isNotRandom(val), {
    message: "Username appears to be random letters. Please use a meaningful name.",
  });

export const emailSchema = z
  .string()
  .trim()
  .regex(/^[a-zA-Z0-9]+@gmail\.com$/, "Only username@gmail.com format is accepted");

export const phoneSchema = z
  .string()
  .regex(/^[6-9]\d{9}$/, "Invalid number");

function isPasswordNotRandom(password: string): boolean {
  const letterPart = password.replace(/[^a-zA-Z]/g, "").toLowerCase();
  if (letterPart.length === 0) return false;
  return isNotRandom(letterPart);
}

export const passwordSchema = z
  .string()
  .length(8, "Password must be exactly 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one capital letter")
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Password must contain at least one special character")
  .refine((val) => isPasswordNotRandom(val), {
    message: "Password appears random. Use meaningful characters (e.g., Smart@12).",
  });

export const registerSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterForm = z.infer<typeof registerSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
