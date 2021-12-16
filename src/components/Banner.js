import { SearchIcon, AdjustmentsIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function Banner() {
    const [location, setlocation] = useState('')
    const [filter, setfilter] = useState('All')
    let navigate = useNavigate();



    const search = () => {
        navigate("/search",{state:{
            location: location,
            filter: filter
        }})
    }
    return (
        <div className='relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] bg-green-700' >
            {/* <Image src='https://links.papareact.com/0fm' layout="fill" objectFit='cover' /> */}

            <div className='absolute top-1/4  w-full text-center'>
            {/* <input type="text" 
                placeholder={"Start your Search"} className='pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-300 ' /> */}
                
        
                <div className='w-4/6 flex flex-col mx-auto h-[200px] justify-center space-y-4 bg-green-900 '>
                    <div className='flex w-5/6 mx-auto space-x-2 text-white justify-between'> 
                         <div className='flex space-x-2'>
                            <p className='text-sm px-8 py-2 rounded-lg cursor-pointer hover:shadow-lg bg-white font-bold text-green-700 active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                                All
                            </p>
                            <p className='text-sm px-8 py-2  border rounded-lg   hover:shadow-lg font-bold active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                                Buy
                            </p>
                            <p className='text-sm px-8 py-2  border rounded-lg  cursor-pointer hover:shadow-lg font-bold active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                                Rent
                            </p>
                            <p className='text-sm px-8 py-2  border  rounded-md cursor-pointer hover:shadow-lg font-bold active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                                Sale
                            </p>
                        
                        </div>
                        <div className='flex flex-row px-2 py-2 border w-[200px] rounded-md cursor-pointer hover:shadow-lg  justify-around items-center align-middle'>
                            <p>Show Filters</p>
                            <AdjustmentsIcon className='h-6 w-6' />
                        </div>
                    </div>
                    <div className='flex w-5/6 h-[60px] text-center bg-white mx-auto border-2 border-gray-200 rounded-md py-2 md:border-4 md:shadow-sm'>
                        <input type="text" 
                        value={location}
                        onChange={(e)=>setlocation(e.target.value)}
                        placeholder='Search an address, street or suburb' 
                        className='w-5/6 pl-5 bg-transparent outline-none flex-grow text-md text-gray-900 placeholder-gray-700' />
                  
                        <SearchIcon className='h-10 bg-green-600 text-white rounded-full p-2 cursor-pointer hidden md:inline-flex md:mx-2' 
                            onClick={search}
                        />
                    </div>
                   
                </div>
                
               

            </div>
        </div>
    )
}
export default Banner