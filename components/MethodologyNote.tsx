import React from "react";
import { Translations } from "@/lib/i18n";

interface MethodologyNoteProps {
  t: Translations;
}

export default function MethodologyNote({ t }: MethodologyNoteProps) {
  return (
    <aside
      aria-label={t.methodologyAriaLabel}
      className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-900"
    >
      <div className="flex gap-3">
        {/* Info icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 shrink-0 text-blue-500"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <div>
          <p className="font-semibold text-blue-800">{t.methodologyHeading}</p>
          <ol className="mt-2 list-decimal pl-4 space-y-1 text-blue-800 leading-relaxed">
            <li>
              <strong>{t.methodologyStep1Title}</strong> — {t.methodologyStep1Body}
            </li>
            <li>
              <strong>{t.methodologyStep2Title}</strong> — {t.methodologyStep2Body}
            </li>
            <li>
              <strong>{t.methodologyStep3Title}</strong> — {t.methodologyStep3Body}
            </li>
          </ol>
          <p className="mt-3 text-xs text-blue-700">{t.methodologyFootnote}</p>
        </div>
      </div>
    </aside>
  );
}
