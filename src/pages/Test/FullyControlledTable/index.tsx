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
import { createTable, paginateRowsFn, useTable } from "@tanstack/react-table";
import { makeData, IPerson } from "../mockData";
import "./index.scss";

const table = createTable<{ Row: IPerson }>();

const defaultColumns = table.createColumns([
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
]);

const FullyControlledTable = observer(() => {
  const root = useStore();
  const [data, setData] = React.useState(() => makeData(1000));
  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ]);

  const rerender = React.useReducer(() => ({}), {})[1];

  // Create the instance and pass your options
  const instance = useTable(table, {
    data,
    columns,
    paginateRowsFn,
  });

  // Manage your own state
  const [state, setState] = React.useState(instance.initialState);

  // Override the state managers for the table instance to your own
  instance.setOptions((prev) => ({
    ...prev,
    state,
    onStateChange: setState,
  }));

  return (
    <div className="mt-20 FullyControlledTable">
      <table {...instance.getTableProps()}>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((header) => (
                <th {...header.getHeaderProps()}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...instance.getTableBodyProps()}>
          {instance.getRowModel().rows.map((row) => (
            <tr {...row.getRowProps()}>
              {row.getVisibleCells().map((cell) => (
                <td {...cell.getCellProps()}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {instance.getFooterGroups().map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((header) => (
                <th {...header.getFooterProps()}>
                  {header.isPlaceholder ? null : header.renderFooter()}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-2" />
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
            {instance.getState().pagination.pageIndex + 1} of{" "}
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
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  );
});

export default FullyControlledTable;
