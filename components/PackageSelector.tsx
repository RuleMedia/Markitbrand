
import React from 'react';
import { PACKAGES } from '../constants';
import type { PackageTier } from '../types';

interface PackageSelectorProps {
  selectedPackage: PackageTier;
  onPackageChange: (tier: PackageTier) => void;
}

const PackageSelector: React.FC<PackageSelectorProps> = ({ selectedPackage, onPackageChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-3">Package Selection</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => onPackageChange(pkg.id)}
            className={`cursor-pointer p-4 border-2 rounded-lg transition-all duration-200 ${
              selectedPackage === pkg.id
                ? 'border-purple-500 bg-purple-900/30'
                : 'border-gray-700 bg-gray-800 hover:border-purple-400'
            }`}
          >
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-white">{pkg.name}</h3>
                <span className="text-sm font-semibold text-purple-400">{pkg.price}</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{pkg.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageSelector;
