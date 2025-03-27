import { cn } from '@/lib/utils.ts';
import { Input } from '@components/ui/input.tsx';
import { ComponentProps, forwardRef } from 'react';

const InputGhost = forwardRef<HTMLInputElement, ComponentProps<typeof Input>>(
  (props, ref) => (
    <Input
      {...props}
      ref={ref}
      className={cn(
        'px-0 border-none focus-visible:ring-transparent bg-transparent outline-hidden focus:outline-hidden ring-offset-transparent',
        props.className,
      )}
    />
  ),
);

export default InputGhost;
