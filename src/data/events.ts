// Community events — shown on /community-outreach under "Upcoming events" and
// "Past events", and the next upcoming event with `popup: true` gets the
// site-wide announcement popup until the event is over.
//
// To add an event: add an entry below (newest at the top), put its photos in
// src/assets/events/ and import them here. An event moves from Upcoming to
// Past by itself once `end` has passed (checked at build time and again in
// the visitor's browser, so a stale build never shows an old event as upcoming).
import type { ImageMetadata } from "astro";
import christmasFlyer from "../assets/events/christmas-photoshoot-flyer.jpg";
import xmasDalmatian from "../assets/events/christmas-set-dalmatian.jpg";
import xmasTruckWide from "../assets/events/christmas-set-truck-wide.jpg";
import xmasTeam from "../assets/events/christmas-set-team-dalmatian.jpg";
import xmasTruckSide from "../assets/events/christmas-set-truck-side.jpg";
import xmasCollie from "../assets/events/christmas-set-border-collie.jpg";
import xmasTrees from "../assets/events/christmas-set-trees.jpg";
import xmasDoodle from "../assets/events/christmas-set-doodle.jpg";
import xmasSmallDog from "../assets/events/christmas-set-small-dog.jpg";

export interface CommunityEvent {
  slug: string;
  title: string;
  subtitle?: string;
  /** Local date/time the event starts and ends (ISO, Eastern time offset). */
  start: string;
  end: string;
  /** Human-readable date line, e.g. "Saturday, December 5 | 10 AM–3 PM". */
  when: string;
  where: string;
  summary: string;
  /** Short HTML paragraphs/list for the event's details. */
  details: string[];
  image?: ImageMetadata;
  imageAlt?: string;
  /** Heading over the event's photos, e.g. "Sneak peek" before, "Event photos" after. */
  galleryHeading?: string;
  gallery?: { src: ImageMetadata; alt: string }[];
  /** Show the site-wide announcement popup while this event is upcoming. */
  popup?: boolean;
  /** One-line teaser for the popup (falls back to summary). */
  popupText?: string;
}

export const events: CommunityEvent[] = [
  {
    slug: "christmas-mini-photoshoot-2026",
    title: "Holiday Photos for a Cause",
    subtitle: "Free Family Christmas Mini Photoshoot",
    start: "2026-12-05T10:00:00-05:00",
    end: "2026-12-05T15:00:00-05:00",
    when: "Saturday, December 5 | 10 AM–3 PM",
    where: "Lebanon Small Animal Clinic, 1196 Oregonia Rd, Lebanon, OH",
    summary:
      "A little holiday magic for your family and a little extra love for community pets in need! Join us for our FIRST community Christmas mini photoshoot event.",
    details: [
      "Gather your family, put on your matching pajamas or festive outfits, and make merry memories with our decorated vintage clinic truck!",
      "<strong>Mini photoshoots are FREE!</strong> Bring your camera or phone, and we'll provide someone to take your pictures.",
      "Enjoy hot chocolate and free pet food samples!",
      "Enter our charity raffle featuring <strong>$500 in Texas Roadhouse gift cards</strong> plus other prizes!",
      "Donations are welcome, with donations and raffle proceeds benefiting community pets in need.",
      "Our holiday photo scene is still coming together! The flyer offers a preview of the inspiration. Stay tuned for behind-the-scenes updates and sneak peeks of the actual setup!",
    ],
    image: christmasFlyer,
    imageAlt: "Flyer for the Lebanon Small Animal Clinic Community Christmas Mini Photoshoot, Saturday, December 5, 10 AM to 3 PM",
    galleryHeading: "Sneak peek of our holiday photo set",
    gallery: [
      { src: xmasDalmatian, alt: "Dalmatian sitting in front of the clinic's vintage teal truck decorated with Christmas pillows and blankets" },
      { src: xmasTeam, alt: "Team member kneeling with a Dalmatian at the Christmas truck photo set" },
      { src: xmasCollie, alt: "Black and white dog posing on plaid blankets in front of the decorated truck" },
      { src: xmasDoodle, alt: "Doodle puppy sitting by the Christmas truck with a red Merry pillow" },
      { src: xmasTruckWide, alt: "Dog sitting in the back of the decorated truck with red pillows" },
      { src: xmasSmallDog, alt: "Small dog sitting on a plaid blanket in the truck bed beside a Merry pillow" },
      { src: xmasTruckSide, alt: "Side view of the clinic's teal truck with Christmas trees and wrapped gifts" },
      { src: xmasTrees, alt: "The full holiday photo set with the teal truck, trees, gifts and plaid pillows" },
    ],
    popup: true,
    popupText: "Free mini photoshoots with our decorated vintage clinic truck, hot chocolate, pet food samples and a charity raffle for community pets in need.",
  },
];

export const isPast = (e: CommunityEvent, now = new Date()) => new Date(e.end).getTime() < now.getTime();
