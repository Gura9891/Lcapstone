import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import eye from "../../assets/img/Color.png";
import * as Yup from "yup";
import { ACCESS_TOKEN, getStore, http } from "../../util/setting";
import { Input, Space } from "antd";
import axios from "axios";
import { Rate } from "antd";
import {
  getProfileApi,
  updateProfileApi,
} from "../../redux/reducers/userReducer";
import { Navigate, useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../redux/configStore";
import { Button, Popover } from "antd";

export interface Profile {
  chiTietKhoaHocGhiDanh: ChiTietKhoaHocGhiDanh[];
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}

export interface ChiTietKhoaHocGhiDanh {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  ngayTao: Date;
  danhGia: number;
}

type Props = {};

export default function Profile({}: Props) {
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();

  const [update, setUpdate] = useState<Profile>({ ...userLogin });

  const dispatch: AppDispatch = useDispatch();
  const [passwordType, setPassWordType] = useState("password");

  useEffect(() => {
    getProfileApi();
  }, []);
  if (!getStore(ACCESS_TOKEN)) {
    //Nếu chưa đăng nhập => Chuyển hướng trang
    alert("Đăng nhập để vào trang này !");
    navigate("/login");
  }

  const togglePassword = () => {
    if (passwordType === "password") {
      setPassWordType("text");
      return;
    }
    setPassWordType("password");
  };

  let regexName = new RegExp(
    "[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹs]+$"
  );

  let regexPhone = new RegExp(
    "^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$"
  );
  let regexPass = new RegExp(
    "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$"
  );

  const frm = useFormik({
    initialValues: {
      taiKhoan: userLogin.taiKhoan,
      matKhau: update.matKhau,
      hoTen: update.hoTen,
      soDT: update.soDT,
      email: update.email,
      maLoaiNguoiDung: userLogin.maLoaiNguoiDung,
      maNhom: userLogin.maNhom,
    },
    enableReinitialize: true,

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email không được bỏ trống")
        .email("Email không đúng định dạng"),
      hoTen: Yup.string()
        .required("Tên không được để trống")
        .matches(regexName, "Tên không đúng định dạng"),
      soDT: Yup.string()
        .required("Số điện thoại không được bỏ trống")
        .matches(regexPhone, "Số điện thoại không đúng định dạng"),
      matKhau: Yup.string()
        .required("Mật khẩu không được để trống")
        .min(6, "Mật khẩu phải từ 6-32 ký tự")
        .max(32, "Mật khẩu từ 6-32 ký tự")
        .matches(regexPass, "Mật khẩu không đúng định dạng"),
    }),
    onSubmit: (values) => {
      dispatch(updateProfileApi(values));
    },
  });

  useEffect(() => {
    dispatch(getProfileApi());
  }, []);

  useEffect(() => {
    setUpdate(userLogin);
  }, [userLogin]);
  const handleChangeInput = (e: any) => {
    let { id, value } = e.target;

    let newValue: any = { ...update };
    newValue[id] = value;
    setUpdate(newValue);
  };

  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);

  return (
    <div className="update">
      <div className="order  align-items-start flex-wrap justify-content-around ">
        <div className="nav-title">
          <h3 className="container " style={{ color: "white" }}>
            Học viên: {userLogin.hoTen}
          </h3>
          <div
            className="container nav flex-row nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <button
              className="nav-link active "
              id="v-pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-profile"
              type="button"
              role="tab"
              aria-controls="v-pills-profile"
              aria-selected="true"
            >
              Hồ sơ cá nhân
            </button>
            <button
              className="nav-link"
              id="v-pills-course-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-course"
              type="button"
              role="tab"
              aria-controls="v-pills-course"
              aria-selected="false"
            >
              Khoá học của tôi
            </button>
          </div>
        </div>
        <div className="content-right">
          <div
            className="tab-content border border-dark border-2"
            id="v-pills-tabContent"
          >
            <div
              className="container tab-pane fade show active"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <div className="panel-header">
                <p>
                  <i className="fa-solid fa-user"></i>
                  <span>Thông tin cá nhân</span>
                </p>
              </div>
              <div className="contain h-100 w-100 ">
                <form
                  className="form  flex-wrap justify-content-between"
                  onSubmit={frm.handleSubmit}
                >
                  <div className="form-group  mb-4">
                    <div className="input-group d-flex flex-column">
                      <h4>Email</h4>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control input-sm w-100"
                        onChange={frm.handleChange}
                        onInput={handleChangeInput}
                        defaultValue={update.email}
                      />
                      {frm.errors.email ? (
                        <span className="text-danger">{frm.errors.email} </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="form-group  mb-4">
                    <div className="input-group d-flex flex-column">
                      <h4>Tài khoản</h4>
                      <Popover trigger="hover" className="m-0">
                        <input
                          type="text"
                          name="taiKhoan"
                          id="taiKhoan"
                          className="form-control input-sm w-100"
                          aria-label="Disabled input example"
                          disabled
                          onChange={frm.handleChange}
                          onInput={handleChangeInput}
                          value={update.taiKhoan}
                        />
                      </Popover>
                    </div>
                  </div>
                  <div className="form-group mb-4 ">
                    <div className="input-group d-flex flex-column">
                      <h4>Họ tên</h4>
                      <input
                        data-type="hoTen"
                        type="text"
                        name="hoTen"
                        id="hoTen"
                        className="form-control input-sm w-100"
                        onChange={frm.handleChange}
                        defaultValue={update.hoTen}
                        onInput={handleChangeInput}
                      />

                      <span className="text-danger">{frm.errors.hoTen} </span>
                    </div>
                  </div>

                  <div className="form-group  mb-4">
                    <div className="input-group d-flex flex-column">
                      <h4>Số điện thoại</h4>
                      <input
                        data-type="phone"
                        type="text"
                        name="soDT"
                        id="soDT"
                        className="form-control input-sm w-100"
                        defaultValue={update.soDT}
                        onChange={frm.handleChange}
                        onInput={handleChangeInput}
                      />
                      <div className="text-danger position-absolute">
                        {frm.errors.soDT ? `${frm.errors.soDT}` : ""}
                      </div>
                      {/* <span className="text-danger">{frm.errors.soDT} </span> */}
                    </div>
                  </div>
                  <div className="form-group  mb-4">
                    <div className="input-group d-flex flex-column">
                      <h4>Mật khẩu</h4>
                      <input
                        data-type="password"
                        type={passwordType}
                        name="matKhau"
                        id="matKhau"
                        className="form-control input-sm w-100"
                        defaultValue={update.matKhau}
                        onChange={frm.handleChange}
                        onInput={handleChangeInput}
                      />

                      <span className="text-danger">{frm.errors.matKhau} </span>
                    </div>
                    <button
                      className="icon"
                      type="button"
                      onClick={togglePassword}
                    >
                      {passwordType === "password" ? (
                        <i className="fa-regular fa-eye-slash"></i>
                      ) : (
                        <i className="fa-regular fa-eye"></i>
                      )}
                    </button>
                  </div>
                  <div className="d-flex justify-content-between w-100 flex-row-reverse info">
                    <div className="submit">
                      <button type="submit" className="btn">
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div
              className="container tab-pane bg-white"
              id="v-pills-course"
              role="tabpanel"
              aria-labelledby="v-pills-course-tab"
            >
              <div className="mt-2">
                <div className="title d-flex justify-content-between">
                  <h2>Các khoá học đã tham gia</h2>
                  <div>
                    <Space direction="vertical">
                      <Search
                        placeholder="Nhập khoá học cần tìm"
                        onSearch={onSearch}
                        style={{ width: 400 }}
                      />
                    </Space>
                  </div>
                </div>

                <hr />
                {userLogin?.chiTietKhoaHocGhiDanh?.map(
                  (course: ChiTietKhoaHocGhiDanh, index: number) => {
                    return (
                      <div className="m-4" key={index}>
                        <div className="coursesRegistered d-flex border-top pt-2 bg-light">
                          <div className="imageCourse col-2 me-4">
                            <img
                              src={course.hinhAnh}
                              alt={course.tenKhoaHoc}
                              className="w-100"
                            />
                          </div>
                          <div className="detailCourse col-8 d-flex flex-column">
                            <h3>{course.tenKhoaHoc}</h3>
                            <p>{course.moTa}</p>
                          </div>
                          <div className="rate col-2 d-flex flex-column align-items-center">
                            <div>
                              <Rate value={course.danhGia} />
                            </div>
                            <span>{course.luotXem}</span>
                            <button className="btn"> Huỷ</button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
