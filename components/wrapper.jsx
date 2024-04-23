"use client";
import { cn } from "@/lib/helper";
import { motion } from "framer-motion";

const Wrapper = ({ children, className, animate = false }) => {
  return animate ? (
    <motion.div
      className={cn("max-w-7xl mx-auto sm:p-4 p-2", className)}
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {children}
    </motion.div>
  ) : (
    <div className={cn("max-w-7xl mx-auto sm:p-4 p-2", className)}>
      {children}
    </div>
  );
};

export default Wrapper;
