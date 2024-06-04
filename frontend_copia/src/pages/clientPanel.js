import React, { useEffect, useState } from 'react'
import { CiUser } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';


const ClientPanel = () => {

    //traemos la informacion de usuario que tenemos guardada, esto no lo proporciona redux store y userSlice en la carpeta store
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
            <aside className='bg-white min-h-full  w-full  max-w-60  customShadow'>
                <div className='h-32 bg-blue-50 flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center '>
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                            ) : (
                                <CiUser />
                            )

                        }

                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                {/***navigation panel*/}        
                <div>
                <nav className='grid p-4'>
                        <Link to={"history-shopping"} className='px-2 py-1 hover:bg-slate-100'>Purchase History</Link>
                        <Link to={"information"} className='px-2 py-1 hover:bg-slate-100'>user information</Link>
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>update password</Link>
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>wish list</Link>


                </nav>
                </div>
            </aside>
            
            {/***el outlet toma los valores de las ramas hijas aca tomara el de all-users o el de all-products */}
            <main className='w-full h-full p-2'>
                
                <Outlet/>
            </main>
        </div>
    )
}

export default ClientPanel