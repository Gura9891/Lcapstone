import useSelection from "antd/lib/table/hooks/useSelection";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Login from "../../pages/LoginPage/Login";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  getProductListApi,
  ProductModel,
  DanhMuc,
} from "../../redux/reducers/productProducer";

type Props = {};

export default function Header({}: Props) {
  const { arrProductList } = useSelector(
    (state: RootState) => state.productProducer
  );
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const dispatch: AppDispatch = useDispatch();
  console.log(userLogin);
  const renderLoginNavItem = () => {
    if (Object.values(userLogin).length === 0) { 
      console.log(123);
      return <NavLink to="/login">Login</NavLink>;
    } else {
      return (
        <NavLink to="/profile" style={{ textDecoration: "none" }}>
          <i className="fa-solid fa-user"></i> {userLogin.hoTen}
        </NavLink>
      );
    }
  };

  useEffect(() => {
    const actionCoursesApi = getProductListApi();
    dispatch(actionCoursesApi);
  }, []);

  const renderDropdown = () => {
    return arrProductList.map((prod: DanhMuc, index: number) => {
      return (
        <li key={index}>
          <NavLink className="dropdown-item" to={`/course/${prod.maDanhMuc}`}>
            {prod.tenDanhMuc}
          </NavLink>
        </li>
      );
    });
  };

  return (
    <div className="header">
      {/* top header */}
      <section className="w3l-top-header">
        <div className="container-fluid">
          <div className="top-content-w3ls d-flex align-items-center justify-content-between">
            <div className="top-headers">
              <ul>
                <li>
                  <a href="#help" className="d-sm-block d-none">
                    Have any question ?
                  </a>
                </li>
                <li>
                  <i className="fa fa-phone" />
                  <a href="tel:+1(21) 234 4567">+1(21) 234 4567</a>
                </li>
                <li>
                  <i className="fa fa-envelope" />
                  <a href="mailto:mail@example.com">mail@example.com</a>
                </li>
              </ul>
            </div>
            <div className="top-headers top-headers-2">
              <ul>
                <li>
                  <a href="#facebook">
                    <span />
                    <i className="fa-brands fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#twitter">
                    <span />
                    <i className="fa-brands fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#instagram">
                    <span />
                    <i className="fa-brands fa-instagram" />
                  </a>
                </li>
                <li className="mr-0">
                  <a href="#linkedin">
                    <span />
                    <i className="fa-brands fa-linkedin-in" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* //top header */}

      {/* header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            CyberSoft Elearning
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Danh sách khóa học
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {renderDropdown()}
                </ul>
              </li>
              <li className="nav-link" style={{ color: "black" }}>
                {renderLoginNavItem()}
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* header */}
    </div>
  );
}
