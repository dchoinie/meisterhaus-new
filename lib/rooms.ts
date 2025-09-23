import { client } from '@/sanity/lib/client'

export interface Room {
  _id: string;
  name: string;
  description: {
    _type: string;
    style: string;
    _key: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    markDefs: any[];
    children: {
      _type: string;
      text: string;
      marks: string[];
    }[];
  }[];
  mainImage: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  weekdayPrice: string;
  weekendPrice: string;
}

// Typed fetch function for rooms
export async function getRooms(): Promise<Room[]> {
  const rooms = await client.fetch(`
    *[_type == "room"] {
      _id,
      name,
      description,
      mainImage,
      weekdayPrice,
      weekendPrice,
    } | order(name asc)
  `);

  // Sort "Full Basement" to the end
  return rooms.sort((a: Room, b: Room) => {
    if (a.name === "Full Basement") return 1;
    if (b.name === "Full Basement") return -1;
    return 0;
  });
}
