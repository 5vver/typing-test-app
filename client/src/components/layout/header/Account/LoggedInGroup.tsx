import { type FC, type MouseEvent, useCallback, useState } from "react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@components/ui/dropdown-menu.tsx";
import { Icon } from "@components/Icon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog.tsx";

type Props = {
  onLogoutClick: () => void;
};

export const LoggedInGroup: FC<Props> = ({ onLogoutClick }) => {
  const [open, setOpen] = useState(false);

  const onInnerLogout = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();

      setOpen(true);
    },
    [setOpen],
  );

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out of your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onLogoutClick}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenuGroup>
        <DropdownMenuItem onClick={onInnerLogout}>
          <div className="flex gap-x-1">
            <Icon name="arrow-right-start-on-rectangle" size={20} />
            <span>Log out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
};
