import React from 'react'
import { ProductModel } from '../../redux/reducers/productProducer'

type Props = {
    product:ProductModel
}

export default function Product({product}: Props) {
  return (
    <div className='card'>
        <img src={product.hinhAnh} alt={product.tenKhoaHoc} />
        <div className='card-body'>
<h3 className='card-title'>{product.tenKhoaHoc}</h3>
<button className='btn btn-danger'>Đăng Ký</button>


        </div>
    </div>
  )
}