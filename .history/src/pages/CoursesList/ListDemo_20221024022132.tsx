import { Card } from 'antd';

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

export default function ListDemo({}: Props) {
  const { coursesList } = useSelector(
    (state: RootState) => state.productProducer
  );
  console.log(coursesList);

  const dispatch: AppDispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    let { maDanhMuc } = params;

    const actionApi = getCourseListApi(maDanhMuc);
    dispatch(actionApi);
  }, [params.maDanhMuc]);

  const { Meta } = Card;

  return (
    <div>
      <h2>list</h2>
      <div className="row">
      <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>

      </div>
    </div>
  );
}
