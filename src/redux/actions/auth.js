import axios from 'axios';
import {REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from './types';





export const register =( firstName, lastName, userName, userPass, userEmail, userRole )=> async dispatch=>{

    const user= {
        firstName,
        lastName,
        userName, 
        userPass, 
        userEmail, 
        userRole
   }

//    console.log(user)
//    fetch(`https://www.homiee.a2hosted.com/api/v1/index.php/user/signup`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body:JSON.stringify(user)
//   })
//   .then(response => response.json())  
//   .catch(error=> 
//     dispatch({
//         type: REGISTER_FAIL,
//         payload: "error"
//     })
//     )
//   .then(response=>{
//     console.log(response);
//     dispatch({
//         type: REGISTER_SUCCESS,
//         payload: response.data
//     })
//   });
    axios.request({
        method: 'POST',
        url: `https://www.homiee.a2hosted.com/api/v1/index.php/user/signup`,
        data:user
      
      }).then((res)=>{ 
          console.log(res);
          dispatch({
              type: REGISTER_SUCCESS,
              payload: res.data
          })
      
      }).catch((err)=>{
          dispatch({
              type: REGISTER_FAIL,
              payload: "error"
          })
        console.log("api call unsucessfull",err);
      
        
      })
    
} 




export const login =(userEmail,userPass)=> async dispatch=>{

    const user ={userEmail,userPass}
    console.log(user)
    fetch(`https://www.homiee.a2hosted.com/api/v1/index.php/user/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(user)
      }).then(response => response.json()).then((response)=>{
        dispatch({
              type:LOGIN_SUCCESS,
              payload: response
          })
    }).catch(error => dispatch({
        type: LOGIN_FAIL,
        payload: "error"
    }) )

    // axios.request({
    //     method: 'POST',
    //     url: `https://www.homiee.a2hosted.com/api/v1/index.php/user/login`,
    //     data:user
      
    //   }).then((res)=>{ 
    //       console.log(user);
    //       dispatch({
    //           type:LOGIN_SUCCESS,
    //           payload: res
    //       })
        
      
    //   }).catch((err)=>{
    //       dispatch({
         
    //           type: LOGIN_FAIL,
    //           payload: "error"
    //       })
    //     // console.log("api call unsucessfull",err);
      
        
    //   })
} 


export const logout  = () => async dispatch =>{
    dispatch({
        type:LOGOUT
    })
}



