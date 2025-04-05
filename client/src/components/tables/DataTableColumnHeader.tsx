import { cn } from '@/lib/utils';
import { Column, SortDirection } from '@tanstack/react-table';
import { HTMLAttributes, useCallback } from 'react';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { Button } from '../ui/button';

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
} & HTMLAttributes<HTMLDivElement>;

const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <Typography className={cn(className)}>{title}</Typography>;
  }

  const getSortIcon = useCallback((direction: SortDirection | false) => {
    if (direction === 'asc') {
      return <Icon name="arrow-up-micro" size={16} />;
    }

    if (direction === 'desc') {
      return <Icon name="arrow-down-micro" size={16} />;
    }

    return <Icon name="arrows-up-down-micro" size={16} />;
  }, []);

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === 'asc');
        }}
        className="flex gap-0.5"
      >
        <Typography size="small">{title}</Typography>
        {getSortIcon(column.getIsSorted())}
      </Button>
    </div>
  );
};

export { DataTableColumnHeader };
