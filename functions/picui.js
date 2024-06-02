export async function onRequestPost(context) {  // Contents of context object  
    const request = context.request;
     //国内免费上传
     const response = await fetch('https://picui.cn/upload', {
         method: request.method,
         headers: request.headers,
         body: request.body,
     });
     if(!response||!response.ok){
        return new Response(null,{
            status:404,
            statusText:'error'
        });
     }
    const data = await  response.json();
    const newdata = {
        "location":data.data.links.url,
        "src":data.data.links.url,
        "default":data.data.links.url,
        "originname":data.data.origin_name,
        "size": Math.floor(data.data.size),
        "mime": data.data.mimetype,
        "md5": data.data.md5,
        "sha1": data.data.sha1,
        "width": data.data.width,
        "height": data.data.height
    };
    return new Response(new Blob([JSON.stringify(newdata)],{type:'application/json'}));
  }
  