import { add } from 'lodash';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../redux/configStore';
import { addCart, clearCart, getDetailApi, ProductModel } from '../../redux/reducers/productProducer';
import { ACCESS_TOKEN, getStore } from '../../util/setting';
import { Divider, Button, Table, notification } from "antd";
type Props = {

}

export default function Cart({ }: Props) {

    const { cart } = useSelector(
        (state: RootState) => state.productProducer
    );
    console.log({ cart });
    

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClearCart = () => {
        dispatch(
            clearCart(cart[0])
        )
    }

    // const addCartItem = () => {
    //     const objText = cart;
    //     dispatch(
    //         addCart([objText])
    //     )
    // }

    const messes = () => {
        alert('ban co muon xoa khong')
    }

    const handleSubmit = () => {
        console.log(getStore(ACCESS_TOKEN));

        if (getStore(ACCESS_TOKEN) === null) {
            alert('yêu cầu bạn hãy đăng nhập ')
            return navigate('/login')
        }
        else {
            alert('đăng kí thành công')
            navigate('/profile')
            // addCartItem()
        }
    }



    const renderTable = () => {

        return cart[0]?.map((prod: ProductModel, index: number) => {
            return <tr key={index}>
                <td>{prod.maKhoaHoc}</td>
                <td>
                    <img src={prod.hinhAnh} alt="..." height={250} />
                </td>
                <td>{prod.ngayTao}</td>
                <td>{prod.nguoiTao.hoTen}</td>
                <td>
                    <button className='btn btn-success me-2' onClick={() => {
                        { handleSubmit() }
                    }}>Đăng Kí</button>
                    <button className='btn btn-danger' onClick={() => {
                        { handleClearCart() }
                        { messes() }
                    }}>Xoá</button>
                </td>
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


