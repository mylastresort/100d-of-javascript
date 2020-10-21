
let authentication=(params)=>{return`https://api.themoviedb.org/3/authentication/${params}/new?api_key=${apiKey}`};
apiKey ='04c35731a5ee918f014970082a0088b1'
session='guest_session'
token='token'



async function getData(api){
    var responce= await fetch(api);
    return responce.json();
}

getData(authentication(session)).then(e=>{localStorage.setItem('session',e.guest_session_id)})
getData(authentication(token)).then(e=>{localStorage.setItem('token',e.request_token)})

//waiting for another api service better than this