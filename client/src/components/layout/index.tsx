import { type FC, type ReactNode } from "react";
import { useAuth } from "@/utils/auth.tsx";
import { Header } from "@/components/layout/header";

type Props = {
  children: ReactNode;
};
const Layout: FC<Props> = ({ children }) => {
  const auth = useAuth();

  return (
    <div className='min-h-screen min-w-full'>
      <Header auth={auth} />
      <div className='pt-2'>{children}</div>
    </div>
  );
};

export { Layout };
