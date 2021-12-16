import { useState } from "react"
import {SearchIcon, MenuIcon, UserCircleIcon, UserIcon, GlobeAltIcon} from "@heroicons/react/solid"
import logo from "../images/homiee.svg"
import logowhite from "../images/homiee-white.svg"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"


function Header({stickyHeader}) {
    
   const navigate = useNavigate()

    // const search = () => {
    //     router.push({
    //         pathname: '/Search',
    //         query: {
    //             location: searchInput,
    //             startDate: startDate.toISOString(),
    //             endDate:endDate.toISOString(),
    //             guest:numberOfGuest
    //         }
    //     })
    // }

    return (
        <header className={stickyHeader ? "sticky top-0 z-50 grid grid-cols-3 bg-white shadow-xl py-5 px-5 md:px-10 items-center " : 
                "top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10 items-center "}>
       
            <div className='relative flex items-center h-10 cursor-pointer my-auto ' onClick={()=>navigate('/')}>
                <img src={logo} 
                    alt=""
                    className='object-contain '
                  
                                           
                />
            </div>
    

            <div className='flex justify-start text-gray-900 font-semibold'>
                <ul className='flex space-x-10 items-center'>
                    <li>
                        <div className='flex items-end cursor-pointer pb-2 '>
                            <h1>Property</h1>
                            
                        </div>
                    </li>
                    <li>
                        <div className='flex items-end cursor-pointer pb-2 '>
                            <h1>Agent</h1>
                        </div>
                    </li>
                    <li>
                        <div className='flex items-end cursor-pointer pb-2'>
                            <h1>Insurence</h1>
                        </div>
                    </li>
                    <li>
                        <div className='flex items-end cursor-pointer pb-2'>
                            <Link to='/pricing'>Pricing</Link>
                        </div>
                    </li>
                   
                </ul>
            </div>

            <div className='flex items-center justify-end space-x-4 text-gray-900 font-semibold'>
                <Link to="/agent/signup" className='hidden md:inline cursor-pointer text-green-800 font-bold hover:underline '>Register as Agent</Link>
                <GlobeAltIcon className='h-6 w-6 text-green-600 cursor-pointer '  />

                <div className='flex items-center space-x-3 border-2 p-2 rounded-md text-white cursor-pointer bg-green-600 hover:bg-green-800 '
                    onClick={()=>{navigate("/login")}}
                >
                    <h1>Login</h1>
                    <UserIcon className='h-6 ' />
                </div>
            </div>
           
        </header>

    )
}

export default Header