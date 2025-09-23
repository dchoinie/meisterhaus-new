"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { links, LinkType } from "@/app/config/navigation";
import Container from "../../components/custom/container";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isHomePage = pathname === "/";

  return (
    <div
      className={cn(
        "top-0 left-0 w-full z-50",
        isHomePage ? "absolute" : "relative"
      )}
    >
      <Container>
        <div className="flex justify-between py-8">
          <div className="hidden md:flex gap-16">
            {links.map((link: LinkType, index: number) => (
              <Link
                key={`${link.label}-${index}`}
                href={link.href}
                className={cn(
                  "font-cinzel-decorative transition-colors",
                  isHomePage
                    ? "text-white hover:text-white/80"
                    : "text-primary-500 hover:text-primary-600",
                  pathname === link.href && !isHomePage && "text-primary-300"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
            <Button
              variant="default"
              className="bg-primary text-white hover:bg-primary/90 font-cinzel-decorative hidden md:flex"
              asChild
            >
              <Link href="/book">
              <Calendar className="h-4 w-4" />
              Request Booking
              </Link>
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="font-cinzel-decorative text-primary-800">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "text-lg font-cinzel-decorative transition-colors hover:text-primary-500",
                        pathname === link.href
                          ? "text-primary-500"
                          : "text-primary-800"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </div>
  );
}
