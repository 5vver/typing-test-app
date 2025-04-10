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
      <div className="flex justify-center w-full">
        <Typography size="small">{row.getValue('name')}</Typography>
      </div>
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
      <div className="flex justify-center w-full">
        <Typography size="small">
          {dayjs(row.getValue('timestamp')).format('DD.MM.YYYY HH:mm:ss')}
        </Typography>
      </div>
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
      <div className="flex justify-center w-full">
        <Typography size="small">{row.getValue('wpm')}</Typography>
      </div>
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
      <div className="flex justify-center w-full">
        <Typography size="small">{row.getValue('accuracy')}</Typography>
      </div>
    ),
  },
  {
    accessorKey: 'totalWords',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Words"
        className="text-left"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center w-full">
        <Typography size="small">{row.getValue('totalWords')}</Typography>
      </div>
    ),
  },
  {
    accessorKey: 'correctWords',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Correct Words"
        className="text-left"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center w-full">
        <Typography size="small">{row.getValue('correctWords')}</Typography>
      </div>
    ),
  },
  {
    accessorKey: 'incorrectWords',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Incorrect Words"
        className="text-left"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center w-full">
        <Typography size="small">{row.getValue('incorrectWords')}</Typography>
      </div>
    ),
  },
  {
    accessorKey: 'totalChars',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Characters"
        className="text-left"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center w-full">
        <Typography size="small">{row.getValue('totalChars')}</Typography>
      </div>
    ),
  },
  {
    accessorKey: 'correctChars',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Correct Characters"
        className="text-left"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center w-full">
        <Typography size="small">{row.getValue('correctChars')}</Typography>
      </div>
    ),
  },
  {
    accessorKey: 'incorrectChars',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Incorrect Characters"
        className="text-left"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center w-full">
        <Typography size="small">{row.getValue('incorrectChars')}</Typography>
      </div>
    ),
  },
];
