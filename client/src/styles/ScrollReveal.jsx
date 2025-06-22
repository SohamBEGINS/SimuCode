import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const lineVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: i * 0.3,
      ease: "easeOut",
    },
  }),
};

const ScrollReveal = ({
  lines = [],
  className = "",
  lineClassName = "",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false }); // changed here
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          custom={i}
          initial="hidden"
          animate={controls}
          variants={lineVariants}
          className={`w-full ${lineClassName}`}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
};

export default ScrollReveal;
