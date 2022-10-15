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
    <div className="d-flex ">
      <div className="col-6">
        <img src={image} alt="..." className="w-100" height={1000} />
      </div>
      <section className="login col-6">
        <div className="contain">
          <h2 className="title">ĐĂNG NHẬP</h2>
          <hr />
          <form
            className="form d-flex flex-wrap justify-content-between"
            onSubmit={frm.handleSubmit}
          >
            <div className="form-group col-md-10 mb-4">
              <div className="input-group d-flex flex-column">
                <h2>Tài khoản</h2>
                <input
                  type="text"
                  name="taiKhoan"
                  id="taiKhoan"
                  className="form-control input-sm w-100"
                  placeholder="Tài khoản"
                  onChange={frm.handleChange}
                />
                {frm.errors.taiKhoan ? (
                  <span className="text-danger">{frm.errors.taiKhoan} </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="form-group col-md-10 mb-4">
              <div className="input-group d-flex flex-column">
                <h2>Mật khẩu</h2>
                <input
                  type={passwordType}
                  name="matKhau"
                  className="form-control input-sm w-100"
                  placeholder="Password"
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

            <div className="d-flex justify-content-between w-100 mb-5  mt-5">
              <div className="submit">
                <button type="submit" className="btn">
                  Đăng Nhập
                </button>
              </div>
              <div className="signUp">
                <NavLink to="/register">
                  <button type="button" className="btn">
                    Đăng ký
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