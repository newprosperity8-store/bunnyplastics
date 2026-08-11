import type { CartItem } from '../context/CartContext';

export const RECIPIENT_EMAIL = 'newprosperity.8@gmail.com';

/**
 * Security layer: Sanitizes user input against CRLF injection, XSS, and header tampering.
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/[\r\n]+/g, ' ') // Strip CRLF to prevent SMTP header injection
    .replace(/<[^>]*>/g, '')  // Strip HTML tags to prevent XSS/injection
    .trim();
}

export interface QuoteCustomerDetails {
  name?: string;
  contact?: string;
  location?: string;
  notes?: string;
}

/**
 * Generates structured, readable quote email body text listing all items in the cart.
 */
export function generateQuoteEmailBody(items: CartItem[], details?: QuoteCustomerDetails): string {
  if (!items || items.length === 0) {
    return 'Hi BunnyPlastics Team,\n\nI am interested in requesting a quote for your products.\n\nThank you!';
  }

  const itemListFormatted = items.map((item, index) => {
    const productIdStr = item.productId ? ` (Product ID: ${sanitizeText(item.productId)})` : '';
    const colorStr = item.color ? `\n   - Color: ${sanitizeText(item.color)}` : '';
    const sizeStr = item.size ? `\n   - Size: ${sanitizeText(item.size)}` : '';
    const qtyStr = `\n   - Quantity: ${item.qty}`;
    
    return `${index + 1}. ${sanitizeText(item.name)}${productIdStr}${colorStr}${sizeStr}${qtyStr}`;
  }).join('\n\n');

  let customerSection = '';
  if (details) {
    const sanitizedName = details.name ? sanitizeText(details.name) : '';
    const sanitizedContact = details.contact ? sanitizeText(details.contact) : '';
    const sanitizedLocation = details.location ? sanitizeText(details.location) : '';
    const sanitizedNotes = details.notes ? sanitizeText(details.notes) : '';

    customerSection = '\n\n--- Customer Details ---';
    if (sanitizedName) customerSection += `\nName: ${sanitizedName}`;
    if (sanitizedContact) customerSection += `\nContact Info: ${sanitizedContact}`;
    if (sanitizedLocation) customerSection += `\nLocation/Address: ${sanitizedLocation}`;
    if (sanitizedNotes) customerSection += `\nAdditional Notes: ${sanitizedNotes}`;
  }

  return `Hi BunnyPlastics Team,

I am interested in requesting a quote for the following product(s) in my cart:

${itemListFormatted}${customerSection}

Please reply with pricing, product availability, and ordering instructions.

Thank you!`;
}

/**
 * Creates mailto link with URL encoding for security and standards compliance.
 */
export function generateMailtoUrl(items: CartItem[], details?: QuoteCustomerDetails): string {
  const subject = `Quote Request - BunnyPlastics (${items.length} item${items.length === 1 ? '' : 's'})`;
  const body = generateQuoteEmailBody(items, details);
  
  return `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Creates a direct web Gmail composition link for browsers/desktop fallback.
 */
export function generateGmailWebUrl(items: CartItem[], details?: QuoteCustomerDetails): string {
  const subject = `Quote Request - BunnyPlastics (${items.length} item${items.length === 1 ? '' : 's'})`;
  const body = generateQuoteEmailBody(items, details);
  
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECIPIENT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
