import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.08,
  baseRotation = 0,
  blurStrength = 14,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom"
}) => {
  const containerRef = useRef(null);

  // Minimalistic: Split into lines (by '?') for block-level animation, then split into words
  const lines = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\?)/g).reduce((acc, curr) => {
      if (curr === '?') {
        acc[acc.length - 1] += '?';
      } else if (curr.trim()) {
        acc.push(curr.trim());
      }
      return acc;
    }, []).filter(Boolean);
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const lineEls = el.querySelectorAll('.reveal-line');
    lineEls.forEach((lineEl, idx) => {
      gsap.set(lineEl, {
        opacity: baseOpacity,
        filter: `blur(${blurStrength}px)`,
        y: 40,
        scale: 0.98,
      });

      ScrollTrigger.create({
        trigger: lineEl,
        scroller,
        start: "top 70%",
        end: idx === lineEls.length - 1 ? "bottom 10%" : "top 40%",
        onEnter: () => {
          gsap.to(lineEl, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
          });
          const wordEls = lineEl.querySelectorAll('.word');
          gsap.to(wordEls, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            scale: 1,
            stagger: 0.03,
            duration: 0.7,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(lineEl, {
            opacity: baseOpacity,
            filter: `blur(${blurStrength}px)`,
            y: 40,
            scale: 0.98,
            duration: 0.5,
            ease: "power2.in",
          });
          const wordEls = lineEl.querySelectorAll('.word');
          gsap.to(wordEls, {
            opacity: baseOpacity,
            filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
            y: 12,
            scale: 0.98,
            stagger: 0.01,
            duration: 0.3,
            ease: "power2.in",
          });
        },
        toggleActions: "play reverse play reverse",
        scrub: false,
        once: false,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, lines.length]);

  return (
    <div ref={containerRef} className={`my-5 ${containerClassName}`}>
      {lines.map((line, lineIdx) => (
        <div
          key={lineIdx}
          className={`reveal-line block w-full mb-6 last:mb-0 text-[clamp(2.2rem,5vw,3.5rem)] md:text-[3rem] font-semibold tracking-tight leading-tight ${textClassName}`}
          style={{
            letterSpacing: "0.01em",
            minHeight: "4.5rem",
            color: "#fff",
            textShadow: "0 2px 12px rgba(0,0,0,0.10)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            paddingBottom: "0.5em",
            marginBottom: lineIdx === lines.length - 1 ? 0 : "1.5em",
          }}
        >
          {line.split(/(\s+)/).map((word, i) =>
            word.match(/^\s+$/) ? word : (
              <span className="inline-block word" key={i} style={{ opacity: baseOpacity, filter: `blur(${blurStrength}px)` }}>
                {word}
              </span>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default ScrollReveal;
