
import { PackageOption, PackageTier } from './types';

export const PACKAGES: PackageOption[] = [
  {
    id: PackageTier.Basic,
    name: 'Basic',
    price: '$10',
    imageCount: 1,
    description: '1 AI-generated marketing image.',
  },
  {
    id: PackageTier.Pro,
    name: 'Pro',
    price: '$25',
    imageCount: 3,
    description: '3 variations with different layouts & colors.',
  },
  {
    id: PackageTier.Premium,
    name: 'Premium',
    price: '$50',
    imageCount: 5,
    description: '5+ fully customized images for social & print.',
  },
];
