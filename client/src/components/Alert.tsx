import { Icon } from '@components/Icon';
import { Typography } from '@components/Typography.tsx';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/alert-dialog.tsx';
import { Button } from '@components/ui/button.tsx';
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useCallback,
} from 'react';

type Props = {
  alertOpen: boolean;
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
  setAlertMessage?: Dispatch<SetStateAction<string>>;
  title?: string;
  message?: string;
};

const Alert: FC<Props> = ({
  alertOpen,
  setAlertOpen,
  setAlertMessage,
  title = '',
  message = '',
}) => {
  const closeAlert = useCallback(() => {
    setAlertMessage?.('');
    setAlertOpen(false);
  }, [setAlertMessage, setAlertOpen]);

  return (
    <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex gap-x-2 items-center">
            <Icon
              name="exclamation-circle-outline"
              size={24}
              strokeColor="red"
            />
            <Typography>{title}</Typography>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Typography>{message}</Typography>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={closeAlert}>Close</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { Alert };
