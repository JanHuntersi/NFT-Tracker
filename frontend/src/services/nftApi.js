import fetch from "node-fetch";
import { useState } from "react";

function nftApi(){

    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false)
    const [error, setError ] = useState(null)

    var requestOptions={
        method: 'GET',
        redirect: 'follow'
    };
    const baseURL = "https://eth-mainnet.g.alchemy.com/v2/demo/getNFTs/";    


    
    function fetchNftFromOwnerAddr(ownerAddr){
        setLoading(true)
        fetch(`${baseURL}?owner=${ownerAddr}`, requestOptions)
        .then(response => setData(response))
        .catch(err => setError(err))
        .finally(() =>{
            setLoading(false);
        })
    }
    return {data, loading, error, fetchNftFromOwnerAddr}
}

export default nftApi



//fetchURL = `${baseURL}?owner=${ownerAddr}`;
//const ownerAddr = "0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D";


/*
fetch(fetchURL,requestOptions)
.then(res => res.json())
.then(res => JSON.stringify(res,null,2))
.then(result => console.log(result))
.catch(error => console.log('error',error))
*/
