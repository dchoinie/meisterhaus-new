import React, { JSX } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

interface PageTitleProps {
  title: string;
  subTitle?: string | JSX.Element;
  path?: string; // Optional path prop
}

const PageTitle = ({ title, subTitle, path }: PageTitleProps): JSX.Element => {
  // Split the path into segments
  const pathSegments = path?.split("/").filter(Boolean) || [];

  return (
    <div className="space-y-4 flex flex-col items-center mb-12">
      <div className="w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" asChild>
                <Link href="/">
                  <HomeIcon className="h-4 w-4 text-primary-500" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {pathSegments.map((segment, index) => (
              <React.Fragment key={segment}>
                <BreadcrumbItem>
                  {index === pathSegments.length - 1 ? (
                    <BreadcrumbPage className="text-primary-500">
                      {segment}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild className="text-primary-500">
                      <Link
                        href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                      >
                        {segment}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-bold font-cinzel-decorative text-primary-500">
          {title}
        </h2>
        {subTitle && <p className="text-xl text-primary-200">{subTitle}</p>}
      </div>
    </div>
  );
};

export default PageTitle;
