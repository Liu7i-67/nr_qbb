/*
 * @Author: liu7i
 * @Date: 2022-04-20 13:50:20
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-20 15:05:09
 */

import React, { HTMLAttributes } from "react";
import { useStore } from "../store/RootStore";
import { observer } from "@quarkunlimit/qu-mobx";
import {
  createTable,
  sortRowsFn,
  useTable,
  ColumnSort,
} from "@tanstack/react-table";
import { makeData, IPerson } from "../mockData";
import "./index.scss";

let table = createTable<{ Row: IPerson }>();

const SortingTable = observer(() => {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [sorting, setSorting] = React.useState<ColumnSort[]>([]);

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
  const refreshData = () => setData(() => makeData(100000));

  const instance = useTable(table, {
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    sortRowsFn: sortRowsFn,
  });
  return (
    <div className="mt-20 SortingTable">
      <div className="h-2" />
      <table {...instance.getTableProps({})}>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((header) => {
                return (
                  <th {...header.getHeaderProps()}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...(header.column.getCanSort()
                          ? header.column.getToggleSortingProps({
                              className: "cursor-pointer select-none",
                            })
                          : {})}
                      >
                        {header.renderHeader()}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...instance.getTableBodyProps()}>
          {instance
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr {...row.getRowProps()}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.renderCell()}</td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>{instance.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
    </div>
  );
});

export default SortingTable;
