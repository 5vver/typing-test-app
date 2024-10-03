import { cn } from '@/lib/utils.ts';
import { LabelValue } from '@/types';
import { Icon } from '@components/Icon';
import { Button } from '@components/ui/button.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/command.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog.tsx';
import { type FC, useEffect, useState } from 'react';

type Props = {
  values: LabelValue<string | undefined>[];
  value?: string;
  onSelect?: (value: string) => void;
};

const DictSearchDialog: FC<Props> = ({ values, value, onSelect }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value ?? '');

  useEffect(() => {
    setSelectedValue(value ?? '');
  }, [value]);

  return (
    <>
      <Dialog open={isOpened} onOpenChange={setIsOpened}>
        <DialogContent className="p-2">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <Command className="bg-transparent">
            <CommandInput placeholder="Search..." className="bg-transparent" />
            <CommandList>
              <CommandEmpty>Nothing found</CommandEmpty>
              <CommandGroup>
                {values.map(({ value, label }) => (
                  <CommandItem
                    key={value}
                    value={value}
                    onSelect={(selectValue) => {
                      setSelectedValue(selectValue);
                      setIsOpened(false);
                      onSelect?.(selectValue);
                    }}
                  >
                    <Icon
                      name="check-circle"
                      className={cn(
                        'mr-2 w-4 h-4 text-lavender',
                        value === selectedValue ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>

      <Button
        variant="ghost"
        className="bg-transparent hover:bg-transparent p-0 group w-10 h-10"
        onClick={() => setIsOpened(true)}
      >
        <Icon
          name="ellipsis-vertical"
          size={20}
          className="text-mauve group-hover:text-text"
        />
      </Button>
    </>
  );
};

export { DictSearchDialog };
