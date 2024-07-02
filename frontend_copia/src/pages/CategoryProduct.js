import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const params = useParams()
  //  params?.categoryName
  return (
    <div className='container  mx-auto  bg-slate-400'>
      {/**desktop version */}
      <div>
        {/**left side */}
        <div>
        
        {/**right side (product) */}
        </div>
          Display product
        <div>

        </div>
      </div>
    </div>
  )
}

export default CategoryProduct