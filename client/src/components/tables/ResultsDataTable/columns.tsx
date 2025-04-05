import { Typography } from '@/components/Typography';
import { UserStats } from '@/types/user-types';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { DataTableColumnHeader } from '../DataTableColumnHeader';

export const columns: ColumnDef<UserStats>[] = [
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
      <Typography size="small">{row.getValue('name')}</Typography>
    ),
  },
  {
    accessorKey: 'wpm',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="WPM"
        className="text-left"
      />
    ),
    cell: ({ row }) => (
      <Typography size="small">{row.getValue('wpm')}</Typography>
    ),
  },
  {
    accessorKey: 'accuracy',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Accuracy"
        className="text-left"
      />
    ),
    cell: ({ row }) => (
      <Typography size="small">{row.getValue('accuracy')}</Typography>
    ),
  },
  {
    accessorKey: 'timestamp',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date"
        className="text-left"
      />
    ),
    cell: ({ row }) => (
      <Typography size="small">
        {dayjs(row.getValue('timestamp')).format('DD.MM.YYYY')}
      </Typography>
    ),
  },
];
