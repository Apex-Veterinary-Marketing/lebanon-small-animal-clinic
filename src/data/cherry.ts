// The client's Cherry payment-plan account, exactly as their live
// /cherry-payments/ page passes it to _hw("init") (lebanonsac.com, read
// 2026-11-09). Used by CherryWidget.astro on /payment-options.
export const cherryAccount = {
  slug: "lebanon-small-animal-clinic",
  name: "Lebanon Small Animal Clinic",
  images: [36],
  customLogo: "",
  defaultPurchaseAmount: 750,
  customImage: "",
  imageCategory: "veterinary",
  language: "en",
};
