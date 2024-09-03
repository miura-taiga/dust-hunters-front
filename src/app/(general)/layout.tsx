import { Headers, Footers } from "@/components/layouts";
import { ReactNode } from "react";

interface GeneralLayoutProps {
  children: ReactNode;
}

export default function GeneralLayout({ children }: GeneralLayoutProps) {
  return (
    <div>
      <Headers />
      <main>{children}</main>
      <Footers />
    </div>
  );
}
