import { type FC } from "react";
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

type Props = {
  status: Auth["status"];
  onLogout: Auth["logout"];
};

const AccountDropdown: FC<Props> = ({ status, onLogout }) => {
  return (
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
            <DropdownMenuItem>
              <Link to="/login" className="w-full">
                <div className="flex gap-x-1">
                  <Icon name="arrow-left-end-on-rectangle" size={20} />
                  <span>Login</span>
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/register" className="w-full">
                <div className="flex gap-x-1">
                  <Icon name="user-plus-mini" size={20} />
                  <span>Register</span>
                </div>
              </Link>
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
  );
};

export { AccountDropdown };
