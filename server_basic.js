import http from 'http';
http.createServer((request,response)=>{
    // console.log(req);
    if (request.url =='/'){
        response.end('Day la trang chu nhe');
    }
    else if (request.url =='/products'){
        response.end('Day la trang san pham');
    }
    else{
        response.end('404! Page not found');
    }
   
    
}).listen(8080,()=>{
    console.log('listening on port 8080');
})