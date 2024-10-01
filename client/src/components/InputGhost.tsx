import { cn } from '@/lib/utils.ts';
import { Input } from '@components/ui/input.tsx';
import { ComponentProps } from 'react';

const InputGhost = (props: ComponentProps<typeof Input>) => (
  <Input
    {...props}
    className={cn(
      'px-0 border-none focus-visible:ring-transparent bg-transparent outline-none focus:outline-none ring-offset-transparent',
      props.className,
    )}
  />
);

export default InputGhost;
