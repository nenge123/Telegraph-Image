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
  
  // Set CORS to all /api responses
export async function onRequest(context){
    const response = await context.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Max-Age', '86400');
    return response;
};
export async function onRequestGet(context){
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
     const response = await fetch(request).catch(e=>undefined);
     if(!response||response.status!=200){
        return response?response:new Response(null,{status:404,statusText:'error'});
     }
    const data = await response.json();
    if(!data||!data.data){
        return new Response(null,{
            status:404,
            statusText:'error json'
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
  
