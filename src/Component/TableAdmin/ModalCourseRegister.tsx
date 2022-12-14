import { Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CourseRegister from '../../pages/Admin/Course/CoursesList/TableCourse/CourseRegister';
import CourseRegisterd from '../../pages/Admin/Course/CoursesList/TableCourse/CourseRegistered';
import { AppDispatch, RootState } from '../../redux/configStore';
import { arrUserNotWriteCourseApi, RegisterCourse } from '../../redux/reducers/productProducer';
import { registerCourseApi } from '../../redux/reducers/userReducer';



type Props = {
  maKhoaHoc: string
}

export default function ModalCourseRegister ({ maKhoaHoc }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { arrUserNotRegisterCourse } = useSelector(
    (state: RootState) => state.productProducer
  )

  const [taiKhoan, setTaiKhoan] = useState("")

  const dispatch: AppDispatch = useDispatch()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }


  return (
    <>
      <Button
        className='green-button p-2 h-100'
        type='primary'
        onClick={() => {
          showModal()
          dispatch(arrUserNotWriteCourseApi(maKhoaHoc))
        }}
      >
        <i className='bi bi-plus-circle m-0 p-2'></i>
      </Button>
      <Modal
        title='Ghi danh học viên'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <section id='register-user-admin'>
          <div className='form-item w-100'>
            <p className='fs-5 py-4'>Đăng ký khoá học</p>
            <div className='form-action w-100'>
              <select
                name='taiKhoan'
                id='taiKhoan'
                className='w-75'
                defaultValue={arrUserNotRegisterCourse[0]?.taiKhoan}
                onChange={(e) => {
                  setTaiKhoan(e.target.value)
                }}
              >
                {arrUserNotRegisterCourse.map((item:RegisterCourse, index:number) => {
                  return (
                    <option value={index === 0 ? "" : item.taiKhoan} key={index}>
                      {index === 0 ? "Chọn học viên" : item.hoTen}
                    </option>
                  )
                })}
              </select>
              <button className='blue-button w-25 p-3' onClick={() => {
                dispatch(registerCourseApi(maKhoaHoc, taiKhoan))
              }}>Đăng ký</button>
            </div>
          </div>
          <div className='form-item'>
            <p className='fs-5 py-4'>Học viên chờ đăng ký</p>
            <CourseRegister maKhoaHoc={maKhoaHoc}/>
          </div>
          <div className='form-item'>
            <p className='fs-5 py-4'>Học viên đã đăng ký</p>
            <CourseRegisterd maKhoaHoc={maKhoaHoc}/>
          </div>
        </section>
      </Modal>
    </>
  )
}
