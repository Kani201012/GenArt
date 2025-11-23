export interface ColorPalette {
  name: string;
  colors: string[];
  background: string;
}

export interface ArtConfig {
  width: number;
  height: number;
  shapeCountMin: number;
  shapeCountMax: number;
  complexity: number; // 0.1 to 1.0
}

export interface GeneratedAsset {
  id: string;
  blob: Blob;
  previewUrl: string;
  paletteName: string;
  filename: string;
  timestamp: number;
}

export interface GenerationStatus {
  isGenerating: boolean;
  progress: number;
  total: number;
  currentStep: string;
}

export enum ShapeType {
  CIRCLE = 'CIRCLE',
  RECTANGLE = 'RECTANGLE',
  LINE = 'LINE',
  ARC = 'ARC',
  TRIANGLE = 'TRIANGLE'
}