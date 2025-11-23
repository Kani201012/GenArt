import React from 'react';
import { GeneratedAsset } from '../types';
import { Download, Trash2, Maximize2 } from 'lucide-react';

interface GalleryProps {
  assets: GeneratedAsset[];
  onRemove: (id: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ assets, onRemove }) => {
  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-zinc-500 border-2 border-dashed border-zinc-800 rounded-xl m-8">
        <div className="bg-zinc-900 p-4 rounded-full mb-4">
          <Maximize2 className="w-8 h-8 opacity-50" />
        </div>
        <p className="text-lg font-medium">No Assets Generated Yet</p>
        <p className="text-sm opacity-60">Configure settings and click "Generate Batch" to start.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6 pb-24 overflow-y-auto h-full">
      {assets.map((asset) => (
        <div key={asset.id} className="group relative bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 shadow-xl transition-all hover:border-zinc-600">
          <div className="aspect-[3/2] w-full bg-zinc-950 relative">
             <img 
               src={asset.previewUrl} 
               alt={asset.filename}
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                <button 
                  onClick={() => onRemove(asset.id)}
                  className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-full transition-colors"
                  title="Remove Asset"
                >
                  <Trash2 size={18} />
                </button>
             </div>
          </div>
          <div className="p-3 border-t border-zinc-800 bg-zinc-900/50">
            <p className="text-xs font-mono text-zinc-400 truncate" title={asset.filename}>
              {asset.filename}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 px-2 py-1 bg-zinc-950 rounded">
                {asset.paletteName}
              </span>
              <span className="text-[10px] text-zinc-600">4500x3000px</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;