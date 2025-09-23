import { ReactNode } from "react";
import PageLayout from "../layout/pageLayout";

export default function BookLayout({ children }: { children: ReactNode }) {
  return <PageLayout>{children}</PageLayout>;
}
