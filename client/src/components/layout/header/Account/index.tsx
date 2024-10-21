import { Icon } from '@components/Icon';
import { LoggedInGroup } from '@components/layout/header/Account/LoggedInGroup.tsx';
import { LoggedOutGroup } from '@components/layout/header/Account/LoggedOutGroup.tsx';
import { LoginDialog } from '@components/layout/header/Account/LoginDialog.tsx';
import { RegisterDialog } from '@components/layout/header/Account/RegisterDialog.tsx';
import { ProfileMini } from '@components/Profile/ProfileMini.tsx';
import { Dialog } from '@components/ui/dialog.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu.tsx';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@utils/auth.tsx';
import { type FC, useCallback, useState } from 'react';

type Props = {
  className?: string;
};

const AccountDropdown: FC<Props> = ({ className }) => {
  const { status, profile, login, register, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'login' | 'register'>('login');

  const onLoginClick = useCallback(() => {
    setDialogType('login');
    setDialogOpen(true);
  }, [setDialogType, setDialogOpen]);

  const onRegisterClick = useCallback(() => {
    setDialogType('register');
    setDialogOpen(true);
  }, [setDialogType, setDialogOpen]);

  const onLogoutClick = useCallback(async () => {
    const loggedOut = await logout();
    if (!loggedOut) return;
    setMenuOpen(false);
    await navigate({ to: '/' });
  }, [logout, setMenuOpen, navigate]);

  return (
    <div className={className}>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {dialogType === 'login' && (
          <LoginDialog login={login} setOpen={setDialogOpen} />
        )}
        {dialogType === 'register' && (
          <RegisterDialog register={register} setOpen={setDialogOpen} />
        )}
      </Dialog>

      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger>
          <Icon
            name="user-circle-outline"
            size={32}
            strokeColor="lavender"
            hover
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <ProfileMini status={status} profile={profile} />
          <DropdownMenuSeparator />
          {status === 'loggedOut' && (
            <LoggedOutGroup
              onLoginClick={onLoginClick}
              onRegisterClick={onRegisterClick}
            />
          )}
          {status === 'loggedIn' && (
            <LoggedInGroup onLogoutClick={onLogoutClick} />
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { AccountDropdown };
