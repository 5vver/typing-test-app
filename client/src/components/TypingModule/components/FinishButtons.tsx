import { Icon } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { WithAuth } from '@/components/WithAuth';
import { useSaveResults } from '@/queries/user-queries';
import { useAtomValue } from 'jotai';
import { FC, useCallback, useRef } from 'react';
import { settingsAtom, statsAtom, statusAtom } from '../store';

type Props = {
  onReload: () => void;
  onSave?: () => void;
  isLoading?: boolean;
};

const FinishButtons: FC<Props> = ({ onReload, onSave, isLoading }) => {
  const status = useAtomValue(statusAtom);
  const stats = useAtomValue(statsAtom);
  const settings = useAtomValue(settingsAtom);

  const { mutate: saveResults, isPending: isSavingResults } = useSaveResults();

  const reloadButtonRef = useRef<HTMLButtonElement>(null);

  const onReloadClick = useCallback(() => {
    if (reloadButtonRef.current) {
      reloadButtonRef.current.blur();
    }

    onReload();
  }, [onReload]);

  const onSaveClick = useCallback(() => {
    saveResults({ stats, testId: settings.dictionary });
    onSave?.();
  }, [onSave, saveResults, stats, settings]);

  return (
    <div className="flex gap-2">
      <Button
        onClick={onReloadClick}
        disabled={isLoading || isSavingResults}
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
            disabled={isLoading || isSavingResults}
            variant="outline"
            size="icon"
            className="w-[48px] h-[48px]"
            aria-description="Save and reload"
            onClick={onSaveClick}
          >
            <Icon name="bookmark-micro" size={16} className="text-red-500" />
          </Button>
        </WithAuth>
      )}
    </div>
  );
};

export { FinishButtons };
