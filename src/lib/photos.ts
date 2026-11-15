/**
 * Photo registry: every photograph used on the site, with the
 * attribution data verified on the photo's own Pexels page.
 * public/photos/CREDITS.md is generated from this file.
 */
export interface PhotoCredit {
  file: string;
  title: string;
  photographer: string;
  page: string;
  licence: string;
  verified: string;
}

export const PHOTO_CREDITS: PhotoCredit[] = [
  {
    file: "01-hero",
    title: "Warmly lit modern interior with wooden slats and plants",
    photographer: "Hert Niks",
    page: "https://www.pexels.com/photo/cozy-modern-cafe-interior-with-warm-lighting-38623517/",
    licence: "Pexels License (free for commercial use, no attribution required)",
    verified: "Verified on the photo page at the time of download",
  },
  {
    file: "02-studio",
    title: "Desk with books and pictures in a studio, by a window",
    photographer: "Skylar Kang",
    page: "https://www.pexels.com/photo/desk-with-books-and-pictures-in-studio-6044260/",
    licence: "Pexels License (free for commercial use, no attribution required)",
    verified: "Verified on the photo page at the time of download",
  },
  {
    file: "03-architecture",
    title: "Concrete stairs with metal railings under a skylight",
    photographer: "Mathias Reding",
    page: "https://www.pexels.com/photo/a-gray-concrete-stairs-with-gray-metal-railings-12884282/",
    licence: "Pexels License (free for commercial use, no attribution required)",
    verified: "Verified on the photo page at the time of download",
  },
  {
    file: "04-gallery",
    title: "Modern art gallery interior with framed photography on a white wall",
    photographer: "Alexander Grigorian",
    page: "https://www.pexels.com/photo/frames-hanging-on-white-wall-11000394/",
    licence: "Pexels License (free for commercial use, no attribution required)",
    verified: "Verified on the photo page at the time of download",
  },
  {
    file: "05-technology",
    title: "Programming code displayed on a monitor in a dark room",
    photographer: "Nemuel Sereti",
    page: "https://www.pexels.com/photo/monitor-displaying-lines-of-code-6424583/",
    licence: "Pexels License (free for commercial use, no attribution required)",
    verified: "Verified on the photo page at the time of download",
  },
  {
    file: "06-nairobi",
    title: "Aerial view of Nairobi's skyline at daytime",
    photographer: "Ken Mwaura",
    page: "https://www.pexels.com/photo/skyline-view-of-nairobi-cityscape-at-daytime-29069344/",
    licence: "Pexels License (free for commercial use, no attribution required)",
    verified: "Verified on the photo page at the time of download",
  },
  {
    file: "project-prime-springs",
    title: "Clear blue pool water with sunlight reflections",
    photographer: "Engin Akyurt",
    page: "https://www.pexels.com/photo/close-up-photo-of-clear-water-9399997/",
    licence: "Pexels License (free for commercial use, no attribution required)",
    verified: "Verified on the photo page at the time of download",
  },
  {
    file: "project-kitefold",
    title: "Modern building facade with geometric panels and shadows",
    photographer: "Nadejda Bostanova",
    page: "https://www.pexels.com/photo/modern-architectural-abstract-facade-design-39473722/",
    licence: "Pexels License (free for commercial use, no attribution required)",
    verified: "Verified on the photo page at the time of download",
  },
  {
    file: "project-dustline-300",
    title: "Rows of solar panels in a field under a clear sky",
    photographer: "Mark Stebnicki",
    page: "https://www.pexels.com/photo/solar-panels-on-a-field-15751130/",
    licence: "Pexels License (free for commercial use, no attribution required)",
    verified: "Verified on the photo page at the time of download",
  },
  {
    file: "project-future-objects",
    title: "White tableware objects under dramatic studio lighting",
    photographer: "Anna Pyshniuk",
    page: "https://www.pexels.com/photo/white-tableware-in-a-studio-6083568/",
    licence: "Pexels License (free for commercial use, no attribution required)",
    verified: "Verified on the photo page at the time of download",
  },
];

export function creditsMarkdown(): string {
  const lines: string[] = [
    "# Photo credits",
    "",
    "All photographs on this site come from Pexels and are used under the",
    "Pexels License (free for commercial and personal use, no attribution",
    "required). Attribution is given anyway as good practice.",
    "",
    "Licence text: https://www.pexels.com/license/",
    "",
  ];
  for (const c of PHOTO_CREDITS) {
    lines.push(
      `## ${c.file}`,
      `**Title:** ${c.title}`,
      `**Photographer:** ${c.photographer}`,
      `**Source:** ${c.page}`,
      `**Licence:** ${c.licence}`,
      `**Verification:** ${c.verified}`,
      ""
    );
  }
  return lines.join("\n");
}
