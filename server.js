const express = require('express')
var bodyParser = require('body-parser');
const path= require('path')
const app = express()
const port = 3000
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))

app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/post',async (req,res)=>{
    let request=JSON.parse(Object.keys(req.body)[0])
    
     openai.createImage({
      
        prompt: `${request.name}`,
        n: Number(`${request.numbers}`),
        size:`${request.pixel}`,
      }).then(response=>{
        res.send(response.data.data);
      }).catch(error=>{
          res.send(new Error())
       console.log(error);
      });
   
   
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})