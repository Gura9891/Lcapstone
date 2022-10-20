import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Product from '../../Component/Product/Product'
import { AppDispatch, RootState } from '../../redux/configStore'
import { getProductApi, getSearchProductApi, ProductModel } from '../../redux/reducers/productProducer'

type Props = {}

export default function Search({ }: Props) {

    const { searchProduct } = useSelector((state: RootState) => state.productProducer)
    console.log(searchProduct );
    const dispatch: AppDispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        let { tenKhoaHoc } = params;
        const action = getSearchProductApi(tenKhoaHoc);
        dispatch(action)
    }, [params.tenKhoaHoc])

    const renderSearch = () => {
        return searchProduct.map((prod: ProductModel, index: number) => {
            return <div className='col-4' key={index}>
                <Product product={prod} />
            </div>
        })
    }

    return (
        <div>
            <h2>search</h2>
            <div className='row'>
                {renderSearch()}
            </div>
        </div>
    )
}