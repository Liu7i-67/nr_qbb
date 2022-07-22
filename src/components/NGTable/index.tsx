/*
 * @Author: liu7i
 * @Date: 2022-04-20 17:39:14
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 17:07:06
 */
import Header from "./modules/Header";
import Setting from "./modules/Setting";
import Content from "./modules/Content";
import SettingModal from "./modules/SettingModal";
import { useStore, Provider } from "./store/RootStore";
import { createTable, useTable } from "@tanstack/react-table";
import { observer, useSyncProps, toJS, useWhen } from "@quarkunlimit/qu-mobx";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import {
  INGTableProps,
  INGTableRef,
  IColumns,
  IPropsStore,
  IRowItem,
} from "./interface";
import "./index.scss";

const table = createTable<{ Row: IRowItem }>();

const NGTable = observer(
  forwardRef<INGTableRef, INGTableProps>((props, ref) => {
    const { columns, dataSource } = props;
    const root = useStore();
    const { mainStore } = root;
    useSyncProps<IPropsStore>(
      root,
      ["onRef", "columns", "dataSource", "rowKey"],
      props
    );
    useImperativeHandle(props.onRef || ref, () => ({}));
    const test = useRef<HTMLDivElement | null>(null);

    const __columns = table.createColumns(
      columns.map((c) => {
        return table.createDataColumn(c.key, {
          header: () => <span>{c.title}</span>,
          width: c.width ? +c.width : undefined,
          cell: (props) => {
            if (c.dataIndex === "key") {
              return props.row.index + 1;
            }

            if (c.render) {
              return (
                c?.render?.(
                  props.value,
                  props.row.original,
                  props.row.index,
                  false
                ) ||
                props.value ||
                `${props.value}` ||
                ""
              );
            }
            return props.value || `${props.value}` || "";
          },
          meta: c,
        });
      })
    );

    const [_columns] = useState<typeof __columns>(() => [...__columns]);

    const instance = useTable(table, {
      data: dataSource || [],
      columns: _columns,
      onColumnVisibilityChange: mainStore.logic.changeColumnVisibility,
      state: {
        columnPinning: mainStore.logic.columnPinning,
        columnVisibility: toJS(mainStore.logic.columnVisibility),
      },
    });

    useSyncProps(root, "instance", instance);

    useEffect(() => {
      mainStore.logic.initColumns(props.columns);
    }, [props.columns]);

    useEffect(() => {
      window.addEventListener("resize", () => {
        if (test.current) {
          mainStore.logic.changeShowMode(
            test.current.clientWidth,
            instance.getTableWidth()
          );
        }
      });

      return () => {
        window.removeEventListener("resize", () => {
          if (test.current) {
            mainStore.logic.changeShowMode(
              test.current.clientWidth,
              instance.getTableWidth()
            );
          }
        });
      };
    }, []);

    useWhen(
      () => !!test.current,
      () => {
        mainStore.logic.changeShowMode(
          test.current!.clientWidth,
          instance.getTableWidth()
        );
      }
    );

    return (
      <div className="ng-table-box">
        <div className="ng-table" style={{ height: "500px" }} ref={test}>
          <Header />
          <Content />
        </div>
        <Setting />
        <SettingModal />
      </div>
    );
  })
);

export default observer(
  forwardRef<INGTableRef, INGTableProps>((props, ref) => (
    <Provider>
      <NGTable {...props} ref={ref} />
    </Provider>
  ))
);

export type { INGTableRef, IColumns };
