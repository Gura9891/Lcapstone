import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { store } from "./redux/configStore";
import HomeTemplate from "./templates/HomeTemplate";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./assets/scss/style.scss";
import Home from "./pages/HomePage/Home";
import { createBrowserHistory } from "history";

import CoursesList from "./pages/CoursesList/CoursesList";
import Register from "./pages/Register/register";
import Login from "./pages/LoginPage/Login";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import Detail from "./pages/Detail/Detail";
import AdminTemplate from "./templates/AdminTemplate";
import HomeAdmin from "./pages/Admin/Home/HomeAdmin";
import CourseAdmin from "./pages/Admin/Course/CourseAdmin";
import LoginAdmin from "./pages/Admin/Login/LoginAdmin";
import UserAdmin from "./pages/Admin/User/UserAdmin";
import TableCourse from "./Component/TableAdmin/TableCourse";
import TableUser from "./Component/TableAdmin/TableUser";

export const history = createBrowserHistory({ window });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route path="" element={<Home />}></Route>
          <Route index element={<Home />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>

          <Route path="course">
            <Route path=":maDanhMuc" element={<CoursesList />}></Route>
          </Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="detail">
            <Route path=":maKhoaHoc" element={<Detail />}></Route>
          </Route>
          <Route path="search">
            <Route path=":tenKhoaHoc" element={<Search />}></Route>
          </Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="admin" element={<AdminTemplate />}>
          <Route path="" element={<LoginAdmin />}></Route>
          <Route path="home" element={<HomeAdmin />}></Route>
          <Route path="course" element={<CourseAdmin />}></Route>
          <Route path="login" element={<LoginAdmin />}></Route>
          <Route path="user" element={<UserAdmin />}></Route>
          <Route path="test" element={<TableCourse />}></Route>
          <Route path="test2" element={<TableUser />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
