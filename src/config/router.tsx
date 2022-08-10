/*
 * @Author: liu7i
 * @Date: 2022-04-19 10:38:52
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-29 09:36:45
 */
import React from "react";
import Layout from "@/layouts/Layout";
import Home from "pages/Home";
import Formik from "pages/Formik";
import ReactHookForm from "pages/ReactHookForm";
import IndexedDB from "pages/IndexedDB";
import Router from "pages/Router";
import Table from "pages/Table";
import Test from "pages/Test";
import Test2 from "pages/Test2";
import Page404 from "pages/Page404";
import CanvasTools from "pages/CanvasTools";
import AdvancedSearch from "pages/AdvancedSearch";
import ToDoList from "pages/ToDoList";
import type { RouteObject } from "react-router-dom";

export const router: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/hook-form", element: <ReactHookForm /> },
      { path: "/formik", element: <Formik /> },
      { path: "/table", element: <Table /> },
      { path: "/test", element: <Test /> },
      { path: "/test2", element: <Test2 /> },
      { path: "/canvas", element: <CanvasTools /> },
      { path: "/todo", element: <ToDoList /> },
      { path: "/index", element: <IndexedDB /> },
      { path: "/router", element: <Router /> },
      { path: "/advanced-search", element: <AdvancedSearch /> },
      { path: "*", element: <Page404 /> },
    ],
  },
];
