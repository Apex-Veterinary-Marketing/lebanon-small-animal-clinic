// Site-wide config — NOT a content collection. Webflow models this as two
// CMS collections (Practice Information, Practice Social Links) but both
// are effectively singletons, not repeatable content. See
// Skeleton-Build-Spec.md §4.2. Per-client values get filled in here (or in
// a sibling .json this module imports) during client intake.
//
// NOTE (2026-09-08): direct social-profile links used to live here as a
// plain array (`socialLinks`). They're now their own real content
// collection (src/content/social-links/, accessed via
// getAllSocialLinks()) so each platform's icon renders from the inline-SVG
// library in src/lib/icons/social.ts instead of a name string — see
// content.config.ts. googleReviewsLink/facebookReviewsLink/yelpReviewLink
// below are a different thing (review-platform CTA links used by
// ReputationWidget), unaffected by that move.

export interface SiteInfo {
  practiceName: string;
  // The number SHOWN everywhere. Every tel: link dials callTrackingNumber when
  // set, else this — always build links with phoneHref() from
  // src/lib/utils/phone.ts, never by hand (check:links enforces one number).
  phoneNumber?: string;
  callTrackingNumber?: string; // e.g. "+18635914728" — dialed, never displayed
  email?: string;
  address?: string; // street line — see showStreetAddress
  addressLine2?: string; // "City, ST 00000"
  addressLocality?: string; // city, for the schema PostalAddress
  addressRegion?: string; // state, e.g. "FL"
  postalCode?: string;
  addressLink?: string;
  // Publish the street address? Defaults to true, or to FALSE when mobileVet
  // is true (a mobile/home-based business usually works from a private home).
  // When false, getSiteInfo() drops address, addressLink and mapEmbedLink, so
  // no component, page or schema node can leak it; city/ZIP stay.
  // Confirm with the client at intake — never publish a home address by default.
  showStreetAddress?: boolean;
  mobileVet?: boolean;
  serviceAreaOfCoverage?: string; // comma-separated cities; becomes schema areaServed
  // Primary booking action — every "book" CTA (header button, service pages'
  // closing block, CTA bands) reads these instead of hard-coding a route.
  bookingUrl?: string;
  bookingLabel?: string;
  businessDescription?: string; // one or two plain sentences for the schema Business node
  // Machine-readable hours for schema (hours above is display HTML), e.g.
  // [{ dayOfWeek: ["Monday","Tuesday"], opens: "08:00", closes: "18:00" }]
  openingHoursSpecification?: { dayOfWeek: string[]; opens: string; closes: string }[];
  hours?: string; // rich text/HTML — formatted hours table, not a plain string
  afterHours?: string; // rich text/HTML
  mapEmbedLink?: string;
  googleReviewsLink?: string;
  facebookReviewsLink?: string;
  yelpReviewLink?: string;
  googleRating?: number; // static fallback shown until googleWidgetId is configured
  googleReviewCount?: number;
  logoColor?: string; // asset path
  logoWhite?: string; // asset path
  footerAbout?: string; // ~160-char practice blurb, Footer's About Us column
  cityState?: string; // "[CITY, ST]" display string
  googleWidgetId?: string;
  // UserWay accessibility-widget account id. Optional override only — leave
  // unset to use the agency's own company-wide account (E6izlREqK3, baked
  // into AccessibilityWidget.astro as the default); set this only if a
  // specific client needs their own separate UserWay account.
  userwayAccountId?: string;
  url?: string; // site's canonical origin, e.g. "https://example.com" — the SINGLE
  // place the domain is configured. astro.config.mjs imports this file directly
  // and sets Astro's `site` from this field, so canonical URLs, OG/Twitter tags,
  // and the sitemap all derive from it automatically — never hard-code the
  // domain anywhere else. MUST be the real production domain (no trailing
  // slash) before launch, or canonical/sitemap URLs will point at the
  // placeholder below.
  // Schema.org @type for the site-wide Business node (see Skeleton-Build-Spec.md
  // §9/§14 item 8). Set it from intake — defaults to "VeterinaryCare", but a
  // non-clinic client (trainer, groomer, boarding) is NOT VeterinaryCare:
  // use e.g. ["LocalBusiness", "ProfessionalService"]. A mobile business
  // also sets mobileVet + serviceAreaOfCoverage (→ areaServed).
  businessSchemaType?: string | string[];
  // Google tag IDs (gtag.js). Loaded only on trackingHosts, so local and
  // preview visits never reach the client's analytics.
  ga4Id?: string; // e.g. "G-XXXXXXXXXX"
  googleAdsId?: string; // e.g. "AW-1234567890"
  trackingHosts?: string[]; // hostnames that load the tags, e.g. ["example.com", "www.example.com"]
  // Chckup (Chckvet) chat widget id from the client's current site.
  chckupWidgetId?: string;
}

// Placeholder example data — replace during client intake. Kept non-empty
// so components/pages have something real to render while the skeleton is
// being built and reviewed.
export const siteInfo: SiteInfo = {
  practiceName: "Lebanon Small Animal Clinic",
  phoneNumber: "(513) 932-4189",
  // Twilio call-tracking number (from the PM, 2026-11-10): every tel: link dials it; the shown number stays (513) 932-4189.
  callTrackingNumber: "+15139353641",
  email: "LSAC@lebanonsac.com",
  address: "1196 Oregonia Rd",
  addressLine2: "Lebanon, OH 45036",
  addressLocality: "Lebanon",
  addressRegion: "OH",
  postalCode: "45036",
  addressLink: "https://maps.app.goo.gl/TxFEo1Ak72UXjsUX8",
  // The client's own embed from their current Directions page.
  mapEmbedLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6163.0225042906495!2d-84.184409!3d39.435175199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8840f3f792d98e99%3A0x578bd3728f26246a!2s1196%20Oregonia%20Rd%2C%20Lebanon%2C%20OH%2045036!5e0!3m2!1sen!2sus!4v1743518215301!5m2!1sen!2sus",
  bookingUrl: "https://portal.chckup.app/book/lebanon-small-animal-clinic?id=b3685bcc-df07-4c83-ac23-e05c688582ff",
  bookingLabel: "Book an Appointment",
  cityState: "Lebanon, OH",
  serviceAreaOfCoverage:
    "Lebanon, Mason, Maineville, West Chester, Waynesville, Springboro, South Lebanon, Centerville, Loveland, Middletown",
  businessDescription:
    "Lebanon Small Animal Clinic is a Fear Free-focused veterinary clinic in Lebanon, Ohio, offering wellness care, same-day urgent care, surgery and dentistry for dogs, cats, exotics and farm animals.",
  hours:
    "<p>Mon&ndash;Fri: 8am&ndash;6pm<br>Sat: 8am&ndash;12pm, by appointment (please call for availability)<br>Sun: Closed</p>",
  // After-hours phone line times, from the current Contact Us page.
  afterHours: "<p>After-hours phone available until 7pm Mon&ndash;Fri and until 4pm on Saturdays.</p>",
  openingHoursSpecification: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
  ],
  footerAbout:
    "Small-town heart, big-city care: Lebanon Small Animal Clinic treats dogs, cats, exotics and farm animals in Lebanon, OH, with Fear Free visits and urgent care.",
  // Google Business Profile Place ID (from the PM, 2026-11-10): review link + reviews widget.
  googleReviewsLink: "https://search.google.com/local/writereview?placeid=ChIJObjz8vfzQIgRSzUg8LNSZXY",
  googleWidgetId: "ChIJObjz8vfzQIgRSzUg8LNSZXY",
  facebookReviewsLink: "https://www.facebook.com/LebanonSmallAnimalClinic/reviews",
  url: "https://www.lebanonsac.com", // confirm apex vs www before launch
  // GA4 property from the client's current site (lebanonsac.com, read 2026-11-09).
  ga4Id: "G-181W4YXPT3",
  trackingHosts: ["lebanonsac.com", "www.lebanonsac.com"],
  chckupWidgetId: "9b06768e-2842-4788-a71e-9636318c5ca8",
  logoWhite: "/logo-white.png",
  logoColor: "/logo-color.png",
};
