import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Instagram,
  Facebook,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BRAND_CONFIG } from '../config/brand';
import { CATEGORIES, LIGHTING_FAQS } from '../data/catalogue';
import { CategorySlug } from '../types/lighting';

/* ==================== FAQ ACCORDION ==================== */
export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 bg-[#F3EEE5] border-t border-[#E5DED2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.16em] text-[#8E6C2D] font-semibold">
            Showroom Guidance
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181613] mt-1.5">
            Lighting Selection &amp; Enquiry Guide
          </h2>
        </div>

        <div className="divide-y divide-[#DFD6C7] border-y border-[#DFD6C7]">
          {LIGHTING_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.question} className="py-1">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <span className="font-sans text-base font-semibold text-[#181613] group-hover:text-[#8E6C2D] transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8E6C2D] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm text-[#49433B] leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ==================== CONTACT SECTION ==================== */
interface ContactSectionProps {
  onOpenWhatsAppWithMessage: (message: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenWhatsAppWithMessage,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Chandeliers');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) {
      nextErrors.phone = 'Please enter a valid phone or WhatsApp number.';
    }
    if (!message.trim()) nextErrors.message = 'Please tell us about the lighting you need.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  };

  const formattedEnquiryMsg = `Assalam-o-Alaikum, my name is ${name || '[Name]'} (${
    phone || '[Phone]'
  }). I am enquiring about ${interest} on ${BRAND_CONFIG.businessName}.\n\nDetails: ${
    message || 'Please share pricing and availability.'
  }`;

  return (
    <section id="contact" className="py-20 bg-[#FAF8F4] border-t border-[#E5DED2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Configurable Showroom Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#8E6C2D] font-semibold">
                Visit or Message Us
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#181613] mt-1.5">
                Contact {BRAND_CONFIG.businessName}
              </h2>
              <p className="text-sm text-[#5A534A] mt-3 leading-relaxed">
                Share your room type, ceiling height, or favorite fixtures with our team for availability, sizing guidance, and current pricing.
              </p>
            </div>

            <div className="space-y-4 pt-2 border-t border-[#E8E1D5] text-sm">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-[#8E6C2D] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#181613]">WhatsApp Enquiries</p>
                  <p className="text-[#5A534A]">
                    {BRAND_CONFIG.whatsappNumber ||
                      '[WhatsApp Number — Configure in src/config/brand.ts]'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#8E6C2D] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#181613]">Telephone</p>
                  <p className="text-[#5A534A]">{BRAND_CONFIG.phoneNumberDisplay}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#8E6C2D] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#181613]">Email</p>
                  <p className="text-[#5A534A]">{BRAND_CONFIG.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#8E6C2D] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#181613]">Showroom Address</p>
                  <p className="text-[#5A534A]">{BRAND_CONFIG.showroomAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#8E6C2D] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#181613]">Business Hours</p>
                  <p className="text-[#5A534A]">{BRAND_CONFIG.businessHours}</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onOpenWhatsAppWithMessage(
                  `Assalam-o-Alaikum, I would like to enquire about decorative lighting listed on ${BRAND_CONFIG.businessName}.`
                )
              }
              className="w-full sm:w-auto px-6 py-3.5 bg-[#181613] text-[#FAF8F4] text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-[#8E6C2D] transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>

          {/* Right: Validated Contact Enquiry Form */}
          <div className="lg:col-span-7 bg-white border border-[#E5DED2] p-6 sm:p-8">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-[#FAF5EB] border border-[#B68F48] flex items-center justify-center text-[#8E6C2D]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#181613]">
                  Enquiry Prepared
                </h3>
                <p className="text-sm text-[#5A534A] max-w-md mx-auto leading-relaxed">
                  Thank you, {name}. Your enquiry details have been validated and formatted. You can send this directly to our showroom on WhatsApp or reset the form to send another enquiry.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenWhatsAppWithMessage(formattedEnquiryMsg)}
                    className="px-6 py-3 bg-[#181613] text-white text-xs font-semibold inline-flex items-center gap-2 hover:bg-[#8E6C2D] cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send This Enquiry via WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-5 py-3 border border-[#DCD3C4] text-xs font-medium text-[#181613] hover:border-[#181613] cursor-pointer"
                  >
                    New Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="border-b border-[#EFE9DE] pb-4">
                  <h3 className="font-display text-2xl font-semibold text-[#181613]">
                    Send a Product Enquiry
                  </h3>
                  <p className="text-xs text-[#6E675E] mt-1">
                    All fields marked with * are required.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[#2E2924] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#DCD3C4] focus:outline-none focus:border-[#B68F48]"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-700 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#2E2924] mb-1.5">
                      Phone or WhatsApp Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03XX XXXXXXX"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#DCD3C4] focus:outline-none focus:border-[#B68F48]"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-700 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-interest" className="block text-xs font-semibold text-[#2E2924] mb-1.5">
                    Product or Category of Interest
                  </label>
                  <select
                    id="contact-interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#DCD3C4] focus:outline-none focus:border-[#B68F48]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                    <option value="Full Home Lighting Package">Full Home Lighting</option>
                    <option value="Office & Commercial Lighting">Office &amp; Commercial Lighting</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-[#2E2924] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share fixture names, preferred finish, or room dimensions..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-[#DCD3C4] focus:outline-none focus:border-[#B68F48]"
                  />
                  {errors.message && (
                    <p className="text-xs text-red-700 mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#181613] text-[#FAF8F4] text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-[#8E6C2D] transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==================== FOOTER ==================== */
interface FooterProps {
  onSelectCategory: (slug: CategorySlug) => void;
  onSelectSegment: (segment: 'home' | 'office') => void;
  onNavigateContact: () => void;
  onOpenWhatsAppGeneral: () => void;
  onOpenLegal: (doc: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectSegment,
  onNavigateContact,
  onOpenWhatsAppGeneral,
  onOpenLegal,
}) => {
  return (
    <footer className="bg-[#161513] text-[#DED7CA] border-t border-[#2B2721]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <p className="font-display text-3xl font-semibold text-[#FAF8F4]">
              {BRAND_CONFIG.businessName}
            </p>
            <p className="text-sm text-[#B2AA9C] leading-relaxed max-w-sm">
              Decorative lighting, modern illumination, and stylish interior lighting fixtures tailored for residential and commercial spaces.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {BRAND_CONFIG.instagramUrl ? (
                <a
                  href={BRAND_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 border border-[#322E27] flex items-center justify-center hover:border-[#B68F48] text-[#DED7CA]"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              ) : (
                <span
                  title="Configure Instagram URL in src/config/brand.ts"
                  className="inline-flex items-center gap-1.5 text-xs text-[#8D8578] border border-[#2C2822] px-2.5 py-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram (Configure link)</span>
                </span>
              )}
              {BRAND_CONFIG.facebookUrl ? (
                <a
                  href={BRAND_CONFIG.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 border border-[#322E27] flex items-center justify-center hover:border-[#B68F48] text-[#DED7CA]"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              ) : (
                <span
                  title="Configure Facebook URL in src/config/brand.ts"
                  className="inline-flex items-center gap-1.5 text-xs text-[#8D8578] border border-[#2C2822] px-2.5 py-1.5"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook (Configure link)</span>
                </span>
              )}
            </div>
          </div>

          {/* Shop Categories */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-[0.14em] text-[#D7B674] font-semibold">
              Shop Categories
            </p>
            <ul className="space-y-2 text-sm text-[#B8B0A3]">
              {(
                [
                  ['chandeliers', 'Chandeliers'],
                  ['ceiling-lights', 'Ceiling Lights'],
                  ['pendant-lights', 'Pendant Lights'],
                  ['wall-lights', 'Wall Lights'],
                  ['decorative-table-lamps', 'Table & Floor Lamps'],
                  ['outdoor-garden-lights', 'Outdoor Garden Lights'],
                ] as [CategorySlug, string][]
              ).map(([slug, label]) => (
                <li key={slug}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(slug)}
                    className="hover:text-[#FAF8F4] transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs uppercase tracking-[0.14em] text-[#D7B674] font-semibold">
              Lighting Solutions
            </p>
            <ul className="space-y-2 text-sm text-[#B8B0A3]">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectSegment('home')}
                  className="hover:text-[#FAF8F4] transition-colors cursor-pointer"
                >
                  Home Lighting
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectSegment('office')}
                  className="hover:text-[#FAF8F4] transition-colors cursor-pointer"
                >
                  Office &amp; Commercial
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateContact}
                  className="hover:text-[#FAF8F4] transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenWhatsAppGeneral}
                  className="hover:text-[#FAF8F4] transition-colors cursor-pointer"
                >
                  WhatsApp Enquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-[0.14em] text-[#D7B674] font-semibold">
              Showroom Contact
            </p>
            <div className="space-y-2 text-sm text-[#B8B0A3]">
              <p>{BRAND_CONFIG.phoneNumberDisplay}</p>
              <p>{BRAND_CONFIG.email}</p>
              <p>{BRAND_CONFIG.showroomAddress}</p>
              <button
                type="button"
                onClick={onOpenWhatsAppGeneral}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-[#B68F48] text-[#14120F] text-xs font-semibold hover:bg-[#CCA65E] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Support</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[#2B2721] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8D8578]">
          <p>
            &copy; {new Date().getFullYear()} {BRAND_CONFIG.businessName} All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#DED7CA] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#DED7CA] transition-colors cursor-pointer"
            >
              Terms and Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
