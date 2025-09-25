import React, { JSX } from "react";
import Container from "../../components/custom/container";
import { links, LinkType } from "@/app/config/navigation";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = (): JSX.Element => {
  return (
    <div className="bg-primary py-12">
      <Container>
        <div className="flex flex-col items-center">
          <div className="flex gap-12">
            {links.map((link: LinkType, index: number) => (
              <Link
                key={`${link.label}-${index}`}
                href={link.href}
                className="font-cinzel-decorative text-primary-100 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-12 my-6 text-primary-100">
            <a href="https://www.facebook.com/meisterhausbnb" target="_blank" rel="noopener noreferrer">
              <Facebook />
            </a>
            <Link href="/contact">
              <Mail />
            </Link>
          </div>
          <div className="text-primary-100 mb-3">
            <p>
              © {new Date().getFullYear()} Meisterhaus B & B. All rights
              reserved.
            </p>
          </div>
          <a href="https://meisterhaus.sanity.studio/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Website Login</a>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
