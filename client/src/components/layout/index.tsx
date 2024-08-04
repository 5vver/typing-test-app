import { type FC, type ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@components/layout/footer";

type Props = {
  children: ReactNode;
};
const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow p-6 lg:p-8">{children}</div>
      <Footer />
    </div>
  );
};

export { Layout };
