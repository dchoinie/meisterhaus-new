import Container from "../../components/custom/container";
import SEO from "../../components/custom/seo";
import Image from "next/image";
import { getRooms, Room } from "@/lib/rooms";
import { urlFor } from "@/sanity/lib/image";

export default async function RoomsPage() {
  const rooms = await getRooms();
  return (
    <>
      <SEO
        title="Rooms - Lake House Rentals"
        description="Explore our comfortable lake house rooms - The Pheasant Room, Oma's Room, and The Beach Room"
      />
      <Container>
        <div className="flex flex-col gap-16 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-cinzel-decorative text-primary-800 text-center">
            Our Rooms
          </h1>

          {rooms.map((room: Room, index: number) => {
            const imageUrl = urlFor(room.mainImage).url();
            const descriptionText = Array.isArray(room.description)
              ? room.description[0]?.children[0]?.text || ""
              : room.description;

            return (
              <section key={room._id} className="flex flex-col gap-8">
                <h2 className="text-3xl md:text-4xl font-cinzel-decorative text-primary-800">
                  {room.name}
                </h2>
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                  <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={room.name}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="md:w-1/2 space-y-4 text-lg text-primary-800">
                    <p>{descriptionText}</p>
                    
                    {/* Pricing Information */}
                    <div className="bg-primary-50 p-4 rounded-lg">
                      <h3 className="text-xl font-cinzel-decorative text-primary-800 mb-3">
                        Pricing
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-primary-700">Weekday Rate:</span>
                          <span className="font-bold text-primary-800">
                            {room.weekdayPrice}/night
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-primary-700">Weekend/Holiday Rate:</span>
                          <span className="font-bold text-primary-800">
                            {room.weekendPrice}/night
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </>
  );
}
