import { useState, useEffect } from "react";

const words = ["Interviews", "Challenges", "Pressure"];

const TypewriterText = ({ className = "" }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000);
      return;
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 50 : 120);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  useEffect(() => {
    const blinkTimeout = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkTimeout);
  }, []);

  return (
    <span
      className={`inline-block align-middle px-2 sm:px-2 md:px py-0.5 sm:py-1 md:py-2 justify-center rounded-lg font-mono text-2xl md:text-6xl ${className}`}
      style={{ minWidth: "8ch" }}
    >
      {words[index].substring(0, subIndex)}
      <span className="inline-block w-2">{blink ? "|" : " "}</span>
    </span>
  );
};

export default TypewriterText;
