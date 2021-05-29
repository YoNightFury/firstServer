const fs = require("fs");
var messageNumber = 0;

  
    
const requestHandler = (req, res)=>{
    
    var url = req.url;
    var method = req.method;
    if(url==='/' ){
        res.setHeader("Content-type", "text/html");
        res.write('<html>');
        res.write('<head><title>Submit this Form</title></head>');
        res.write('<body>');
        res.write('<fieldset><legend>Enter Details</legend>')
        
        res.write('<form action="/message" method="POST" ><input type="text" name="message" autofocus placeholder="Enter your message"><button type="submit">Send</button></form>');
        res.write('</fieldset>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const unParsed = [];

        req.on('data',(packet) =>{
            unParsed.push(packet);
            console.log(packet);
            
        })
        return req.on('end', ()=>{
            const parsed = Buffer.concat(unParsed).toString();
            console.log(parsed);
            const message = parsed.split('=')[1];
            messageNumber++;
            console.log('Message Number='+messageNumber);
            const endRequest=(err)=>{
                res.statusCode=302; 
                res.setHeader('location', '/')
                return res.end();
            }
            if(messageNumber==1)
                fs.writeFile('message.txt', message+' ', endRequest);
            
            else
                fs.appendFile('message.txt', message+' ',endRequest);
                
            return 0;

        })
    }

    
    res.setHeader("Content-type", "text/html");
    res.write('<html>');
    res.write('<head><title>My First Server</title></head>');
    res.write('<body>');
    res.write('<h1>Welcome to the first sever</h1>');
    res.write('</body>');
    res.write('</html>');
    res.end();


}

module.exports = requestHandler;
