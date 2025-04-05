import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { Button } from '../ui/button';
import { BaseDataTable } from './BaseDataTable';
import { DataTableProps } from './types';

const PaginationDataTable = <TData, TValue>({
  data,
  columns,
  tableOptions,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...tableOptions,
  });

  return (
    <div className="flex flex-col gap-4">
      <BaseDataTable table={table} />

      <div className="flex justify-end lg:justify-between items-center w-full">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="hidden lg:flex"
        >
          First
        </Button>

        <div className="flex gap-1 items-center justify-end">
          <div className="bg-background rounded-sm flex gap-1 p-2.5">
            <Typography size="small">{`${table.getState().pagination.pageIndex + 1} / ${table.getPageCount()}`}</Typography>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Icon name="chevron-left" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Icon name="chevron-right" />
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="hidden lg:flex"
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export { PaginationDataTable };
