/**
 * Timezone-safe date utilities for travel planning.
 * Prevents UTC offset shifts that cause 'yesterday's date' bugs in local timezones.
 */

/**
 * Returns today's local date as a 'YYYY-MM-DD' string based on the user's device clock.
 */
export const getTodayLocalDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Checks if a given date string 'YYYY-MM-DD' is before today's local date.
 */
export const isPastDate = (dateStr) => {
  if (!dateStr) return false;
  const todayStr = getTodayLocalDateString();
  return dateStr < todayStr;
};

/**
 * Returns dateStr if valid and today or future, otherwise returns today's local date.
 */
export const clampToToday = (dateStr) => {
  if (!dateStr || isPastDate(dateStr)) {
    return getTodayLocalDateString();
  }
  return dateStr;
};

/**
 * Safely formats a 'YYYY-MM-DD' string to a human readable format without UTC shifts.
 */
export const formatLocalDate = (dateStr, options = { month: "short", day: "numeric", year: "numeric" }) => {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return dateStr;
  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, options);
};

/**
 * Adds N days to a 'YYYY-MM-DD' string safely.
 */
export const addDaysToDateString = (dateStr, daysCount = 1) => {
  const parts = (dateStr || getTodayLocalDateString()).split("-").map(Number);
  const [year, month, day] = parts;
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() + daysCount);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
};
