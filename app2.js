var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParse = require('body-parser');

var app = express();

var INFILE = path.join(__dirname,'file.json');

app.set('port',8080);

app.use('/',express.static(path.join(__dirname,'public')));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

//全要求で呼ばれる
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Cache-Control','no-cache');
    res.setHeader('Content-type','application/json');
    next();
});

//GET要求
app.get('/',function(req,res){
    fs.readFile(INFILE,function(err,data){
        if(err){
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

/*
// http://localhost:8080/ids/[id]
*/
app.get('/ids/:id',function(req,res,next){
    console.log(req.params.id);
    res.json(req.params.id);
});

//POST要求
app.post('/',function(req,res){
    fs.readFile(INFILE,function(err,data){
        if(err){
            console.error(err);
            process.exit(1);
        }
        var jsondata = JSON.parse(data);

        var newjsondata = {
            id:Data.now(),
            text:req.body.text
        };
        jsondata.push(newjsondata);
        fs.write(INFILE,JSON.stringify(jsondata,null,4),function(err){
            if(err){
                console.error(err);
                process.exit(1);
            }
            res.json(jsondata);
        });
    });
});

app.listen(app.get('port'),function(){
    console.log('===============================================================');
    console.log('Server started:http://localhost:' + app.get('port') + '/');
    console.log('===============================================================');
});
