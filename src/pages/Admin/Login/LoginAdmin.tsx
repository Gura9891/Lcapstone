import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { LoginApi } from '../../../redux/reducers/userReducer'
import { AppDispatch, RootState } from '../../../redux/configStore'
import {
  ACCESS_TOKEN,
  deleteCookie,
  deleteStore,
  USER_LOGIN
} from '../../../util/setting'
import { message } from 'antd'

type Props = {}

export default function LoginAdmin ({}: Props) {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { userLogin } = useSelector((state: RootState) => state.userReducer)
  let regexPass = new RegExp(
    '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$'
  )
  const form = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: ''
    },

    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required('Tên tài khoản không được bỏ trống'),

      matKhau: Yup.string()
        .required('Mật khẩu không được để trống')
        .min(6, 'Mật khẩu phải từ 6-32 ký tự')
        .max(32, 'Mật khẩu từ 6-32 ký tự')
        .matches(regexPass, 'Mật khẩu không đúng định dạng')
    }),
    onSubmit: values => {
      dispatch(LoginApi(values))
    }
  })

  useEffect(() => {
    if (userLogin?.maLoaiNguoiDung === 'GV') {
      message.success({ content: 'Đăng nhập thành công' })
      navigate('/admin/home')
    } else if (userLogin?.maLoaiNguoiDung === 'HV') {
      message.error({ content: 'Bạn không phải admin' })
      deleteStore(USER_LOGIN)
      deleteStore(ACCESS_TOKEN)
      deleteCookie(ACCESS_TOKEN)
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } else if (!userLogin) {
      navigate('/admin')
    }
  }, [userLogin])

  return (
    <div className='container vh-100'>
    <div className='container container-fluid h-custom'>
    <div className='row d-flex align-items-center justify-content-center h-100'>
        <div className='col-md-9 col-lg-6 col-xl-5'>
        <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
        </div>
        <div className='col-md-7 col-lg-5 col-xl-5 offset-xl-1'>
          <form onSubmit={form.handleSubmit}>
            <div className='form-outline mb-4'>
              <label className='form-label'>Tài Khoản</label>
              <input
                type='text'
                id='taiKhoan'
                name='taiKhoan'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className='form-control form-control-lg'
                placeholder='Vui lòng nhập tài khoản'
              />
              {form.errors.taiKhoan && form.touched.taiKhoan ? (
                <div className='text-danger position-absolute'>
                  {form.errors.taiKhoan}
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='form-outline mb-3'>
              <label className='form-label'>Mật khẩu</label>
              <input
                type='password'
                id='matKhau'
                name='matKhau'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className='form-control form-control-lg'
                placeholder='Nhập Mật khẩu'
              />
              {form.errors.matKhau && form.touched.matKhau ? (
                <div className='text-danger position-absolute'>
                  {form.errors.matKhau}
                </div>
              ) : (
                ''
              )}
            </div>
            <button
              type='submit'
              className="btn btn-primary btn-lg"
              style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
            >
              Đăng nhập
            </button>
            <p className="small fw-bold mt-2 pt-1 mb-0">
                 Bạn chưa có tài khoản{" "}
                  <a href="#!" className="link-danger">
                    Đăng ký
                  </a>
                </p>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}
