import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

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
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title="Card title"
      description="This is the description"
    />
  </Card>
      </div>
    </div>
  );
}
