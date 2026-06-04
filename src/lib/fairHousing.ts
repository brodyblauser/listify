export type ComplianceViolation = {
  phrase: string;
  category: string;
  severity: "error" | "warning";
  suggestion: string;
};

export type ComplianceResult = {
  passed: boolean;
  violations: ComplianceViolation[];
};

const RULES: Array<{
  pattern: RegExp;
  category: string;
  severity: "error" | "warning";
  suggestion: string;
}> = [
  // Familial status — cannot restrict or target by family composition
  {
    pattern: /\b(adults?\s*only|no\s*children|child[\s-]?free|child\s*restricted)\b/i,
    category: "Familial Status",
    severity: "error",
    suggestion: "Remove language that restricts or discourages families with children.",
  },
  {
    pattern: /\b(perfect|ideal|great|designed|suited|perfect)\s*(for\s*)?(couples?|singles?|empty\s*nesters?|bachelor)\b/i,
    category: "Familial Status",
    severity: "warning",
    suggestion: "Avoid targeting specific household compositions. Describe property features instead.",
  },
  {
    pattern: /\b(bachelor\s*pad|couples?\s*retreat|honeymoon)\b/i,
    category: "Familial Status",
    severity: "warning",
    suggestion: "Avoid language that implies preference for a specific household type.",
  },

  // Religion — cannot reference proximity to or preference for religious institutions
  {
    pattern: /\b(walking\s*distance|close|near|steps?|minutes?)\s*(to|from)?\s*(the\s*)?(church|cathedral|mosque|synagogue|temple|chapel|parish|basilica|diocese|shul|masjid)\b/i,
    category: "Religion",
    severity: "warning",
    suggestion: "Avoid mentioning religious institutions. Use neutral language like 'minutes from local amenities.'",
  },
  {
    pattern: /\b(christian|jewish|muslim|catholic|protestant|hindu|buddhist|evangelical|orthodox)\s*(community|neighborhood|area|enclave)\b/i,
    category: "Religion",
    severity: "error",
    suggestion: "Remove references to religious identity of a neighborhood.",
  },

  // Age — cannot indicate preference for or against age groups (exceptions for HOPA-certified communities)
  {
    pattern: /\b(young\s*professionals?|young\s*buyers?|young\s*couples?|millennial)\b/i,
    category: "Age",
    severity: "warning",
    suggestion: "Avoid age-based descriptors. Use 'professionals' or 'buyers' instead.",
  },
  {
    pattern: /\b(retirees?|retirement\s*(community|living|home)|55\s*(\+|plus|and\s*over)|senior\s*(only|community|living|housing)|active\s*adult\s*community)\b/i,
    category: "Age",
    severity: "warning",
    suggestion: "Only use 55+/senior housing language if the property is certified under the Housing for Older Persons Act (HOPA).",
  },

  // Race / National origin — cannot steer buyers using coded language
  {
    pattern: /\b(exclusive|prestigious|elite|private)\s*(gated\s*)?(neighborhood|community|enclave|estate)\b/i,
    category: "Race / National Origin",
    severity: "warning",
    suggestion: "This phrasing can be interpreted as racial or ethnic steering. Focus on specific property features or amenities.",
  },

  // Disability — cannot describe property as unsuitable for or requiring physical ability
  {
    pattern: /\b(not\s*suitable\s*(for\s*)?(disabled|handicapped|wheelchair)|wheelchair\s*inaccessible)\b/i,
    category: "Disability",
    severity: "error",
    suggestion: "Never describe a property as unsuitable for people with disabilities.",
  },
  {
    pattern: /\b(able[\s-]bodied|physically\s*(fit|active|capable)|healthy\s*(person|owner|buyer))\b/i,
    category: "Disability",
    severity: "error",
    suggestion: "Remove any language implying physical ability requirements.",
  },
];

export function checkFairHousingCompliance(text: string): ComplianceResult {
  const violations: ComplianceViolation[] = [];

  for (const rule of RULES) {
    const match = text.match(rule.pattern);
    if (match) {
      violations.push({
        phrase: match[0],
        category: rule.category,
        severity: rule.severity,
        suggestion: rule.suggestion,
      });
    }
  }

  return { passed: violations.length === 0, violations };
}
