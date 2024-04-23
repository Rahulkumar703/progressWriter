"use client";
import { Button } from "./ui/button";
import { cn } from "@/lib/helper";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const GoToTop = ({ className }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    document.addEventListener("scroll", () => {
      setVisible(window.scrollY > 100);
    });

    return () =>
      document.removeEventListener("scroll", () => {
        setVisible(window.scrollY > 100);
      });
  });
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    visible && (
      <motion.div
        exit={{ scale: 0, opacity: 0 }}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className={cn("group rounded-full fixed bottom-20 right-20", className)}
      >
        <Button size="icon" onClick={scrollToTop} className="rounded-full">
          <ArrowUp className="w-5 h-5 text-muted-foreground group-hover:text-background transition-colors" />
        </Button>
      </motion.div>
    )
  );
};

export default GoToTop;
