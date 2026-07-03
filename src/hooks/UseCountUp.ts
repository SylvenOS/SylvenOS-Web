// src/hooks/useCountUp.ts
"use client";
import { useEffect } from "react";
import { useSpring, useTransform, useInView } from "motion/react";

export function useCountUp(value: number, ref: React.RefObject<any>) {
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  return display;
}