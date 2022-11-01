import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailProduct from "../../Component/Product/DetailProduct";
import Product from "../../Component/Product/Product";
import { AppDispatch, RootState } from "../../redux/configStore";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {
  getAllProductAction,
  getDetailApi,
  getProductApi,
  ProductModel,
} from "../../redux/reducers/productProducer";

type Props = {};

export default function Detail({ }: Props) {
  const { coursesList, arrProduct } = useSelector(
    (state: RootState) => state.productProducer
  );
  console.log('detailist', coursesList);

  const dispatch: AppDispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    let { maKhoaHoc } = params;
    const actionApi = getDetailApi(maKhoaHoc);
    dispatch(actionApi);
  }, [params.maKhoaHoc]);

  useEffect(() => {
    const actionlist = getProductApi();
    dispatch(actionlist)

  }, [])

  const renderCourseList = () => {
    return coursesList.map((prod: ProductModel, index: number) => {
      return (
        <div key={index}>
          <DetailProduct detailProduct={prod} />
        </div>
      );
    });
  };

  const renderProductList = () => {
    return arrProduct.map((prod: ProductModel, index: number) => {
      return <div key={index}>
        <Product product={prod} />
      </div>
    })
  }
  // =========
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div className="container">
      <div className="detail__haeder">
        <h2>Danh Sách Khóa Học</h2>
        <div>{renderCourseList()}</div>
      </div>
      <div className="detail__list">
        <h3 className="text-center">khoá học liên quan</h3>
        <Slider {...settings}>
         {renderProductList()}
        </Slider>

      </div>
    </div>
  );
}
