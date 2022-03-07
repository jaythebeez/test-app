import { BASE_URL, elements} from "../base/base";
import { showSnackbar, showPreLoader,clearPreLoader, scrollToBottom, parseCoords } from "../utils/utils";
import newMap from "../models/Map";

export const postData = (origin,dest) => {
    return new Promise(async (resolve)=>{
        try{
            //get token from api
            const token = await fetch(`${BASE_URL}/route`,{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({origin: origin, destination: dest})
            }).then(response=>{
            if(response.ok) return response;
            throw new Error('Failed to get token');
            }).then(res=>res.json());
            if (token) resolve(token)
        }catch(err){
            resolve(null)
        }
    })
}


//get map coordinates from backend
export const getCoords = (token) => {
  return new Promise(async (resolve)=>{
      try{
          const data = await fetch(`${BASE_URL}/route/${token}`)
          .then((response)=>{
              if(response.ok) return response;
              throw new Error('Failed to get coordinates');
          })
          .then(data=>data.json());
  
          //if server returns busy rerun logic
          if (data.status === 'in progress'){
              showSnackbar('retrying please wait');
              resolve(getCoords(token));
          }
          resolve(data);
      }
      catch(err){
          resolve({status:'error', message: err})
      }
  })
}

export const handleData = async (origin, dest) => {

    //add Preloader to page
    showPreLoader(elements.bodyDiv);

    const token = await postData(origin,dest);

    if(token){

        //get coordinates from api
        const data = await getCoords(token.token);

        if (data.status === 'success'){
            //chnage coords data from string to number
            const coords = parseCoords(data.path);
            coords.forEach((coord, index)=>{
                //add markers to the map instance created
                newMap.addMarker(coord, index);
            })
            //scroll to bottom of page
            scrollToBottom();
            //confirm that everything was successful
            showSnackbar('All was successful');
        }
        if(data.status === 'error'){
            showSnackbar(data.message);
        }
        if(data.status === 'failure'){
            showSnackbar('Location not accessible by car');
        }    
    }
    else{
        showSnackbar('Failed to get token')
    }
    clearPreLoader(elements.bodyDiv);
}