import React from 'react'
import { HeartIcon } from '@heroicons/react/outline';
import { BiBed, BiBath } from 'react-icons/bi';
import { AiOutlineCar } from 'react-icons/ai';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function SuggestedCards() {
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="100"
          image={"https://links.papareact.com/2io"}
          alt="Other property"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
                $1,800,000
          </Typography>
          <Typography variant="body2" color="text.secondary">
                Contact Agent For Address,
                Sydney, NSW 2000
          </Typography>
        </CardContent>
        <CardContent>
        <div className='text-left flex justify-center space-x-4'>
                    <div className='flex flex-row space-x-2 items-center '>
                        <p>2</p>
                        <BiBed className='h-6 w-6' />
                    </div>
                    <div className='flex flex-row space-x-2 items-center'>
                        <p>1</p>
                        <BiBath className='h-6 w-6' />
                    </div>
                    <div className='flex flex-row space-x-2 items-center'>
                        <p>1</p>
                        <AiOutlineCar className='h-6 w-6' />
                    </div>

                </div>
        </CardContent>
      </Card>
        // <div className='cursor-pointer border-2'>
        //     <div className='relative h-[200px] w-full'>
        //         <img src={'https://links.papareact.com/2io'} alt="property" layout='fill' className=''/>
        //         <div className="absolute z-50 top-[5%] left-[85%]" >
        //             <HeartIcon className='h-8 w-8 text-white' />
        //         </div>
        //     </div>

         
        //     <div >
        //         <h3 className='text-lg mt-3 text-left'>77/278-284 Sussex </h3>
        //         <div className='text-left flex justify-center space-x-4 my-3'>
        //             <div className='flex flex-row space-x-2 items-center '>
        //                 <p>2</p>
        //                 <BiBed className='h-4 w-4' />
        //             </div>
        //             <div className='flex flex-row space-x-2 items-center'>
        //                 <p>1</p>
        //                 <BiBath className='h-4 w-4' />
        //             </div>
        //             <div className='flex flex-row space-x-2 items-center'>
        //                 <p>1</p>
        //                 <AiOutlineCar className='h-4 w-4' />
        //             </div>

        //         </div>
        //     </div>
           
            
        // </div>
    )
}

export default SuggestedCards
