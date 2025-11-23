import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Controls from './components/Controls';
import Gallery from './components/Gallery';
import HelpModal from './components/HelpModal';
import { ArtConfig, ColorPalette, GeneratedAsset, GenerationStatus } from './types';
import { DEFAULT_CONFIG, PALETTES } from './constants';
import { generateBauhausImage } from './services/drawingService';
import { exportAssets } from './services/exportService';

const App: React.FC = () => {
  const [config, setConfig] = useState<ArtConfig>(DEFAULT_CONFIG);
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(null);
  const [assets, setAssets] = useState<GeneratedAsset[]>([]);
  const [status, setStatus] = useState<GenerationStatus>({
    isGenerating: false,
    progress: 0,
    total: 0,
    currentStep: ''
  });
  const [showHelp, setShowHelp] = useState(false);

  const generateAssets = useCallback(async (count: number, forcedPalette?: ColorPalette) => {
    setStatus({
      isGenerating: true,
      progress: 0,
      total: count,
      currentStep: 'Initializing...'
    });

    const newAssets: GeneratedAsset[] = [];

    // Use a loop with small delay to allow UI updates (render cycle)
    for (let i = 0; i < count; i++) {
      setStatus(prev => ({
        ...prev,
        progress: i,
        currentStep: `Generating image ${i + 1} of ${count}...`
      }));

      // Small delay to let React render the progress bar update
      await new Promise(resolve => setTimeout(resolve, 50));

      try {
        const palette = forcedPalette || PALETTES[Math.floor(Math.random() * PALETTES.length)];
        const uuid = uuidv4();
        const filename = `abstract_bg_${uuid.slice(0, 8)}.png`;

        const { blob, previewUrl } = await generateBauhausImage(config, palette);

        newAssets.push({
          id: uuid,
          blob,
          previewUrl,
          paletteName: palette.name,
          filename,
          timestamp: Date.now()
        });

        // Add incrementally to state so user sees them appear
        setAssets(prev => [...prev, {
            id: uuid,
            blob,
            previewUrl,
            paletteName: palette.name,
            filename,
            timestamp: Date.now()
        }]);

      } catch (error) {
        console.error("Generation failed for index", i, error);
      }
    }

    setStatus({
      isGenerating: false,
      progress: count,
      total: count,
      currentStep: 'Done!'
    });
  }, [config]);

  const handleRemove = (id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  const handleExport = () => {
    if (assets.length === 0) return;
    exportAssets(assets);
  };

  return (
    <div className="flex h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      <Controls 
        config={config}
        setConfig={setConfig}
        onGenerate={generateAssets}
        status={status}
        selectedPalette={selectedPalette}
        setSelectedPalette={setSelectedPalette}
        onExport={handleExport}
        assetCount={assets.length}
        onOpenHelp={() => setShowHelp(true)}
      />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-950/50 relative">
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-900/50 backdrop-blur-md z-10 shrink-0">
          <div className="flex items-center gap-4">
             <h2 className="font-semibold text-lg text-zinc-200">Gallery Preview</h2>
             <span className="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded text-xs">
                {assets.length} Assets Ready
             </span>
          </div>
          <div className="text-xs text-zinc-500 font-mono hidden md:block">
            Output: 4500x3000px @ 300DPI
          </div>
        </header>
        
        <div className="flex-1 overflow-hidden relative">
           <Gallery assets={assets} onRemove={handleRemove} />
           
           {/* Overlay for "Generating" state if you want a modal blocker */}
           {status.isGenerating && (
             <div className="absolute inset-0 bg-black/20 pointer-events-none backdrop-blur-[1px] transition-all z-20" />
           )}
        </div>
      </main>

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
};

export default App;