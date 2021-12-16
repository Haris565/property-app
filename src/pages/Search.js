
import { SearchIcon, AdjustmentsIcon } from '@heroicons/react/solid';
import { useLocation } from 'react-router';
import Header from "../components/Header";
import SmallCard from './../components/SmallCard';
import { searchResult } from './../consts/searchResult';
import MyMap from '../components/MyMap'


function Search() {


    const location = useLocation()
    console.log(location.state)
    // const router = useRouter();
    // const {location , filter} = router.query;
   

    // const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
    // const formattedEndDate = format(new Date(endDate), "dd MMMM yy")
    // const range = `${formattedStartDate} - ${formattedEndDate}`

    return (
        <div className=''>
            <Header stickyHeader={false}  />
                <section className=' w-full h-[500px]'>
                    <MyMap searchResult={searchResult} />
                </section>


                <main className='max-w-7xl mx-auto mt-10 px-8 sm:px-16'>
                    <section className=''>
                        <div className='flex flex-1 justify-between'>
                            <div className='pt-5'>
                                <p className='text-2xl font-bold'>{`3000+ properties in - ${location.state.location} - Australia`}</p>
                                <h1 className='text-xl font-semibold mt-2 mb-6'> {`${location.state.filter} properties in ${location.state.location ? location.state.location :"Australia"}`} </h1>

                                <div className='hidden lg:inline-flex  space-x-3 text-gray-800 whitespace-nowrap '>
                                    <p className='px-4 py-2 border bg-green-700 text-white rounded-xl cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                                        Parking
                                    </p>
                                    <p className='px-4 py-2 border border-green-900 rounded-xl cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                                        Type of place
                                    </p>
                                    <p className='px-4 py-2 border border-green-900 rounded-xl cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                                        Price
                                    </p>
                                    <p className='px-4 py-2 border border-green-900 rounded-xl cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                                        Rooms and beds
                                    </p>
                                </div>
                            </div>

                            {/* <div className='flex justfiy-center text-white'>
                                <div className='bg-gray-900'>
                                    Filter
                                </div>
                            </div> */}

                        </div>
                  
                        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-3 xl:gap-4 p-5 -ml-3'>
                    
                            {searchResult?.map((item, index)=>{
                            return(
                            <SmallCard key={index} img={item.img} location={item.location} distance={item.distance} title={item.title} />
                            )})}
                        </div>
                
                    </section>
                </main>
            
            {/* <main className='w-full'>
                
                <section className=''>
                    <div className='pt-5 px-6'>
                        <p className='text:sm'>3000+ properties in -  {location} - Australia</p>
                        <h1 className='text-3xl font-semibold mt-2 mb-6'>{filter} property in {location}</h1>
                        <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap '>
                            <p className='px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                                Parking
                            </p>
                            <p className='px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                                Type of place
                            </p>
                            <p className='px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                                Price
                            </p>
                            <p className='px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-300 transform transition duration-100 ease-out'>
                                Rooms and beds
                            </p>
                        </div>
                                 <div className='flex space-x-4 overflow-scroll scrollbar-hide p-5 -ml-3'>
                                 {
                            searchResult?.map(( item, index )=>(
                            <MediumCard
                                item={item}
                                key={index}
                                image={item.img} 
                                location={item.location}
                                title={item.title}
                                description={item.description}
                                star={item.star}
                                price={item.price}
                                total={item.total}
                            />))
                        }
          </div>
                        
                    </div> 
                    <Footer />
                     <div className='w-full h-16'></div>
                </section>
             
            </main> */}
            
        </div>
    )
}

export default Search