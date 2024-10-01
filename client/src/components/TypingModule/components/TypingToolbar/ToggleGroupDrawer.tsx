import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group.tsx';
import { motion } from 'framer-motion';
import { type FC } from 'react';

type Props = {
  isOpened: boolean;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
};

const ToggleGroupDrawer: FC<Props> = ({
  isOpened,
  options,
  value,
  onValueChange,
}) => (
  <motion.div
    initial={{ width: 0, opacity: 0 }}
    animate={{
      width: isOpened ? 'auto' : 0,
      opacity: isOpened ? 1 : 0,
    }}
    transition={{ duration: 0.5 }}
    style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
  >
    <ToggleGroup
      type="single"
      size="sm"
      value={value}
      onValueChange={onValueChange}
    >
      {options.map((value) => (
        <ToggleGroupItem
          value={value}
          key={value}
          className="text-mauve text-sm font-normal"
        >
          {value}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  </motion.div>
);

export { ToggleGroupDrawer };
