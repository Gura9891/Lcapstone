import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../Component/Product/Product';
import { AppDispatch, RootState } from '../../redux/configStore';
import { getProductApi, ProductModel } from '../../redux/reducers/productProducer';

type Props = {
  title?:string;
}


export default function Home({title}: Props) {
  const {arrProduct} = useSelector((state:RootState)=>state.productProducer)
  const dispatch:AppDispatch = useDispatch();

useEffect (()=> {
//callapi action thunk
const actionApi = getProductApi();
dispatch(actionApi)


},[])  



const renderProduct = () => {
return arrProduct.map((prod:ProductModel, index:number)=>{
return <div className='col-4' key={index}>
<Product product={prod}/>
</div>
})
}



  return (
    <div>
      <h2>Các Khóa Học Mới Nhất</h2>
      <div className='row'>
        {renderProduct()}
      </div>

    </div>
  )
}