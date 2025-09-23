import React, { JSX } from "react";
import Footer from "./footer";
import Header from "./header";

const PageLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default PageLayout;
