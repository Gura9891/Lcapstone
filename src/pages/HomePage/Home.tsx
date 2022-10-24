import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  return (
    <>
      <div className="showing">
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
      </div>
    </>
  );
}
