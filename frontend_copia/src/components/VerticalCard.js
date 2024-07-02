import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayCOPCurrency from '../helpers/displayCurrency'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading, data = []}) => {
    const loadingList = new Array(13).fill(null)
    const {fetchUserAddToCart} = useContext(Context)


    const handleAddToCart = async(e, id)=>{
        await addToCart(e, id)
        fetchUserAddToCart()
    }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-scroll scrollbar-none transition-all'>

            {
                loading ? (
                    loadingList.map((product, index) => {
                        return (
                            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-white h-full p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center'>
                                </div>
    
                                <div className='p-4 grid w-full gap-2  '>
                                <h2 className='font-medium text-md md:text-md text-black text-ellipsis line-clamp-1 bg-slate-300 w-full'></h2>
                                <p className='capitalize text-slate-500 p-1 bg-slate-200 w-full'>{product?.category}</p>
                                <div className='flex gap-3 '>
                                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full'></p>
                                    <p className='text-red-600 font-medium p-1 bg-slate-200'></p>
                                </div>
                                <button className='text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-full w-full'></button>
                                </div>
                            </div>
                        )
                    })
                ):(
                    data.map((product, index) => {
                        return (
                            //para enviar arriba de la pagina es con }
                            <Link key={product._id}  to={`/product/${product._id}`} onClick={scrollTop}   className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[310px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-white h-full p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center'>
                                    <img src={product.productImage[0]}  className='object-scale-down h-full hover:scale-110 transition-all' />
                                </div>
    
                                <div className='p-1 '>
                                <h2 className='font-medium text-md md:text-md text-black text-ellipsis line-clamp-1'>{product.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.category}</p>
                                <div className='flex gap-3'>
                                    <p className='text-slate-500 line-through'>{displayCOPCurrency(product.price)}</p>
                                    <p className='text-red-600 font-medium'>{displayCOPCurrency(product.sellingPrice)}</p>
                                </div>
                            <button className='text-sm bg-red-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e, product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                )
               
            }
            </div>
  )
}

export default VerticalCard