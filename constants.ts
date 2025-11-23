import { ColorPalette } from './types';

export const PALETTES: ColorPalette[] = [
  {
    name: "Bauhaus Classic",
    colors: ["#D03026", "#F0C83A", "#2A64B6", "#151515", "#F2F2F2"],
    background: "#E8E6E1"
  },
  {
    name: "Sunset Gradient",
    colors: ["#FF6B6B", "#FFD93D", "#FF9F45", "#6C5B7B", "#355C7D"],
    background: "#2A2538"
  },
  {
    name: "Oceanic Depth",
    colors: ["#005F73", "#0A9396", "#94D2BD", "#E9D8A6", "#EE9B00"],
    background: "#001219"
  },
  {
    name: "Corporate Clean",
    colors: ["#264653", "#2A9D8F", "#E76F51", "#F4A261", "#2B2D42"],
    background: "#FFFFFF"
  },
  {
    name: "Pastel Dream",
    colors: ["#FFB5A7", "#FCD5CE", "#F8EDEB", "#F9DCC4", "#FEC89A"],
    background: "#FFF1F2"
  },
  {
    name: "Neon Cyber",
    colors: ["#F72585", "#7209B7", "#3A0CA3", "#4361EE", "#4CC9F0"],
    background: "#0F0F1A"
  }
];

export const DEFAULT_CONFIG = {
  width: 4500,
  height: 3000,
  shapeCountMin: 12,
  shapeCountMax: 24,
  complexity: 0.7
};

export const METADATA_COLUMNS = [
  "Filename",
  "Title",
  "Keywords",
  "Palette",
  "Date Created"
];

export const STOCK_KEYWORDS = "abstract, geometric, background, bauhaus, minimalist, texture, wallpaper, 4k, corporate, design, pattern, shapes, modern, artistic, generated";