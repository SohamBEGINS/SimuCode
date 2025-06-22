import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const lineVariants = {
  hidden: i => ({
    opacity: 0,
    filter: "blur(24px)",
    y: i === 0 ? 80 : 48,
    scale: 0.92,
    color: "#e0f7fa",
  }),
  visible: i => ({
    opacity: 1,
    filter: "blur(0px)",
    y: i === 0 ? -18 : 0,
    scale: 1.06,
    color: "#ffffff",
    transition: {
      duration: 2.2, // slower, more dramatic
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.22, // slightly more stagger
      scale: { type: "spring", stiffness: 120, damping: 12 },
    }
  }),
};

const ScrollReveal = ({
  lines = [],
  className = "",
  lineClassName = "",
}) => {
  const ref = useRef(null);
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const revealHeight = rect.height - windowHeight * 0.2;
      const scrolled = Math.max(0, windowHeight - rect.top);
      const progress = Math.min(1, scrolled / revealHeight);
      const nextActive = Math.floor(progress * lines.length);
      setActiveLine(nextActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lines.length]);

  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          custom={i}
          initial="hidden"
          animate={i <= activeLine ? "visible" : "hidden"}
          variants={lineVariants}
          className={`w-full ${lineClassName} ${i === 0 ? "text-3xl md:text-5xl font-extrabold" : "text-2xl md:text-4xl"} `}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
};



export default ScrollReveal;
