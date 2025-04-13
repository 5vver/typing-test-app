import { useChangeNicknameMutation } from '@/components/Profile/tabs/GeneralTab/queries';
import { Icon } from '@components/Icon';
import InputGhost from '@components/InputGhost.tsx';
import { Button } from '@components/ui/button.tsx';
import { useToast } from '@hooks/use-toast.ts';
import { type Auth } from '@utils/auth.tsx';
import {
  type ChangeEvent,
  type FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type Props = {
  name: string;
  refetch: Auth['refetch'];
};

const UserNameEdit: FC<Props> = ({ name, refetch }) => {
  const [editName, setEditName] = useState<string | undefined>();
  const [isNameEditing, setIsNameEditing] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const ghostNameRef = useRef<HTMLSpanElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const submitButtonDownRef = useRef(false);

  const displayName = editName ?? name;

  const { toast } = useToast();

  const { mutate: changeNickName, isPending } = useChangeNicknameMutation({
    toastEmitter: toast,
    refetch,
  });

  useEffect(() => {
    const input = nameInputRef.current;
    const submitButton = submitButtonRef.current;

    if (!input || !submitButton) {
      return;
    }

    const onInputBlur = () => {
      if (submitButtonDownRef.current) {
        return;
      }

      setIsNameEditing(false);
      setEditName(undefined);
    };
    const onInputKeyPress = (event: KeyboardEvent) => {
      const key = event.key;

      if (key === 'Enter') {
        event.preventDefault();
        onEditSubmit(input.value, name);
      }

      if (key === 'Escape') {
        event.preventDefault();
        setIsNameEditing(false);
        setEditName(undefined);
      }
    };
    const onMouseDown = () => {
      submitButtonDownRef.current = true;
    };
    const onMouseUp = () => {
      submitButtonDownRef.current = false;
    };

    input.addEventListener('blur', onInputBlur);
    input.addEventListener('keydown', onInputKeyPress);
    submitButton.addEventListener('mousedown', onMouseDown);
    submitButton.addEventListener('mouseup', onMouseUp);

    return () => {
      input.removeEventListener('blur', onInputBlur);
      input.removeEventListener('keydown', onInputKeyPress);
      submitButton.removeEventListener('mousedown', onMouseDown);
      submitButton.removeEventListener('mouseup', onMouseUp);
    };
    /** name dep is for Enter change name variable passed from props */
  }, [name]);

  useLayoutEffect(() => {
    const ghost = ghostNameRef.current;
    const input = nameInputRef.current;

    if (!ghost || !input) {
      return;
    }

    input.style.width = `${ghost.offsetWidth}px`;
  }, [displayName]);

  const onEditToggle = useCallback(() => {
    setIsNameEditing((prev) => !prev);

    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [setIsNameEditing]);

  const onEditChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target?.value;

      if (value.length > 20) {
        return;
      }

      setEditName(value);
    },
    [setEditName],
  );

  const onEditSubmit = useCallback(
    (newName?: string, oldName?: string) => {
      const newValue = newName ?? editName ?? '';
      const oldValue: string = oldName ?? name ?? '';

      if (!newValue || newValue === oldValue) {
        return void setIsNameEditing(false);
      }

      changeNickName({ nickname: newValue });

      setIsNameEditing(false);
    },
    [setIsNameEditing, editName, changeNickName, name],
  );

  const onSumbitButtonClick = useCallback(() => {
    onEditSubmit();
  }, [onEditSubmit]);

  return (
    <div className="flex gap-1 items-center">
      <span
        className="text-lg font-medium absolute invisible whitespace-pre"
        ref={ghostNameRef}
      >
        {displayName}
      </span>

      <InputGhost
        value={displayName}
        className={`text-lg font-medium w-auto h-auto p-0 select-none`}
        readOnly={!isNameEditing || isPending}
        ref={nameInputRef}
        onChange={onEditChange}
        formNoValidate
      />

      {!isNameEditing && (
        <Button variant="wrapper" className="p-0 h-full" onClick={onEditToggle}>
          <Icon name="pencil-micro" size={16} className="text-subtext0" />
        </Button>
      )}

      <div
        className={`gap-1 items-center ${isNameEditing ? 'flex' : 'hidden'}`}
      >
        <Button
          variant="wrapper"
          className="p-0 h-full"
          onClick={onSumbitButtonClick}
          ref={submitButtonRef}
          disabled={isPending}
        >
          <Icon name="check" size={16} className="text-green-600" />
        </Button>

        <Button
          variant="wrapper"
          className="p-0 h-full"
          onClick={onEditToggle}
          disabled={isPending}
        >
          <Icon name="x-mark" size={16} className="text-red-600" />
        </Button>
      </div>
    </div>
  );
};

export { UserNameEdit };
