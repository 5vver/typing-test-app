import { type FC, type ReactNode } from "react";
import { useAuth } from "@/utils/auth.tsx";
import { Header } from "@/components/layout/header";
import { Footer } from "@components/layout/footer";

type Props = {
  children: ReactNode;
};
const Layout: FC<Props> = ({ children }) => {
  const auth = useAuth();

  return (
    <div className="min-h-screen min-w-full">
      <Header auth={auth} />
      <div className="pt-2 flex flex-col place-content-between">
        <div className="lg:min-h-[852px] p-6 lg:p-8">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export { Layout };
