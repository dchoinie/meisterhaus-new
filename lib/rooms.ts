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

  return rooms;
}

// Function to get a single room by name
export async function getRoomByName(roomName: string): Promise<Room | null> {
  const room = await client.fetch(`
    *[_type == "room" && name == $roomName][0] {
      _id,
      name,
      description,
      mainImage,
      weekdayPrice,
      weekendPrice,
    }
  `, { roomName });

  return room || null;
}