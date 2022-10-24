import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tooltip } from "antd";
import { AiOutlineEye } from "react-icons/ai";
import { GoCalendar } from "react-icons/go";
import { BsCartPlus } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
// import { addCourses } from "components/Cart/slices/cartSlice";

import "./courseItem.scss";
import defaultImg1 from "assets/images/defaultImg1.png";
import defaultImg2 from "assets/images/defaultImg2.png";
import defaultImg3 from "assets/images/defaultImg3.png";
import defaultImg4 from "assets/images/defaultImg4.png";
import defaultImg5 from "assets/images/defaultImg5.png";
import { ProductModel } from "../../redux/reducers/productProducer";

const defaultImg = [
  defaultImg1,
  defaultImg2,
  defaultImg3,
  defaultImg4,
  defaultImg5,
];

const CourseItem = ({ courses, all, showmore, filter, courseshowing }) => {
  const dispatch = useDispatch();

  const [showQuantity, setShowQuantity] = useState(
    courseshowing ? courseshowing : 6
  );
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  const [showCourses, setShowCourses] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [showFilterCourses, setShowFilterCourses] = useState([]);
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    if (filterValue === "") {
      setShowFilterCourses(courses);
    } else {
      const filter = courses?.filter(
        (course, index) => course.trangThai === filterValue
      );
      setShowFilterCourses(filter);
    }
  }, [filterValue, courses]);

  useEffect(() => {
    if (showFilterCourses?.length + 1 < showQuantity) {
      setShowMoreBtn(false);
    } else {
      setShowMoreBtn(true);
    }

    setShowCourses(
      showFilterCourses?.filter((course, index) => index < showQuantity)
    );
  }, [showQuantity, showFilterCourses]);

  const handleClickShowMore = () => {
    setShowQuantity((prev) => prev + 6);
  };

  const handleFilter = (e) => {
    const { value } = e.target;
    setFilterValue(value);
  };

  return (
    <>
      {filter && (
        <div className="courses-filter">
          <BiFilterAlt size={24} />

          <select
            name="filter"
            id="filter"
            className="filter"
            onChange={handleFilter}
          >
            <option value="">Tất cả</option>
            <option value="mới">Mới</option>
            <option value="bán chạy">Bán chạy</option>
          </select>
        </div>
      )}
      {showCourses && showCourses.length > 0 ? (
        showCourses?.map((course:ProductModel, index:number) => (
          <div
            key={index}
            className={`course__item ${category || all ? "col-3" : "col-4"}`}
          >
            <div className="item">
              <div
                className="image"
                onClick={() =>
                  navigate(`/courses/detail/${course.maKhoaHoc}`, {
                    state: course,
                  })
                }
              >
                <img
                  className="img"
                  src={course?.hinhAnh}
                  alt="Anh"
                  onError={(event) => {
                    event.target.src =
                      defaultImg[Math.floor(Math.random() * 5)];
                    event.onerror = null;
                  }}
                />
              </div>

              <div className="content">
                <div className="head">
                  <div className="statis">
                    <Tooltip title="Người xem" placement="topLeft">
                      <div className="left">
                        <div className="icon">
                          <AiOutlineEye />
                        </div>
                        <span>{course?.luotXem}</span>
                      </div>
                    </Tooltip>
                    <Tooltip title="Ngày tạo" placement="topRight">
                      <div className="right">
                        <div className="icon">
                          <GoCalendar />
                        </div>
                        <span>{course?.ngayTao}</span>
                      </div>
                    </Tooltip>
                  </div>
                  <span
                    className="item-title"
                    onClick={() =>
                      navigate(`/courses/detail/${course.maKhoaHoc}`, {
                        state: course,
                      })
                    }
                  >
                    <span
                      className={`tag ${
                        course?.trangThai === "mới" ? "new" : "hot"
                      }`}
                    >
                      {course?.trangThai.toUpperCase()}
                    </span>
                    <span className="value">{course?.tenKhoaHoc}</span>
                  </span>
                </div>
                <p className="mid">{course?.moTa}</p>
                <div className="foot">
                  <p className="author">{`Bởi ${course?.nguoiTao?.taiKhoan}`}</p>
                  <div
                    className="cart"
                    onClick={() => dispatch(addCourses(course))}
                  >
                    <BsCartPlus />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="not-found">Không tìm thấy khoá học phù hợp</p>
      )}

      {showmore && showMoreBtn && (
        <div className="show-more">
          <button
            className="btn btn-primary showmore-btn"
            onClick={handleClickShowMore}
          >
            Hiển thị thêm
          </button>
        </div>
      )}
    </>
  );
};

export default CourseItem;
