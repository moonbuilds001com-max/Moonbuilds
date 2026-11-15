export interface ProcessStep {
  index: string;
  title: string;
  summary: string;
  points: string[];
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: "01",
    title: "Discovery",
    summary:
      "We start by understanding the business, not the brief. What you sell, who buys it, what gets in the way today — and what a successful website has to do.",
    points: [
      "A working session about your business and customers",
      "Review of your current website and materials",
      "Agreed goals, scope and priorities in plain language",
    ],
  },
  {
    index: "02",
    title: "Strategy and design",
    summary:
      "Findings become structure, and structure becomes design: information architecture, page-by-page wireframes, then the full visual design for your review.",
    points: [
      "Information architecture and content plan",
      "Wireframes agreed before visual design starts",
      "Design presented, reviewed and refined with you",
    ],
  },
  {
    index: "03",
    title: "Development",
    summary:
      "Approved designs become a working website: clean typed code, fast loading, accessible markup, and content built in — on staging, where you can watch it come together.",
    points: [
      "Modern framework build with performance budgets",
      "Responsive behaviour across real devices",
      "Staging preview while the build progresses",
    ],
  },
  {
    index: "04",
    title: "Testing",
    summary:
      "Before launch we try hard to break it: every page, form and flow across browsers and devices, plus performance, accessibility and SEO checks.",
    points: [
      "Cross-browser and cross-device testing",
      "Form, navigation and content review",
      "Performance, accessibility and metadata checks",
    ],
  },
  {
    index: "05",
    title: "Launch and support",
    summary:
      "Deployment, domain and analytics are configured, the site goes live, and support continues afterwards — updates, changes and improvements as your business moves.",
    points: [
      "Deployment, domain and email configuration",
      "Analytics and search console set up with you",
      "Ongoing maintenance and support when needed",
    ],
  },
];
