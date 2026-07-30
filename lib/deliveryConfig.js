// ============================================================
// DELIVERY CHARGE CONFIG — change this one number to adjust
// how much delivery/shipping fee gets added at checkout.
// Set to 0 if you want free delivery always.
// ============================================================
export const DELIVERY_CHARGE = 49;

// Optional: free delivery above a certain order value.
// Set to null to always charge DELIVERY_CHARGE regardless of order size.
export const FREE_DELIVERY_ABOVE = 999;

export function calculateDeliveryCharge(subtotal) {
  if (FREE_DELIVERY_ABOVE !== null && subtotal >= FREE_DELIVERY_ABOVE) {
    return 0;
  }
  return DELIVERY_CHARGE;
}