import fs from "fs"
import http from "http2"



const server = http.createServer((req,res)=>{
    console.log(req.url)
    if(req.url==='/'){
        const HtmlFile = fs.readFileSync('./public/index.html','utf-8')
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(HtmlFile)
        return
    }
    if(req.url?.endsWith('.js')){
        res.writeHead(200,{'Content-Type':'application/javascript'})
    }
    else if(req.url?.endsWith('.css')){
        res.writeHead(200,{'Content-Type':'text/css'})
    }
    try {
        const ResponseContent = fs.readFileSync(`./public${req.url}`,'utf-8')
        res.end(ResponseContent)
    } catch (error) {
        res.writeHead(404,{'Content-type':'text/html'})
        res.end()
    }
    
    
    //const data = {name:'Jhon',age:'22',city:'Bogota'}
    //res.writeHead(200,{'Content-type':'application/json'})
    //res.end(JSON.stringify(data))

})


server.listen(8000,()=>{
    console.log(`Server running on port 8000`)
})