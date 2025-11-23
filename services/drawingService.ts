import { ArtConfig, ColorPalette, ShapeType } from '../types';

/**
 * Helper to get random integer between min and max
 */
const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Helper to get random item from array
 */
const randomChoice = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Converts hex to rgba with alpha
 */
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const generateBauhausImage = async (
  config: ArtConfig,
  palette: ColorPalette
): Promise<{ blob: Blob; previewUrl: string }> => {
  // Create an off-screen canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get 2D context');
  }

  // Set high resolution dimensions
  canvas.width = config.width;
  canvas.height = config.height;

  // 1. Fill Background
  ctx.fillStyle = palette.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Determine number of shapes
  const numShapes = randomInt(config.shapeCountMin, config.shapeCountMax);

  // 3. Drawing Loop
  for (let i = 0; i < numShapes; i++) {
    const shape = randomChoice(Object.values(ShapeType));
    const color = randomChoice(palette.colors);
    // Bauhaus often uses multiply or overlay, but normal with transparency is safer for general stock
    // Let's mix transparency
    const alpha = Math.random() * 0.5 + 0.4; // 0.4 to 0.9
    ctx.fillStyle = hexToRgba(color, alpha);
    ctx.strokeStyle = hexToRgba(color, Math.min(1, alpha + 0.2));
    ctx.lineWidth = randomInt(10, 50);

    ctx.save();
    
    // Random position
    const x = randomInt(0, canvas.width);
    const y = randomInt(0, canvas.height);
    const scale = randomInt(canvas.width * 0.05, canvas.width * 0.4);

    switch (shape) {
      case ShapeType.CIRCLE:
        ctx.beginPath();
        ctx.arc(x, y, scale / 2, 0, Math.PI * 2);
        if (Math.random() > 0.3) ctx.fill();
        else ctx.stroke();
        break;

      case ShapeType.RECTANGLE:
        if (Math.random() > 0.5) {
          // Rotated rectangle
          ctx.translate(x, y);
          ctx.rotate((Math.random() * 360 * Math.PI) / 180);
          ctx.fillRect(-scale / 2, -scale / 2, scale, scale * (Math.random() + 0.5));
        } else {
          ctx.fillRect(x, y, scale, scale);
        }
        break;

      case ShapeType.TRIANGLE:
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + scale, y + scale);
        ctx.lineTo(x - scale, y + scale);
        ctx.closePath();
        ctx.fill();
        break;

      case ShapeType.LINE:
        ctx.beginPath();
        ctx.moveTo(x, y);
        const endX = randomInt(0, canvas.width);
        const endY = randomInt(0, canvas.height);
        ctx.lineWidth = randomInt(2, 20);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        break;
        
      case ShapeType.ARC:
        ctx.beginPath();
        ctx.arc(x, y, scale, 0, Math.PI * (Math.random() + 0.5));
        ctx.strokeStyle = hexToRgba(color, 0.8);
        ctx.lineWidth = randomInt(20, 80);
        ctx.stroke();
        break;
    }

    ctx.restore();
  }

  // 4. Add subtle texture (noise) to make it look premium
  addGrain(ctx, canvas.width, canvas.height);

  // 5. Generate Blob (Full Res)
  const blob = await new Promise<Blob | null>((resolve) => 
    canvas.toBlob(resolve, 'image/png')
  );

  if (!blob) throw new Error('Failed to generate image blob');

  // 6. Generate Preview (Low Res) for UI performance
  const previewCanvas = document.createElement('canvas');
  const previewCtx = previewCanvas.getContext('2d');
  const previewScale = 0.1; // 10% size
  previewCanvas.width = canvas.width * previewScale;
  previewCanvas.height = canvas.height * previewScale;
  
  if (previewCtx) {
    previewCtx.drawImage(canvas, 0, 0, previewCanvas.width, previewCanvas.height);
  }
  const previewUrl = previewCanvas.toDataURL('image/jpeg', 0.8);

  return { blob, previewUrl };
};

const addGrain = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const factor = 0.03; // 3% noise intensity
  
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * factor * 255;
    data[i] = data[i] + noise;
    data[i + 1] = data[i + 1] + noise;
    data[i + 2] = data[i + 2] + noise;
  }
  
  ctx.putImageData(imageData, 0, 0);
};