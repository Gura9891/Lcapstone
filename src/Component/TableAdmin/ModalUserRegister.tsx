import { Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/configStore'
import { registerCourseApi, getListCourseNotRegisterApi } from '../../redux/reducers/userReducer'
import UserRegister from '../../pages/Admin/User/TableUser/UserRegister'
import UserRegistered from '../../pages/Admin/User/TableUser/UserRegister'

type Props = {
  taiKhoan: string
}

export default function ModalUserRegister ({taiKhoan} : Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [maKhoaHoc, setMaKhoaHoc] = useState("")

  const { listCourseOfUser } = useSelector(
    (state: RootState) => state.userReducer
  )

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
          dispatch(getListCourseNotRegisterApi(taiKhoan))
        }}
      >
      <i className="fa-solid fa-plus"></i>
      </Button>
      <Modal
        title='Ghi danh khóa học'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <section id='register-user-admin' className=''>
          <div className='form-item w-100'>
            <p className='fs-5 py-4'>Đăng ký khoá học</p>
            <div className='form-action w-100'>
              <select name='tenKhoaHoc' id='tenKhoaHoc' className='w-75' defaultValue={listCourseOfUser[0]?.maKhoaHoc} onChange={(e) =>{
                console.log(e.target.value)
                setMaKhoaHoc(e.target.value)
              }}>
                {listCourseOfUser.map((item, index) => {
                  return (
                    <option value={item.maKhoaHoc} key={index}>
                      {item.tenKhoaHoc}
                    </option>
                  )
                })}
              </select>
              <button className='blue-button w-25 p-3' onClick={() => {
                dispatch(registerCourseApi( maKhoaHoc,taiKhoan))
              }}>Đăng ký</button>
            </div>
          </div>
          <div className='form-item'>
            <p className='fs-5 py-4'>Khóa học chờ đăng ký</p>
            <UserRegister taiKhoan={taiKhoan}/>
          </div>
          <div className='form-item'>
            <p className='fs-5 py-4'>Khóa học đã đăng ký</p>
            <UserRegistered taiKhoan={taiKhoan}/>
          </div>
        </section>
      </Modal>
    </>
  )
}
