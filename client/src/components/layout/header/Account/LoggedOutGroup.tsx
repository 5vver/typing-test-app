import { Icon } from '@components/Icon';
import { Typography } from '@components/Typography.tsx';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@components/ui/dropdown-menu.tsx';
import { type FC } from 'react';

type Props = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
};

export const LoggedOutGroup: FC<Props> = ({
  onLoginClick,
  onRegisterClick,
}) => {
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem onClick={onLoginClick}>
        <div className="flex gap-x-1 items-center">
          <Icon name="arrow-left-end-on-rectangle" size={20} />
          <Typography size="small">Login</Typography>
        </div>
      </DropdownMenuItem>

      <DropdownMenuItem onClick={onRegisterClick}>
        <div className="flex gap-x-1 items-center">
          <Icon name="user-plus-mini" size={20} />
          <Typography size="small">Register</Typography>
        </div>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};
