import { Carousel } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { history } from "../..";
import Product from "../../Component/Product/Product";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  getProductApi,
  ProductModel,
} from "../../redux/reducers/productProducer";

type Props = {
  title?: string;
};
const navigate = useNavigate;

export default function Home({ title }: Props) {
  const { arrProduct } = useSelector(
    (state: RootState) => state.productProducer
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    //callapi action thunk
    const actionApi = getProductApi();
    dispatch(actionApi);
  }, []);

  const renderProduct = () => {
    return arrProduct.map((prod: ProductModel, index: number) => {
      return (
        <div className="col-4" key={index}>
          <Product product={prod} />
        </div>
      );
    });
  };

  const handleChange = (value: string) => {
    return history.push(`/course/${value}`);
  };

  // ----
  const renderSplice = () => {
    return arrProduct.map((item: ProductModel, index: number) => {
      if (index === 0 || arrProduct.length === 1) {
        return (
          <div className="carousel-item active" key={index}>
            <div className="carousel-item-content">
              <div className="carousel-left">
                <img src={item.hinhAnh} alt={item.tenKhoaHoc} />
              </div>
              <div className="carousel-right">
                <h2>{item.tenKhoaHoc}</h2>
                <p>{item.moTa.slice(0, 100) + '...'}</p>
                <NavLink className="btn" to={`/detail/${item.maKhoaHoc}`}>
                  View detail
                </NavLink>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="carousel-item" key={index}>
            <div className="carousel-item-content">
              <div className="carousel-left">
                <img src={item.hinhAnh} alt={item.tenKhoaHoc} />
              </div>
              <div className="carousel-right">
                <h2>{item.tenKhoaHoc}</h2>
                <p>{item.moTa.slice(0, 100) + '...'}</p>
                <NavLink className="btn" to={`/detail/${item.maKhoaHoc}`}>
                  Xem Chi  Tiết
                </NavLink>
              </div>
            </div>
          </div>
        );
      }
    });
  };

  const contentStyle: React.CSSProperties = {
    height: 'auto',
    color: '#002333',
    // lineHeight: '10px',
    textAlign: 'center',
    background: '#232121',
    padding:'50px'
  };

  return (
    <>
      <div className="showing">
        <section className="slider">
          <div className="container">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div id="product-carousel" className="carousel-inner">
                {renderSplice()}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </section>
        <div className="container wrapper">
          <p className="title">Những khoá học nổi bật</p>
          <p className="sub-title">
            Các khóa học trực tuyến tốt nhất cho bạn. Tương tác với các chuyên
            gia hàng đầu và khám phá những bí mật được lưu giữ của thế giới công
            nghệ.
          </p>
          <div className="main">
            <div className="course-list">{renderProduct()}</div>
          </div>

          <div className="footer-btn">
            <button className="btn btn-primary" onClick={() => navigate()}>
              Xem thêm nhiều khoá học
            </button>
          </div>
        </div>
        <Carousel autoplay>
          <section className="testmonial section" style={contentStyle}>
            <div className="container">
              <div className="testimonial__header">
                <h3 className="section__title--sub">Testimonials</h3>
                <h2 className="section__title">What People Say</h2>
              </div>
              <div className="testimonial__content">
                <div className="testimonial__item">
                  <div className="item__content">
                    <a href="#" className="comment-img"><img src="../../assets/img/user-avatar.jpg" alt="..." /></a>
                    <div className="quote">
                      <i className="fas fa-quote-left"></i>
                      <span>OMG! I cannot believe. It's Awesome"</span>
                    </div>
                    <span>
                      My new site is so much faster and easier to work with than my
                      old site. They are here to help the customers to get their
                      success. Nemo sit eos, quod minus eius illo labore. Pellen
                      tesque libero ut justo, ultrices in ligula.
                    </span>
                    <div className="testimonial__info">
                      <h3>Johnson William</h3>
                      <span>Customer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="testmonial section" style={contentStyle}>
            <div className="container">
              <div className="testimonial__header">
                <h3 className="section__title--sub">Testimonials</h3>
                <h2 className="section__title">What People Say</h2>
              </div>
              <div className="testimonial__content">
                <div className="testimonial__item">
                  <div className="item__content">
                    <a href="#" className="comment-img"><img src="../../assets/avatar1.jpg" alt="..." /></a>
                    <div className="quote">
                      <i className="fas fa-quote-left"></i>
                      <span>OMG! I cannot believe. It's Awesome"</span>
                    </div>
                    <span>
                      My new site is so much faster and easier to work with than my
                      old site. They are here to help the customers to get their
                      success. Nemo sit eos, quod minus eius illo labore. Pellen
                      tesque libero ut justo, ultrices in ligula.
                    </span>
                    <div className="testimonial__info">
                      <h3>Kevin De Bruyne</h3>
                      <span>Customer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="testmonial section" style={contentStyle}>
            <div className="container">
              <div className="testimonial__header">
                <h3 className="section__title--sub">Testimonials</h3>
                <h2 className="section__title">What People Say</h2>
              </div>
              <div className="testimonial__content">
                <div className="testimonial__item">
                  <div className="item__content">
                    <a href="#" className="comment-img"><img src="../../assets/img/avatar2.jpg" alt="..." /></a>
                    <div className="quote">
                      <i className="fas fa-quote-left"></i>
                      <span>OMG! I cannot believe. It's Awesome"</span>
                    </div>
                    <span>
                      My new site is so much faster and easier to work with than my
                      old site. They are here to help the customers to get their
                      success. Nemo sit eos, quod minus eius illo labore. Pellen
                      tesque libero ut justo, ultrices in ligula.
                    </span>
                    <div className="testimonial__info">
                      <h3>Johnson Jennyfer</h3>
                      <span>Customer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Carousel>
      </div>
    </>
  );
}
