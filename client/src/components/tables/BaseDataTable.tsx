import { flexRender, Table as TableInstanse } from '@tanstack/react-table';
import { useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

type BaseTableProps<TData> = {
  table: TableInstanse<TData>;
};

const BaseDataTable = <TData = unknown,>({ table }: BaseTableProps<TData>) => {
  const columns = table.getAllColumns();

  const getTableBody = useCallback(() => {
    const tableRowModel = table.getRowModel();

    if (tableRowModel.rows.length > 0) {
      return table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && 'selected'}
          className="border-surface1"
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ));
    }

    return (
      <TableRow className="border-surface1">
        <TableCell colSpan={columns.length} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    );
  }, [table]);

  return (
    <div className="rounded-md border-1 border-surface1">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-surface1">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>{getTableBody()}</TableBody>
      </Table>
    </div>
  );
};

export { BaseDataTable };
