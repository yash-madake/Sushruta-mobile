/**
 * Application Theme
 * This file centralizes your colors and fonts so you can change them in one place.
 * These match the Tailwind classes you use (e.g., blue-600, teal-500).
 */

export const COLORS = {
  // Primary Brand Colors (Medical Blue)
  primary: '#2563EB',      // blue-600
  primaryDark: '#1E40AF',  // blue-800
  primaryLight: '#60A5FA', // blue-400

  // Secondary Colors (Wellness/Success Teal)
  secondary: '#14B8A6',     // teal-500
  secondaryDark: '#0F766E', // teal-700
  secondaryLight: '#5EEAD4',// teal-300

  // Status Colors
  success: '#22C55E',       // green-500
  warning: '#F59E0B',       // amber-500
  danger: '#EF4444',        // red-500
  info: '#3B82F6',          // blue-500

  // Backgrounds
  background: '#F8FAFC',    // slate-50 (Main App Background)
  surface: '#FFFFFF',       // white (Cards, Modals)
  surfaceHighlight: '#F1F5F9', // slate-100 (Hover/Active states)

  // Typography / Text
  textPrimary: '#0F172A',   // slate-900 (Headings)
  textSecondary: '#64748B', // slate-500 (Subtitles)
  textLight: '#94A3B8',     // slate-400 (Disabled/Placeholder)
  textInverse: '#FFFFFF',   // white (Text on blue buttons)

  // Borders & Dividers
  border: '#E2E8F0',        // slate-200
  divider: '#CBD5E1',       // slate-300
};

export const SIZES = {
  // Spacing (Matches Tailwind p-2, p-4, etc.)
  base: 8,
  small: 12,
  medium: 16,  // p-4
  large: 24,   // p-6
  xl: 32,      // p-8

  // Border Radius
  radius_sm: 8,   // rounded-md
  radius_md: 12,  // rounded-lg
  radius_lg: 16,  // rounded-xl
  radius_full: 9999, // rounded-full

  // Font Sizes
  h1: 30,
  h2: 24,
  h3: 20,
  body: 16,
  caption: 14,
  small: 12,
};

export const SHADOWS = {
  // Simple shadows for cards
  light: {
    shadowColor: COLORS.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2, // Android
  },
  medium: {
    shadowColor: COLORS.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // Android
  },
};

const appTheme = { COLORS, SIZES, SHADOWS };

export default appTheme;