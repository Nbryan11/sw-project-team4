import logo1 from '../assets/mantenimientoPreventivo.png'
import logo2 from '../assets/mantenimientoCorrectivo.png'
import logo3 from '../assets/serviciosSoftware.png'

import React from 'react'

const serviceForm = () => {
  return (
    <div className=''>
     <h2>Elija el tipo de servicio que quiere solicitar</h2>  
     <div className='flex items-center p-4 justify-around'>
    <img className="w-44" src={logo1}/>
    <img  className="w-44" src={logo2}/>
    <img className="w-44" src={logo3}/>
    <input
        type="date"
        required
      />
    </div>
    </div>
  )
}

export default serviceForm