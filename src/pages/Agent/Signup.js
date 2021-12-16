import { Link } from "react-router-dom"
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router';

function AgentSignup() {
    const navigate = useNavigate()
    return (
<div className="min-h-screen bg-white flex">
           
 <div className="flex h-screen bg-gray-200 mt-10 ">
     
        <div className="grid bg-white rounded-lg w-full">
            <div className='flex justify-start cursor-pointer items-center mx-7 ' onClick={()=>navigate("/")}>
                <ArrowLeftIcon className='h-6 w-10 text-green-900'  />
                <p className='text-green-900 font-bold text-xl'>Back to Home</p>
            </div>
            <div>
              <h2 className="mt-6 mb-6 text-3xl mx-7 font-extrabold text-green-900">Create Agent account</h2>              
            </div>
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-2 mx-7">
            <div className="grid grid-cols-1">
                <label htmlFor="email" className="block text-sm font-medium text-green-700">
                    First Name
                </label>
                <div className="mt-1">
                    <input type="text" name="" id="" 
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1">
                <label htmlFor="email" className="block text-sm font-medium text-green-700">
                    Last Name
                </label>
                <div className="mt-1">
                    <input type="text" name="" id="" 
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                </div>
            </div>
          </div>
    
          <div className="grid grid-cols-1 mt-2 mx-7">
            <label htmlFor="email" className="block text-sm font-medium text-green-700">
                Email
            </label>
            <div className="mt-1">
                <input type="text" name="" id="" 
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
            </div>
          </div>

          <div className="grid grid-cols-1 mt-2 mx-7">
            <label htmlFor="email" className="block text-sm font-medium text-green-700">
                    Password
                </label>
                <div className="mt-1">
                    <input type="text" name="" id="" 
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                </div>
          </div>
      
          <div className="grid grid-cols-1 mt-2 mx-7">
                <label htmlFor="email" className="block text-sm font-medium text-green-700">
                    Selection
                </label>
                <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ">
                <option>Agency</option>
                <option>Option 2</option>
                
                </select>
          </div>
      

      
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label htmlFor="email" className="block text-sm font-medium text-green-700">Upload Photo</label>
              <div className='flex items-center justify-center w-full'>
                  <label className='flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-green-900 group'>
                      <div className='flex flex-col items-center justify-center pt-7'>
                        <svg className="w-10 h-10 text-green-400 group-hover:text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <p className='lowercase text-sm text-gray-400 group-hover:text-green-900 pt-1 tracking-wider'>Select a photo</p>
                      </div>
                    <input type='file' className="hidden" />
                  </label>
              </div>
          </div>
      
                <div className="grid grid-cols-1 mx-7">
                  <button    
                    type="submit"
                    className="w-full flex justify-center mt-5 align-middle items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                   >        
                        Sign up 
                    </button>

                    <div className='flex space-x-2 mt-5 mb-5 font-semibold'>
                        <h1>Already have an account?</h1>
                        <Link to="/login" className='font-bold text-green-600 underline cursor-pointer'>Log in</Link>
                    </div>
                  </div>
      
        </div>
            </div>
                <div className="hidden lg:block relative w-0 flex-1">
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://links.papareact.com/4cj"
                    alt=""
                  />
                </div>
    </div>
            
    )
}

export default AgentSignup
