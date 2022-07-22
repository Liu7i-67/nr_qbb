/*
 * @Author: liu7i
 * @Date: 2022-04-20 13:50:20
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-20 15:07:05
 */

import { useEffect, useState } from "react";
import faker from "faker";
import { useStore } from "../store/RootStore";
import { observer } from "@quarkunlimit/qu-mobx";
import { createTable, useTable } from "@tanstack/react-table";
import { makeData, IPerson } from "../mockData";
import "./index.scss";

const ColumnOrderTable = observer(() => {
  const root = useStore();
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
  const [data, setData] = useState(() => makeData(20));
  const [columns] = useState(() => [...defaultColumns]);

  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState<string[]>([]);

  const rerender = () => setData(() => makeData(20));

  const instance = useTable(table, {
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
  });

  const randomizeColumns = () => {
    instance.setColumnOrder(
      faker.helpers.shuffle(instance.getAllLeafColumns().map((d) => d.id))
    );
  };

  return (
    <div className="mt-20 ColumnOrderTable">
      <div className="inline-block border border-black shadow rounded">
        <div className="px-1 border-b border-black">
          <label>
            <input {...instance.getToggleAllColumnsVisibilityProps()} />
            展示全部
          </label>
        </div>
        {instance.getAllLeafColumns().map((column) => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input {...column.getToggleVisibilityProps()} /> {column.id}
              </label>
            </div>
          );
        })}
      </div>
      <div className="h-4" />
      <div className="flex flex-wrap gap-2">
        <button onClick={() => rerender()} className="border p-1">
          刷新数据
        </button>
        <button onClick={() => randomizeColumns()} className="border p-1">
          改变列顺序
        </button>
      </div>
      <div className="h-4" />
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
    </div>
  );
});

export default ColumnOrderTable;
