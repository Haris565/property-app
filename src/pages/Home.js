import { useEffect, useRef, useState } from 'react';
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Header from '../components/Header';
import Banner from './../components/Banner';
import { cardData } from './../consts/cardData';
import MediumCard from '../components/MediumCard';
import LargeCard from './../components/LargeCard';
import Footer from './../components/Footer';
import { useNavigate } from "react-router-dom";




const sideScroll = (element,speed,distance,step) => {
  let scrollAmount = 0;
  const slideTimer = setInterval(() => {
    element.scrollLeft += step;
    scrollAmount += Math.abs(step);
    if (scrollAmount >= distance) {
      clearInterval(slideTimer);
    }
  }, speed);
};


function App() {
  const [data, setData] = useState()
  const [loading, setloading] = useState(false)
  const contentWrapper = useRef(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await fetch('https://links.papareact.com/zp1')
          console.log(res)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [])


  return (
    <div className="">
        <Header stickyHeader={true} />
      
        <Banner />
        <main className='max-w-7xl mx-auto px-8 sm:px-16'>



        {/* <section className='pt-6'>
          <h2 className='font-semibold pb-5 text-4xl' >Explore Nearby</h2>
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {exploreData?.map((item, index)=>{
              return(
              <SmallCard key={index} img={item.img} location={item.location} distance={item.distance} />
            )})}
          </div>
      
        </section> */}

        <section>
          <div className='flex justify-between items-center'>
            <h2 className='text-3xl text-gray-700 font-semibold py-8'>Dream Homes</h2>
            <div className='flex '>
              <div>
                <ArrowCircleLeftIcon className='h-10 w-10 text-gray-700'    onClick={() => {sideScroll(contentWrapper.current, 25, 100, -10)}}/>
              </div>
              <div>
                <ArrowCircleRightIcon className='h-10 w-10 text-gray-700'    onClick={() => {sideScroll(contentWrapper.current, 25, 100, 10)}} />
              </div>
            </div>
          </div>
         
          <div className='flex space-x-4 overflow-scroll scrollbar-hide p-5 -ml-3' ref={contentWrapper}>
              {cardData?.map((item, index)=>{
                return (
                  <MediumCard key={index} image={item.img} title={item.title} />
                )
              })}
          </div>
   

        </section>

        <LargeCard
          image='https://links.papareact.com/4cj'
          title='The Best listed properties'
          description="The great place to live"
          buttonText='Get Started'
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
