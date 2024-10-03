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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover.tsx';
import { FC, useEffect, useState } from 'react';

type Props = {
  values: LabelValue<string | undefined>[];
  onSelect?: (value: string) => void;
  noFoundText?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  value?: string;
  initialValue?: string;
  className?: string;
  searchBy?: 'label' | 'value';
};

const Combobox: FC<Props> = ({
  values,
  onSelect,
  noFoundText,
  placeholder,
  searchPlaceholder,
  value,
  initialValue,
  className,
  searchBy,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    initialValue ?? value ?? '',
  );

  useEffect(() => {
    setSelectedValue(value ?? '');
  }, [value]);

  return (
    <Popover open={isOpened} onOpenChange={setIsOpened}>
      <PopoverTrigger asChild className={className}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpened}
          className="w-36 justify-between"
        >
          {selectedValue
            ? values.find((v) => v.value === selectedValue)?.label
            : (placeholder ?? 'Select value...')}
          <Icon
            name="chevron-up-down"
            className="ml-2 h-4 w-4 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className={className}>
          <CommandInput placeholder={searchPlaceholder ?? 'Search values...'} />
          <CommandList>
            <CommandEmpty>{noFoundText ?? 'Nothing found...'}</CommandEmpty>
            <CommandGroup className={className}>
              {values.map((v) => (
                <CommandItem
                  key={v.value}
                  value={searchBy === 'label' ? v.label : v.value}
                  onSelect={(currentValue) => {
                    const selected =
                      searchBy === 'label'
                        ? (values.find(({ label }) => label === currentValue)
                            ?.value ?? '')
                        : currentValue;

                    setSelectedValue(selected);
                    onSelect?.(selected);
                    setIsOpened(false);
                  }}
                >
                  <Icon
                    name="check-circle"
                    className={cn(
                      'mr-2 w-4 h-4',
                      selectedValue === v.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {v.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { Combobox };
