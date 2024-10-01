import { Combobox } from '@components/Combobox.tsx';
import { Icon } from '@components/Icon';
import InputGhost from '@components/InputGhost.tsx';
import { ToggleGroupDrawer } from '@components/TypingModule/components/TypingToolbar/ToggleGroupDrawer.tsx';
import { settingsAtom, statusAtom } from '@components/TypingModule/store.ts';
import { Typography } from '@components/Typography.tsx';
import { Button } from '@components/ui/button.tsx';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible.tsx';
import { Separator } from '@components/ui/separator.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom, useAtomValue } from 'jotai';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

const timeSettings = ['60', '90', '120'];
const wordsSettings = ['50', '100', '150'];

type Props = {
  timerCount: number;
  onSettingsApply?: () => void;
};

const TypingToolbar: FC<Props> = ({ timerCount, onSettingsApply }) => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const [isOpened, setIsOpened] = useState(false);
  const [settingsDetails, setSettingsDetails] = useState<'time' | 'words'>(
    'time',
  );
  const [settingsTimer, setSettingsTimer] = useState(settings.timerCount);
  const [settingsWords, setSettingsWords] = useState(settings.words);
  const [settingsDict, setSettingsDict] = useState(settings.dictionary);

  const { isTyping } = useAtomValue(statusAtom);

  useEffect(() => {
    if (isTyping) {
      setIsOpened(false);
    }
  }, [isTyping]);

  const onTimerChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);

      if (!value || value < 1 || value > 999) return;

      setSettingsTimer(value);
    },
    [setSettingsTimer],
  );

  const onWordsChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);

      if (!value || value < 1 || value > 999) return;

      setSettingsWords(value);
    },
    [setSettingsWords],
  );

  const onApply = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      timerCount: settingsTimer,
      words: settingsWords,
      dictionary: settingsDict,
    }));
    setIsOpened(false);
    onSettingsApply?.();
  }, [
    settingsTimer,
    settingsWords,
    settingsDict,
    setSettings,
    setIsOpened,
    onSettingsApply,
  ]);

  return (
    <Collapsible
      open={isOpened}
      onOpenChange={setIsOpened}
      className="flex flex-col gap-2"
    >
      <div className="flex justify-between items-center w-full relative">
        <div className="flex-1 flex gap-0.5 items-center justify-center">
          <Icon name="clock" size={20} strokeColor="lavender" />
          <Typography size="large" className="text-lavender w-[21px]">
            {timerCount}
          </Typography>
        </div>

        <CollapsibleTrigger asChild className="absolute right-0">
          <motion.div
            key="settings-button"
            initial={{ opacity: 0, display: 'block' }}
            animate={{
              opacity: !isTyping && !isOpened ? 1 : 0,
              display: !isTyping && !isOpened ? 'block' : 'none',
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <Button variant="link" className="w-[20px] h-[20px] p-0">
              <Icon name="adjustments-horizontal" size={20} color="lavender" />
            </Button>
          </motion.div>
        </CollapsibleTrigger>
      </div>

      <AnimatePresence>
        <motion.div
          key="settings-content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpened ? 'auto' : 0, opacity: isOpened ? 1 : 0 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ overflow: 'hidden' }}
        >
          <CollapsibleContent>
            <div className="flex w-full gap-2 items-center justify-between py-2 px-4 bg-mantle rounded-lg overflow-auto">
              <div className="flex gap-2 items-center">
                <div className="flex gap-2 items-center">
                  <Button
                    variant="ghost"
                    className="flex gap-2 p-0 bg-transparent hover:bg-transparent group"
                    onClick={() => setSettingsDetails('time')}
                  >
                    <Icon
                      name="clock"
                      size={16}
                      className="text-mauve group-hover:text-text"
                    />
                    <Typography
                      size="small"
                      className="text-mauve group-hover:text-text"
                    >
                      time:
                    </Typography>
                  </Button>

                  <InputGhost
                    name="time"
                    type="number"
                    onChange={onTimerChange}
                    value={settingsTimer}
                    className="w-[50px] h-[30px] px-0 pt-[9px] leading-none text-sm text-mauve"
                  />

                  <ToggleGroupDrawer
                    isOpened={settingsDetails === 'time'}
                    options={timeSettings}
                    value={settingsTimer.toString()}
                    onValueChange={(value) => {
                      setSettingsTimer(parseInt(value, 10));
                    }}
                  />
                </div>

                <Separator orientation="vertical" className="h-4" />

                <div className="flex gap-2 items-center">
                  <Button
                    variant="ghost"
                    className="flex gap-2 p-0 bg-transparent hover:bg-transparent group"
                    onClick={() => setSettingsDetails('words')}
                  >
                    <Icon
                      name="word"
                      size={16}
                      className="text-mauve group-hover:text-text"
                    />
                    <Typography
                      size="small"
                      className="text-mauve group-hover:text-text"
                    >
                      words:
                    </Typography>
                  </Button>

                  <InputGhost
                    name="words"
                    type="number"
                    onChange={onWordsChange}
                    value={settingsWords}
                    className="w-[50px] h-[30px] px-0 pt-[9px] leading-none text-sm text-mauve"
                  />

                  <ToggleGroupDrawer
                    isOpened={settingsDetails === 'words'}
                    options={wordsSettings}
                    value={settingsWords.toString()}
                    onValueChange={(value) => {
                      setSettingsWords(parseInt(value, 10));
                    }}
                  />
                </div>

                <Separator orientation="vertical" className="h-4" />

                <div className="flex gap-2 items-center">
                  <Icon name="language-mini" size={16} color="mauve" />
                  <Typography size="small" className="text-mauve">
                    dictionary:
                  </Typography>

                  <Combobox
                    values={[
                      { label: 'russian', value: 'ru' },
                      { label: 'english', value: 'en' },
                    ]}
                    initialValue={settingsDict}
                    onSelect={(value) => {
                      setSettingsDict(value);
                    }}
                    placeholder="..."
                    noFoundText="No dictionary found"
                    searchPlaceholder="Search dictionary..."
                    className="text-mauve font-normal"
                    searchBy="label"
                  />

                  <Button
                    variant="ghost"
                    className="bg-transparent hover:bg-transparent p-0 group w-10 h-10"
                  >
                    <Icon
                      name="ellipsis-vertical"
                      size={20}
                      className="text-mauve group-hover:text-text"
                    />
                  </Button>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={onApply}
                className="bg-transparent text-mauve font-normal"
                size="sm"
              >
                Apply
              </Button>
            </div>
          </CollapsibleContent>
        </motion.div>
      </AnimatePresence>
    </Collapsible>
  );
};

export { TypingToolbar };
