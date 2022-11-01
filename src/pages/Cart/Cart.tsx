import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/configStore';
import { getDetailApi, ProductModel } from '../../redux/reducers/productProducer';

type Props = {
    
}

export default function Cart({ }: Props) {

    const { cart,oderDetail } = useSelector(
        (state: RootState) => state.productProducer
      );
      console.log({cart});
      
    
      const renderTable = () => {
          
          return cart[0]?.map((prod:ProductModel,index:number) => {
              return <tr key={index}>
                  <td>{prod.maKhoaHoc}</td>
                  <td>
                      <img src={prod.hinhAnh} alt="..." height={250}/>
                  </td>
                  <td>{prod.ngayTao}</td>
                  <td>{prod.nguoiTao.hoTen}</td>
              </tr>
          })
      }
    
      

    return (
        <div className='container'>
            <div>
                <h3>Giỏ Hàng </h3>
                <div className='table table-hover'>
                    <thead>
                        <tr>
                            <th scope='col'>Khoá Học</th>
                            <th scope='col'>Hình Ảnh</th>
                            <th scope='col'>Ngày Tạo</th>
                            <th scope='col'>Giảng Viên</th>
                            <th scope='col'>Hành Đọng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTable()}
                    </tbody>
                </div>
            </div>
        </div>
    )
}


