import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'


type props = {
  Component: React.FC
}

export default function NavbarLeft ({ Component }: props) {
  const location = useLocation()
  const [isActive, setActive] = useState(location.pathname)
  useEffect(() => {
    setActive(location.pathname)
  },[location.pathname])
  return (
    <div className='adminTemplate d-flex' id='adminTemplate'>
    <div className='admin-navbar d-flex flex-column align-items-center'>
      <div className='admin-navbar-brand text-center'>
     //image
      </div>
      <div className='admin-navbar-items  h-100 w-100'>
        <ul>
          <li className='animate__animated animate__fadeIn'>
            <NavLink
              to={'/admin/index'}
              className={` ${
                isActive === '/admin/index'
                  ? 'fs-4 fw-normal isactive'
                  : 'fs-4 fw-normal'
              }`}
            >
              <i className='bi bi-house'></i>Trang chủ
            </NavLink>
          </li>

          <li className='animate__animated animate__fadeIn animate__delay-1s'>
            <NavLink
              to={'/admin/user'}
              className={` ${
                isActive === '/admin/user'
                  ? 'fs-4 fw-normal isactive'
                  : 'fs-4 fw-normal'
              }`}
            >
              <i className='bi bi-person'></i>Người dùng
            </NavLink>
          </li>

          <li className='animate__animated animate__fadeIn animate__delay-2s'>
            <NavLink
              to={'/admin/course'}
              className={` ${
                isActive === '/admin/course'
                  ? 'fs-4 fw-normal isactive'
                  : 'fs-4 fw-normal'
              }`}
            >
              <i className='bi bi-book'></i>Khóa học
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
    <div className='admin-content'>
      <Component  />
    </div>
  </div>
  )
}
