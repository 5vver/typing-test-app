import { type FC, useCallback, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu.tsx";
import { Icon } from "@components/Icon/icon.tsx";
import { Link } from "@tanstack/react-router";
import { type Auth } from "@utils/auth.tsx";
import { Dialog } from "@components/ui/dialog.tsx";
import { LoginDialog } from "@components/layout/header/Account/LoginDialog.tsx";
import { RegisterDialog } from "@components/layout/header/Account/RegisterDialog.tsx";
import {Typography} from "@components/Typography.tsx";

type Props = {
  status: Auth["status"];
  onLogout: Auth["logout"];
};

const AccountDropdown: FC<Props> = ({ status, onLogout }) => {
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"login" | "register">("login");

  const onLoginClick = useCallback(() => {
    setDialogType("login");
    setOpen(true);
  }, [setDialogType, setOpen]);

  const onRegisterClick = useCallback(() => {
    setDialogType("register");
    setOpen(true);
  }, [setDialogType, setOpen]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {dialogType === "login" && <LoginDialog />}
        {dialogType === "register" && <RegisterDialog setOpen={setOpen} />}
      </Dialog>
      
      <DropdownMenu>
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
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onLoginClick}>
                <div className="flex gap-x-1 items-center">
                  <Icon name="arrow-left-end-on-rectangle" size={20} />
                  <Typography size='small'>Login</Typography>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={onRegisterClick}>
                <div className="flex gap-x-1 items-center">
                  <Icon name="user-plus-mini" size={20} />
                  <Typography size='small'>Register</Typography>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}

          {status === "loggedIn" && (
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="/profile" preload="intent" className="w-full">
                  <div className="flex gap-x-1">
                    <Icon name="user-circle-mini" size={20} />
                    <span>Profile</span>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={onLogout}>
                <div className="flex gap-x-1">
                  <Icon name="arrow-right-start-on-rectangle" size={20} />
                  <span>Log out</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { AccountDropdown };
