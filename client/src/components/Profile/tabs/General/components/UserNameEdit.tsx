import { Icon } from '@components/Icon';
import InputGhost from '@components/InputGhost.tsx';
import { useChangeNicknameMutation } from '@components/Profile/tabs/General/queries.ts';
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
    const onMouseDown = () => {
      submitButtonDownRef.current = true;
    };
    const onMouseUp = () => {
      submitButtonDownRef.current = false;
    };

    input.addEventListener('blur-sm', onInputBlur);
    submitButton.addEventListener('mousedown', onMouseDown);
    submitButton.addEventListener('mouseup', onMouseUp);

    return () => {
      input.removeEventListener('blur-sm', onInputBlur);
      submitButton.removeEventListener('mousedown', onMouseDown);
      submitButton.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

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

  const onEditSubmit = useCallback(() => {
    if (!editName || editName === name) {
      return void setIsNameEditing(false);
    }

    changeNickName({ nickname: editName });

    setIsNameEditing(false);
  }, [setIsNameEditing, editName, changeNickName, name]);

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
        <Button variant="link" className="p-0 h-full" onClick={onEditToggle}>
          <Icon name="pencil-micro" size={16} className="text-subtext0" />
        </Button>
      )}

      <div
        className={`gap-1 items-center ${isNameEditing ? 'flex' : 'hidden'}`}
      >
        <Button
          variant="link"
          className="p-0 h-full"
          onClick={onEditSubmit}
          ref={submitButtonRef}
          disabled={isPending}
        >
          <Icon name="check" size={16} className="text-green-600" />
        </Button>

        <Button
          variant="link"
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
