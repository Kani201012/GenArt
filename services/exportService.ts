import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { GeneratedAsset } from '../types';
import { METADATA_COLUMNS, STOCK_KEYWORDS } from '../constants';

export const exportAssets = async (assets: GeneratedAsset[]) => {
  const zip = new JSZip();
  let csvContent = METADATA_COLUMNS.join(",") + "\n";

  assets.forEach((asset) => {
    // Add image to zip
    zip.file(asset.filename, asset.blob);

    // Add row to CSV
    // "Filename","Title","Keywords","Palette","Date"
    const row = [
      `"${asset.filename}"`,
      `"Modern Abstract Geometric Background - Minimalist Design"`,
      `"${STOCK_KEYWORDS}"`,
      `"${asset.paletteName}"`,
      `"${new Date().toISOString()}"`
    ].join(",");
    
    csvContent += row + "\n";
  });

  // Add CSV to zip
  zip.file("metadata.csv", csvContent);

  // Generate and save zip
  const content = await zip.generateAsync({ type: "blob" });
  FileSaver.saveAs(content, `bauhaus_assets_batch_${new Date().getTime()}.zip`);
};