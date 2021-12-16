
function Hero({img}) {
 
    return (
        <div className='relative h-[300px] sm:h-[300px] lg:h-[400px] xl:h-[400px] 2xl:h-[400px] bg-green-700' >
            <img src={img} alt='' className="h-[300px] sm:h-[300px] lg:h-[400px] xl:h-[400px] 2xl:h-[400px] w-full object-cover" />

            {/* <div className='absolute top-1/4  w-full text-center'>
            
                
               

            </div> */}
        </div>
    )
}

export default Hero