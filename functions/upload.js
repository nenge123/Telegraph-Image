// Respond to OPTIONS method
export async function onRequestOptions(){
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Max-Age': '86400',
      },
    });
  };
export async function onRequestGet(){
    return new Response(new Blob(['only on post [file]'],{type:'text/html'}),{
        status:200,
        statusText:'error',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Max-Age': '86400',
        }
    });
}
export async function onRequestPost(context) {  // Contents of context object  
    const request = context.request;
     //国内免费上传
     const response = await fetch('https://telegra.ph/upload', {
        method: request.method,
        headers: request.headers,
        body: request.body,
    }).catch(e=>undefined);
     if(!response||response.status!=200){
        return response?response:new Response(null,{status:404,statusText:'error'});
     }
    const data = await response.json();
    if(!data||!data.src){
        return new Response(null,{
            status:404,
            statusText:'error json',
            headers:{
                'Access-Control-Allow-Origin':'*'
            }
        });
    }
    const src = 'https://im.gurl.eu.org'+data.src;
    const newdata = {
        "location":src,
        "src":src,
        "default":src,
    };
    let headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    return new Response(new Blob([JSON.stringify(newdata)],{type:'application/json'}),{
        status:200,
        headers
    });
  }
  
