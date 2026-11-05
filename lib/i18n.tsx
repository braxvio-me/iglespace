"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const languages = ["English", "Français", "Swahili", "العربية", "Português", "Twi"] as const;
export type Language = (typeof languages)[number];
type Key = keyof typeof translations.English;
const languageAliases: Record<string, Language> = {
  en: "English",
  English: "English",
  fr: "Français",
  French: "Français",
  Français: "Français",
  sw: "Swahili",
  Swahili: "Swahili",
  ar: "العربية",
  Arabic: "العربية",
  العربية: "العربية",
  pt: "Português",
  Portuguese: "Português",
  Português: "Português",
  ak: "Twi",
  Twi: "Twi",
};

const translations = {
  English: {
    programme: "The programme", opportunities: "Opportunities", about: "About us", contributors: "Meet contributors", community: "Community", partner: "Become a partner", signIn: "Sign in", apply: "Apply now", join: "Join the programme", partnerWithUs: "Partner with us", heroEyebrow: "Youth Mentorship Program · 2026–2027", heroTitle: "Skills for the future. People for the journey.", heroText: "IGLE_SPACE equips young people across Africa with relevant employability, digital and entrepreneurial skills — then connects learning to mentors, practical work and real opportunities.", proof: "Building a generation", proofStrong: "ready to contribute and lead.", imageNote: "Make room", imageNoteStrong: "for what's next.", realPeople: "Real people.", realProgress: "Real progress.", footerText: "Equipping young people with the skills, confidence and connections to contribute and lead.",
  },
  Français: {
    programme: "Le programme", opportunities: "Opportunités", about: "À propos", contributors: "Nos contributeurs", community: "Communauté", partner: "Devenir partenaire", signIn: "Se connecter", apply: "Postuler", join: "Rejoindre le programme", partnerWithUs: "Devenir partenaire", heroEyebrow: "Programme de mentorat des jeunes · 2026–2027", heroTitle: "Des compétences pour l'avenir. Des personnes pour le chemin.", heroText: "IGLE_SPACE donne aux jeunes d'Afrique des compétences utiles en employabilité, numérique et entrepreneuriat, puis relie l'apprentissage aux mentors, à la pratique et aux opportunités.", proof: "Construire une génération", proofStrong: "prête à contribuer et à diriger.", imageNote: "Faites place", imageNoteStrong: "à la prochaine étape.", realPeople: "De vraies personnes.", realProgress: "De vrais progrès.", footerText: "Donner aux jeunes les compétences, la confiance et les relations pour contribuer et diriger.",
  },
  Swahili: {
    programme: "Mpango", opportunities: "Fursa", about: "Kuhusu sisi", contributors: "Kutana na wachangiaji", community: "Jumuiya", partner: "Kuwa mshirika", signIn: "Ingia", apply: "Omba sasa", join: "Jiunge na mpango", partnerWithUs: "Shirikiana nasi", heroEyebrow: "Mpango wa Ushauri kwa Vijana · 2026–2027", heroTitle: "Ujuzi wa kesho. Watu kwa safari.", heroText: "IGLE_SPACE huwapa vijana kote Afrika ujuzi wa ajira, kidijitali na ujasiriamali, kisha huunganisha kujifunza na washauri, kazi ya vitendo na fursa halisi.", proof: "Kujenga kizazi", proofStrong: "kilicho tayari kuchangia na kuongoza.", imageNote: "Tengeneza nafasi", imageNoteStrong: "kwa kinachofuata.", realPeople: "Watu halisi.", realProgress: "Maendeleo halisi.", footerText: "Kuwapa vijana ujuzi, kujiamini na mahusiano ya kuchangia na kuongoza.",
  },
  العربية: {
    programme: "البرنامج", opportunities: "الفرص", about: "من نحن", contributors: "تعرّف على المساهمين", community: "المجتمع", partner: "كن شريكًا", signIn: "تسجيل الدخول", apply: "قدّم الآن", join: "انضم إلى البرنامج", partnerWithUs: "شاركنا", heroEyebrow: "برنامج إرشاد الشباب · 2026–2027", heroTitle: "مهارات المستقبل. وأشخاص يرافقونك في الرحلة.", heroText: "تزوّد IGLE_SPACE الشباب في أفريقيا بمهارات العمل والمهارات الرقمية وريادة الأعمال، ثم تربط التعلم بالمرشدين والعمل العملي والفرص الحقيقية.", proof: "نبني جيلًا", proofStrong: "مستعدًا للمساهمة والقيادة.", imageNote: "اترك مساحة", imageNoteStrong: "لما هو قادم.", realPeople: "أشخاص حقيقيون.", realProgress: "تقدم حقيقي.", footerText: "تمكين الشباب بالمهارات والثقة والعلاقات للمساهمة والقيادة.",
  },
  Português: {
    programme: "O programa", opportunities: "Oportunidades", about: "Sobre nós", contributors: "Conheça os colaboradores", community: "Comunidade", partner: "Seja parceiro", signIn: "Entrar", apply: "Candidate-se", join: "Participar do programa", partnerWithUs: "Seja nosso parceiro", heroEyebrow: "Programa de Mentoria para Jovens · 2026–2027", heroTitle: "Habilidades para o futuro. Pessoas para a jornada.", heroText: "A IGLE_SPACE equipa jovens em África com competências de empregabilidade, digitais e empreendedoras, ligando depois a aprendizagem a mentores, trabalho prático e oportunidades reais.", proof: "Construindo uma geração", proofStrong: "pronta para contribuir e liderar.", imageNote: "Abra espaço", imageNoteStrong: "para o que vem a seguir.", realPeople: "Pessoas reais.", realProgress: "Progresso real.", footerText: "Equipar jovens com competências, confiança e ligações para contribuir e liderar.",
  },
  Twi: {
    programme: "Dwumadie no", opportunities: "Akwannya", about: "Yɛn ho asɛm", contributors: "Hyia wɔn a wɔboa", community: "Nkabom", partner: "Yɛ ɔyɔnko", signIn: "Kɔ mu", apply: "Fa wo ho ka ho", join: "Ka dwumadie no ho", partnerWithUs: "Yɛ yɛn yɔnko", heroEyebrow: "Mmabun Afotu Dwumadie · 2026–2027", heroTitle: "Akyɛdeɛ ma daakye. Nnipa ma akwantuo.", heroText: "IGLE_SPACE ma mmabun a wɔwɔ Afrika nimdeɛ a wɔhia wɔ adwuma, dijitaal ne adwumayɛ mu, na ɛde adesua no bɔ afotufoɔ, adwuma ne akwannya ankasa ho.", proof: "Yɛrenya awoɔ ntoatoasoɔ", proofStrong: "a wɔasiesie sɛ wɔbɛboa na wɔadi anim.", imageNote: "Ma kwan", imageNoteStrong: "ma nea ɛreba.", realPeople: "Nnipa ankasa.", realProgress: "Nkɔsoɔ ankasa.", footerText: "Yɛma mmabun nimdeɛ, ahotosoɔ ne nkitahodie ma wɔboa na wɔdi anim.",
  },
} satisfies Record<Language, Record<string, string>>;

const wordTranslations: Record<Exclude<Language, "English">, Record<string, string>> = {
  Français: {
    "Overview": "Vue d’ensemble", "Dashboard": "Tableau de bord", "Your": "Votre", "My": "Mes", "Sessions": "Sessions", "Goals": "Objectifs", "Progress": "Progrès", "Messages": "Messages", "Applications": "Candidatures", "Participants": "Participants", "Reports": "Rapports", "Availability": "Disponibilités", "Requests": "Demandes", "Sign out": "Se déconnecter", "Back to site": "Retour au site", "Find a mentor": "Trouver un mentor", "Book a session": "Réserver une session", "Assessments": "Évaluations", "Impact reports": "Rapports d’impact", "Available": "Disponible", "Confirmed": "Confirmé", "Save": "Enregistrer", "Submit": "Envoyer", "Close": "Fermer", "Done": "Terminé", "Learn more": "En savoir plus", "View profile": "Voir le profil", "Request connection": "Demander une connexion", "Search": "Rechercher", "No contributors found": "Aucun contributeur trouvé", "Clear filters": "Effacer les filtres", "Programme": "Programme", "Mentor": "Mentor", "Participant": "Participant", "Admin": "Administrateur", "with": "avec", "and": "et", "or": "ou", "Our": "Notre", "About": "À propos", "Build": "Construire", "Join": "Rejoindre", "Next": "Suivant", "Back": "Retour",
  },
  Swahili: {
    "Overview": "Muhtasari", "Dashboard": "Dashibodi", "Your": "Yako", "My": "Yangu", "Sessions": "Vipindi", "Goals": "Malengo", "Progress": "Maendeleo", "Messages": "Ujumbe", "Applications": "Maombi", "Participants": "Washiriki", "Reports": "Ripoti", "Availability": "Upatikanaji", "Requests": "Maombi", "Sign out": "Ondoka", "Back to site": "Rudi kwenye tovuti", "Find a mentor": "Tafuta mshauri", "Book a session": "Weka kipindi", "Assessments": "Tathmini", "Impact reports": "Ripoti za athari", "Available": "Anapatikana", "Confirmed": "Imethibitishwa", "Save": "Hifadhi", "Submit": "Tuma", "Close": "Funga", "Done": "Imekamilika", "Learn more": "Jifunze zaidi", "View profile": "Tazama wasifu", "Request connection": "Omba uhusiano", "Search": "Tafuta", "No contributors found": "Hakuna wachangiaji", "Clear filters": "Futa vichujio", "Programme": "Mpango", "Mentor": "Mshauri", "Participant": "Mshiriki", "Admin": "Msimamizi", "with": "na", "and": "na", "or": "au", "Our": "Yetu", "About": "Kuhusu", "Build": "Jenga", "Join": "Jiunge", "Next": "Inayofuata", "Back": "Rudi",
  },
  العربية: {
    "Overview": "نظرة عامة", "Dashboard": "لوحة التحكم", "Your": "الخاص بك", "My": "الخاص بي", "Sessions": "الجلسات", "Goals": "الأهداف", "Progress": "التقدم", "Messages": "الرسائل", "Applications": "الطلبات", "Participants": "المشاركون", "Reports": "التقارير", "Availability": "التوفر", "Requests": "الطلبات", "Sign out": "تسجيل الخروج", "Back to site": "العودة إلى الموقع", "Find a mentor": "ابحث عن مرشد", "Book a session": "احجز جلسة", "Assessments": "التقييمات", "Impact reports": "تقارير الأثر", "Available": "متاح", "Confirmed": "مؤكد", "Save": "حفظ", "Submit": "إرسال", "Close": "إغلاق", "Done": "تم", "Learn more": "اعرف المزيد", "View profile": "عرض الملف", "Request connection": "طلب اتصال", "Search": "بحث", "No contributors found": "لم يتم العثور على مساهمين", "Clear filters": "مسح عوامل التصفية", "Programme": "البرنامج", "Mentor": "مرشد", "Participant": "مشارك", "Admin": "مسؤول", "with": "مع", "and": "و", "or": "أو", "Our": "نا", "About": "حول", "Build": "ابنِ", "Join": "انضم", "Next": "التالي", "Back": "رجوع",
  },
  Português: {
    "Overview": "Visão geral", "Dashboard": "Painel", "Your": "Seu", "My": "Meus", "Sessions": "Sessões", "Goals": "Metas", "Progress": "Progresso", "Messages": "Mensagens", "Applications": "Candidaturas", "Participants": "Participantes", "Reports": "Relatórios", "Availability": "Disponibilidade", "Requests": "Pedidos", "Sign out": "Sair", "Back to site": "Voltar ao site", "Find a mentor": "Encontrar um mentor", "Book a session": "Marcar uma sessão", "Assessments": "Avaliações", "Impact reports": "Relatórios de impacto", "Available": "Disponível", "Confirmed": "Confirmado", "Save": "Guardar", "Submit": "Enviar", "Close": "Fechar", "Done": "Concluído", "Learn more": "Saiba mais", "View profile": "Ver perfil", "Request connection": "Pedir ligação", "Search": "Pesquisar", "No contributors found": "Nenhum colaborador encontrado", "Clear filters": "Limpar filtros", "Programme": "Programa", "Mentor": "Mentor", "Participant": "Participante", "Admin": "Administrador", "with": "com", "and": "e", "or": "ou", "Our": "Nosso", "About": "Sobre", "Build": "Construir", "Join": "Participar", "Next": "Seguinte", "Back": "Voltar",
  },
  Twi: {
    "Overview": "Nhwehwɛmu", "Dashboard": "Adwumayɛ pon", "Your": "Wo", "My": "Me", "Sessions": "Nhyiamu", "Goals": "Botaeɛ", "Progress": "Nkɔsoɔ", "Messages": "Nkrataa", "Applications": "Akwammisa", "Participants": "Akyerɛkyerɛfoɔ", "Reports": "Amanneɛbɔ", "Availability": "Nnɔmba a ɛwɔ hɔ", "Requests": "Akwammisa", "Sign out": "Fi mu", "Back to site": "San kɔ wɛbsaet no so", "Find a mentor": "Hwehwɛ ɔfotufoɔ", "Book a session": "Yɛ nhyiamu", "Assessments": "Nhwehwɛmu", "Impact reports": "Nkɛntɛnsoɔ amanneɛbɔ", "Available": "Ɔwɔ hɔ", "Confirmed": "Wɔagye ato mu", "Save": "Kora", "Submit": "Fa kɔ", "Close": "To mu", "Done": "Ayɛ", "Learn more": "Sua pii", "View profile": "Hwɛ ho", "Request connection": "Bisa nkitahodie", "Search": "Hwehwɛ", "No contributors found": "Yenhu obi a ɔboa", "Clear filters": "Yi nsiesie no", "Programme": "Dwumadie", "Mentor": "Ɔfotufoɔ", "Participant": "Ɔfãfoɔ", "Admin": "Ɔhwɛfoɔ", "with": "ne", "and": "ne", "or": "anaa", "Our": "Yɛn", "About": "Yɛn ho", "Build": "Si", "Join": "Ka ho", "Next": "Nea ɛdi hɔ", "Back": "San",
  },
};

const originalText = new WeakMap<Text, string>();

function translateDomText(root: ParentNode, language: Language) {
  const replacements: Record<string, string> = language === "English" ? {} : wordTranslations[language];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (parent && !["SCRIPT", "STYLE", "OPTION", "INPUT", "TEXTAREA"].includes(parent.tagName)) nodes.push(node as Text);
  }
  for (const textNode of nodes) {
    const original = originalText.get(textNode) ?? textNode.textContent ?? "";
    originalText.set(textNode, original);
    let translated = original;
    if (language !== "English") {
      for (const [source, target] of (Object.entries(replacements) as [string, string][]).sort(([a], [b]) => b.length - a.length)) {
        translated = translated.replace(new RegExp(`\\b${source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g"), target);
      }
    }
    if (textNode.textContent !== translated) textNode.textContent = translated;
  }
}

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: (key: Key) => string };
const LanguageContext = createContext<LanguageContextValue | null>(null);

const googleLanguageCodes: Record<Language, string> = {
  English: "en",
  Français: "fr",
  Swahili: "sw",
  العربية: "ar",
  Português: "pt",
  Twi: "ak",
};

function applyGoogleLanguage(language: Language) {
  if (typeof document === "undefined") return;
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!select) return;
  select.value = googleLanguageCodes[language];
  select.dispatchEvent(new Event("change"));
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("English");
  useEffect(() => {
    const saved = window.localStorage.getItem("iglespace:language");
    const active = (saved && languageAliases[saved]) || "English";
    setLanguageState(active);
    document.documentElement.lang = active === "Français" ? "fr" : active === "Swahili" ? "sw" : active === "العربية" ? "ar" : active === "Português" ? "pt" : active === "Twi" ? "tw" : "en";
    document.documentElement.dir = active === "العربية" ? "rtl" : "ltr";
  }, []);
  const setLanguage = (requested: Language) => {
    const next = languageAliases[requested] ?? "English";
    setLanguageState(next);
    window.localStorage.setItem("iglespace:language", next);
    document.documentElement.lang = next === "Français" ? "fr" : next === "Swahili" ? "sw" : next === "العربية" ? "ar" : next === "Português" ? "pt" : next === "Twi" ? "tw" : "en";
    document.documentElement.dir = next === "العربية" ? "rtl" : "ltr";
    window.setTimeout(() => applyGoogleLanguage(next), 150);
    window.setTimeout(() => applyGoogleLanguage(next), 1000);
  };
  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (key: Key) => translations[language]?.[key] ?? translations.English[key] ?? key,
  }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
