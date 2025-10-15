import React from 'react';
import Loader from './Loader';

interface PreviewDisplayProps {
  images: string[];
  isLoading: boolean;
  showWatermark: boolean;
}

const ImageCard: React.FC<{ src: string; index: number; showWatermark: boolean; }> = ({ src, index, showWatermark }) => (
    <div className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden group">
        <img
            src={src}
            alt={`Generated Image ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {showWatermark && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center pointer-events-none">
                <span className="text-white text-2xl font-bold opacity-75 transform -rotate-12 select-none">MarkitBrand AI</span>
            </div>
        )}
    </div>
);


const PreviewDisplay: React.FC<PreviewDisplayProps> = ({ images, isLoading, showWatermark }) => {
  const hasImages = images.length > 0;

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 flex flex-col items-center justify-center min-h-[400px] h-full">
      {isLoading ? (
        <div className="text-center">
            <Loader />
            <p className="mt-4 text-gray-400">Generating your brand visuals...</p>
            <p className="text-sm text-gray-500">This may take a moment.</p>
        </div>
      ) : hasImages ? (
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
            {images.map((img, index) => (
               <ImageCard key={index} src={img} index={index} showWatermark={showWatermark} />
            ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <p className="mt-4">Your generated images will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default PreviewDisplay;