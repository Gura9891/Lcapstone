import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailProduct from "../../Component/Product/DetailProduct";
import Product from "../../Component/Product/Product";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  getDetailApi,
  ProductModel,
} from "../../redux/reducers/productProducer";

type Props = {};

export default function CoursesList({}: Props) {
  const { coursesList } = useSelector(
    (state: RootState) => state.productProducer
  );
  console.log('detailist',coursesList);

  const dispatch: AppDispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    let { maDanhMuc } = params;

    const actionApi = getDetailApi(maDanhMuc);
    dispatch(actionApi);
  }, [params.maDanhMuc]);

  const renderCourseList = () => {
    return coursesList.map((prod: ProductModel) => {
      return (
        <div className="col-4" key={index}>
          <DetailProduct detailProduct={prod} />
        </div>
      );
    });
  };

  return (
    <div className="container">
      <h2>Danh Sách Khóa Học</h2>
      <div className="row">{renderCourseList()}</div>
    </div>
  );
}
