// lib/cny.ts

export type CnyInfo = {
  /** Chinese New Year date (first day of lunar year) in YYYY-MM-DD */
  date: string;
  /** Chinese zodiac animal character, e.g. "马" */
  zodiac: string;
};

/**
 * Chinese New Year dates and zodiac animals, 2025–2050.
 * Source: Hong Kong Observatory / timeanddate.com
 */
const CNY_DATA: Record<number, CnyInfo> = {
  2025: { date: "2025-01-29", zodiac: "蛇" },
  2026: { date: "2026-02-17", zodiac: "马" },
  2027: { date: "2027-02-06", zodiac: "羊" },
  2028: { date: "2028-01-26", zodiac: "猴" },
  2029: { date: "2029-02-13", zodiac: "鸡" },
  2030: { date: "2030-02-03", zodiac: "狗" },
  2031: { date: "2031-01-23", zodiac: "猪" },
  2032: { date: "2032-02-11", zodiac: "鼠" },
  2033: { date: "2033-01-31", zodiac: "牛" },
  2034: { date: "2034-02-19", zodiac: "虎" },
  2035: { date: "2035-02-08", zodiac: "兔" },
  2036: { date: "2036-01-28", zodiac: "龙" },
  2037: { date: "2037-02-15", zodiac: "蛇" },
  2038: { date: "2038-02-04", zodiac: "马" },
  2039: { date: "2039-01-24", zodiac: "羊" },
  2040: { date: "2040-02-12", zodiac: "猴" },
  2041: { date: "2041-02-01", zodiac: "鸡" },
  2042: { date: "2042-01-22", zodiac: "狗" },
  2043: { date: "2043-02-10", zodiac: "猪" },
  2044: { date: "2044-01-30", zodiac: "鼠" },
  2045: { date: "2045-02-17", zodiac: "牛" },
  2046: { date: "2046-02-06", zodiac: "虎" },
  2047: { date: "2047-01-26", zodiac: "兔" },
  2048: { date: "2048-02-14", zodiac: "龙" },
  2049: { date: "2049-02-02", zodiac: "蛇" },
  2050: { date: "2050-01-23", zodiac: "马" },
};

/** Days before CNY to start showing decorations */
const LEAD_DAYS = 7;
/** Days after CNY for Lantern Festival (正月十五) */
const LANTERN_OFFSET = 14;

export type CnyStatus = {
  active: true;
  zodiac: string;
  year: number;
} | {
  active: false;
};

/**
 * Check if a given date falls within the CNY display window.
 * Window: 7 days before CNY → 14 days after CNY (Lantern Festival).
 * Checks both the current year and the next year's CNY to handle
 * edge cases near year boundaries.
 */
export function getCnyStatus(today: Date = new Date()): CnyStatus {
  // Normalize to start of day for date-only comparison
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const currentYear = todayMidnight.getFullYear();
  // Check current year and next year (CNY can be in Jan/Feb)
  const yearsToCheck = [currentYear, currentYear + 1, currentYear - 1];

  for (const year of yearsToCheck) {
    const data = CNY_DATA[year];
    if (!data) continue;

    const cnyDate = new Date(data.date + "T00:00:00");
    const startDate = new Date(cnyDate);
    startDate.setDate(startDate.getDate() - LEAD_DAYS);
    const endDate = new Date(cnyDate);
    endDate.setDate(endDate.getDate() + LANTERN_OFFSET);

    if (todayMidnight >= startDate && todayMidnight <= endDate) {
      return { active: true, zodiac: data.zodiac, year };
    }
  }

  return { active: false };
}
