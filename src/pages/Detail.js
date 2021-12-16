import Header from "../components/Header"
import SuggestedCards from "../components/SuggestedCards";
import { cardData } from "../consts/cardData";
import Hero from './../components/Hero';
import BasicTabs from './../components/Tab';
import MediumCard from './../components/MediumCard';



const Detail = () => {
   const item = {
    description: "1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine",
    img: "https://links.papareact.com/xqj",
    lat: 51.5421655,
    location: "Private room in center of London",
    long: -0.0022275,
    price: "£30 / night",
    star: 4.73,
    title: "Stay at this spacious Edwardian House",
    total: "£117 total",
   }
    return (
        <div>
            <Header />
            <Hero img={item.img}/>
            <main className='max-w-7xl mx-auto px-8 sm:px-16'>
                <section className='grid grid-cols-2 mt-5'>
              
                    <div className=''>
                        {/* <div className='bg-red-700 px-2 py-2'>
                            <h1>Sold at auction 13 Dec 2021</h1>
                        </div> */}
                        <div className='my-4 border-b-2 pb-10'>
                            <h1 className='text-2xl text-gray-800 font-bold text-left'>$1,395,000</h1>
                            <h1 className='text-left font-semibold mt-5'>3/4 Kate Street, East Mackay QLD 4740</h1>
                            <h1 className='text-left text-gray-700 '>{item.description}</h1>
                        </div>

                        <div>
                            <h1 className='text-2xl font-bold text-left text-gray-800'>Property Description</h1>
                            <h1 className='text-left text-gray-700 mt-5'>Officia nisi nulla adipisicing exercitation veniam culpa. Voluptate ut sit sunt ea. Aliqua Lorem dolor ex est. Deserunt eiusmod ad incididunt in proident incididunt nostrud quis. Est esse sunt anim officia pariatur occaecat velit incididunt adipisicing exercitation pariatur. Consequat tempor officia officia incididunt consequat proident eiusmod nostrud laborum consequat.</h1>
                        </div>
                   
                    
                    
                    </div>

                    <div className="mx-auto">
                        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden my-4">
                            <img class="w-full h-40 object-cover object-center" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />
                            <div className="py-2 px-6">
                                <h1 className="text-xl font-semibold text-gray-800">Steve johnson</h1>
                                <p className=" text-lg text-gray-700">Explore Property Mackay</p>
                            </div>
                    <div className=" px-6 py-6 flex flex-col space-y-3">
                                <button className='border-2 bg-green-700 py-2 rounded-md px-2 text-center text-white font-semibold hover:scale-105 transform transition duration-300 ease-out'>
                                    Call
                                </button>
                                <button className='border border-green-700 rounded-md py-2 px-2 text-center text-green-900 font-semibold hover:scale-105 transform transition duration-300 ease-out'>
                                    Email
                                </button>
                            </div>
                        </div>
                    </div>

                </section>

                <section className='mt-5'>
                    <BasicTabs />
                </section>

                <section>
                    <div className='text-gray-600 text-xl my-5 font-semibold space-x-4'>Other properties for sale</div>
                <div className='grid grid-cols-3 '>
                    {cardData?.map((item, index)=>{
                        return (
                        <SuggestedCards key={index} image={item.img} title={item.title} />
                        )
                    })}
                </div>
                </section>
       
           

            </main>
        </div>
    )
}

export default Detail