import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import image from "../../assets/img/image.png";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/configStore";
import { LoginApi } from "../../redux/reducers/userReducer";

type Props = {};

export default function Login({}: Props) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [passwordType, setPassWordType] = useState("password");
  const { userToken } = useSelector((state: RootState) => state.userReducer);
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

  let regexPass = new RegExp(
    "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$"
  );
  const frm = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },

    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Tên tài khoản không được bỏ trống"),

      matKhau: Yup.string()
        .required("Mật khẩu không được để trống")
        .min(6, "Mật khẩu phải từ 6-32 ký tự")
        .max(32, "Mật khẩu từ 6-32 ký tự")
        .matches(regexPass, "Mật khẩu không đúng định dạng"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(LoginApi(values));
    },
  });

  useEffect(() => {
    if (userToken !== "") {
      navigate("/profile");
    }
  }, [userToken]);

  return (
    <div className="login">
      <div className="container title">
        <h1>CyberSoft Elearning</h1>
      </div>
      {/* <div className="col-6">
        <img src={image} alt="..." className="w-50" height={100} />
      </div> */}
      <section className="container login-content col-6">
        <div className="container content">
          <h1 className="title">ĐĂNG NHẬP</h1>
          {/* <hr /> */}
          <form className="form" onSubmit={frm.handleSubmit}>
            <div className="form-group  mb-4">
              <div className="input-group d-flex flex-column">
                <h4>Tài khoản</h4>
                <input
                  type="text"
                  name="taiKhoan"
                  id="taiKhoan"
                  className="input form-control input-sm w-100"
                  placeholder="Tên đăng nhập"
                  onChange={frm.handleChange}
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
                  onInput={handlePasswordChange}
                  value={passwordInput}
                />

                <span className="text-danger">{frm.errors.matKhau} </span>
              </div>
              <button
                type="button"
                style={{ background: "transparent" }}
                onClick={togglePassword}
              >
                {passwordType === "password" ? (
                  <i className="fa-solid fa-exclamation-slash"></i>
                ) : (
                  <i className="fa-solid fa-exclamation"></i>
                )}
              </button>
            </div>

            <div className="sigin">
              <div className="submit">
                <button type="submit" className="btn-login">
                  ĐĂNG NHẬP
                </button>
              </div>
              <div className="signUp d-flex">
                
                  <span>Bạn chưa có tài khoản?</span>
                
                <NavLink to="/register">
                  <button type="button" className="btn">
                    Đăng ký mới
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
