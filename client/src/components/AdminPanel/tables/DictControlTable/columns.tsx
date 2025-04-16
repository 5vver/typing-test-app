import { DataTableColumnHeader } from '@/components/tables/DataTableColumnHeader';
import { Typography } from '@/components/Typography';
import { DictData } from '@/types/test-types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<DictData>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
        className="text-left"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center w-full">
        <Typography size="small">{row.getValue('name')}</Typography>
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
        className="text-left"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center w-full">
        <Typography size="small">{row.getValue('name')}</Typography>
      </div>
    ),
  },
];
