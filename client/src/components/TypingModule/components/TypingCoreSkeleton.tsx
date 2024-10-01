import { Skeleton } from '@components/ui/skeleton.tsx';
import { type FC } from 'react';

const TypingCoreSkeleton: FC = () => (
  <div className="flex flex-col gap-[36px] justify-center h-[144px]">
    <div className="flex gap-2 h-[16px]">
      <Skeleton className="w-1/5" />
      <Skeleton className="w-1/3" />
      <Skeleton className="w-1/5" />
      <Skeleton className="w-1/4" />
    </div>
    <div className="flex gap-2 h-[16px]">
      <Skeleton className="w-2/5" />
      <Skeleton className="w-1/5" />
      <Skeleton className="w-1/3" />
      <Skeleton className="w-1/4" />
    </div>
    <div className="flex gap-2 h-[16px]">
      <Skeleton className="w-3/5" />
      <Skeleton className="w-3/5" />
      <Skeleton className="w-1/4" />
    </div>
  </div>
);

export { TypingCoreSkeleton };
