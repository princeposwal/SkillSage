import axios from 'axios';

//we can make the code clean by creating a instance of axios with the base url and withCredentials set to true
/* const api=axios.create({
    baseURL:'http://localhost:3000/api/auth',
    withCredentials:true
})  
    Now we can remove the withCredentials option from each request and alse can use const response=await api.post('/register', {username,email,password});*/



export async function register({username,email,password}){
    try{
        const response=await axios.post( `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,{
            username,
            email,
            password
        },{
            withCredentials:true
        })
        return response.data;
    } catch (err) {
        console.log(err)
    }
}



export async function login({email,password}){
    try{
        const response=await axios.post( `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,{
            email,
            password
        },{
            withCredentials:true
        })
        return response.data;
    } catch (err) {
        console.log(err)
    }
}



export async function logout(){
    try{
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{
            withCredentials:true
        })
        return response.data;
    } catch (err) {
        console.log(err)
    }
}



export async function getMe(){
    try{
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/get-me`,{
            withCredentials: true
        })
        return response.data;
    } catch (err) {
        console.log(err)
    }
}