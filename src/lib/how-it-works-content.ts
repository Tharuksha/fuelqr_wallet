export type HowItWorksLocale = "en" | "si";

export interface HowItWorksSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface HowItWorksCopy {
  metaDescription: string;
  pageTitle: string;
  pageSubtitle: string;
  languageSwitchLabel: string;
  langEn: string;
  langSi: string;
  lastUpdated: string;
  sections: HowItWorksSection[];
  summaryTitle: string;
  summaryItems: string[];
  ctaTitle: string;
  ctaBody: string;
  ctaCompose: string;
  ctaHome: string;
  footerTagline: string;
}

export const HOW_IT_WORKS_COPY: Record<HowItWorksLocale, HowItWorksCopy> = {
  en: {
    metaDescription:
      "Full guide in English: how Fuel Pass validates QR codes in your browser, builds a Wallet-style preview, and keeps data local until you add a backend.",
    pageTitle: "How Fuel Pass works",
    pageSubtitle:
      "A clear, step-by-step explanation of the site—from QR upload to Apple Wallet–style preview, privacy, and what is not included yet.",
    languageSwitchLabel: "Language",
    langEn: "English",
    langSi: "සිංහල",
    lastUpdated: "This page is available in English and Sinhala. Switch anytime with the toggle above.",
    sections: [
      {
        id: "what",
        heading: "What this site is",
        paragraphs: [
          "Fuel Pass is a focused web app for designing a fuel-related digital pass that looks and feels like an Apple Wallet card. You upload an image that should contain a QR code, the site checks that a real QR is readable, then you fill in details such as title, vehicle, and name. A live preview updates as you type so you can judge spacing, typography, and hierarchy before any backend exists.",
          "The composer lives at /compose. The home page introduces the product; this page explains behavior in detail.",
        ],
      },
      {
        id: "qr",
        heading: "How QR validation works",
        paragraphs: [
          "When you choose an image file, the app reads it entirely in your browser. It draws the image to an off-screen canvas and runs a QR decoder (jsQR) on the pixel data. The decoder looks for the characteristic finder patterns and modules of a QR symbol. If no valid QR is found, the upload is rejected and you see an error—there is no “guess” pass without a readable code.",
          "Images may be scaled down internally for decoding if they are very large, which can help performance while still trying to read the code. If a QR is small, blurry, or low contrast, decoding can fail; use a sharp, well-lit capture when possible.",
        ],
        bullets: [
          "Validation runs locally in your session—no QR image is sent to Fuel Pass for decoding.",
          "Only a successful read unlocks the rest of the composer flow tied to that source.",
        ],
      },
      {
        id: "flow",
        heading: "Composer flow step by step",
        paragraphs: [
          "After a valid QR is detected, you move through a single-screen layout: source on one side (your validated image and QR context) and fields plus preview on the other. Text fields drive the pass preview in real time so you can iterate quickly.",
          "The “Add to Apple Wallet” style button is presented in the preview area as the natural end of the flow. Until you connect a real issuance service, that action is a placeholder for the product story—not a guarantee that a signed .pkpass file is generated on this site.",
        ],
        bullets: [
          "Upload → automatic QR check → edit pass text → watch the preview update instantly.",
          "Nothing requires a login on this demo; state is kept in the page until you refresh or leave.",
        ],
      },
      {
        id: "privacy",
        heading: "Privacy and your data",
        paragraphs: [
          "By design, QR decoding and preview rendering happen in the browser. The app does not send your uploaded image or typed fields to a Fuel Pass server for this demo behavior. If you deploy the project yourself, whoever hosts the site controls network policies—always check the deployment you are using.",
          "Third-party fonts or analytics (if added later) would follow their own policies; the stock experience aims to stay minimal.",
        ],
      },
      {
        id: "wallet",
        heading: "Apple Wallet and the preview",
        paragraphs: [
          "The on-screen card is a visual preview only. A real Apple Wallet pass is a signed .pkpass bundle created with Apple’s PassKit tools, certificates, and often a server that registers devices and pushes updates. Fuel Pass helps you align design and copy with that end state.",
          "Connecting issuance typically means your backend signs passes and serves the “Add to Wallet” entitlement; this repository does not include that server by default.",
        ],
      },
      {
        id: "limits",
        heading: "Limitations you should know",
        paragraphs: [
          "Fuel Pass is not affiliated with Apple Inc. Wallet and PassKit are Apple trademarks. Features depend on the code in this project and may change as the app evolves.",
          "Sinhala and English explanations are provided on this how-it-works page; other screens may be English-only unless extended later.",
        ],
      },
    ],
    summaryTitle: "Quick summary",
    summaryItems: [
      "QR must decode in-browser or the flow stops.",
      "Preview is live and local-first.",
      "Real Wallet passes need signing and infrastructure beyond the preview UI.",
    ],
    ctaTitle: "Try the composer",
    ctaBody:
      "Put the explanation into practice: open the studio, validate a QR, and shape your pass.",
    ctaCompose: "Open composer",
    ctaHome: "Back to home",
    footerTagline:
      "How it works · English & Sinhala · Local-first QR preview",
  },
  si: {
    metaDescription:
      "සම්පූර්ණ මාර්ගෝපදේශය: Fuel Pass වෙබ් අඩවිය QR කේත සත්‍යාපනය, Apple Wallet පෙරදසුන සහ ඔබේ රහස්‍යතාව ක්‍රියාත්මක වන ආකාරය.",
    pageTitle: "Fuel Pass වෙබ් අඩවිය ක්‍රියා කරන්නේ කෙසේද",
    pageSubtitle:
      "QR රූපයක් උඩුගත කිරීමේ සිට Apple Wallet ආකාරයේ පෙරදසුන දක්වා—රහස්‍යතාව, පියවර සහ තවමත් නොමැති දේවල් පැහැදිලිව.",
    languageSwitchLabel: "භාෂාව",
    langEn: "English",
    langSi: "සිංහල",
    lastUpdated:
      "මෙම පිටුව ඉංග්‍රීසි සහ සිංහල භාෂාවෙන් ලබා දී ඇත. ඉහළ ඇති මාරු බොත්තමෙන් ඕනෑම වේලාවක මාරු වන්න.",
    sections: [
      {
        id: "what",
        heading: "මෙම වෙබ් අඩවිය කුමක් ද",
        paragraphs: [
          "Fuel Pass යනු ඉන්ධන සම්බන්ධ ඩිජිටල් පාස් එකක් Apple Wallet කාඩ්පතකට සමානව නිර්මාණය කිරීමට උපකාරී වන වෙබ් යෙදුමකි. ඔබ QR කේතයක් අඩංගු විය යුතු රූපයක් උඩුගත කරන අතර, වෙබ් අඩවිය එම කේතය කියවිය හැකි තත්ත්වයේ ද යන්න පරීක්ෂා කරයි. ඉන්පසු මාතෘකාව, වාහන විස්තර, නම වැනි තොරතුරු ඇතුළත් කරන්න. ඔබ ටයිප් කරන සැම විටම සජීව පෙරදසුනක් යාවත්කාලීන වන අතර, පසුබිම් සේවාදායකයක් එකතු කිරීමට පෙර අකුරු, ඉඩ සහ ව්‍යුහය තීරණය කිරීමට උපකාරී වේ.",
          "නිර්මාණ ක්‍රියාවලිය /compose මගින් ලබා ගනී. මුල් පිටුව නිෂ්පාදනය හඳුන්වා දෙයි; මෙම පිටුව විස්තරාත්මකව ක්‍රියා පටිපාටි පැහැදිලි කරයි.",
        ],
      },
      {
        id: "qr",
        heading: "QR කේත සත්‍යාපනය ක්‍රියාත්මක වන ආකාරය",
        paragraphs: [
          "ඔබ රූප ගොනුවක් තෝරා ගත් විට, යෙදුම එය සම්පූර්ණයෙන්ම ඔබේ බ්‍රව්සරය තුළ කියවයි. රූපය නොපෙනෙන canvas එකකට ඇඳ, පික්සල දත්ත මත jsQR යන QR විකේතකය ධාවනය වේ. විකේතකය QR සංකේතයේ සාමාන්‍ය සොයාගැනීමේ රටා සහ මොඩියුල සොයයි. වලංගු QR කේතයක් හමු නොවුවහොත් උඩුගත කිරීම ප්‍රතික්ෂේප වන අතර දෝෂ සංදේශයක් දිස් වේ—කියවිය හැකි කේතයක් නොමැතිව “අනුමාන” අනුමැතියක් නොමැත.",
          "රූප බොහෝ විශාල නම් අභ්‍යන්තරව ප්‍රමාණය අඩු කර විකේතනයට යොදා ගත හැකි අතර, කේතය කියවීමට තවමත් උත්සාහ කරමින් කාර්ය සාධනයට උපකාරී වේ. QR කුඩා, අඳුරු හෝ පැහැදිලි නොවේ නම් විකේතනය අසාර්ථක විය හැක; හැකි තරම් තියුණු, හොඳ ආලෝකය යට රූපයක් භාවිතා කරන්න.",
        ],
        bullets: [
          "සත්‍යාපනය ඔබේ සැසිය තුළ දේශීයව ධාවනය වේ—QR රූපය Fuel Pass සේවාදායකයකට යැවීමෙන් විකේතනය නොකෙරේ.",
          "සාර්ථක කියවීමකින් පසුව පමණක් එම මූලාශ්‍රයට බැඳුණු නිර්මාණකරණ පියවර ඉදිරියට යයි.",
        ],
      },
      {
        id: "flow",
        heading: "නිර්මාණකරණ පියවර පිළිවෙලෙන්",
        paragraphs: [
          "වලංගු QR කේතයක් හමු වූ පසු, එක් තිර පිරිසැලසුමකින් ඉදිරියට යයි: එක් පැත්තක මූලාශ්‍රය (සත්‍යාපිත රූපය සහ QR සන්දර්භය) සහ අනෙක් පැත්තේ ක්ෂේත්‍ර සහ පෙරදසුන. පෙළ ක්ෂේත්‍ර පාස් පෙරදසුන සජීවයෙන් යාවත්කාලීන කරන අතර ඉක්මනින් නැවත නැවත වෙනස් කිරීමට ඉඩ සලසයි.",
          "“Add to Apple Wallet” ආකාරයේ බොත්තම පෙරදසුනේ ප්‍රදේශයේ ස්වභාවික අවසානය ලෙස දක්වයි. සැබෑ නිකුත් කිරීමේ සේවාවක් සම්බන්ධ කර නොමැති තෙක්, එම ක්‍රියාව නිෂ්පාදන කථාව සඳහා ස්ථාන දරන්නියකි—මෙම වෙබ් අඩවියේ අත්සන් කළ .pkpass ගොනුවක් උත්පාදනය වන බවට වගකීමක් නොවේ.",
        ],
        bullets: [
          "උඩුගත කිරීම → ස්වයංක්‍රීය QR පරීක්ෂාව → පාස් පෙළ සංස්කරණය → පෙරදසුන ක්ෂණිකව යාවත්කාලීන වීම.",
          "මෙම ආදර්ශනය සඳහා පිවිසුම අවශ්‍ය නොවේ; තත්ත්වය පිටුව නැවත යෑම හෝ පිටවීම දක්වා පවතී.",
        ],
      },
      {
        id: "privacy",
        heading: "රහස්‍යතාව සහ ඔබේ දත්ත",
        paragraphs: [
          "සැලසුම අනුව QR විකේතනය සහ පෙරදසුන ඇඳීම බ්‍රව්සරය තුළ සිදු වේ. මෙම ආදර්ශන හැසිරීම සඳහා ඔබ උඩුගත කරන රූපය හෝ ටයිප් කරන ක්ෂේත්‍ර Fuel Pass සේවාදායකයකට යැවීමට යෙදුම සැලසුම් කර නොමැත. ඔබ මෙම ව්‍යාපෘතිය ස්වයංව යොදවන්නේ නම්, වෙබ් අඩවිය ධාරණය කරන පාර්ශ්වය ජාල ප්‍රතිපත්ති පාලනය කරයි—ඔබ භාවිතා කරන යොදවීම සැමවිටම පරීක්ෂා කරන්න.",
          "තෙවන පාර්ශ්ව අකුරු හෝ විශ්ලේෂණ (පසුව එකතු කළහොත්) ඔවුන්ගේම ප්‍රතිපත්ති අනුගමනය කරයි; මූලික අත්දැකීම අවමව තබා ගැනීමට උත්සාහ කෙරේ.",
        ],
      },
      {
        id: "wallet",
        heading: "Apple Wallet සහ පෙරදසුන",
        paragraphs: [
          "තිරය මත කාඩ්පත චිත්‍රමය පෙරදසුනක් පමණි. සැබෑ Apple Wallet පාස් එකක් Apple හි PassKit මෙවලම්, සහතික සහ බොහෝ විට උපාංග ලියාපදිංචි කර යාවත්කාලීන කිරීම් තල්ලු කරන සේවාදායකයක් සමඟ නිර්මාණය වේ. Fuel Pass එම අවසාන තත්ත්වයට ගැලපෙන නිර්මාණය සහ පෙළ සකස් කිරීමට උපකාරී වේ.",
          "නිකුත් කිරීම සම්බන්ධ කිරීම සාමාන්‍යයෙන් ඔබේ පසුබිම් සේවාදායකය පාස් අත්සන් කර “Wallet වෙත එකතු කිරීම” සඳහා වන අයිතිවාසිකම් සපයන තෙක් යයි; මෙම කේත සංචිතයෙහි පෙරනිමියෙන් එම සේවාදායකය අඩංගු නොවේ.",
        ],
      },
      {
        id: "limits",
        heading: "ඔබ දැන සිටිය යුතු සීමාවන්",
        paragraphs: [
          "Fuel Pass යනු Apple Inc. සමඟ අනුබද්ධ නොවේ. Wallet සහ PassKit යනු Apple වෙළඳ ලකුණු වේ. විශේෂාංග මෙම ව්‍යාපෘතියේ කේතය මත රඳා පවතින අතර යෙදුම වෙනස් වන විට වෙනස් විය හැක.",
          "සිංහල සහ ඉංග්‍රීසි පැහැදිලි කිරීම් මෙම “කෙසේද” පිටුවේ ලබා දෙයි; අනෙක් තිර ඉංග්‍රීසි පමණක් විය හැක, ඉදිරියට දීර්ඝ කිරීමෙන් පසුව දෙභාෂා විය හැක.",
        ],
      },
    ],
    summaryTitle: "කෙටි සාරාංශය",
    summaryItems: [
      "QR කේතය බ්‍රව්සරය තුළ විකේතනය නොවුවහොත් පියවර නවතයි.",
      "පෙරදසුන සජීව සහ දේශීය-ප්‍රථම (local-first) ය.",
      "සැබෑ Wallet පාස් සඳහා පෙරදසුනෙන් ඔබ්බට අත්සන් කිරීම සහ යටිතල පහසුකම් අවශ්‍ය වේ.",
    ],
    ctaTitle: "නිර්මාණකරණය උත්සාහ කරන්න",
    ctaBody:
      "පැහැදිලි කිරීම ප්‍රායෝගිකව උත්සාහ කරන්න: ස්ටුඩියෝව විවෘත කර QR සත්‍යාපනය කර ඔබේ පාස් හැඩතල ගන්න.",
    ctaCompose: "නිර්මාණකරණය විවෘත කරන්න",
    ctaHome: "මුල් පිටුවට",
    footerTagline:
      "කෙසේද · ඉංග්‍රීසි සහ සිංහල · දේශීය-ප්‍රථම QR පෙරදසුන",
  },
};

export function getHowItWorksCopy(locale: HowItWorksLocale): HowItWorksCopy {
  return HOW_IT_WORKS_COPY[locale];
}
