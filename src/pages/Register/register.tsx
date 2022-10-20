import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import axios from "axios";
import { history } from "../../index";
import image from "../../assets/img/image.png";
import { registerApi } from "../../redux/reducers/userReducer";
import { AppDispatch } from "../../redux/configStore";
import { NavLink } from "react-router-dom";

type Props = {};

export default function Register({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const [passwordType, setPassWordType] = useState("password");
  const [passwordReType, setPassWordReType] = useState("password");

  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange = (e: any) => {
    setPasswordInput(e.target.value);
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPassWordType("text");
      return;
    }
    setPassWordType("password");
  };
  const toggleRePassword = () => {
    if (passwordReType === "password") {
      setPassWordReType("text");
      return;
    }
    setPassWordReType("password");
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
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maNhom: "GP01",
      email: "",
      passConfirm: "",
    },

    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Tên tài khoản không được bỏ trống"),
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
      passConfirm: Yup.string().when("matKhau", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("matKhau")],
          "Không trùng khớp mật khẩu đã nhập"
        ),
      }),
    }),
    onSubmit: (values) => {
      console.log(values);
      let action = registerApi(values);
      dispatch(action);
    },
  });

  return (
    <div className="register">
      <div className="container title">
        <h1>CyberSoft Elearning</h1>
      </div>
      {/* <div className="col-6">
        <img src={image} alt="..." className="w-100" height={1000} />
      </div> */}
      <section className="container register-content col-6">
        <div className="container content">
          <h1 className="title">ĐĂNG KÝ</h1>
          {/* <hr /> */}
          <form
            className="form"
            onSubmit={frm.handleSubmit}
          >
            <div className="form-group  mb-4">
              <div className="input-group d-flex flex-column">
                <h4>Tài khoản</h4>
                <input
                  type="text"
                  name="taiKhoan"
                  id="taiKhoan"
                  className="input form-control input-sm w-100"
                  placeholder="Tài khoản"
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                {frm.errors.taiKhoan ? (
                  <span className="text-danger">{frm.errors.taiKhoan} </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="form-group  mb-4">
              <div className="input-group d-flex flex-column">
                <h4>Mật khẩu</h4>
                <input
                  type={passwordType}
                  name="matKhau"
                  className="input form-control input-sm w-100"
                  placeholder="Mật khẩu"
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                  onInput={handlePasswordChange}
                  value={passwordInput}
                />

                <span className="text-danger">{frm.errors.matKhau} </span>
              </div>
              <button
              className="icon"
                type="button"
                style={{ background: "transparent" }}
                onClick={togglePassword}
              >
                {passwordType === "password" ? (
                  <i className="fa-regular fa-eye"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </button>
            </div>
            <div className="form-group  mb-4">
              <div className="input-group d-flex flex-column">
                <h4>Nhập lại mật khẩu</h4>
                <input
                  type={passwordReType}
                  name="passConfirm"
                  className="input form-control input-sm w-100"
                  placeholder="Password Confirm"
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                <span className="text-danger">{frm.errors.passConfirm}</span>
              </div>
              <button
              className="icon"
                type="button"
                style={{ background: "transparent" }}
                onClick={toggleRePassword}
              >
                {passwordReType === "password" ? (
                  <i className="fa-regular fa-eye"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </button>
            </div>

            <div className="form-group  mb-4">
              <div className="input-group d-flex flex-column">
                <h4>Họ tên</h4>
                <input
                  type="text"
                  name="hoTen"
                  id="hoTen"
                  className="input form-control input-sm w-100"
                  placeholder="Name"
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />

                <span className="text-danger">{frm.errors.hoTen} </span>
              </div>
            </div>
            <div className="form-group  mb-4">
              <div className="input-group d-flex flex-column">
                <h4>Email</h4>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input form-control input-sm w-100"
                  placeholder="Email"
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                {frm.errors.email ? (
                  <span className="text-danger">{frm.errors.email} </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="form-group mb-4">
              <div className="input-group d-flex flex-column">
                <h4>Số điện thoại</h4>
                <input
                  type="text"
                  name="soDT"
                  id="soDT"
                  className="input form-control input-sm w-100"
                  placeholder="Phone"
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                <span className="text-danger">{frm.errors.soDT} </span>
              </div>
            </div>

            <div className="register-button">
              <div className="submit">
                <button type="submit" className="btn-register">
                  Đăng ký
                </button>
              </div>
              <div className="signIn">
              <span>Bạn chưa có tài khoản?</span>
                <NavLink to="/login">
                  <button type="button" className="btn">
                    Đăng nhập
                  </button>
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
