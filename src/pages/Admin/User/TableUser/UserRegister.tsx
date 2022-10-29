import React, { useEffect } from 'react'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { AppDispatch, RootState } from '../../../../redux/configStore'
import { useDispatch, useSelector } from 'react-redux'
import { getListCoursePendingRegisterApi, registerCourseApi, CancelRegisterCourseApi } from '../../../../redux/reducers/userReducer'

type Props = {
  taiKhoan: string
}

interface DataType {
  maKhoaHoc: string
  biDanh: string
  tenKhoaHoc: string
}
export default function UserRegister ({ taiKhoan }: Props) {
  const dispatch: AppDispatch = useDispatch() 

  const {listCoursePendingRegister} = useSelector((state: RootState) => state.userReducer)

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên khoá học',
      dataIndex: 'tenKhoaHoc',
      key: 'tenKhoaHoc',
      render: text => <a>{text}</a>
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      render: (e) => (
        <div className='d-flex justify-content-between'>
          <button className='green-button px-3 py-1 mx-2' onClick={() => {
            console.log(e)
            dispatch(registerCourseApi(e.maKhoaHoc, taiKhoan))
          }}>
            <i className='m-0 bi bi-plus-square'></i>
          </button>
          <button className='red-button px-3 py-1 mx-2' onClick={() => {
            dispatch(CancelRegisterCourseApi(e.maKhoaHoc, taiKhoan))
          }}>
            <i className='m-0 bi bi-x-square'></i>
          </button>
        </div>
      )
    }
  ]

  const data: DataType[] = listCoursePendingRegister 

  useEffect(() => {
    dispatch(getListCoursePendingRegisterApi(taiKhoan))
  },[taiKhoan])

  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 2 }} />
  )
}
