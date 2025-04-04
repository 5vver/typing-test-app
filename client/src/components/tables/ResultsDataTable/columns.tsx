import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { UserStats } from '@/types/user-types';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

export const columns: ColumnDef<UserStats>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === 'asc');
        }}
      >
        <Typography size="small">Name</Typography>
        <Icon name="chevron-up-down" size={4} />
      </Button>
    ),
    cell: ({ row }) => (
      <Typography size="small">{row.getValue('name')}</Typography>
    ),
  },
  {
    accessorKey: 'wpm',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === 'asc');
        }}
      >
        <Typography size="small">WPM</Typography>
        <Icon name="chevron-up-down" size={4} />
      </Button>
    ),
    cell: ({ row }) => (
      <Typography size="small">{row.getValue('wpm')}</Typography>
    ),
  },
  {
    accessorKey: 'accuracy',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === 'asc');
        }}
      >
        <Typography size="small">Accuracy</Typography>
        <Icon name="chevron-up-down" size={16} />
      </Button>
    ),
    cell: ({ row }) => (
      <Typography size="small">{row.getValue('accuracy')}</Typography>
    ),
  },
  {
    accessorKey: 'timestamp',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === 'asc');
        }}
      >
        <Typography size="small">Date</Typography>
        <Icon name="chevron-up-down" size={4} />
      </Button>
    ),
    cell: ({ row }) => (
      <Typography size="small">
        {dayjs(row.getValue('timestamp')).format('DD.MM.YYYY')}
      </Typography>
    ),
  },
];
