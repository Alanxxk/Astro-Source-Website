// 字体配置
export const fontConfig = {
  enable: true, // 启用自定义字体功能
  preload: true, // 预加载字体文件以提高性能
  selected: ["custom-font-woff2","custom-font-woff","custom-font-ttf","system"], // 当前选择的字体，支持多个字体组合
  fonts: {
    // 系统字体
    system: {
      id: "system",
      name: "系统字体",
      src: "", // 系统字体无需 src
      family:
        "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
    },
    // Google Fonts - Zen Maru Gothic
    "zen-maru-gothic": {
      id: "zen-maru-gothic",
      name: "Zen Maru Gothic",
      src: "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@300;400;500;700;900&display=swap",
      family: "Zen Maru Gothic",
      display: "swap" as const,
    },
    // Google Fonts - Inter
    inter: {
      id: "inter",
      name: "Inter",
      src: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      family: "Inter",
      display: "swap" as const,
    },
    // 小米字体 - MiSans Normal
    "misans-normal": {
      id: "misans-normal",
      name: "MiSans Normal",
      src: "https://unpkg.com/misans@4.1.0/lib/Normal/MiSans-Normal.min.css",
      family: "MiSans",
      weight: 400,
      display: "swap" as const,
    },
    // 小米字体 - MiSans Semibold
    "misans-semibold": {
      id: "misans-semibold",
      name: "MiSans Semibold",
      src: "https://unpkg.com/misans@4.1.0/lib/Normal/MiSans-Semibold.min.css",
      family: "MiSans",
      weight: 600,
      display: "swap" as const,
    },
    // 本地字体及其备用字体-梦源字体
    "custom-font-woff2": {  //现代浏览器
      id: "Dream-Han-Sans-font-woff2",
      name: "梦源字体.woff2",
      src: "/assets/fonts/DreamHanSans-W23.woff2",
      family: "CustomFont",
      weight: 2300,
      display: "swap" as const,
      format: "woff2" as const,
      // unicodeRange: "U+4E00-9FFF, U+0000-00FF",  //只加载子集—中英文字体
    },
    "custom-font-woff": {  //老式浏览器
      id: "Dream-Han-Sans-font-woff",
      name: "梦源字体.woff",
      src: "/assets/fonts/DreamHanSans-W23.woff",
      family: "CustomFont",
      weight: 2300,
      display: "swap" as const,
      format: "woff" as const,
    },
    "custom-font-ttf": {  //所有浏览器
      id: "Dream-Han-Sans-font-ttf",
      name: "梦源字体.ttf",
      src: "/assets/fonts/DreamHanSans-W23.ttf",
      family: "CustomFont",
      weight: 2300,
      display: "swap" as const,
      format: "truetype" as const,
    },
  },
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ], // 全局字体回退
};
