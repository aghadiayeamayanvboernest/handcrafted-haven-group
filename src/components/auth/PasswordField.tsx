"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  id: string;
  label: string;
  autoComplete: "current-password" | "new-password";
  minLength?: number;
  helpText?: string;
}

export default function PasswordField({
  id,
  label,
  autoComplete,
  minLength,
  helpText,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-graphite">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          name="password"
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          required
          minLength={minLength}
          className="w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 pr-11 text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-graphite-soft transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {show ? (
            <EyeOff className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Eye className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
      {helpText && <p className="mt-1 text-xs text-graphite-soft">{helpText}</p>}
    </div>
  );
}
