"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, ...props }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} {...props}>
      {pending ? "Sender..." : children}
    </button>
  );
}
