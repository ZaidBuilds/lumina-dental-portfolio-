"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Very smooth and responsive spring settings
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Hide default cursor on body
    document.body.style.cursor = "none";

    // Add global style for forcing cursor none on non-interactive elements
    const style = document.createElement("style");
    style.innerHTML = `
      * { cursor: none !important; }
      a, button, [role="button"], input, select, textarea, label { cursor: none !important; }
    `;
    document.head.appendChild(style);

    const moveCursor = (e: MouseEvent) => {
      // 10 is offset for default 20x20 size
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
      document.head.removeChild(style);
    };
  }, [cursorX, cursorY]);

  // Handle SSR
  if (typeof window === "undefined") return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center text-black font-bold tracking-widest text-[8px] uppercase overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovered ? 4 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5
        }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Subtle text shown on hover if desired underneath the blend mode */}
        </motion.span>
      </motion.div>
    </>
  );
};
