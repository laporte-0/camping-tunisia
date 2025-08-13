export interface EmergencyContact {
  id: string
  name: string
  nameAr: string
  nameFr: string
  phone: string
  region: string
  type: "police" | "medical" | "fire" | "rescue" | "tourism"
  available24h: boolean
}

export interface SafetyTip {
  id: string
  category: "desert" | "mountain" | "forest" | "beach" | "general"
  title: string
  titleAr: string
  titleFr: string
  description: string
  descriptionAr: string
  descriptionFr: string
  priority: "high" | "medium" | "low"
}

export interface Regulation {
  id: string
  title: string
  titleAr: string
  titleFr: string
  description: string
  descriptionAr: string
  descriptionFr: string
  region?: string
  permitRequired: boolean
  fine?: string
}

export const emergencyContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "National Emergency Services",
    nameAr: "خدمات الطوارئ الوطنية",
    nameFr: "Services d'urgence nationaux",
    phone: "197",
    region: "National",
    type: "police",
    available24h: true,
  },
  {
    id: "2",
    name: "Medical Emergency (SAMU)",
    nameAr: "الطوارئ الطبية",
    nameFr: "Urgences médicales (SAMU)",
    phone: "190",
    region: "National",
    type: "medical",
    available24h: true,
  },
  {
    id: "3",
    name: "Fire Department",
    nameAr: "الحماية المدنية",
    nameFr: "Protection civile",
    phone: "198",
    region: "National",
    type: "fire",
    available24h: true,
  },
  {
    id: "4",
    name: "Tourist Police Tunis",
    nameAr: "شرطة السياحة تونس",
    nameFr: "Police touristique Tunis",
    phone: "+216 71 341 077",
    region: "Tunis",
    type: "tourism",
    available24h: false,
  },
  {
    id: "5",
    name: "Desert Rescue Douz",
    nameAr: "إنقاذ الصحراء دوز",
    nameFr: "Secours désert Douz",
    phone: "+216 75 470 351",
    region: "Douz",
    type: "rescue",
    available24h: true,
  },
  {
    id: "6",
    name: "Mountain Rescue Kasserine",
    nameAr: "إنقاذ الجبال القصرين",
    nameFr: "Secours montagne Kasserine",
    phone: "+216 77 474 200",
    region: "Kasserine",
    type: "rescue",
    available24h: true,
  },
]

export const safetyTips: SafetyTip[] = [
  {
    id: "1",
    category: "desert",
    title: "Desert Camping Safety",
    titleAr: "سلامة التخييم في الصحراء",
    titleFr: "Sécurité camping désert",
    description:
      "Always inform someone of your location, carry extra water (4L per person per day), and never camp alone in remote desert areas.",
    descriptionAr:
      "أبلغ دائماً شخصاً ما عن موقعك، احمل ماءً إضافياً (4 لتر للشخص يومياً)، ولا تخيم وحيداً في المناطق الصحراوية النائية.",
    descriptionFr:
      "Informez toujours quelqu'un de votre localisation, emportez de l'eau supplémentaire (4L par personne par jour), et ne campez jamais seul dans des zones désertiques isolées.",
    priority: "high",
  },
  {
    id: "2",
    category: "mountain",
    title: "Mountain Weather Awareness",
    titleAr: "الوعي بطقس الجبال",
    titleFr: "Conscience météo montagne",
    description:
      "Weather can change rapidly in mountains. Check forecasts, pack warm clothes even in summer, and avoid camping on ridges during storms.",
    descriptionAr:
      "يمكن أن يتغير الطقس بسرعة في الجبال. تحقق من التوقعات، احزم ملابس دافئة حتى في الصيف، وتجنب التخييم على القمم أثناء العواصف.",
    descriptionFr:
      "Le temps peut changer rapidement en montagne. Vérifiez les prévisions, emportez des vêtements chauds même en été, et évitez de camper sur les crêtes pendant les orages.",
    priority: "high",
  },
  {
    id: "3",
    category: "general",
    title: "Wildlife Precautions",
    titleAr: "احتياطات الحياة البرية",
    titleFr: "Précautions faune sauvage",
    description:
      "Store food properly, maintain distance from wild animals, and never feed wildlife. Be especially cautious of scorpions and snakes.",
    descriptionAr:
      "احفظ الطعام بشكل صحيح، حافظ على المسافة من الحيوانات البرية، ولا تطعم الحياة البرية أبداً. كن حذراً خاصة من العقارب والثعابين.",
    descriptionFr:
      "Stockez la nourriture correctement, maintenez une distance avec les animaux sauvages, et ne nourrissez jamais la faune. Soyez particulièrement prudent avec les scorpions et serpents.",
    priority: "medium",
  },
]

export const regulations: Regulation[] = [
  {
    id: "1",
    title: "National Park Camping Permits",
    titleAr: "تصاريح التخييم في المتنزهات الوطنية",
    titleFr: "Permis camping parcs nationaux",
    description:
      "Camping in national parks requires advance permits. Contact park authorities 48 hours before arrival.",
    descriptionAr: "يتطلب التخييم في المتنزهات الوطنية تصاريح مسبقة. اتصل بسلطات المتنزه قبل 48 ساعة من الوصول.",
    descriptionFr:
      "Le camping dans les parcs nationaux nécessite des permis à l'avance. Contactez les autorités du parc 48 heures avant l'arrivée.",
    permitRequired: true,
    fine: "200-500 TND",
  },
  {
    id: "2",
    title: "Fire Restrictions",
    titleAr: "قيود النار",
    titleFr: "Restrictions feu",
    description: "Open fires prohibited during dry season (June-September). Use designated fire pits only.",
    descriptionAr: "النيران المكشوفة محظورة خلال الموسم الجاف (يونيو-سبتمبر). استخدم حفر النار المخصصة فقط.",
    descriptionFr:
      "Feux ouverts interdits pendant la saison sèche (juin-septembre). Utilisez uniquement les foyers désignés.",
    permitRequired: false,
    fine: "100-300 TND",
  },
  {
    id: "3",
    title: "Waste Management",
    titleAr: "إدارة النفايات",
    titleFr: "Gestion des déchets",
    description: "Pack out all trash. Littering in natural areas carries heavy fines. Use biodegradable soaps only.",
    descriptionAr:
      "احزم جميع القمامة. إلقاء القمامة في المناطق الطبيعية يحمل غرامات ثقيلة. استخدم الصابون القابل للتحلل فقط.",
    descriptionFr:
      "Emportez tous les déchets. Jeter des détritus dans les zones naturelles entraîne de lourdes amendes. Utilisez uniquement des savons biodégradables.",
    permitRequired: false,
    fine: "50-200 TND",
  },
]

export const ecoTips = [
  {
    id: "1",
    title: "Leave No Trace",
    titleAr: "لا تترك أثراً",
    titleFr: "Ne laissez aucune trace",
    description: "Pack out everything you bring in. Leave campsites cleaner than you found them.",
    descriptionAr: "احزم كل ما تحضره. اترك مواقع التخييم أنظف مما وجدتها.",
    descriptionFr:
      "Emportez tout ce que vous apportez. Laissez les sites de camping plus propres que vous ne les avez trouvés.",
  },
  {
    id: "2",
    title: "Water Conservation",
    titleAr: "حفظ المياه",
    titleFr: "Conservation de l'eau",
    description: "Use water sparingly, especially in desert regions. Collect rainwater when possible.",
    descriptionAr: "استخدم الماء بحذر، خاصة في المناطق الصحراوية. اجمع مياه الأمطار عند الإمكان.",
    descriptionFr:
      "Utilisez l'eau avec parcimonie, surtout dans les régions désertiques. Collectez l'eau de pluie quand c'est possible.",
  },
  {
    id: "3",
    title: "Respect Wildlife",
    titleAr: "احترم الحياة البرية",
    titleFr: "Respectez la faune",
    description: "Observe animals from distance, never disturb nests or dens, and keep noise levels low.",
    descriptionAr: "راقب الحيوانات من بعيد، لا تزعج الأعشاش أو الجحور أبداً، واحتفظ بمستويات الضوضاء منخفضة.",
    descriptionFr:
      "Observez les animaux à distance, ne dérangez jamais les nids ou tanières, et gardez les niveaux de bruit bas.",
  },
]
