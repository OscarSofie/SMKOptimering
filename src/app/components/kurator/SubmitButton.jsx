"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ variant="primary", children, ...props }) {
  const { pending } = useFormStatus();
    const base =
    "text-xs-fluid font-semibold px-4 py-2 border w-fit transition-colors duration-200";

  const variants = {
    primary: `
      bg-transparent
      text-[var(--color-kurator-primary)]
      border-[var(--color-kurator-primary)]
      hover:bg-[var(--color-kurator-primary)]
      hover:text-[var(--color-kurator-bg)]
    `,
    secondary: `
      bg-transparent
      text-white
      border-[var(--color-kurator-primary)]
      hover:bg-white
      hover:text-[var(--color-kurator-primary)]
      
    `,
    third: `
      bg-[var(--color-kurator-primary)]
      text-white
      border-[var(--color-kurator-primary)]
      hover:bg-white
      hover:text-[var(--color-kurator-primary)]
      
    `,
  };


  return (
    <button type="submit" disabled={pending} className={`${base} ${variants[variant]}`} {...props}>
      {pending ? "Sender..." : children}
    </button>
  );
}
