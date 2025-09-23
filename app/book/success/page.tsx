import Link from "next/link";
import Container from "@/components/custom/container";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function BookingSuccess() {
  return (
    <div className="pt-24 mb-24">
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-cinzel-decorative text-primary-800">
            Booking Request Received!
          </h1>
          <p className="text-gray-600">
            Thank you for your booking request. We will review your request and
            get back to you shortly to confirm your reservation.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Please note that your booking is not confirmed until you receive a
              confirmation email from us.
            </p>
            <p className="text-sm text-gray-500">
              If you have any questions, please don&apos;t hesitate to contact
              us.
            </p>
          </div>
          <div className="pt-4">
            <Link href="/">
              <Button
                variant="default"
                className="bg-primary-500 text-white font-cinzel-decorative"
              >
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
