
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          MarkitBrand AI Studio
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Generate stunning marketing visuals for your brand in seconds.
        </p>
      </div>
    </header>
  );
};

export default Header;
