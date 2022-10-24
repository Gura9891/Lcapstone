import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Product from "../../Component/Product/Product";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  getCourseListApi,
  ProductModel,
} from "../../redux/reducers/productProducer";

type Props = {};

export default function Detail({}: Props) {
  const { coursesList } = useSelector(
    (state: RootState) => state.productProducer
  );
  console.log(coursesList);

  const dispatch: AppDispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    let { maKhoaHoc } = params;

    const actionApi = getCourseListApi(maKhoaHoc);
    dispatch(actionApi);
  }, [params.maKhoaHoc]);

  const renderCourseList = () => {
    return coursesList.map((prod: ProductModel, index: number) => {
      return (
        <div className="col-4" key={index}>
          <Product product={prod} />
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
