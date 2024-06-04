import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayCOPCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

//pasamos category como parametros a donde se llame la funcion <HorizontalCardProduct/>
const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const loadingList = new Array(13).fill(null)

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        console.log(categoryProduct.data)
        setLoading(false)
        setData(categoryProduct?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }
    return (
        <div className='container mx-auto px-4 my-6 relative '>
            
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
            <button className="bg-slate-300 shadow-sm rounded-full p-1 absolute left-0 text-lg hidden md:block" onClick={scrollLeft}><FaAngleLeft/></button>
            <button  className="bg-slate-300 shadow-sm rounded-full p-1 absolute right-0 text-lg hidden md:block" onClick={scrollRight}><FaAngleRight/></button>
            {
                data.map((product, index) => {
                    return (
                        <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                            <div className='bg-white h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all' />
                            </div>

                            <div className='p-1 '>
                            <h2 className='font-medium text-md md:text-md text-black text-ellipsis line-clamp-1'>{product.productName}</h2>
                            <p className='capitalize text-slate-500'>{product?.category}</p>
                            <div className='flex gap-3'>
                                <p className='text-slate-500 line-through'>{displayCOPCurrency(product.price)}</p>
                                <p className='text-red-600 font-medium'>{displayCOPCurrency(product.sellingPrice)}</p>
                            </div>
                            <button className='text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-full'>Add to Cart</button>
                            </div>
                        </div>
                    )
                })
            }
            </div>

        </div>
    )
}

export default VerticalCardProduct