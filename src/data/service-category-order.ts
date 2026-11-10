// Display order of service categories in the menu, footer and /services
// (Lebanon). Categories not listed here sort last, alphabetically.
export const SERVICE_CATEGORY_ORDER = ["preventive-care", "diagnostics", "dental", "surgery", "urgent-care", "specialty"];

export function byCategoryOrder<T extends { id: string }>(a: T, b: T) {
  const ia = SERVICE_CATEGORY_ORDER.indexOf(a.id);
  const ib = SERVICE_CATEGORY_ORDER.indexOf(b.id);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.id.localeCompare(b.id);
}
