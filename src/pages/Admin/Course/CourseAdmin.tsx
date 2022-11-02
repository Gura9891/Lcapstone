import React from 'react'
import { useDispatch } from 'react-redux'
import ModalCourse from '../../../Component/TableAdmin/ModalCourse';
import TableCourse from '../../../Component/TableAdmin/TableCourse';
import { AppDispatch } from '../../../redux/configStore'
import { searchCourseAdminApi } from '../../../redux/reducers/productProducer';


export default function CourseAdmin () {
  const dispatch: AppDispatch = useDispatch()

  return (
    <div id='courseAdmin'>
      <div className='d-flex flex-column'>
        <ModalCourse />
        <div className='paper my-4 '>
          <p className='fs-3'>Tìm kiếm khóa học</p>
          <input
            className='mb-4 w-100'
            type='text'
            placeholder='Nhập vào tên khóa học'
            onChange={e => {
              dispatch(searchCourseAdminApi(e.target.value))
            }}
          />
        </div>
        <TableCourse /> 
      </div>
    </div>
  )
}
