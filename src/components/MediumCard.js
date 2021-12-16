// import Image from "next/image"
import { HeartIcon } from '@heroicons/react/outline';
import { BiBed, BiBath } from 'react-icons/bi';
import {AiOutlineCar} from "react-icons/ai"


function MediumCard({image, title}) {

    return (
        <div className='cursor-pointer bg-gray-100 hover:scale-105 transform transition duration-300 ease-out'>
            <div className='relative h-80 w-80'>
                <img src={image} alt="property" layout='fill' className=''/>
                <div className="absolute z-50 top-[5%] left-[85%]" >
                    <HeartIcon className='h-8 w-8 text-white' />
                </div>
            </div>

         
            <div>
                <h3 className='text-lg mt-3 text-center'>{title}</h3>
                <div className='text-center flex justify-center space-x-4 my-3'>
                    <div className='flex flex-row space-x-2 items-center '>
                        <p>2</p>
                        <BiBed className='h-4 w-4' />
                    </div>
                    <div className='flex flex-row space-x-2 items-center'>
                        <p>1</p>
                        <BiBath className='h-4 w-4' />
                    </div>
                    <div className='flex flex-row space-x-2 items-center'>
                        <p>1</p>
                        <AiOutlineCar className='h-4 w-4' />
                    </div>

                </div>
            </div>
           
            
        </div>
    )
}

export default MediumCard