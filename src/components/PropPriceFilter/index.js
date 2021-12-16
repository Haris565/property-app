import React from "react";
import { numFormatter } from "../../shared/utilities";
import {Slider, Box, Card} from '@mui/material'

const PropPriceFilter = React.forwardRef((props, ref)=>{

    return(
        // HTML width based on the remaining space so that the slider adjusts in div
        <Card sx={{display:'inline-block', width:props.width, height:"100px"}} >
          <div style={{display:'flex', flexDirection:'row'}}>
            <span style = {{ fontWeight:'bold', marginLeft:"20px", marginRight:"20px", marginTop:"40px"}}>Price:</span>
            <Slider
              style = {{flex:'1', transform: "translateY(200%)" , margin:"0 40px 0 20px"}}
              value={props.priceRange}
              onChange={props.onChange}
              valueLabelDisplay="on"
              valueLabelFormat={value => numFormatter(value)}
              disableSwap
              color="secondary"
              min={props.min}
              max={props.max}
            />
          </div>
    </Card>
    );
});

export default PropPriceFilter;