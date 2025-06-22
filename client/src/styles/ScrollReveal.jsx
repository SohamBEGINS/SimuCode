import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ScrollReveal = ({ text, className = "", wordClassName = "" }) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          controls.start("visible");
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [controls, hasAnimated]);

  const words = text.split(" ");

  return (
    <section ref={ref} className={`w-full flex justify-center`}>
      <div className={`flex flex-wrap justify-center ${className}`}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className={`${wordClassName} select-none`}
            custom={i}
            initial="hidden"
            animate={controls}
            variants={wordVariants}
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default ScrollReveal;
