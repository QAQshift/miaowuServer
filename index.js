const express = require('express')
const multer=require('multer')
const bodyParser = require('body-parser');
const path=require("path");




const app = express()
const port = 3000

var server = app.listen(8082)
var io = require('socket.io').listen(server)


const uploadHead=require('./model/upload.js').uploadHead
const upload =multer({dest:'public/upload/'});


//引入socket.js
require('./model/socket.js')(io)

app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","http://192.168.6.133");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
})

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据

app.post('/upload',upload.single('file'),uploadHead);
// app.get('/', (req, res) => res.send("hello miaowu"))

app.listen(port, () => console.log(`app listening on port ${port}!`))

