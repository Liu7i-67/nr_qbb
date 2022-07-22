/*
 * @Author: liu7i
 * @Date: 2022-04-20 13:50:20
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-20 15:05:09
 */

import React, {
  useState,
  useReducer,
  useEffect,
  useMemo,
  useRef,
  HTMLAttributes,
} from "react";
import { useStore } from "../store/RootStore";
import { observer } from "@quarkunlimit/qu-mobx";
import {
  Column,
  columnFilterRowsFn,
  createTable,
  globalFilterRowsFn,
  paginateRowsFn,
  TableInstance,
  useTable,
  ColumnFilter,
} from "@tanstack/react-table";
import { makeData, IPerson } from "../mockData";
import "./index.scss";

const FiltersTable = observer(() => {
  const root = useStore();
  let table = createTable<{ Row: IPerson }>();
  const rerender = useReducer(() => ({}), {})[1];
  const [columnFilters, setColumnFilters] = React.useState<ColumnFilter[]>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const columns = React.useMemo(
    () =>
      table.createColumns([
        table.createGroup({
          header: "Name",
          footer: (props) => props.column.id,
          columns: [
            table.createDataColumn("firstName", {
              cell: (info) => info.value,
              footer: (props) => props.column.id,
            }),
            table.createDataColumn((row) => row.lastName, {
              id: "lastName",
              cell: (info) => info.value,
              header: () => <span>Last Name</span>,
              footer: (props) => props.column.id,
            }),
          ],
        }),
        table.createGroup({
          header: "Info",
          footer: (props) => props.column.id,
          columns: [
            table.createDataColumn("age", {
              header: () => "Age",
              footer: (props) => props.column.id,
            }),
            table.createGroup({
              header: "More Info",
              columns: [
                table.createDataColumn("visits", {
                  header: () => <span>Visits</span>,
                  footer: (props) => props.column.id,
                }),
                table.createDataColumn("status", {
                  header: "Status",
                  footer: (props) => props.column.id,
                }),
                table.createDataColumn("progress", {
                  header: "Profile Progress",
                  footer: (props) => props.column.id,
                }),
              ],
            }),
          ],
        }),
      ]),
    []
  );

  const [data, setData] = React.useState(() => makeData(100000));
  const refreshData = () => setData((old) => [...old]);

  const instance = useTable(table, {
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    columnFilterRowsFn: columnFilterRowsFn,
    globalFilterRowsFn: globalFilterRowsFn,
    paginateRowsFn: paginateRowsFn,
  });
  return (
    <div className="mt-20 FiltersTable">
      <div>
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
      </div>
      <div className="h-2" />
      <table {...instance.getTableProps({})}>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((header) => {
                return (
                  <th {...header.getHeaderProps()}>
                    {header.isPlaceholder ? null : (
                      <>
                        {header.renderHeader()}
                        {header.column.getCanColumnFilter() ? (
                          <div>
                            <Filter
                              column={header.column}
                              instance={instance}
                            />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...instance.getTableBodyProps()}>
          {instance.getRowModel().rows.map((row) => {
            return (
              <tr {...row.getRowProps()}>
                {row.getVisibleCells().map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.renderCell()}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => instance.setPageIndex(0)}
          disabled={!instance.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => instance.previousPage()}
          disabled={!instance.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => instance.nextPage()}
          disabled={!instance.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => instance.setPageIndex(instance.getPageCount() - 1)}
          disabled={!instance.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {instance.getState().pagination.pageIndex + 1} of
            {instance.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={instance.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              instance.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={instance.getState().pagination.pageSize}
          onChange={(e) => {
            instance.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{instance.getGlobalFilteredRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(columnFilters, null, 2)}</pre>
    </div>
  );
});

export default FiltersTable;

function Filter({
  column,
  instance,
}: {
  column: Column<any>;
  instance: TableInstance<any>;
}) {
  const firstValue =
    instance.getPreColumnFilteredRowModel().flatRows[0].values[column.id];

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <input
        type="number"
        min={Number(column.getPreFilteredMinMaxValues()[0])}
        max={Number(column.getPreFilteredMinMaxValues()[1])}
        // @ts-ignore
        value={(column.getColumnFilterValue()?.[0] ?? "") as string}
        onChange={(e) =>
          // @ts-ignore
          column.setColumnFilterValue((old) => [e.target.value, old?.[1]])
        }
        placeholder={`Min (${column.getPreFilteredMinMaxValues()[0]})`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        min={Number(column.getPreFilteredMinMaxValues()[0])}
        max={Number(column.getPreFilteredMinMaxValues()[1])}
        // @ts-ignore
        value={(column.getColumnFilterValue()?.[1] ?? "") as string}
        onChange={(e) =>
          // @ts-ignore
          column.setColumnFilterValue((old) => [old?.[0], e.target.value])
        }
        placeholder={`Max (${column.getPreFilteredMinMaxValues()[1]})`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(column.getColumnFilterValue() ?? "") as string}
      onChange={(e) => column.setColumnFilterValue(e.target.value)}
      placeholder={`Search... (${column.getPreFilteredUniqueValues().size})`}
      className="w-36 border shadow rounded"
    />
  );
}
