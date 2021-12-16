import { HeartIcon } from '@heroicons/react/outline';
import { BiBed, BiBath } from 'react-icons/bi';
import { AiOutlineCar } from 'react-icons/ai';
import { useNavigate } from 'react-router';


function SmallCard({img , location , distance, title,}) {
    let navigate = useNavigate()
    const clickHandler = () => {
        
      navigate("/detail")
    }
    return (
        <div 
            className='flex flex-col cursor-pointer flex-1 bg-gray-200 my-5 w-[350px] hover:scale-105 transform transition duration-300 ease-out rounded-lg overflow-hidden'
            onClick={()=>clickHandler()} 
        >
    
            <div className='relative h-80 w-[380px]'>
                <img src={img} alt="property"  className='w-full h-[300px]'/>
            </div>

     
        <div className='flex flex-col mx-3'>
            <h3 className='text-lg font-semibold mt-3 text-left'>{title}</h3>
            <div className='text-left flex space-x-4 my-3'>
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

export default SmallCard