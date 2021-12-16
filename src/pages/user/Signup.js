import { ArrowLeftIcon } from '@heroicons/react/solid';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../redux/actions/auth';




function Signup() {
    const [userRole, setuserRole] = useState('user')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [userName, setuserName] = useState('haris123')
    const [userEmail, setuserEmail] = useState('')
    const [userPass, setuserPass] = useState('')

    const user = useSelector(state => state.auth)
    const dispatch = useDispatch()


    const submitHandler = () => {
      dispatch(register(firstName, lastName, userName, userPass, userEmail, userRole))
    }

    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-white flex">
   
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className='flex justify-start cursor-pointer items-center ' onClick={()=>navigate('/')}>
            <ArrowLeftIcon className='h-6 w-10 text-green-900'  />
            <p className='text-green-900 font-bold text-xl'>Back to Home</p>
        </div>
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-green-900">Create your account</h2>              
            </div>
  
            <div className="mt-8">              
              <div className="mt-6">
                <div  className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-green-700">
                      First Name
                    </label>
                    <div className="mt-1">
                        <input type="text" name="" id="" 
                            value={firstName}
                            onChange={(e)=>setfirstName(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-green-700">
                      Last Name
                    </label>
                    <div className="mt-1">
                        <input type="text" name="" id="" 
                            value={lastName}
                            onChange={(e)=>setlastName(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-green-700">
                      Email address
                    </label>
                    <div className="mt-1">
                        <input type="email" name="" id=""
                            value={userEmail}
                            onChange={(e)=>setuserEmail(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                  </div>
  
                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-green-700">
                      Password
                    </label>
                    <div className="mt-1">
                        <input type="password"
                        value={userPass}
                        onChange={(e)=>setuserPass(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                       
                    </div>
                  </div>
                  <div>
                  <button  
                    onClick={submitHandler}  
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                   >        
                        Sign up 
                    </button>

                    <div className='flex space-x-2 mt-5 font-semibold'>
                        <h1>Already have an account?</h1>
                        <Link to="/login" className='font-bold text-green-600 underline cursor-pointer'>Log in</Link>
                    </div>
                  </div>
                </div>
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

export default Signup