import { useEffect } from "react";


function User()
{
    useEffect(() =>{
        let isMounted = true;
        const controller = new AbortController()
        const signal = controller.signal;
        const getUser =  async()=>
        {

        }
        return () =>
        {
            isMounted = false;
            controller.abort();
        }
    },[])
}