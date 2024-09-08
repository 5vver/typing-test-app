import { AccountDropdown } from '@components/layout/header/Account';
import { Logo } from '@components/layout/header/Logo.tsx';
import { NavButtons } from '@components/layout/header/NavButtons.tsx';
import { type FC } from 'react';

const Header: FC = () => {
  return (
    <div className="flex-row gap-x-1 h-14">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Navigation"
          className="flex items-center content-center justify-between p-6 lg:px-8"
        >
          <Logo className="flex-grow basis-0" />
          <NavButtons className="flex-grow basis-0 flex justify-center" />
          <AccountDropdown className="flex-grow basis-0 flex justify-end" />
        </nav>
      </header>
    </div>
  );
};

export { Header };
