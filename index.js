var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 8888;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  //从这里开始看，上面不要看

  if(path === '/'){  // 如果用户请求的是 / 路径
    var string = fs.readFileSync('./index.html','utf8')  // 就读取 index.html 的内容
    var amount = fs.readFileSync('./db','utf8')  //db的类型是string
    string = string.replace('&&&amount&&&',amount)
    response.setHeader('Content-Type', 'text/html;charset=utf-8')  // 设置响应头 Content-Type
    response.write(string)
    response.end()   // 设置响应消息体
  }else if(path === '/style.css'){   // 如果用户请求的是 /style.css 路径
    var string = fs.readFileSync('./style.css','utf8')
    response.setHeader('Content-Type', 'text/css')
    response.write(string)
    response.end()
  }else if(path === '/main.js'){  // 如果用户请求的是 /main.js 路径
    var string = fs.readFileSync('./main.js','utf8')
    response.setHeader('Content-Type', 'application/javascript')
    response.write(string)
    response.end()
  }else if(path==='/pay'){
    var amount = fs.readFileSync('./db','utf8')
    var newAmount = amount -1  //字符串通过减号转成数字
    if(Math.random()>0.5){
        fs.writeFileSync('./db',newAmount)
        response.setHeader('Content-Type', 'image/jpg')
        response.statusCode = 200
        response.write(fs.readFileSync('./dog.jpg'))
        
    }else{
        response.statusCode = 400
        response.write('fail')
    }
    response.end()
    
  }else{  // 如果上面都不是用户请求的路径
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')  // 设置响应头 Content-Type
    response.write('找不到对应的路径，你需要自行修改 index.js')
    response.end()
  }

  // 代码结束，下面不要看
  console.log(method + ' ' + request.url)
})

server.listen(port)
console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)