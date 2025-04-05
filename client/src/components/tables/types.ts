import { ColumnDef, TableOptions } from '@tanstack/react-table';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableOptions?: TableOptions<TData>;
};

export type { DataTableProps };
