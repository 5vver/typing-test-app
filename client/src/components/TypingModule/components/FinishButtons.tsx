import { Icon } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { WithAuth } from '@/components/WithAuth';
import { useAtomValue } from 'jotai';
import { FC, useCallback, useRef } from 'react';
import { statusAtom } from '../store';

type Props = {
  onReload: () => void;
  onSave: () => void;
  isLoading?: boolean;
};

const FinishButtons: FC<Props> = ({ onReload, onSave, isLoading }) => {
  const status = useAtomValue(statusAtom);

  const reloadButtonRef = useRef<HTMLButtonElement>(null);

  const onReloadClick = useCallback(() => {
    if (reloadButtonRef.current) {
      reloadButtonRef.current.blur();
    }

    onReload();
  }, [onReload]);

  return (
    <div className="flex gap-2">
      <Button
        onClick={onReloadClick}
        disabled={isLoading}
        variant="outline"
        size="icon"
        className="w-[48px] h-[48px]"
        ref={reloadButtonRef}
        aria-description="Reload"
      >
        {isLoading ? (
          <Spinner size="xs" />
        ) : (
          <Icon name="arrow-path" size={16} />
        )}
      </Button>

      {status.isFinished && (
        <WithAuth>
          <Button
            disabled={isLoading}
            variant="outline"
            size="icon"
            className="w-[48px] h-[48px]"
            aria-description="Save and reload"
            onClick={onSave}
          >
            <Icon name="bookmark-micro" size={16} className="text-red-500" />
          </Button>
        </WithAuth>
      )}
    </div>
  );
};

export { FinishButtons };
