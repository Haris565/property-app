import React from 'react'

function List() {
    return (
        <>
        <div className='text-gray-500 font-semibold text-left'>GOVERNMENT SCHOOL CATCHMENT</div>
            <div className='flex flex-1 flex-row justify-between w-full items-center py-5 border-b-2'>
                <div>
                    <h1 className='text-gray-500 font-semibold text-left'>Lorem Ipsum School</h1>
                </div>

                <div>
                    <h1 className='text-gray-700'>
                        0.6km
                    </h1>
                </div>
            
                    
    

                <div className="">
        
                    <button className="inline-block rounded-sm text-white 
                        bg-black hover:bg-gray-500 duration-300 
                        text-xs font-bold 
                        mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 
                        opacity-90 hover:opacity-100">
                        Black Label
                    </button>

            
                    <button  className="inline-block rounded-sm text-white 
                        bg-green-600 hover:bg-green-500 duration-300 
                        text-xs font-bold 
                        mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 
                        opacity-90 hover:opacity-100">
                        Red Label
                    </button>

            
                    <button href="#" className="inline-block rounded-sm text-white 
                        bg-yellow-400 hover:bg-yellow-500 duration-300 
                        text-xs font-bold 
                        mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 
                        opacity-90 hover:opacity-100">
                        Yellow Label
                    </button>

                
                </div>
                
                <button className="border border-gray-900 py-1 px-2 hover:scale-105 transform transition duration-300 ease-out ">
                    <h1>View Contonment</h1>
                </button>
                
           

            
        </div>
        </>
        
    )
}

export default List
