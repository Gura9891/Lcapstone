import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { Dropdown } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AiTwotoneHome } from "react-icons/ai";
import { openAuthModal } from "modules/Auth/slices/authSlice";
import { FaUserPlus } from "react-icons/fa";
import AuthModal from "modules/Auth/components/AuthModal";
import OverlayContent from "./components/OverlayContent";
import logo from "../../assets/images/logo.png";
import avatar from "assets/images/user-avatar.jpg";
import "./header.scss";
import Search from "./components/Search";
import Cart from "components/Cart";
import Menu from "./components/Menu";
import MobileSearch from "./components/MobileSearch";

const Header = () => {
  const [isLogin, setLogin] = useState(false);
  const [isOpenDropdown, setOpenDropdown] = useState(false);
  const { user, isOpenModal } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const header = document.getElementById("header");
    let prevScrollpos = window.pageYOffset;
    const handleScroll = () => {
      let currentScrollPos = window.pageYOffset;
      if (
        (document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80) &&
        window.innerWidth > 769
      ) {
        if (prevScrollpos > currentScrollPos) {
          header.classList.remove("hide");
        } else {
          header.classList.add("hide");
        }
      } else {
        header.classList.remove("hide");
      }
      prevScrollpos = currentScrollPos;
    };
    window.addEventListener("scroll", handleScroll);
  });

  const handleClickSignin = () => {
    dispatch(openAuthModal());
    setLogin(true);
  };

  const handleClickSignup = () => {
    dispatch(openAuthModal());
    setLogin(false);
  };

  const hideDropdown = () => {
    setOpenDropdown(false);
  };

  const handleOpenChange = (flag) => {
    setOpenDropdown(flag);
  };

  return (
    <>
      <div id="header" className="header">
        <div className="header-wrapper container">
          {/*Begin  Header left */}
          <div className="left">
            {/* logo */}
            <Link to="/">
              <div className="logo">
                <img src={logo} alt="logo" />
                <p className="logo-title">TLearn</p>
              </div>
            </Link>

            {/* nav */}
            <div className="main-nav">
              <NavLink to="/" className="item">
                Trang chủ
              </NavLink>
              <NavLink to="/courses" className="item">
                Khoá học
              </NavLink>
              <a
                href="https://topdev.vn/blog/"
                className="item"
                target="_blank"
              >
                Blog
              </a>
            </div>
          </div>
          {/*End Header left */}

          {/*Begin Header right */}

          <div className="right">
            {/* Search */}
            <div className="right-search">
              <Search />
            </div>
            <div className="search-responsive">
              <MobileSearch />
            </div>

            {/* cart */}
            <div className="right-cart">
              <Cart />
            </div>

            <div className="account">
              {user ? (
                <Dropdown
                  open={isOpenDropdown}
                  onOpenChange={handleOpenChange}
                  overlay={<OverlayContent hideDropdown={hideDropdown} />}
                  trigger={["click"]}
                  placement="bottomRight"
                  className="header__dropdown"
                >
                  <div className="avatar">
                    <div className="avatar-icon">
                      <img src={avatar} alt="avatar" />
                    </div>
                    <div className="dropdown-icon">
                      <IoMdArrowDropdown fontSize={24} color="white" />
                    </div>
                  </div>
                </Dropdown>
              ) : (
                <>
                  <button className="signin" onClick={handleClickSignin}>
                    Đăng nhập
                  </button>
                  <button className="signup" onClick={handleClickSignup}>
                    Đăng ký
                  </button>
                </>
              )}
            </div>

            <div className="responsive-menu">
              <Menu />
            </div>
          </div>
          {/*End Header right */}
        </div>

        {/* AuthModal */}
        <AuthModal isLogin={isLogin} setLogin={setLogin} />
      </div>

      <div className="footer__header">
        <div className="wrapper">
          <div className="home item" onClick={() => navigate("/")}>
            <AiTwotoneHome />
          </div>
          <div className="account item">
            {user ? (
              <div className="avatar" onClick={() => navigate("/profile")}>
                <div className="avatar-icon">
                  <img src={avatar} alt="avatar" />
                </div>
              </div>
            ) : (
              <FaUserPlus size={24} color="white" onClick={handleClickSignin} />
            )}
          </div>
          <div className="cart">
            <Cart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
