import { useCallback, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu.tsx";
import { Icon } from "@components/Icon";
import { useAuth } from "@utils/auth.tsx";
import { Dialog } from "@components/ui/dialog.tsx";
import { LoginDialog } from "@components/layout/header/Account/LoginDialog.tsx";
import { RegisterDialog } from "@components/layout/header/Account/RegisterDialog.tsx";
import { LoggedOutGroup } from "@components/layout/header/Account/LoggedOutGroup.tsx";
import { LoggedInGroup } from "@components/layout/header/Account/LoggedInGroup.tsx";

const AccountDropdown = () => {
  const { status, login, register, logout } = useAuth();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"login" | "register">("login");

  const [menuOpen, setMenuOpen] = useState(false);

  const onLoginClick = useCallback(() => {
    setDialogType("login");
    setDialogOpen(true);
  }, [setDialogType, setDialogOpen]);

  const onRegisterClick = useCallback(() => {
    setDialogType("register");
    setDialogOpen(true);
  }, [setDialogType, setDialogOpen]);

  const onLogoutClick = useCallback(async () => {
    const loggedOut = await logout();
    if (!loggedOut) return;
    setMenuOpen(false);
  }, [logout, setMenuOpen]);

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {dialogType === "login" && (
          <LoginDialog login={login} setOpen={setDialogOpen} />
        )}
        {dialogType === "register" && (
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
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {status === "loggedOut" && (
            <LoggedOutGroup
              onLoginClick={onLoginClick}
              onRegisterClick={onRegisterClick}
            />
          )}
          {status === "loggedIn" && (
            <LoggedInGroup onLogoutClick={onLogoutClick} />
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { AccountDropdown };
