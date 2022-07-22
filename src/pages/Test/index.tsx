/*
 * @Author: liu7i
 * @Date: 2022-04-20 11:12:36
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-20 15:13:32
 */

import { observer } from "@quarkunlimit/qu-mobx";
import { useStore, Provider } from "./store/RootStore";
import SimpleTable from "./SimpleTable";
import ColumnOrderTable from "./ColumnOrderTable";
import ColumnPinTable from "./ColumnPinTable";
import ColumnSizeTable from "./ColumnSizeTable";
import ColumnVisibilityTable from "./ColumnVisibilityTable";
import EditableDataTable from "./EditableDataTable";
import ExpandingTable from "./ExpandingTable";
import FiltersTable from "./FiltersTable";
import FullyControlledTable from "./FullyControlledTable";
import GroupingTable from "./GroupingTable";
import PaginationTable from "./PaginationTable";
import RowSelectionTable from "./RowSelectionTable";
import SortingTable from "./SortingTable";
import "./index.scss";

const Test = observer(() => {
  const root = useStore();

  return (
    <div className="p-20">
      <details>
        <summary onClick={() => root.logic.changeShowItem("basic")}>
          基本
        </summary>
        {root.logic.showItem.includes("basic") && <SimpleTable />}
      </details>
      <details>
        <summary onClick={() => root.logic.changeShowItem("row-hide")}>
          列显示隐藏
        </summary>
        {root.logic.showItem.includes("row-hide") && <ColumnVisibilityTable />}
      </details>
      <details>
        <summary onClick={() => root.logic.changeShowItem("row-hide-change")}>
          列显示隐藏、列改变顺序
        </summary>
        {root.logic.showItem.includes("row-hide-change") && (
          <ColumnOrderTable />
        )}
      </details>
      <details>
        <summary onClick={() => root.logic.changeShowItem("row-hide-split")}>
          列显示隐藏、列改变顺序、分裂模式
        </summary>
        {root.logic.showItem.includes("row-hide-split") && <ColumnPinTable />}
      </details>
      <details>
        <summary onClick={() => root.logic.changeShowItem("drug")}>
          改变列宽
        </summary>
        {root.logic.showItem.includes("drug") && <ColumnSizeTable />}
      </details>
      <details>
        <summary onClick={() => root.logic.changeShowItem("edit")}>
          可编辑表格、列搜索、分页
        </summary>
        {root.logic.showItem.includes("edit") && <EditableDataTable />}
      </details>
      <details>
        <summary onClick={() => root.logic.changeShowItem("child")}>
          嵌套子级表格
        </summary>
        {root.logic.showItem.includes("child") && <ExpandingTable />}
      </details>
      <details>
        <summary onClick={() => root.logic.changeShowItem("filter")}>
          过滤
        </summary>
        {root.logic.showItem.includes("filter") && <FiltersTable />}
      </details>
      <details>
        <summary onClick={() => root.logic.changeShowItem("control")}>
          完全受控表格
        </summary>
        {root.logic.showItem.includes("control") && <FullyControlledTable />}
      </details>
      <details>
        <summary onClick={() => root.logic.changeShowItem("group")}>
          分组统计表格
        </summary>
        {root.logic.showItem.includes("group") && <GroupingTable />}
      </details>
      <details>
        <summary onClick={() => root.logic.changeShowItem("fy")}>
          分页表格
        </summary>
        {root.logic.showItem.includes("fy") && <PaginationTable />}
      </details>
      <details>
        <summary onClick={() => root.logic.changeShowItem("choose")}>
          可选择表格
        </summary>
        {root.logic.showItem.includes("choose") && <RowSelectionTable />}
      </details>
      <details>
        <summary onClick={() => root.logic.changeShowItem("order")}>
          排序表格
        </summary>
        {root.logic.showItem.includes("order") && <SortingTable />}
      </details>
    </div>
  );
});

export default observer(() => (
  <Provider>
    <Test />
  </Provider>
));
