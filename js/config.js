/**
 * Automotive Audit & Consulting - Central Company Configuration
 * Single source of truth for company contact details, branding, Email alerts & WhatsApp integration.
 * 
 * =========================================================================
 * SETUP INSTRUCTIONS (ASAN HINDI & ENGLISH GUIDE):
 * =========================================================================
 * 1. APNA EMAIL: 'email' me apna email dalein (jahan aapko client ki enquiry chahiye).
 * 2. APNA WHATSAPP: 'whatsapp' me apna mobile number dalein (country code ke sath, bina '+' ke, e.g. 919876543210).
 * 3. APNA PHONE: 'phone' aur 'phoneDisplay' me call ke liye number dalein.
 * 4. CORPORATE ADDRESS: 'address' aur 'city' me apna office address aur city set karein.
 * 5. (OPTIONAL) DIRECT GMAIL INBOX KEY: Agar bina backend ke direct Gmail me email chahiye,
 *    toh https://web3forms.com par apna email dal kar free key lein aur 'web3FormsAccessKey' me paste karein.
 * =========================================================================
 */

const COMPANY = {
  name: "ASAC - AFTER-SALES AUDIT CONSULTING",
  shortName: "ASAC",
  tagline: "Audit • Analyze • Improve",
  subTagline: "After-Sales Risk Management & Revenue Advisory",

  // =========================================================================
  // 1. RECEIVE LEADS ON EMAIL (Yahan apna email address dalein)
  // =========================================================================
  email: "audit-enquiry@yourdomain.com",       // e.g. "contact@yourcompany.com" or "yourname@gmail.com"

  // =========================================================================
  // 2. RECEIVE LEADS ON WHATSAPP (Yahan apna WhatsApp mobile number dalein)
  // Format: International format without '+' (Jaise India ke liye 91XXXXXXXXXX)
  // =========================================================================
  whatsapp: "910000000000",                   // e.g. "919876543210"
  whatsappDisplay: "+91 (0) 0000-000000",     // Website text me show hone wala number

  // =========================================================================
  // 3. VOICE CALLING PHONE NUMBER
  // =========================================================================
  phone: "+91 00000 00000",                   // Phone calls ke liye number
  phoneDisplay: "+91 (0) 0000-000000",        // Phone display text

  // =========================================================================
  // 4. OPTIONAL: DIRECT GMAIL INBOX DELIVERY KEY (Web3Forms)
  // Free access key lene ke liye https://web3forms.com par apna email dalein
  // Key milte hi yahan paste kar dein:
  // =========================================================================
  web3FormsAccessKey: "",                     // e.g. "a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

  // =========================================================================
  // 5. CORPORATE OFFICE & HEADQUARTERS DETAILS (Neutral Editable Placeholders)
  // =========================================================================
  address: "[Corporate Address Placeholder, Automotive Consulting Hub, City, PIN, India]",
  city: "[Corporate Office City, State]",
  workingHours: "Monday – Saturday: 9:30 AM – 6:30 PM IST",
  website: "https://yourdomain.com",
  logo: "assets/icons/logo.svg",
  favicon: "assets/icons/favicon.svg"
};

// Make COMPANY globally available
window.COMPANY = COMPANY;

// Auto-sync company config into designated HTML elements
document.addEventListener('DOMContentLoaded', () => {
  // Sync company name
  document.querySelectorAll('[data-company="name"]').forEach(el => {
    el.textContent = COMPANY.name;
  });

  // Sync company short name
  document.querySelectorAll('[data-company="shortName"]').forEach(el => {
    el.textContent = COMPANY.shortName;
  });

  // Sync phone links and text
  document.querySelectorAll('[data-company="phone"]').forEach(el => {
    el.textContent = COMPANY.phoneDisplay;
    if (el.tagName === 'A') {
      el.setAttribute('href', `tel:${COMPANY.phone.replace(/[\s()-]/g, '')}`);
    }
  });

  // Sync email links and text
  document.querySelectorAll('[data-company="email"]').forEach(el => {
    el.textContent = COMPANY.email;
    if (el.tagName === 'A') {
      el.setAttribute('href', `mailto:${COMPANY.email}`);
    }
  });

  // Sync address text
  document.querySelectorAll('[data-company="address"]').forEach(el => {
    el.textContent = COMPANY.address;
  });

  // Sync city text
  document.querySelectorAll('[data-company="city"]').forEach(el => {
    el.textContent = COMPANY.city;
  });

  // Sync working hours text
  document.querySelectorAll('[data-company="workingHours"]').forEach(el => {
    el.textContent = COMPANY.workingHours;
  });

  // Sync WhatsApp links and buttons
  document.querySelectorAll('[data-company="whatsapp-link"], [data-company="whatsapp-float"]').forEach(el => {
    const text = encodeURIComponent("Hello, I would like to schedule a Confidential After-Sales Audit Review for our dealership network.");
    el.setAttribute('href', `https://wa.me/${COMPANY.whatsapp}?text=${text}`);
  });
});
