export const emojiMap = {
  // الأدوات والصيانة
  settings: "⚙️",
  cog: "⚙️",
  wrench: "🔧",
  drill: "🛠️",
  hammer: "🔨",
  ruler: "📏",
  construction: "🏗️",
  gauge: "📊",
  fan: "💨",
  wind: "🌬️",
  store : "🏬",

  // الكهرباء والطاقة
  zap: "⚡",
  bolt: "⚡",
  battery: "🔋",
  plug: "🔌",
  power: "🔋",
  circuitBoard: "💻",
  lightbulb: "💡",
  sun: "☀️",
  flashlight: "🔦",

  // الماء والسباكة
  droplets: "💧",
  showerHead: "🚿",
  waves: "🌊",
  snowflake: "❄️",
  filter: "🔍",
  flame: "🔥",
  thermometer: "🌡️",

  // المباني
  building: "🏢",
  factory: "🏭",
  warehouse: "📦",
  home: "🏠",
  blocks: "🧱",
  hardHat: "⛑️",
  mapPin: "📍",

  // الأمان
  shield: "🛡️",
  shieldCheck: "✅",
  alertTriangle: "⚠️",
  eye: "👁️",
  checkcircle: "✔️",
  lock: "🔒",
  badgeCheck: "🏅",

  // البيئة
  leaf: "🌿",
  cloud: "☁️",
  airVent: "💨",

  // الأسهم
  arrowRight: "➡️",
  check: "✓",

  // عامة
  star: "⭐",
  users: "👥",
  briefcase: "💼",
  target: "🎯",
  award: "🏆",
  layers: "📚",

  // تحليلات
  activity: "📈",
  trendingup: "📊",
  barchart3: "📊",
  clipboardList: "📋",
  fileText: "📄",
  search: "🔍",
  info: "ℹ️",

  // تواصل
  phone: "📞",
  mail: "✉️",
};
export const getIcon = (iconName?: string) => {
  if (!iconName) return "⚙️";

  const key = iconName.trim().toLowerCase() as keyof typeof emojiMap;

  return emojiMap[key] || "⚙️";
};