/**
 * Centralized Brand, Showroom, and WhatsApp Enquiry Configuration
 * -----------------------------------------------------------------
 * Replace the placeholder fields below with your verified showroom
 * details before launching the live storefront.
 */

export interface BrandConfig {
  businessName: string;
  tagline: string;
  /**
   * International format digits only (no "+", spaces, or dashes), e.g. "923001234567".
   * Leave empty "" until your official WhatsApp business number is ready.
   */
  whatsappNumber: string;
  phoneNumberDisplay: string;
  email: string;
  showroomAddress: string;
  businessHours: string;
  instagramUrl: string;
  facebookUrl: string;
  currencyCode: 'PKR';
}

export const BRAND_CONFIG: BrandConfig = {
  businessName: 'AB fancy Lights.',
  tagline: 'Decorative Lighting & Modern Interior Illumination',
  whatsappNumber: '',
  phoneNumberDisplay: '[Phone Number — Configure in src/config/brand.ts]',
  email: '[Email Address — Configure in src/config/brand.ts]',
  showroomAddress: '[Showroom Street & City — Configure in src/config/brand.ts]',
  businessHours: '[Opening Hours — Configure in src/config/brand.ts]',
  instagramUrl: '',
  facebookUrl: '',
  currencyCode: 'PKR',
};

export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export function buildWhatsAppUrl(number: string, message: string): string | null {
  const digits = number.replace(/\D/g, '');
  if (!digits || digits.length < 7) {
    return null;
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
