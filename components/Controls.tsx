import React from 'react';
import { Palette, Play, Sliders, Download, RefreshCw, CircleHelp } from 'lucide-react';
import { PALETTES, DEFAULT_CONFIG } from '../constants';
import { ArtConfig, ColorPalette, GenerationStatus } from '../types';

interface ControlsProps {
  config: ArtConfig;
  setConfig: React.Dispatch<React.SetStateAction<ArtConfig>>;
  onGenerate: (count: number, palette?: ColorPalette) => void;
  status: GenerationStatus;
  selectedPalette: ColorPalette | null;
  setSelectedPalette: (p: ColorPalette | null) => void;
  onExport: () => void;
  assetCount: number;
  onOpenHelp: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  config,
  setConfig,
  onGenerate,
  status,
  selectedPalette,
  setSelectedPalette,
  onExport,
  assetCount,
  onOpenHelp
}) => {
  const [batchSize, setBatchSize] = React.useState(10);

  const handleBatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value);
    if (val < 1) val = 1;
    if (val > 50) val = 50;
    setBatchSize(val);
  };

  return (
    <div className="w-80 bg-zinc-900 border-r border-zinc-800 flex flex-col h-full shrink-0 z-10">
      <div className="p-6 border-b border-zinc-800 flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            GenArt Factory
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Stock Asset Generator</p>
        </div>
        <button 
          onClick={onOpenHelp}
          className="text-zinc-500 hover:text-indigo-400 transition-colors"
          title="Help & Guide"
        >
          <CircleHelp size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Batch Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
            <Play size={16} className="text-emerald-400" />
            <span>Generation Config</span>
          </div>
          
          <div className="bg-zinc-950/50 p-4 rounded-lg border border-zinc-800 space-y-3">
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Batch Size (1-50)</label>
              <div className="flex gap-2">
                 <input 
                   type="number" 
                   value={batchSize}
                   onChange={handleBatchChange}
                   min={1}
                   max={50}
                   disabled={status.isGenerating}
                   className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-zinc-100 transition-all"
                 />
              </div>
            </div>
            
            <button
              onClick={() => onGenerate(batchSize, selectedPalette || undefined)}
              disabled={status.isGenerating}
              className={`w-full py-3 rounded font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                status.isGenerating 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20 active:scale-95'
              }`}
            >
              {status.isGenerating ? (
                 <RefreshCw className="animate-spin" size={16} />
              ) : (
                 <Play size={16} fill="currentColor" />
              )}
              {status.isGenerating ? 'Generating...' : 'Generate Assets'}
            </button>

            {status.isGenerating && (
              <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${(status.progress / status.total) * 100}%` }}
                />
              </div>
            )}
            {status.isGenerating && (
                <p className="text-[10px] text-zinc-500 text-center animate-pulse">{status.currentStep}</p>
            )}
          </div>
        </div>

        {/* Palette Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
            <Palette size={16} className="text-purple-400" />
            <span>Color Palette</span>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
             <button 
                onClick={() => setSelectedPalette(null)}
                className={`p-2 rounded border text-left text-xs transition-all flex items-center justify-between ${
                    selectedPalette === null 
                    ? 'bg-zinc-800 border-indigo-500 text-white shadow-md shadow-indigo-900/10' 
                    : 'bg-zinc-950/30 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
             >
                <span>Random (Auto-select)</span>
                {selectedPalette === null && <div className="w-2 h-2 rounded-full bg-indigo-500"></div>}
             </button>
             {PALETTES.map(p => (
                 <button
                    key={p.name}
                    onClick={() => setSelectedPalette(p)}
                    className={`p-2 rounded border text-left text-xs transition-all ${
                        selectedPalette?.name === p.name
                        ? 'bg-zinc-800 border-indigo-500 text-white shadow-md shadow-indigo-900/10' 
                        : 'bg-zinc-950/30 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900'
                    }`}
                 >
                    <div className="flex justify-between items-center mb-1">
                        <span>{p.name}</span>
                    </div>
                    <div className="flex gap-1 h-2 rounded-sm overflow-hidden opacity-80">
                        {p.colors.map(c => (
                            <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                        ))}
                    </div>
                 </button>
             ))}
          </div>
        </div>

        {/* Advanced Config */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
            <Sliders size={16} className="text-orange-400" />
            <span>Complexity</span>
          </div>
          <div className="bg-zinc-950/50 p-4 rounded-lg border border-zinc-800 space-y-4">
             <div>
                <label className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>Shape Count (Min-Max)</span>
                    <span className="text-zinc-200">{config.shapeCountMin} - {config.shapeCountMax}</span>
                </label>
                <div className="flex gap-2 items-center">
                    <input 
                        type="range" min="5" max="30" 
                        value={config.shapeCountMin}
                        onChange={(e) => setConfig({...config, shapeCountMin: parseInt(e.target.value)})}
                        className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <input 
                        type="range" min="10" max="50" 
                        value={config.shapeCountMax}
                        onChange={(e) => setConfig({...config, shapeCountMax: parseInt(e.target.value)})}
                        className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-zinc-800 bg-zinc-900">
        <button
            onClick={onExport}
            disabled={assetCount === 0 || status.isGenerating}
            className={`w-full py-3 rounded font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                assetCount === 0 || status.isGenerating
                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 active:scale-95'
            }`}
        >
            <Download size={18} />
            Export Batch ({assetCount})
        </button>
        <p className="text-[10px] text-zinc-500 text-center mt-2">
            Downloads ZIP with images & metadata.csv
        </p>
      </div>
    </div>
  );
};

export default Controls;