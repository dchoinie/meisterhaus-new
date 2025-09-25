import { client } from '@/sanity/lib/client'

export interface Feature {
  text: string;
  description?: string;
}

export interface Features {
  _id: string;
  featuresList: Feature[];
}

// Function to get features data
export async function getFeatures(): Promise<Features | null> {
  const features = await client.fetch(`
    *[_type == "features"][0] {
      _id,
      featuresList
    }
  `);

  return features || null;
}
