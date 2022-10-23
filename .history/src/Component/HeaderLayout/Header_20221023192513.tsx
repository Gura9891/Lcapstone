import useSelection from "antd/lib/table/hooks/useSelection";
import { values } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { history } from "../..";
import Login from "../../pages/LoginPage/Login";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getProductListApi, ProductModel, DanhMuc } from "../../redux/reducers/productProducer";
import { http } from "../../util/setting";


type Props = {};

export default function Header({ }: Props) {

  const { arrProductList } = useSelector((state: RootState) => state.productProducer);
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const dispatch: AppDispatch = useDispatch();
  console.log(userLogin);
  const renderLoginNavItem = () => {
    if (userLogin === null) {
      console.log(123);
      return <NavLink to="/login">Login</NavLink>;
    }
    return (
      <NavLink to="/profile" style={{ textDecoration: 'none' }} >
        <i className="fa-solid fa-user"></i> {userLogin.hoTen}
      </NavLink>
    );
  };

  useEffect(() => {
    const actionCoursesApi = getProductListApi();
    dispatch(actionCoursesApi)
  }, [])

  const renderDropdown = () => {
    return arrProductList.map((prod: DanhMuc, index: number) => {

      return <li key={index}>
        <NavLink className="dropdown-item" to={`/course/${prod.maDanhMuc}`}>{prod.tenDanhMuc}</NavLink>
      </li>
    })
  }

  // --------

  let tenKhoaHocRef = useRef("")
  let [searchParams, setSearchParams] = useSearchParams()
  let [arrProduct, setArrProduct] = useState([])
  let navigate = useNavigate()
  const getProductByTenKhoaHoc = async () => {
      try {
          let tenKhoaHoc = searchParams.get("tenKhoaHoc")
          if (tenKhoaHoc?.trim() !== "" && tenKhoaHoc !== null) {
              let result = await http.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=" + tenKhoaHoc)
              console.log(result.data);
              setArrProduct(result.data);

          } else {
              setArrProduct([])
          }
      }
      catch (err) {
          console.log({ err });
      }
  }

  useEffect(() => {
      getProductByTenKhoaHoc()
  }, [tenKhoaHocRef.current])

  const handleChange = (e: any) => {
      tenKhoaHocRef.current = e.target.value;
      
  }
  const handleSubmit = (e: any) => {
      e.preventDefault();
      setSearchParams({ tenKhoaHoc: tenKhoaHocRef.current });
  };
  const renderProductByTenKhoaHoc = () => {
      return arrProduct.map((prod: ProductModel, index: number) => {
          return <div key={index}>
            <button className="btn btn-outline-success" type="submit" onClick={() => { navigate(`/search/${prod.tenKhoaHoc}`)}} >Search</button>
          </div>
      })
  }



  return (
   <div className="container">
 <div className="header">
      {/* top header */}
      {/* <section className="w3l-top-header">
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
      </section> */}
      {/* //top header */}

      {/* header */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand logo-title" href="#">CyberSoft Elearning</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active item-nav text-light" aria-current="page" href="#">Home</a>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle item-nav" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Danh sách khóa học
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {renderDropdown()}

                </ul>
              </li>
              <li className="nav-link" style={{ color: 'black' }}>
                {renderLoginNavItem()}
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSubmit}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange}/>
              {/* <button className="btn btn-outline-success" type="submit" >Search</button> */}
              {renderProductByTenKhoaHoc()}
            </form>

            <button className="signin" >
                    Đăng nhập
                  </button>
                  <button className="signup">
                    Đăng ký
                  </button>
          </div>
        </div>
      </nav>

      {/* header */}
    </div>
   </div>
  );
}
