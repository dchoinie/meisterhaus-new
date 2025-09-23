"use client";

import React, { JSX } from "react";
import Container from "../container";
import Link from "next/link";
import ContactForm from "../contactForm";

const Contact = (): JSX.Element => {
  return (
    <div className="my-24">
      <Container>
        <div className="flex gap-12">
          <div className="flex">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2858.5949791236585!2d-93.49885652426815!3d44.23599641454366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87f68c2beb526c6f%3A0x83ac4023efb29f8d!2s24405%20Knotty%20Oak%20Ln%2C%20Morristown%2C%20MN%2055052!5e0!3m2!1sen!2sus!4v1735843080182!5m2!1sen!2sus"
              width="600"
              height="525"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold font-cinzel-decorative text-primary">
              Contact Us
            </h2>
            <p className="text-muted-foreground mb-6">
              We would love to hear from you! Please use the form below to
              contact us with any general questions. If you would like to book a
              room, please{" "}
              <Link href="/book" className="text-accent underline hover:text-accent/80">
                Request A Booking
              </Link>
              .
            </p>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
