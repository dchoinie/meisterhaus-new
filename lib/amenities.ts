import { client } from '@/sanity/lib/client'

export interface AmenitiesImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt: string;
}

export interface AmenitiesPictures {
  _id: string;
  title?: string;
  images: AmenitiesImage[];
}

export interface AmenitiesList {
  _id: string;
  title?: string;
  items: string[];
}

// Fetch amenities pictures
export async function getAmenitiesPictures(): Promise<AmenitiesPictures[]> {
  const pictures = await client.fetch(`
    *[_type == "amenitiesPictures"] {
      _id,
      title,
      images[] {
        _type,
        asset,
        alt
      }
    } | order(_createdAt asc)
  `);

  return pictures;
}

// Fetch amenities lists
export async function getAmenitiesLists(): Promise<AmenitiesList[]> {
  const lists = await client.fetch(`
    *[_type == "amenitiesList"] {
      _id,
      title,
      items
    } | order(_createdAt asc)
  `);

  return lists;
}
