import Container from "../../components/custom/container";
import SEO from "../../components/custom/seo";
import Image from "next/image";

export default function AmenitiesPage() {
  return (
    <>
      <SEO
        title="Amenities - Lake House Rentals"
        description="Explore the amenities available at our lake house - from entertainment to outdoor features"
      />
      <Container>
        <div className="flex flex-col gap-12 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-cinzel-decorative text-primary-800 text-center">
            Our Amenities
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-4 h-fit">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/patio_stairs.avif"
                  alt="Walkout patio stairs"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/pool_table.avif"
                  alt="Pool table area"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/house_4.png"
                  alt="Lake house exterior"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/family_room.avif"
                  alt="Family room"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>

            {/* Amenities Lists */}
            <div className="grid grid-cols-1 gap-8">
              {/* Indoor Entertainment */}
              <div className="space-y-4">
                <h2 className="text-2xl font-cinzel-decorative text-primary-800">
                  Indoor Entertainment
                </h2>
                <ul className="space-y-2 text-lg text-primary-800">
                  <li>Pool Table</li>
                  <li>Large Screen TV</li>
                  <li>Craft Area</li>
                  <li>Workout Area</li>
                </ul>
              </div>

              {/* Kitchen & Dining */}
              <div className="space-y-4">
                <h2 className="text-2xl font-cinzel-decorative text-primary-800">
                  Kitchen & Dining
                </h2>
                <ul className="space-y-2 text-lg text-primary-800">
                  <li>Refrigerator</li>
                  <li>Pizza Oven</li>
                  <li>Beverage Station</li>
                </ul>
              </div>

              {/* Outdoor Features */}
              <div className="space-y-4">
                <h2 className="text-2xl font-cinzel-decorative text-primary-800">
                  Outdoor Features
                </h2>
                <ul className="space-y-2 text-lg text-primary-800">
                  <li>Walkout Patio</li>
                  <li>Hot Tub</li>
                  <li>Fire Pit</li>
                  <li>Pond</li>
                  <li>Bird Watching Area</li>
                </ul>
              </div>

              {/* Accommodations */}
              <div className="space-y-4">
                <h2 className="text-2xl font-cinzel-decorative text-primary-800">
                  Accommodations
                </h2>
                <ul className="space-y-2 text-lg text-primary-800">
                  <li>3 Guest Rooms</li>
                  <li>2 Full Bathrooms</li>
                  <li>High-Speed WiFi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
