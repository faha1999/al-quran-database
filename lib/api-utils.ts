export function parsePositiveInteger(value: string | null, field: string): number | null {
  if (value === null) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`Invalid "${field}" parameter`);
  }

  return parsed;
}
