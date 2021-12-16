import ReactMapGL from 'react-map-gl';
import { Marker, Popup } from 'react-map-gl';
import {useState, useEffect} from 'react'
import { getCenter } from 'geolib';
import { SearchIcon, HomeIcon} from '@heroicons/react/solid'

function Map({searchResult}) {

    const coordinates = searchResult.map((result)=>({
        longitude: result.long,
        latitude: result.lat
      }))


    const center = getCenter(coordinates)

    const [viewport, setviewport] = useState({
        width:"100%",
        height:"100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 12
    })

    const [loc, setLoc] = useState({})



    return (
        
        
        <ReactMapGL
            mapStyle="mapbox://styles/haris12345/ckwajquaf6haq14p3hvkvzfvo"
            mapboxApiAccessToken="pk.eyJ1IjoiaGFyaXMxMjM0NSIsImEiOiJja3MxamtoZDEwMmJxMm5tZXkzeWI1YW02In0.D4tqetwrkn5HLrv7AYIMdQ"
            
            {...viewport}
            onViewportChange={(nextViewport)=>setviewport(nextViewport)}
        >
            {searchResult.map ((result,index) => {
                return (
                    <div key={index}>
                        <Marker
                            longitude={result.long}
                            latitude={result.lat}
                            offsetLeft={-20}
                            offsetTop={-10}
                        >
                            {loc?.long === result?.long ? (
                                <Popup
                                    onClose={()=>setLoc({})}
                                    closeOnClick={true}
                                    
                                    longitude={loc.long}
                                    latitude={loc.lat}
                                    
                                >
                                    {result.title}
                                </Popup>
                            ): ( null )}
                            <p role='img' aria-label='push-pin' onClick={()=>setLoc(result)}>
                                <HomeIcon className='h-8 bg-green-700 text-white rounded-full p-2 cursor-pointer md:mx-2 animate-bounce' />
                            </p>
                            
                   

                        </Marker>
                    </div>
                    
                )
            })}
            
        </ReactMapGL>

          
    )
}

export default Map