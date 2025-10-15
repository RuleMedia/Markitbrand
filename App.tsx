import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import FileInput from './components/FileInput';
import PackageSelector from './components/PackageSelector';
import PreviewDisplay from './components/PreviewDisplay';
import { PackageTier } from './types';
import { generateMarketingImages, fileToBase64 } from './services/geminiService';
import { PACKAGES } from './constants';

const App: React.FC = () => {
  const [brandName, setBrandName] = useState('');
  const [tagline, setTagline] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [style, setStyle] = useState('Modern and eye-catching');
  const [selectedPackage, setSelectedPackage] = useState<PackageTier>(PackageTier.Basic);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateClick = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !brandName || !tagline) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);
    setOrderId(null);

    try {
      const logoBase64 = logoFile ? await fileToBase64(logoFile) : null;
      const logoMimeType = logoFile ? logoFile.type : null;

      const results = await generateMarketingImages({
        brandName,
        tagline,
        style,
        logoBase64,
        logoMimeType,
        packageTier: selectedPackage,
      });

      setGeneratedImages(results);
      setOrderId(`MB-${Date.now().toString().slice(-6)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, brandName, tagline, logoFile, style, selectedPackage]);
  
  const handleCopyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const selectedPackageInfo = PACKAGES.find(p => p.id === selectedPackage);


  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Form */}
          <form onSubmit={handleGenerateClick} className="space-y-8">
            <TextInput
              id="brandName"
              label="Business / Brand Name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g., QuantumLeap"
              required
            />
            <TextInput
              id="tagline"
              label="Tagline or Key Text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g., Innovating Tomorrow"
              required
            />
            <FileInput id="logoUpload" label="Logo Upload (Optional)" onFileChange={setLogoFile} />
            <TextInput
              id="style"
              label="Preferred Colors / Style"
              type="textarea"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              placeholder="e.g., vibrant blues and purples, minimalist, futuristic"
            />
            <PackageSelector selectedPackage={selectedPackage} onPackageChange={setSelectedPackage} />

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading || !brandName || !tagline}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
              >
                {isLoading ? 'Generating...' : 'Generate Previews'}
              </button>
            </div>
          </form>

          {/* Right Column: Preview & Payment */}
          <div className="flex flex-col space-y-6">
            <PreviewDisplay images={generatedImages} isLoading={isLoading} showWatermark={true} />
            
            {orderId && !isLoading && (
              <div className="text-left p-6 bg-gray-800 rounded-lg space-y-4 border border-purple-500/50">
                <h3 className="text-xl font-bold text-white text-center">Complete Your Order</h3>
                <p className="text-gray-400 text-center text-sm">Follow these steps to receive your images without the watermark.</p>
                
                <div className="space-y-4 pt-2">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">1</div>
                    <div className='w-full'>
                      <p className="text-gray-200">
                        Send <strong className="text-purple-400">{selectedPackageInfo?.price}</strong> to <strong className="text-green-400">$markitbrand</strong> using Cash App.
                      </p>
                      <a
                        href="https://cash.app/$markitbrand"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-base transition-all transform hover:scale-105"
                      >
                        Pay with Cash App
                      </a>
                    </div>
                  </div>
              
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">2</div>
                    <div className="text-gray-200">
                      <p>You <strong className="text-amber-400">must include</strong> this unique Order ID in the payment note:</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <code className="bg-gray-900 text-purple-300 px-4 py-2 rounded-md font-mono text-lg">{orderId}</code>
                        <button 
                          onClick={handleCopyOrderId}
                          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors"
                        >
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
              
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">3</div>
                    <p className="text-gray-300">
                      Once payment is verified, your final images will be delivered via email. For support, contact <a href="mailto:delivery@markitbrand.ai" className="text-purple-400 underline hover:text-purple-300">delivery@markitbrand.ai</a>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
                    <p><strong>Generation Failed:</strong> {error}</p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
