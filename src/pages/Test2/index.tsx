/*
 * @Author: liu7i
 * @Date: 2022-04-27 10:45:34
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-27 11:05:45
 */

import React from "react";
import { TreeSelect, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { IForm } from "./interface";

const Page = () => {
  const form = useForm<IForm>();

  return (
    <div className="p-20">
      <div>项目分类</div>
      <Controller
        render={({ field }) => (
          <TreeSelect
            style={{ width: "300px" }}
            placeholder="请选择"
            allowClear
            treeData={[
              {
                value: "0",
                title: "一级分类",
                children: [{ value: "0-1", title: "次级分类" }],
              },
              {
                value: "1",
                title: "二级分类",
                children: [{ value: "1-1", title: "次级分类2" }],
              },
            ]}
            {...field}
          />
        )}
        name="projectType"
        control={form.control}
        rules={{ required: true }}
      />

      <div className="mt-20">
        <Button
          type="primary"
          onClick={async () => {
            const res = await form.trigger();
            console.log("校验结果:", res);
            if (res) {
              const values = form.getValues();
              console.log("values:", values);
            } else {
              console.log("err:", form.formState.errors);
            }
          }}
        >
          保存
        </Button>
      </div>
    </div>
  );
};

export default Page;
