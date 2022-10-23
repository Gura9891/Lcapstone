import { Col, Row } from "antd";
import { Tabs } from "antd";
import { Button, message, Space } from "antd";

import React from "react";
import { NavLink } from "react-router-dom";
import { ProductModel } from "../../redux/reducers/productProducer";

type Props = {
  product: ProductModel;
};

export default function DetailProduct({ product }: Props) {
  return (
    <div>
      <div className="BodyDetail">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="course-image div-6">
                <img src={product.hinhAnh} alt="" />
              </div>
            </div>
            <div className="col-8">
              <div className="course-content">
                <h1 className="course-name">{product.tenKhoaHoc}</h1>
                <h3 className="course-id">
                  <i className="fa-brands fa-codepen"></i>{" "}
                  <span>Mã khóa học:</span> <strong>{product.maKhoaHoc}</strong>
                </h3>

                <h3 className="course-teacher">
                  <i className="fa-solid fa-user"></i> <span>Giảng viên:</span>{" "}
                  <strong>{product.nguoiTao.hoTen}</strong>
                </h3>

                <h3 className="course-category">
                  <i className="fa-solid fa-bars"></i> <span>Danh mục:</span>{" "}
                  <strong>{product.danhMucKhoaHoc.tenDanhMucKhoaHoc}</strong>
                </h3>

                <h3 className="course-date">
                  <i className="fa-regular fa-calendar-days"></i>{" "}
                  <span>Ngày tạo:</span> <strong>{product.ngayTao}</strong>
                </h3>

                <h3 className="course-view">
                  <i className="fa-solid fa-eye"></i> <span>Lượt xem:</span>{" "}
                  <strong>{product.luotXem}</strong>
                </h3>
                <h3 className="course-amount">
                  <i className="fa-solid fa-graduation-cap"></i>{" "}
                  <span>Số lượng học viên:</span>{" "}
                  <strong>{product.soLuongHocVien}</strong>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
