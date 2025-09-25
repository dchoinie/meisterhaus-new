import Container from "../../components/custom/container";
import SEO from "../../components/custom/seo";
import Image from "next/image";
import { getAmenitiesPictures, getAmenitiesLists } from "@/lib/amenities";
import { urlFor } from "@/sanity/lib/image";

export default async function AmenitiesPage() {
  const amenitiesPictures = await getAmenitiesPictures();
  const amenitiesLists = await getAmenitiesLists();
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
              {amenitiesPictures.length > 0 && amenitiesPictures[0].images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(image).url()}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    quality={100}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>

            {/* Amenities Lists */}
            <div className="grid grid-cols-1 gap-8">
              {amenitiesLists.map((list) => (
                <div key={list._id} className="space-y-4">
                  <h2 className="text-2xl font-cinzel-decorative text-primary-800">
                    {list.title || 'Amenities'}
                  </h2>
                  <ul className="space-y-2 text-lg text-primary-800">
                    {list.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
