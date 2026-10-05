import { Layers3 } from "lucide-react";

/** Shared section subtitle. The hero keeps its separate announcement badge. */
export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="alp_section-eyebrow" data-alp-motion="reveal"><span className="alp_section-eyebrow-icon" aria-hidden="true"><Layers3 /></span><span>{children}</span></p>;
}
