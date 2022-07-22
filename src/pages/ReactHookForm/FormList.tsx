/*
 * @Author: liu7i
 * @Date: 2022-04-27 10:35:35
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-27 10:36:45
 */
import { ChangeEvent } from "react";

export interface IThat {
  [key: string]: any;
}

export const getFormList = (that: IThat) => [
  {
    className: "add_project_modal_base",
    list: [
      {
        type: "treeSelect",
        field: "type",
        label: "项目分类",
        fieldDecorator: {
          rules: [{ required: true, message: "请选择项目分类!" }],
        },
        attribute: {
          treeData: that.projectType,
          placeholder: "请选择",
        },
        className: "add_project_modal_item",
      },
      {
        className: "add_project_modal_item name_limit",
        type: "input",
        field: "name",
        label: "项目名称",
        fieldDecorator: {
          rules: [
            { required: true, message: "请输入项目名称!" },
            { min: 2, max: 200, message: "长度必须为2-200个字符!" },
          ],
        },
        attribute: {
          onBlur: that.onNameBlur,
          placeholder: "请输入项目名称",
          maxLength: 200,
        },
      },
      {
        className: "add_project_modal_item name_limit",
        type: "input",
        field: "projectNumber",
        label: "项目编码",
        fieldDecorator: {
          rules: [{ max: 20, message: "长度必须少于20个字符!" }],
        },
        attribute: {
          placeholder: "请输入项目编码",
          maxLength: 20,
        },
      },
      {
        className: "add_project_modal_item name_limit",
        type: "input",
        field: "medicalInsuranceCode",
        label: "医保编码",
        fieldDecorator: {
          rules: [{ max: 20, message: "长度必须少于20个字符!" }],
        },
        attribute: {
          onBlur: that.onMedicalInsuranceCodeBlur,
          placeholder: "医保编码",
          maxLength: 20,
        },
      },
      {
        className: "add_project_modal_item name_limit",
        type: "inputNumber",
        field: "taxRate",
        label: "税率",
        attribute: {
          placeholder: "税率",
          min: 0,
          precision: 2,
          max: 9999,
          formatter: (value: Number) => `${value}%`,
          parser: (value: String) => value.replace("%", ""),
        },
      },
      {
        className: "add_project_modal_item name_limit",
        type: "input",
        field: "projectAlias",
        label: "展示名称",
        fieldDecorator: {
          rules: [{ min: 2, max: 30, message: "长度必须为2-30个字符!" }],
        },
        attribute: {
          onBlur: that.onProjectAliasBlur,
          placeholder: "请输入展示名称",
          maxLength: 30,
        },
      },
      {
        type: "employeePicker",
        field: "dept",
        label: "治疗科室",
        attribute: {
          options: that.departList,
          placeholder: "请输入治疗科室",
          allowClear: true,
        },
        className: "add_project_modal_item",
      },
      {
        className: "add_project_modal_item name_limit",
        type: "input",
        field: "partName",
        label: "部位",
        fieldDecorator: {
          rules: [{ min: 1, max: 30, message: "长度必须为1-30个字符!" }],
        },
        attribute: {
          onBlur: that.onPartNameBlur,
          placeholder: "请输入部位",
          maxLength: 30,
        },
      },
    ],
  },
  {
    className: "add_project_modal_anestheticFee",
    list: [
      {
        type: "input",
        field: "anestheticFee",
        label: "麻醉费（仅作为发票打印算法使用，不另做其他用途）",
        fieldDecorator: {
          rules: [
            {
              pattern: /^\d+\.?\d{0,2}$/,
              message: "请输入最多两位含两位小数的数字！",
            },
          ],
        },
        attribute: {
          maxLength: 8,
          placeholder: "请输入麻醉费",
          addonBefore: "￥",
        },
      },
    ],
  },
  {
    show: that.isEdit ? "" : "none",
    list: [
      {
        type: "radio",
        field: "status",
        label: "状态",
        fieldDecorator: {
          onChange: that.onStatusChange,
        },
        attribute: {
          options: [
            {
              value: 0,
              label: "禁用",
            },
            {
              value: 1,
              label: "启用",
            },
          ],
        },
      },
    ],
  },
  {
    className: "flex_wrap",
    list: [
      {
        type: "input",
        field: "allocateRatio",
        label: "秀域业绩分配比例",
        className: "add_project_modal_item",
        fieldDecorator: {
          rules: [
            {
              pattern: /^(\d{0,2}(\.\d{0,1})?|100)$/,
              message: "请输入最多含一位小数的数字（0-100）！",
            },
          ],
        },
        attribute: {
          addonAfter: "%",
        },
      },
      {
        type: "radio",
        field: "allocateFlag",
        label: "销售业绩是否分配多人",
        className: "operate_type",
        fieldDecorator: {
          rules: [{ required: true }],
        },
        attribute: {
          options: [
            {
              value: true,
              label: "是",
            },
            {
              value: false,
              label: "否",
            },
          ],
        },
      },
    ],
  },
  {
    className: "flex_wrap",
    list: [
      {
        type: "radio",
        field: "operationFlag",
        label: "手术类型",
        className: "operate_type",
        fieldDecorator: {
          initialValue: 0,
          onChange: that.onOperateChange,
          rules: [{ required: true }],
        },
        attribute: {
          options: [
            {
              value: 0,
              label: "非手术类",
            },
            {
              value: 1,
              label: "手术类",
            },
          ],
        },
      },
      {
        type: "radio",
        field: "anaesthesia",
        className: `anaesthesia ${that.operateFlag ? "" : "mb-0"}`,
        fieldDecorator: {
          initialValue: "0",
        },
        attribute: {
          style: { display: that.operateFlag ? "block" : "none" },
          options: that.anesthesiaType,
        },
      },
    ],
  },
  {
    className: "flex_wrap",
    list: [
      {
        type: "checkbox",
        field: "limitCustomerType",
        label: "可购买客户类型",
        fieldDecorator: {
          initialValue:
            that.limitCustomerType &&
            that.limitCustomerType.map((item: { value: number }) => item.value),
          rules: [{ required: true, message: "请选择!" }],
        },
        attribute: {
          options: that.limitCustomerType,
        },
      },
      {
        className: "add_project_modal_item name_limit",
        type: "input",
        field: "limitNum",
        label: "限购数量",
        tips: "同一个客户可购买该项目的数量上限",
        fieldDecorator: {
          rules: [
            {
              pattern: /^([1-9]\d{0,1})?$/,
              message: "请输入正整数,最大不超过99",
            },
          ],
        },
        attribute: {
          placeholder: "未输入数量则默认为无限量",
          onBlur: (e: ChangeEvent<HTMLInputElement>) =>
            that.onBlurLimitNum(e.target.value),
        },
      },
      {
        className: "add_project_modal_item name_limit",
        type: "input",
        field: "storageNum",
        label: "库存量",
        tips: "该项目当前可销售的库存量",
        fieldDecorator: {
          rules: [
            {
              pattern: /^([1-9]\d{0,3})?$/,
              message: "请输入正整数,最大不超过9999",
            },
          ],
        },
        attribute: {
          placeholder: "未输入数量则默认为无限量",
        },
      },
    ],
  },
  {
    className: "flex_wrap",
    list: [
      {
        type: "checkbox",
        field: "specialFlag",
        className: "discountFlag mr-18",
        label: "其他",
        attribute: {
          options: [
            {
              value: true,
              label: "特色项目",
            },
          ],
        },
      },
      {
        type: "checkbox",
        field: "treatFlag",
        className: "discountFlag pt-35",
        label: "",
        fieldDecorator: {
          initialValue: [true],
        },
        attribute: {
          options: [
            {
              value: true,
              label: "治疗项目",
            },
          ],
          onChange: that.onTreatFlag,
        },
      },
    ],
  },
  {
    className: "flex_wrap",
    show: that.treatFlag ? "" : "none",
    list: [
      {
        type: "checkbox",
        field: "injectionFlag",
        className: "discountFlag mr-18",
        attribute: {
          options: [
            {
              value: true,
              label: "注射项目",
            },
          ],
          onChange: that.injectionFlagChange,
        },
      },
      {
        type: "custom",
        field: "injectionProject",
        className: `${that.injectionFlag ? "" : "mb-0 blankProject"}`,
        custom: that.getInjectionProject,
      },
      {
        type: "checkbox",
        field: "canNotLimitDeduct",
        className: "discountFlag",
        label: "",
        attribute: {
          options: [
            {
              value: true,
              label: "无限划扣",
            },
          ],
        },
      },
    ],
  },
  {
    list: [
      {
        type: "employeePicker",
        field: "saleConsumeType",
        label: "销售/消耗业绩类别",
        attribute: {
          options: that.saleConsumeType,
          placeholder: "请输入销售/消耗业绩类别",
          allowClear: true,
        },
        className: "add_project_modal_item",
      },
      {
        type: "employeePicker",
        field: "manualConsemeType",
        label: "手工消耗类别",
        attribute: {
          options: that.manualConsemeType,
          placeholder: "请输入手工消耗类别",
          allowClear: true,
        },
        className: "add_project_modal_item",
      },
    ],
  },
  {
    list: [
      {
        type: "inputNumber",
        field: "projectDuration",
        label: "项目时长（分钟）",
        className: "add_project_modal_introduce",
        fieldDecorator: {
          initialValue: that.intervalMinuteRange,
        },
        attribute: {
          min: 0,
          precision: 0,
          max: 9999,
        },
      },
      {
        type: "switch",
        field: "wxStatus",
        label: "公众号到期提醒",
        className: "flex_left",
        tips: '根据【公众号推送】中"到期提醒"配置的通知节点，进行项目未使用到期作废通知',
        fieldDecorator: {
          valuePropName: "checked",
        },
        formItemLayout: {
          labelCol: { span: 12 },
          wrapperCol: { span: 4 },
        },
      },
      {
        type: "switch",
        field: "smsStatus",
        label: "短信到期提醒",
        tips: '根据【短信管理-自动发送管理】中"到期提醒"配置的通知节点，进行项目未使用到期作废通知',
        formItemLayout: {
          labelCol: { span: 12 },
          wrapperCol: { span: 4 },
        },
        className: "flex_left",
        fieldDecorator: {
          valuePropName: "checked",
        },
      },
    ],
  },
  {
    list: [
      {
        type: "inputNumber",
        field: "projectCostSingleTime",
        label: "项目成本（单次）",
        className: "add_project_modal_introduce",
        fieldDecorator: {},
        attribute: {
          min: 0,
          precision: 0,
          maxLength: 8,
        },
      },
      {
        type: "textArea",
        field: "comment",
        label: "项目介绍",
        className: "add_project_modal_introduce",
        fieldDecorator: {
          initialValue: "",
        },
        attribute: {
          maxLength: 800,
          onBlur: that.onIntroBlur,
          placeholder: "输入内容不超过800字",
        },
      },
    ],
  },
];
