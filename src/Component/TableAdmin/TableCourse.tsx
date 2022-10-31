import Table, { ColumnsType } from 'antd/lib/table'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/configStore'
import { DanhMucKhoaHoc, deleteCouseAdminApi, getProductListApi, getProductApi, NguoiTAO } from '../../redux/reducers/productProducer'
import { getListUserApi } from '../../redux/reducers/userReducer'
import ModalCourse from './ModalCourse'
import ModalUserRegister from './ModalUserRegister'



type Props = {}

export interface DataType {
  maKhoaHoc: string
  biDanh: string
  tenKhoaHoc: string
  moTa: string
  luotXem: number
  hinhAnh: string
  maNhom: string
  ngayTao: string
  soLuongHocVien: number
  nguoiTao: string
  danhMucKhoaHoc: DanhMucKhoaHoc
}

export default function TableCourse ({}: Props) {
  const dispatch: AppDispatch = useDispatch()
  const { arrayListCourses } = useSelector(
    (state: RootState) => state.productProducer
  )

  const columns: ColumnsType<DataType> = [
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      render: text => <img src={text} alt='' style={{ width: 50 }} />
    },
    { title: 'Mã khóa học', dataIndex: 'maKhoaHoc', key: 'maKhoaHoc' },
    { title: 'Tên khóa học', dataIndex: 'tenKhoaHoc', key: 'tenKhoaHoc', width: 300 },
    {
      title: 'Người tạo',
      dataIndex: 'nguoiTao',
      key: 'nguoiTao',
      render: text => <>{text.hoTen}</>
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ngayTao',
      key: 'ngayTao'
    },
    {
      title: 'Lượt xem',
      dataIndex: 'luotXem',
      key: 'luotXem'
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: 'x',
      width:100,
      render: e => (
        <div className='d-flex justify-content-between'>
          <ModalUserRegister taiKhoan=''/>
          <ModalCourse course={e} />
          <button className='red-button p-2' onClick={() => {
            dispatch(deleteCouseAdminApi(e.maKhoaHoc))
          }}>
            <i className='fa-solid fa-trash'></i>
          </button>
        </div>
      )
    }
  ]

  const data: DataType[] = arrayListCourses

  useEffect(() => {
    dispatch(getProductApi())
    dispatch(getProductListApi())
    dispatch(getListUserApi())
  }, [])

  return <Table columns={columns} dataSource={data} />
}
