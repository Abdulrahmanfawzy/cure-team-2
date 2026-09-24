const serif = "font-['Georgia',_'Times_New_Roman',serif]";
const sans = "font-['Montserrat',_system-ui,_sans-serif]";
const container = "mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-0";
const primary = "bg-[#0B5CC0] text-white hover:bg-[#0a4fa5]";
const outline = "border border-[#0B5CC0] text-[#0B5CC0] hover:bg-[#0B5CC0]/5";

const company = ["Home", "Doctors", "FAQs", "Contact Us"];
const support = [
  "Help Center",
  "How it works",
  "Privacy Policy",
  "Terms & Conditions",
];

const faqs = [
  [
    "What is this app used for?",
    "Cure helps you find trusted doctors, book appointments, and manage your health from one place.",
  ],
  [
    "Is the app free to use?",
    "Searching for doctors is free. You only pay the consultation price shown on each doctor's card when you book.",
  ],
  [
    "How can I find a doctor?",
    "Search by specialty, doctor name, or location, then open a profile to see availability and reviews.",
  ],
  [
    "Can I cancel my appointment?",
    "Yes. Open your bookings and choose cancel. Refund rules depend on how close the visit is.",
  ],
  [
    "What payment are supported?",
    "Credit and debit cards, Apple Pay, and PayPal.",
  ],
  [
    "How do I edit my profile?",
    "Open your profile from the top right menu, then update your details and save.",
  ],
];

const reviews = [
  {
    quote:
      "Quick and easy booking! I found a great dermatologist near me and booked an appointment in just a few minutes.",
    tone: "bg-emerald-200 text-emerald-600",
  },
  {
    quote:
      "The doctor profiles made it simple to compare options. I had a confirmed slot the same afternoon.",
    tone: "bg-orange-200 text-orange-600",
  },
  {
    quote:
      "Paying online and getting reminders saved me a lot of back and forth. Highly recommended.",
    tone: "bg-sky-200 text-sky-600",
  },
  {
    quote:
      "Great experience from search to visit. I could see real availability and pick what suited me.",
    tone: "bg-neutral-300 text-neutral-600",
  },
  {
    quote:
      "Finding a specialist close to home used to take days. Here it took a couple of taps.",
    tone: "bg-teal-200 text-teal-700",
  },
];

export {
  serif,
  sans,
  container,
  primary,
  outline,
  company,
  support,
  faqs,
  reviews,
};
