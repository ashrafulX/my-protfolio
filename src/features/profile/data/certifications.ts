import type { Certification } from "../types/certifications";

// Intentionally limited to 2 placeholder certifications for now.
// Add more entries here manually once you actually earn them.
export const CERTIFICATIONS: Certification[] = [
  {
    title: "Certification Title 1 (placeholder)",
    issuer: "Issuing Organization",
    issuerLogoURL:
      "https://api.dicebear.com/7.x/shapes/svg?seed=Certification+One",
    issueDate: "2026-01-01",
    credentialID: "TBD",
    credentialURL: "#",
  },
  {
    title: "Certification Title 2 (placeholder)",
    issuer: "Issuing Organization",
    issuerLogoURL:
      "https://api.dicebear.com/7.x/shapes/svg?seed=Certification+Two",
    issueDate: "2026-01-01",
    credentialID: "TBD",
    credentialURL: "#",
  },
];
