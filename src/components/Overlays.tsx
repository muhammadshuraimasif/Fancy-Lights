import React, { useEffect, useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BRAND_CONFIG, buildWhatsAppUrl, formatPKR } from '../config/brand';
import { CATEGORIES, PRODUCTS } from '../data/catalogue';
import { CartItem, Product } from '../types/lighting';
import { ProductLightingVisual } from './LightingArtwork';

/* ==================== QUICK VIEW MODAL ==================== */
interface QuickViewModalProps {
  product: Product | null;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (
    product: Product,
    qty: number,
    finish: string,
    colorTemp?: string
  ) => void;
  onViewDetails: (product: Product) => void;
  onEnquireWhatsApp: (
    product: Product,
    qty: number,
    finish: string,
    colorTemp?: string
  ) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
  onViewDetails,
  onEnquireWhatsApp,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [finish, setFinish] = useState('');
  const [colorTemp, setColorTemp] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (product) {
      setFinish(product.finishes[0]);
      setColorTemp(product.colorTemperatures?.[0]);
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.addEventListener('keydown', onKey);
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view ${product.name}`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
          />
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl bg-[#FAF8F4] border border-[#E5DED2] shadow-2xl grid grid-cols-1 md:grid-cols-12 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute top-3 right-3 z-20 w-9 h-9 bg-white/95 border border-[#E0D7C8] flex items-center justify-center text-[#181613] hover:text-[#8E6C2D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="md:col-span-6 aspect-[4/3] md:aspect-auto md:h-full bg-[#F3EDE3]">
              <ProductLightingVisual
                archetype={product.visualArchetype}
                finish={finish}
                colorTemp={colorTemp}
              />
            </div>

            <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between gap-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#8E6C2D] font-semibold">
                  {product.collection}
                </p>
                <h2 className="font-display text-2xl font-semibold text-[#181613] mt-1">
                  {product.name}
                </h2>
                <div className="mt-2 flex items-baseline gap-2.5 tabular-nums">
                  <span className="text-lg font-semibold text-[#181613]">
                    {formatPKR(product.pricePKR)}
                  </span>
                  {product.previousPricePKR && (
                    <span className="text-sm line-through text-[#8A8277]">
                      {formatPKR(product.previousPricePKR)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#49433B] mt-3 leading-relaxed">
                  {product.shortDescription}
                </p>
                <p className="text-xs text-[#736B60] mt-2">
                  Dimensions: {product.dimensions}
                </p>

                <div className="mt-4 space-y-3">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-[#6E675E] font-semibold mb-1.5">
                      Finish
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.finishes.map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setFinish(f)}
                          className={`px-2.5 py-1.5 text-xs border cursor-pointer transition-colors ${
                            finish === f
                              ? 'bg-[#181613] text-white border-[#181613]'
                              : 'bg-white text-[#2D2924] border-[#DCD3C4]'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {product.colorTemperatures && product.colorTemperatures.length > 0 && (
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider text-[#6E675E] font-semibold mb-1.5">
                        Color Temperature
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.colorTemperatures.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setColorTemp(t)}
                            className={`px-2.5 py-1.5 text-xs border cursor-pointer transition-colors ${
                              colorTemp === t
                                ? 'bg-[#B68F48] text-[#14120F] border-[#B68F48] font-medium'
                                : 'bg-white text-[#2D2924] border-[#DCD3C4]'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-[#E8E1D5]">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(product, 1, finish, colorTemp);
                      onClose();
                    }}
                    className="flex-1 py-2.5 px-4 bg-[#181613] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#8E6C2D] transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product.id)}
                    aria-label="Toggle wishlist"
                    className={`w-10 border flex items-center justify-center cursor-pointer transition-colors ${
                      isWishlisted
                        ? 'bg-[#B68F48] border-[#B68F48] text-white'
                        : 'bg-white border-[#DCD3C4] text-[#2D2924]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onViewDetails(product);
                    }}
                    className="py-2.5 px-3 border border-[#DCD3C4] bg-white text-xs font-medium text-[#181613] hover:border-[#181613] cursor-pointer"
                  >
                    Full Product Details
                  </button>
                  <button
                    type="button"
                    onClick={() => onEnquireWhatsApp(product, 1, finish, colorTemp)}
                    className="py-2.5 px-3 border border-[#B68F48] bg-[#FAF5EB] text-xs font-semibold text-[#181613] flex items-center justify-center gap-1.5 hover:bg-[#B68F48] cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* ==================== SLIDING CART DRAWER ==================== */
interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
  onEnquireCartWhatsApp: () => void;
  onExploreShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onEnquireCartWhatsApp,
  onExploreShop,
}) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const enriched = items
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((x): x is CartItem & { product: Product } => x !== null);

  const subtotal = enriched.reduce(
    (sum, item) => sum + item.product.pricePKR * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping Cart">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
          />

          <motion.aside
            initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            animate={{ x: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FAF8F4] border-l border-[#E5DED2] z-10 flex flex-col shadow-2xl"
          >
            <div className="px-6 py-5 border-b border-[#E5DED2] flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#181613]">
                  Your Cart
                </h2>
                <p className="text-xs text-[#6E675E]">
                  {enriched.reduce((s, i) => s + i.quantity, 0)} item(s) selected for enquiry
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close cart"
                className="w-10 h-10 flex items-center justify-center text-[#181613] hover:text-[#8E6C2D] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {enriched.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 border border-[#E5DED2] bg-white flex items-center justify-center text-[#8E6C2D] mb-4">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#181613]">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-[#6E675E] mt-2 max-w-xs">
                    Browse chandeliers, ceiling fixtures, pendants, and wall lights to prepare an order enquiry.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onExploreShop();
                    }}
                    className="mt-6 px-6 py-3 bg-[#181613] text-[#FAF8F4] text-xs font-semibold uppercase tracking-wider hover:bg-[#8E6C2D] transition-colors cursor-pointer"
                  >
                    Explore Lighting
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-[#E8E1D5]">
                  {enriched.map((item) => (
                    <li key={item.key} className="py-4 flex gap-4">
                      <div className="w-24 h-20 shrink-0 border border-[#E5DED2] bg-[#F2ECE1] overflow-hidden">
                        <ProductLightingVisual
                          archetype={item.product.visualArchetype}
                          finish={item.selectedFinish}
                          colorTemp={item.selectedColorTemp}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-[#181613] leading-snug">
                            {item.product.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.key)}
                            aria-label={`Remove ${item.product.name}`}
                            className="text-[#8A8277] hover:text-red-700 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-[#6E675E] mt-1">
                          {item.selectedFinish}
                          {item.selectedColorTemp ? ` · ${item.selectedColorTemp}` : ''}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[#DCD3C4] bg-white">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.key, -1)}
                              aria-label="Decrease quantity"
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#F3EEE5] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.key, 1)}
                              aria-label="Increase quantity"
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#F3EEE5] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-sm font-semibold text-[#181613] tabular-nums">
                            {formatPKR(item.product.pricePKR * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {enriched.length > 0 && (
              <div className="px-6 py-5 border-t border-[#E5DED2] bg-[#F3EEE5] space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#5A534A]">
                    <span>Estimated Subtotal</span>
                    <span className="tabular-nums font-medium">{formatPKR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-[#181613] pt-2 border-t border-[#E2D9C9]">
                    <span>Estimated Total</span>
                    <span className="tabular-nums">{formatPKR(subtotal)}</span>
                  </div>
                  <p className="text-[11px] text-[#736B60] pt-1">
                    Final availability, showroom dispatch, and delivery charges are confirmed via WhatsApp before payment.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onEnquireCartWhatsApp}
                  className="w-full py-3.5 px-5 bg-[#181613] text-[#FAF8F4] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#8E6C2D] transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire / Order on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={onClearCart}
                  className="w-full py-2 text-xs text-[#6E675E] hover:text-[#181613] transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

/* ==================== WISHLIST DRAWER ==================== */
interface WishlistDrawerProps {
  open: boolean;
  wishlistIds: string[];
  onClose: () => void;
  onRemoveWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  open,
  wishlistIds,
  onClose,
  onRemoveWishlist,
  onAddToCart,
  onViewDetails,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const saved = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Wishlist">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
          />

          <motion.aside
            initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            animate={{ x: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FAF8F4] border-l border-[#E5DED2] z-10 flex flex-col shadow-2xl"
          >
            <div className="px-6 py-5 border-b border-[#E5DED2] flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#181613]">
                  Saved Lighting
                </h2>
                <p className="text-xs text-[#6E675E]">{saved.length} saved fixture(s)</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close wishlist"
                className="w-10 h-10 flex items-center justify-center text-[#181613] hover:text-[#8E6C2D] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {saved.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 border border-[#E5DED2] bg-white flex items-center justify-center text-[#8E6C2D] mb-4">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#181613]">
                    No saved fixtures yet
                  </h3>
                  <p className="text-sm text-[#6E675E] mt-2 max-w-xs">
                    Tap the heart icon on any chandelier, sconce, or lamp to bookmark it here.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-[#E8E1D5]">
                  {saved.map((product) => (
                    <li key={product.id} className="py-4 flex gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onViewDetails(product);
                        }}
                        className="w-24 h-20 shrink-0 border border-[#E5DED2] bg-[#F2ECE1] overflow-hidden cursor-pointer"
                      >
                        <ProductLightingVisual
                          archetype={product.visualArchetype}
                          finish={product.finishes[0]}
                        />
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onViewDetails(product);
                            }}
                            className="text-left text-sm font-semibold text-[#181613] hover:text-[#8E6C2D] cursor-pointer"
                          >
                            {product.name}
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemoveWishlist(product.id)}
                            aria-label={`Remove ${product.name} from wishlist`}
                            className="text-[#8A8277] hover:text-red-700 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-sm font-medium text-[#181613] tabular-nums mt-1">
                          {formatPKR(product.pricePKR)}
                        </p>

                        <button
                          type="button"
                          onClick={() => onAddToCart(product)}
                          className="mt-2.5 px-3 py-1.5 bg-[#181613] text-white text-xs font-medium hover:bg-[#8E6C2D] transition-colors cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

/* ==================== SEARCH MODAL ==================== */
interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (slug: typeof CATEGORIES[number]['slug']) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  open,
  onClose,
  onSelectProduct,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const trimmed = query.trim().toLowerCase();
  const matchedProducts = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.collection.toLowerCase().includes(trimmed) ||
          p.shortDescription.toLowerCase().includes(trimmed)
      ).slice(0, 8)
    : PRODUCTS.filter((p) => p.featured).slice(0, 6);

  const matchedCategories = trimmed
    ? CATEGORIES.filter((c) => c.name.toLowerCase().includes(trimmed)).slice(0, 4)
    : CATEGORIES.slice(0, 5);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4" role="dialog" aria-modal="true" aria-label="Search Lighting">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 w-full max-w-2xl bg-[#FAF8F4] border border-[#E5DED2] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E5DED2] bg-white">
              <Search className="w-5 h-5 text-[#8E6C2D] shrink-0" />
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chandeliers, wall sconces, ceiling lights, table lamps..."
                className="w-full text-sm text-[#181613] placeholder:text-[#8E867B] focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="p-1.5 text-[#6E675E] hover:text-[#181613] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 max-h-[65vh] overflow-y-auto space-y-5">
              {matchedCategories.length > 0 && (
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#8E6C2D] font-semibold mb-2.5">
                    Categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {matchedCategories.map((c) => (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectCategory(c.slug);
                        }}
                        className="px-3 py-1.5 bg-white border border-[#E0D7C8] text-xs font-medium text-[#181613] hover:border-[#B68F48] cursor-pointer"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#6E675E] font-semibold mb-2.5">
                  {trimmed ? 'Matching Fixtures' : 'Popular Lighting'}
                </p>

                {matchedProducts.length === 0 ? (
                  <p className="text-sm text-[#6E675E] py-4">
                    No fixtures matched &ldquo;{query}&rdquo;. Try &ldquo;chandelier&rdquo;, &ldquo;pendant&rdquo;, or &ldquo;sconce&rdquo;.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchedProducts.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectProduct(p);
                        }}
                        className="flex items-center gap-3 p-2.5 bg-white border border-[#E8E1D5] hover:border-[#B68F48] text-left cursor-pointer transition-colors"
                      >
                        <div className="w-16 h-12 shrink-0 bg-[#F3EDE3] overflow-hidden">
                          <ProductLightingVisual
                            archetype={p.visualArchetype}
                            finish={p.finishes[0]}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[#181613] truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-[#8E6C2D] tabular-nums mt-0.5">
                            {formatPKR(p.pricePKR)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* ==================== WHATSAPP UNCONFIGURED / ENQUIRY PREVIEW MODAL ==================== */
interface WhatsAppModalProps {
  message: string | null;
  onClose: () => void;
}

export const WhatsAppEnquiryModal: React.FC<WhatsAppModalProps> = ({
  message,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [previewNumber, setPreviewNumber] = useState('');

  useEffect(() => {
    setCopied(false);
  }, [message]);

  const handleCopy = async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const customUrl = previewNumber ? buildWhatsAppUrl(previewNumber, message ?? '') : null;

  return (
    <AnimatePresence>
      {message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="WhatsApp Enquiry">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="relative z-10 w-full max-w-lg bg-[#FAF8F4] border border-[#E5DED2] shadow-2xl p-6 sm:p-7 space-y-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#8E6C2D] font-semibold">
                  WhatsApp Enquiry Ready
                </p>
                <h2 className="font-display text-2xl font-semibold text-[#181613] mt-1">
                  Configure Business WhatsApp Number
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 text-[#6E675E] hover:text-[#181613] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#49433B] leading-relaxed">
              The official WhatsApp number for <strong>{BRAND_CONFIG.businessName}</strong> has not been set yet in{' '}
              <code className="text-xs bg-[#EFE9DD] px-1.5 py-0.5">src/config/brand.ts</code>. Once configured, this button will launch WhatsApp directly with the prefilled message below:
            </p>

            <div className="bg-white border border-[#E2D9C9] p-4 text-xs text-[#2D2924] whitespace-pre-wrap leading-relaxed font-sans">
              {message}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2.5 bg-[#181613] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#8E6C2D] transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Message' : 'Copy Enquiry Message'}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-[#E5DED2] space-y-2">
              <label
                htmlFor="test-wa-number"
                className="block text-xs font-medium text-[#5A534A]"
              >
                Preview with a WhatsApp number (digits with country code, e.g. 923XXXXXXXXX):
              </label>
              <div className="flex gap-2">
                <input
                  id="test-wa-number"
                  type="tel"
                  value={previewNumber}
                  onChange={(e) => setPreviewNumber(e.target.value)}
                  placeholder="923XXXXXXXXX"
                  className="flex-1 px-3 py-2 text-xs bg-white border border-[#DCD3C4] focus:outline-none focus:border-[#B68F48]"
                />
                {customUrl ? (
                  <a
                    href={customUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#B68F48] text-[#14120F] text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-[#CCA65E]"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="px-4 py-2 bg-[#ECE5D9] text-[#857D72] text-xs font-medium">
                    Enter 7+ digits
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* ==================== LEGAL POLICY MODAL ==================== */
interface LegalModalProps {
  doc: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ doc, onClose }) => {
  return (
    <AnimatePresence>
      {doc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50"
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="relative z-10 w-full max-w-xl bg-[#FAF8F4] border border-[#E5DED2] p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#E5DED2] pb-3">
              <h2 className="font-display text-2xl font-semibold text-[#181613]">
                {doc === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions'}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close legal dialog"
                className="p-1 text-[#6E675E] hover:text-[#181613] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {doc === 'privacy' ? (
              <div className="text-sm text-[#49433B] space-y-3 leading-relaxed">
                <p>
                  {BRAND_CONFIG.businessName} respects visitor privacy. Wishlist selections and shopping cart items are stored locally in your browser so your selections stay available during your visit.
                </p>
                <p>
                  Information entered into the contact enquiry form or sent via WhatsApp is used strictly to respond to product enquiries, confirm specifications, and coordinate showroom orders.
                </p>
              </div>
            ) : (
              <div className="text-sm text-[#49433B] space-y-3 leading-relaxed">
                <p>
                  All lighting descriptions, sample prices in Pakistani Rupees (PKR), dimensions, and finish options displayed on this website serve as an illustrative product catalogue for {BRAND_CONFIG.businessName}.
                </p>
                <p>
                  Final product availability, current pricing, electrical compatibility, and dispatch arrangements are confirmed directly by our showroom team prior to order confirmation.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
