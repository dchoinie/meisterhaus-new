import Container from "../../components/custom/container";
import SEO from "../../components/custom/seo";
import ContactForm from "../../components/custom/contactForm";
import { MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact - Lake House Rentals"
        description="Get in touch with us about our lake house rental property in Morristown, MN"
      />
      <Container>
        <div className="flex flex-col gap-12 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-cinzel-decorative text-primary-800 text-center">
            Contact Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-cinzel-decorative text-primary-800">
                  Location
                </h2>
                <div className="flex items-start gap-3 text-lg text-primary-800">
                  <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <p>24405 Knotty Oak Lane</p>
                    <p>Morristown, MN</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-cinzel-decorative text-primary-800">
                  Phone
                </h2>
                <div className="flex items-center gap-3 text-lg text-primary-800">
                  <Phone className="w-6 h-6 flex-shrink-0" />
                  <a href="tel:507-210-6880" className="hover:underline">
                    507-210-6880
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-cinzel-decorative text-primary-800">
                  Send Us a Message
                </h2>
                <p className="text-lg text-primary-800">
                  Fill out the form and we&apos;ll get back to you as soon as
                  possible. To make a booking request, please go to{" "}
                  <Link href="/book" className="hover:underline text-blue-500">
                    Request A Booking
                  </Link>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
