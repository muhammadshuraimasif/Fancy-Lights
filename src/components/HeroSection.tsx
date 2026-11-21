import React, { useRef } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArchitecturalSceneVisual } from './LightingArtwork';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onGetInTouch: () => void;
  onWhatsAppEnquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollection,
  onGetInTouch,
  onWhatsAppEnquiry,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#161513] text-[#FAF8F4]"
    >
      {/* Full-width luminous interior backdrop with gentle parallax */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: parallaxY }}
        className="absolute inset-0 w-full h-[112%] -top-[6%]"
      >
        <ArchitecturalSceneVisual sceneType="hero" className="w-full h-full" />
      </motion.div>

      {/* Measured contrast scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#14120F]/90 via-[#14120F]/68 to-[#14120F]/35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#14120F]/80 via-transparent to-[#14120F]/25"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-2xl">
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-[0.18em] text-[#D7B674] font-medium mb-4"
          >
            AB fancy Lights. · Decorative Lighting Showroom
          </motion.p>

          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-balance text-[#FAF8F4]"
          >
            Light Up Your Space. Elevate Your Style.
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-base sm:text-lg text-[#E6DFD3] leading-relaxed max-w-xl"
          >
            Discover decorative lighting that transforms everyday spaces into beautiful interiors.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={onExploreCollection}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#B68F48] text-[#14120F] text-sm font-semibold tracking-wide hover:bg-[#CCA65E] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onGetInTouch}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#FAF8F4]/45 text-[#FAF8F4] text-sm font-medium tracking-wide hover:bg-[#FAF8F4]/10 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Get in Touch</span>
            </button>

            <button
              type="button"
              onClick={onWhatsAppEnquiry}
              className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#D7B674] hover:text-[#FAF8F4] transition-colors cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Enquiry</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
