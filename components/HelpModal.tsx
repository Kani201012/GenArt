import React from 'react';
import { X, Play, Download, Palette, FileText, CircleHelp } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <CircleHelp size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">How to Use GenArt Factory</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-8 text-zinc-300 custom-scrollbar">
            {/* Intro */}
            <div className="bg-zinc-800/50 border border-zinc-700/50 p-4 rounded-xl">
                <p className="text-zinc-200 font-medium text-sm leading-relaxed">
                    👋 <strong>Welcome!</strong> This tool helps you create professional geometric abstract wallpapers for stock photography websites instantly. You don't need to be a designer to create amazing assets.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                {/* Step 1 */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white font-semibold">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 font-mono text-sm">1</div>
                        <h3>Configure & Generate</h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed pl-11">
                        Set your <strong>Batch Size</strong> (e.g., 10 images) and click the <span className="inline-flex items-center gap-1 bg-indigo-600 px-2 py-0.5 rounded text-[10px] text-white mx-1 font-bold"><Play size={8} fill="currentColor"/> Generate</span> button. The app will automatically draw unique 4K shapes for you.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white font-semibold">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 font-mono text-sm">2</div>
                        <h3>Choose Your Style</h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed pl-11">
                        Select a <strong>Color Palette</strong> (like "Sunset" or "Corporate") to match a specific theme. Leave it on <span className="text-indigo-400 font-medium">Random</span> to get a variety of styles in one batch.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white font-semibold">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30 font-mono text-sm">3</div>
                        <h3>Curate Gallery</h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed pl-11">
                        Your images appear in the main gallery. If you see one you don't like, hover over it and click the <span className="text-red-400">Trash icon</span> to delete it before exporting.
                    </p>
                </div>

                 {/* Step 4 */}
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white font-semibold">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 font-mono text-sm">4</div>
                        <h3>Export & Profit</h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed pl-11">
                        Click <span className="inline-flex items-center gap-1 bg-emerald-600 px-2 py-0.5 rounded text-[10px] text-white mx-1 font-bold"><Download size={8}/> Export Batch</span> to download everything at once.
                    </p>
                </div>
            </div>

            <div className="border-t border-zinc-800 pt-6">
                <h4 className="text-white font-semibold flex items-center gap-2 mb-3 text-sm">
                    <FileText size={16} className="text-zinc-400"/>
                    What's inside the Download ZIP?
                </h4>
                <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 space-y-3">
                  <div className="flex gap-3">
                    <span className="text-zinc-500 font-mono text-xs whitespace-nowrap">images/</span>
                    <p className="text-xs text-zinc-400">High-resolution (4500x3000px) PNG files ready for upload.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-zinc-500 font-mono text-xs whitespace-nowrap">metadata.csv</span>
                    <p className="text-xs text-zinc-400">
                      A spreadsheet containing Titles, Keywords, and Filenames. Upload this to stock sites (like Adobe Stock) to <strong>automatically tag</strong> your images.
                    </p>
                  </div>
                </div>
            </div>
        </div>
        
        <div className="p-6 border-t border-zinc-800 bg-zinc-900 flex justify-end">
            <button 
                onClick={onClose}
                className="bg-zinc-100 hover:bg-white text-zinc-900 px-6 py-2.5 rounded-lg font-semibold transition-colors text-sm shadow-lg shadow-zinc-900/20"
            >
                Got it, let's create!
            </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;