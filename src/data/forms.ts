// Per-client Gravity Forms EMBED SNIPPETS — added 2026-09-21 (audit item
// A1). GravityFormEmbed.astro (§6, §8 of Skeleton-Build-Spec.md) was a
// static placeholder in all 6 places it's used, with no mechanism for a
// client's real form to appear at all.
//
// STAGE 1 (this file): a plain <iframe> pointing at a minimal WordPress
// page that hosts the real form (its shortcode rendered on the WP side,
// where shortcodes actually work) — confirmed as the mechanism for now.
// NOT a raw WordPress shortcode pasted directly: `[gravityform id="1"]`
// (what you'd copy straight out of the GF admin) only renders inside
// WordPress's own PHP pipeline and does nothing on a static Astro site —
// GravityFormEmbed detects that specific mistake and warns instead of
// silently showing broken bracket text.
//
// STAGE 2 (confirmed direction, not yet built): a native Astro-built form
// UI posting straight to the Gravity Forms REST API instead of an iframe —
// matches the client's design exactly instead of inheriting GF's own field
// styling. Tracked in Ideas.md idea #2 (needs a server-side proxy for the
// API consumer key/secret — idea #1's Cloudflare Worker is the natural fit
// — plus real per-client field-mapping work). Do that as its own build, not
// a silent replacement of this file's mechanism.
//
// This component also tolerates a JS-widget <script>-loader snippet, if a
// specific client's setup ever needs one instead of a plain iframe — a
// browser never executes a <script> tag that arrives via innerHTML/
// set:html, only ones created via the DOM API, so GravityFormEmbed
// re-creates and re-runs any script tags it finds. A no-op for the normal
// iframe case; there for the exception, not the rule.
//
// If a client's GF form has reCAPTCHA enabled, it's already part of the
// form itself (GF's own reCAPTCHA field) — it ships for free inside
// whatever snippet is pasted here, nothing extra to wire up in Skeleton for
// that case. (A separate, NOT-Gravity-Forms reCAPTCHA v3 Cloudflare Worker
// for fully custom one-off forms is a different, parked idea — see
// Ideas.md #1 — this file isn't that.)
//
// Key = the same `formId` string each <GravityFormEmbed formId="..."> call
// already uses. Current call sites (Skeleton-Build-Spec.md §8):
//   contact                 — /contact-us
//   appointment-request     — /appointment-request
//   general-information-request — /general-information-request
//   new-patient              — /online-forms
//   contact (again)          — the sitewide contact modal (BaseLayout)
//   reputation-feedback      — ReputationWidget's negative-feedback stage
//
// Leave a key out (or empty) and that form renders GravityFormEmbed's
// placeholder instead — safe to fill these in one at a time during client
// intake, never blocks a build.
// Lebanon Small Animal Clinic forms on onboarding.apexveterinarymarketing.com, duplicated
// 2026-11-09 from the [PRACTICE] templates (803-809) and audited. All notify tech@lebanonsac.com.
//   831 How'd We Do? · 832 New Patient · 833 Appointment Request (unused: booking is Chckup)
//   834 General Request · 835 Boarding Consent (unused: no boarding) · 836 Rx Refill & Food Order (unused)
//   837 Careers
const gfScript = `<script src="//onboarding.apexveterinarymarketing.com/wp-content/plugins/gravity-forms-iframe-master/assets/scripts/gfembed.min.js" type="text/javascript"></script>`;
export const gravityFormEmbeds: Record<string, string> = {
  // General Request Form (834) — /contact-us and the sitewide contact modal.
  contact: `<iframe src="//onboarding.apexveterinarymarketing.com/gfembed/?f=834" title="Contact form" width="100%" height="500" frameBorder="0" class="gfiframe"></iframe>${gfScript}`,
  // How'd We Do? (831) — ReputationWidget's negative-feedback stage.
  "reputation-feedback": `<iframe src="//onboarding.apexveterinarymarketing.com/gfembed/?f=831" title="Feedback form" width="100%" height="500" frameBorder="0" class="gfiframe"></iframe>${gfScript}`,
  // New Patient Form (832) — /online-forms.
  "new-patient": `<iframe src="//onboarding.apexveterinarymarketing.com/gfembed/?f=832" title="New patient form" width="100%" height="500" frameBorder="0" class="gfiframe"></iframe>${gfScript}`,
  // Careers Form (837) — /careers (the old site's "Apply Now" form).
  careers: `<iframe src="//onboarding.apexveterinarymarketing.com/gfembed/?f=837" title="Career application form" width="100%" height="500" frameBorder="0" class="gfiframe"></iframe>${gfScript}`,
};
