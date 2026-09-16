// ---------------------------------------------------------------------------
// i18n — simple client-side translation dictionary.
// Add a new key to both 'en' and 'vi' whenever you add user-facing text.
// ---------------------------------------------------------------------------

export type Lang = "en" | "vi";

export const translations = {
  en: {
    // Header
    siteTitle: "Storage Size Calculator",
    siteSubtitle:
      "Add your items below — we'll estimate the storage capacity you need, showing every calculation step transparently.",
    prototypeBadge: "Prototype — not an official MyStorage calculator",
    langToggleLabel: "Switch to Vietnamese",

    // Item list section
    yourItems: "Your items",
    addItem: "Add item",
    addAnotherItem: "+ Add another item",
    noItems: 'No items yet. Click "Add item" to get started.',

    // ItemRow labels
    itemName: "Item name",
    itemNamePlaceholder: "e.g. Wardrobe",
    labelLength: "Length (m)",
    labelWidth: "Width (m)",
    labelHeight: "Height (m)",
    labelQuantity: "Quantity",

    // ItemRow ARIA / accessibility
    storageItemGroup: (name: string) => `Storage item: ${name}`,
    volumeAriaLabel: (v: string) => `Volume for this item: ${v} m³`,
    removeAriaLabel: (name: string) => `Remove item: ${name}`,
    unnamed: "Unnamed",

    // ItemRow validation errors
    errNameRequired: "Item name is required.",
    errDimensionPositive: "Must be a positive number (m).",
    errQuantityPositive: "Must be a positive whole number.",

    // Results panel
    storageEstimate: "Storage Estimate",
    estimateSubtitle: "Calculated transparently — every number explained below.",
    volumePerItem: "Volume per item",
    physicalItemVolume: "Physical item volume",
    physicalItemVolumeDesc: "Sum of L × W × H × qty for each item",
    packingAllowance: "Packing / access allowance",
    packingAllowanceDesc: (n: number) =>
      `A flat +${n} m³ added for packing gaps and aisle access — shown separately so you see exactly what was added and why.`,
    estimatedRequired: "Estimated required capacity",
    estimatedRequiredDesc: "Physical volume + allowance",
    recommendedSize: "Recommended storage size",
    recommendedExplain: (est: string, tier: number) =>
      `Your estimated need is ${est} m³. The next available prototype size is ${tier} m³, so that is what we recommend.`,
    recommendedExceedsMax: (est: string, max: number) =>
      `Your estimated need (${est} m³) exceeds the largest prototype example size. Contact MyStorage directly for a custom quote.`,
    prototypeNote: (tiers: string) =>
      `Prototype note: The size tiers above (${tiers} m³) are example values covering the 1–23 m³ range stated on MyStorage's website. They are not official MyStorage inventory tiers. Contact`,
    prototypeNoteForActual: "for actual availability.",

    // Methodology note
    methodologyHeading: "How this estimate is calculated",
    methodologyStep1Title: "Physical volume",
    methodologyStep1Body:
      "we multiply Length × Width × Height × Quantity for each item, then sum them all.",
    methodologyStep2Title: "Packing allowance",
    methodologyStep2Body:
      "we add a flat +1 m³ for packing gaps, aisle access, and loading room. This allowance is displayed separately so you can see exactly what was added.",
    methodologyStep3Title: "Recommended size",
    methodologyStep3Body:
      "we round up to the next prototype example size that fits your total.",
    methodologyFootnote:
      "This approach follows MyStorage's public guidance of allowing approximately 1 CBM above estimated volume, rather than applying an unexplained fixed percentage multiplier per item.",
    methodologyAriaLabel: "How this calculator works",

    // Footer
    footerPrototype:
      "This is a prototype built as part of a MyStorage Product Engineering Intern (AI-Native) assignment. It is not affiliated with or endorsed by MyStorage.",
    footerOfficialSite: "Official site:",
  },

  vi: {
    // Header
    siteTitle: "Máy Tính Diện Tích Kho",
    siteSubtitle:
      "Thêm đồ vật của bạn bên dưới — chúng tôi sẽ ước tính dung lượng kho cần thiết, hiển thị từng bước tính toán một cách minh bạch.",
    prototypeBadge: "Bản thử nghiệm — không phải máy tính chính thức của MyStorage",
    langToggleLabel: "Chuyển sang tiếng Anh",

    // Item list section
    yourItems: "Đồ vật của bạn",
    addItem: "Thêm đồ vật",
    addAnotherItem: "+ Thêm đồ vật khác",
    noItems: 'Chưa có đồ vật nào. Nhấn "Thêm đồ vật" để bắt đầu.',

    // ItemRow labels
    itemName: "Tên đồ vật",
    itemNamePlaceholder: "Ví dụ: Tủ quần áo",
    labelLength: "Dài (m)",
    labelWidth: "Rộng (m)",
    labelHeight: "Cao (m)",
    labelQuantity: "Số lượng",

    // ItemRow ARIA / accessibility
    storageItemGroup: (name: string) => `Đồ vật: ${name}`,
    volumeAriaLabel: (v: string) => `Thể tích đồ vật này: ${v} m³`,
    removeAriaLabel: (name: string) => `Xóa đồ vật: ${name}`,
    unnamed: "Chưa đặt tên",

    // ItemRow validation errors
    errNameRequired: "Vui lòng nhập tên đồ vật.",
    errDimensionPositive: "Phải là số dương (đơn vị m).",
    errQuantityPositive: "Phải là số nguyên dương.",

    // Results panel
    storageEstimate: "Ước Tính Kho",
    estimateSubtitle: "Tính toán minh bạch — mọi con số đều được giải thích bên dưới.",
    volumePerItem: "Thể tích mỗi đồ vật",
    physicalItemVolume: "Tổng thể tích thực",
    physicalItemVolumeDesc: "Tổng của Dài × Rộng × Cao × Số lượng cho mỗi đồ vật",
    packingAllowance: "Khoảng đệm đóng gói / lối đi",
    packingAllowanceDesc: (n: number) =>
      `Cộng thêm ${n} m³ cho khoảng trống đóng gói và lối đi — hiển thị riêng để bạn thấy chính xác phần nào được cộng thêm và lý do tại sao.`,
    estimatedRequired: "Dung lượng ước tính cần thiết",
    estimatedRequiredDesc: "Thể tích thực + khoảng đệm",
    recommendedSize: "Kích thước kho đề xuất",
    recommendedExplain: (est: string, tier: number) =>
      `Nhu cầu ước tính của bạn là ${est} m³. Kích thước thử nghiệm tiếp theo phù hợp là ${tier} m³, đó là kích thước chúng tôi đề xuất.`,
    recommendedExceedsMax: (est: string, max: number) =>
      `Nhu cầu ước tính của bạn (${est} m³) vượt quá kích thước ví dụ lớn nhất trong bản thử nghiệm. Vui lòng liên hệ MyStorage trực tiếp để được báo giá riêng.`,
    prototypeNote: (tiers: string) =>
      `Lưu ý bản thử nghiệm: Các mức kích thước trên (${tiers} m³) là các giá trị ví dụ bao gồm phạm vi 1–23 m³ theo công bố trên trang web của MyStorage. Đây không phải kho hàng chính thức của MyStorage. Liên hệ`,
    prototypeNoteForActual: "để biết tình trạng kho thực tế.",

    // Methodology note
    methodologyHeading: "Cách tính toán ước tính này",
    methodologyStep1Title: "Thể tích thực",
    methodologyStep1Body:
      "chúng tôi nhân Dài × Rộng × Cao × Số lượng cho mỗi đồ vật, rồi cộng tất cả lại.",
    methodologyStep2Title: "Khoảng đệm đóng gói",
    methodologyStep2Body:
      "chúng tôi cộng thêm +1 m³ cho khoảng trống đóng gói, lối đi và không gian bốc dỡ. Khoảng đệm này được hiển thị riêng để bạn thấy chính xác phần được cộng thêm.",
    methodologyStep3Title: "Kích thước đề xuất",
    methodologyStep3Body:
      "chúng tôi làm tròn lên đến kích thước ví dụ thử nghiệm tiếp theo phù hợp với tổng của bạn.",
    methodologyFootnote:
      "Cách tiếp cận này tuân theo hướng dẫn công khai của MyStorage, cho phép khoảng 1 CBM trên thể tích ước tính, thay vì áp dụng hệ số nhân phần trăm cố định không được giải thích cho mỗi đồ vật.",
    methodologyAriaLabel: "Cách máy tính này hoạt động",

    // Footer
    footerPrototype:
      "Đây là bản thử nghiệm được xây dựng như một phần bài tập thực tập Product Engineering Intern (AI-Native) tại MyStorage. Không liên kết hoặc được xác nhận bởi MyStorage.",
    footerOfficialSite: "Trang web chính thức:",
  },
} as const;

export interface Translations {
  siteTitle: string;
  siteSubtitle: string;
  prototypeBadge: string;
  langToggleLabel: string;
  yourItems: string;
  addItem: string;
  addAnotherItem: string;
  noItems: string;
  itemName: string;
  itemNamePlaceholder: string;
  labelLength: string;
  labelWidth: string;
  labelHeight: string;
  labelQuantity: string;
  storageItemGroup: (name: string) => string;
  volumeAriaLabel: (v: string) => string;
  removeAriaLabel: (name: string) => string;
  unnamed: string;
  errNameRequired: string;
  errDimensionPositive: string;
  errQuantityPositive: string;
  storageEstimate: string;
  estimateSubtitle: string;
  volumePerItem: string;
  physicalItemVolume: string;
  physicalItemVolumeDesc: string;
  packingAllowance: string;
  packingAllowanceDesc: (n: number) => string;
  estimatedRequired: string;
  estimatedRequiredDesc: string;
  recommendedSize: string;
  recommendedExplain: (est: string, tier: number) => string;
  recommendedExceedsMax: (est: string, max: number) => string;
  prototypeNote: (tiers: string) => string;
  prototypeNoteForActual: string;
  methodologyHeading: string;
  methodologyStep1Title: string;
  methodologyStep1Body: string;
  methodologyStep2Title: string;
  methodologyStep2Body: string;
  methodologyStep3Title: string;
  methodologyStep3Body: string;
  methodologyFootnote: string;
  methodologyAriaLabel: string;
  footerPrototype: string;
  footerOfficialSite: string;
}

/** Returns the translation object for a given language. */
export function getT(lang: Lang): Translations {
  return translations[lang];
}
