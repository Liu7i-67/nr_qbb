/*
 * @Author: liu7i
 * @Date: 2022-04-22 14:06:27
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 15:57:49
 */

import React from "react";
import { IColumns } from "components/NGTable";
import { useLocalObservable, Observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "./store/RootStore";

/** @IRecordItem 活动单项 */
export interface IRecordItem {
  [key: string]: any;
}

export const useColumns = () => {
  const root = useStore();
  return useLocalObservable(() => {
    return {
      /**
       * @getList 列表项配置
       */
      get getList() {
        const _columns: IColumns[] = [
          {
            title: "",
            dataIndex: "key",
            align: "center",
            key: "key",
            width: 45,
            cantDrag: true,
            fixed: "left",
            className: "columns_header",
          },
          {
            title: "活动分类",
            dataIndex: "activityTypeName",
            key: "activityTypeName",
            width: 160,
            ellipse: true,
            cantDrag: true,
          },
          {
            title: "活动参与人数",
            dataIndex: "joinNum",
            key: "joinNum",
            width: 120,
          },
          {
            title: "活动名称",
            dataIndex: "name",
            key: "name",
            width: 200,
            ellipse: true,
            render: (text, record: IRecordItem) => {
              return text;
            },
          },
          {
            title: "活动状态",
            dataIndex: "activityStatusText",
            key: "activityStatusText",
            width: 90,
            render: (text: string) => {
              let color = "";
              switch (text) {
                case "进行中":
                  color = "successColor";
                  break;
                case "已过期":
                  color = "secondaryTextColor";
                  break;
                case "未开始":
                  color = "mainColor";
                  break;
                case "待确认":
                  color = "dangerColor";
                  break;
                default:
                  return;
              }
              return <span className={`${color}`}>{text}</span>;
            },
          },
          {
            title: "活动生效时间",
            dataIndex: "validityStartDate",
            key: "validityStartDate",
            width: 170,
          },
          {
            title: "是否启用",
            dataIndex: "disable",
            key: "disable",
            width: 90,
          },
          {
            title: "适用用户",
            dataIndex: "applicableUsersFlag",
            key: "applicableUsersFlag",
            width: 90,
            render: (text: any) => (!!text ? "所有用户" : "部分用户"),
          },
          {
            title: "审核状态",
            dataIndex: "approvalStatus",
            key: "approvalStatus",
            width: 100,
            render: (text) => {
              let statusText = "";
              let color = "";
              switch (text) {
                case "WAIT_APPROVAL":
                case "APPROVAL":
                  statusText = "待审核";
                  color = "mainColor";
                  break;
                case "REFUSE":
                  statusText = "已拒绝";
                  color = "dangerColor";
                  break;
                case "PASS":
                  statusText = "已完成";
                  color = "successColor";
                  break;
                default:
                  return;
              }
              if (statusText) {
                return <span className={`${color}`}>{statusText}</span>;
              }
              return "-";
            },
          },
          {
            title: "允许促销共用",
            dataIndex: "otherUseSameProjectNotActivity",
            key: "otherUseSameProjectNotActivity",
            width: 150,
            render: (text) => (!!text ? "是" : "否"),
          },

          {
            title: "可参与次数",
            dataIndex: "numberOfParticipation",
            key: "numberOfParticipation",
            width: 120,
          },

          {
            title: "允许使用会员折扣",
            dataIndex: "otherUseMemberDiscount",
            key: "otherUseMemberDiscount",
            width: 130,
            render: (text) => (!!text ? "是" : "否"),
          },
          {
            title: "创建时间",
            dataIndex: "createDate",
            key: "createDate",
            width: 120,
          },
          {
            title: "创建人",
            dataIndex: "createName",
            key: "createName",
            width: 120,
            render: (text) => text || "-",
          },
          {
            title: "操作",
            key: "options",
            width: 120,
            className: "columns_option",
            fixed: "right",
            render: (_, record: IRecordItem) => {
              return <Observer>{() => <div>edit</div>}</Observer>;
            },
          },
        ];
        return _columns;
      },
    };
  });
};
