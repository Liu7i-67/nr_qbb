/*
 * @Author: liu7i
 * @Date: 2022-04-20 13:50:20
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-20 15:08:40
 */

import { useEffect, useState } from "react";
import faker from "faker";
import { useStore } from "../store/RootStore";
import { observer } from "@quarkunlimit/qu-mobx";
import { createTable, useTable } from "@tanstack/react-table";
import { makeData, IPerson } from "../mockData";
import "./index.scss";

const ColumnPinTable = observer(() => {
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
  const [data, setData] = useState(() => makeData(5000));
  const [columns] = useState(() => [...defaultColumns]);

  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [columnPinning, setColumnPinning] = useState({});
  const [isSplit, setIsSplit] = useState(false);
  const rerender = () => setData(() => makeData(5000));

  const instance = useTable(table, {
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
      columnPinning,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
  });

  console.log('columnPinning:',columnPinning)

  const randomizeColumns = () => {
    instance.setColumnOrder(
      faker.helpers.shuffle(instance.getAllLeafColumns().map((d) => d.id))
    );
  };

  const getHeaderProps = (
    headerProps: ReturnType<typeof instance.getHeaderProps>
  ) => {
    return {
      ...headerProps,
      className: `h-16`,
    };
  };

  return (
    <div className="mt-20 ColumnPinTable">
      <div className="inline-block border border-black shadow rounded">
        <div className="px-1 border-b border-black">
          <label>
            <input {...instance.getToggleAllColumnsVisibilityProps()} />{" "}
            显示所有
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
      <div>
        <label>
          <input
            type="checkbox"
            checked={isSplit}
            onChange={(e) => setIsSplit(e.target.checked)}
          />
          分裂模式
        </label>
      </div>
      <div className={`flex ${isSplit ? "gap-4" : ""}`}>
        {isSplit ? (
          <table
            {...instance.getTableProps({})}
            className="border-2 border-black"
          >
            <thead>
              {instance.getLeftHeaderGroups().map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((header) => (
                    <th {...getHeaderProps(header.getHeaderProps())}>
                      <div className="whitespace-nowrap">
                        {header.isPlaceholder ? null : header.renderHeader()}
                      </div>
                      {!header.isPlaceholder && header.column.getCanPin() && (
                        <div className="flex gap-1 justify-center">
                          {header.column.getIsPinned() !== "left" ? (
                            <button
                              className="border rounded px-2"
                              onClick={() => {
                                header.column.pin("left");
                              }}
                            >
                              {"<="}
                            </button>
                          ) : null}
                          {header.column.getIsPinned() ? (
                            <button
                              className="border rounded px-2"
                              onClick={() => {
                                header.column.pin(false);
                              }}
                            >
                              X
                            </button>
                          ) : null}
                          {header.column.getIsPinned() !== "right" ? (
                            <button
                              className="border rounded px-2"
                              onClick={() => {
                                header.column.pin("right");
                              }}
                            >
                              {"=>"}
                            </button>
                          ) : null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...instance.getTableBodyProps()}>
              {instance
                .getRowModel()
                .rows.slice(0, 20)
                .map((row) => {
                  return (
                    <tr {...row.getRowProps()}>
                      {row.getLeftVisibleCells().map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>{cell.renderCell()}</td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : null}
        <table
          {...instance.getTableProps({})}
          className="border-2 border-black"
        >
          <thead>
            {(isSplit
              ? instance.getCenterHeaderGroups()
              : instance.getHeaderGroups()
            ).map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((header) => (
                  <th {...getHeaderProps(header.getHeaderProps())}>
                    <div className="whitespace-nowrap">
                      {header.isPlaceholder ? null : header.renderHeader()}
                    </div>
                    {!header.isPlaceholder && header.column.getCanPin() && (
                      <div className="flex gap-1 justify-center">
                        {header.column.getIsPinned() !== "left" ? (
                          <button
                            className="border rounded px-2"
                            onClick={() => {
                              header.column.pin("left");
                            }}
                          >
                            {"<="}
                          </button>
                        ) : null}
                        {header.column.getIsPinned() ? (
                          <button
                            className="border rounded px-2"
                            onClick={() => {
                              header.column.pin(false);
                            }}
                          >
                            X
                          </button>
                        ) : null}
                        {header.column.getIsPinned() !== "right" ? (
                          <button
                            className="border rounded px-2"
                            onClick={() => {
                              header.column.pin("right");
                            }}
                          >
                            {"=>"}
                          </button>
                        ) : null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...instance.getTableBodyProps()}>
            {instance
              .getRowModel()
              .rows.slice(0, 20)
              .map((row) => {
                return (
                  <tr {...row.getRowProps()}>
                    {(isSplit
                      ? row.getCenterVisibleCells()
                      : row.getVisibleCells()
                    ).map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.renderCell()}</td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isSplit ? (
          <table
            {...instance.getTableProps({})}
            className="border-2 border-black"
          >
            <thead>
              {instance.getRightHeaderGroups().map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((header) => (
                    <th {...getHeaderProps(header.getHeaderProps())}>
                      <div className="whitespace-nowrap">
                        {header.isPlaceholder ? null : header.renderHeader()}
                      </div>
                      {!header.isPlaceholder && header.column.getCanPin() && (
                        <div className="flex gap-1 justify-center">
                          {header.column.getIsPinned() !== "left" ? (
                            <button
                              className="border rounded px-2"
                              onClick={() => {
                                header.column.pin("left");
                              }}
                            >
                              {"<="}
                            </button>
                          ) : null}
                          {header.column.getIsPinned() ? (
                            <button
                              className="border rounded px-2"
                              onClick={() => {
                                header.column.pin(false);
                              }}
                            >
                              X
                            </button>
                          ) : null}
                          {header.column.getIsPinned() !== "right" ? (
                            <button
                              className="border rounded px-2"
                              onClick={() => {
                                header.column.pin("right");
                              }}
                            >
                              {"=>"}
                            </button>
                          ) : null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...instance.getTableBodyProps()}>
              {instance
                .getRowModel()
                .rows.slice(0, 20)
                .map((row) => {
                  return (
                    <tr {...row.getRowProps()}>
                      {row.getRightVisibleCells().map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>{cell.renderCell()}</td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
});

export default ColumnPinTable;
