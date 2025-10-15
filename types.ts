
export enum PackageTier {
  Basic = 'Basic',
  Pro = 'Pro',
  Premium = 'Premium',
}

export interface PackageOption {
  id: PackageTier;
  name: string;
  price: string;
  imageCount: number;
  description: string;
}

export interface GenerationParams {
  brandName: string;
  tagline: string;
  style: string;
  logoBase64: string | null;
  logoMimeType: string | null;
  packageTier: PackageTier;
}
