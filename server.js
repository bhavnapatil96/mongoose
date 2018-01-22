var express=require('express');
var bodyParser=require('body-parser');
var {ObjectID}=require('mongodb');
var {todo}=require('./models/todo');
var {user}=require('./models/user');
let mongoose1=require('./db/mongoose1');
var app=express();
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{

     var newtodo=new todo({
         text:req.body.text
     });

     newtodo.save().then((doc)=>{
        // console.log(doc);
         res.send(doc);
     },(e)=>{
         res.status(400).send(e);
     });
});

app.get('/todos',(req,res)=>{
    todo.find().then((todos)=>{
        res.send({todos})
    },(e)=>{
        res.status(400).send(e);
    });
});
app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id))
    {
        return res.status(404).send();
    }

    todo.findById(id).then((todo)=>{
        if(!todo)
        {
            res.status(404).send();
        }
        res.send({todo});
    },(e)=>{
        res.status(404).send();
    }).catch((e)=>{
        res.status(404).send();
    });
});
//
// newtodo.save().then((doc)=>{
//     console.log(doc);
//
// },(e)=>{
//     console.log('unable to save',e);
// });
// var othertodo=new todo({
//      text:'eat',
//     completed:true,
//      completedAt:123
// });
 // othertodo.save().then((doc)=>{
 //     console.log(JSON.stringify(doc,undefined,2));
 // },(e)=>{
 //     console.log('unable to save.....');
 // });

// var newUser=new user({
//     email:'patilbhavna96@gmail.com'
// });
//
// newUser.save().then((doc)=>{
//     console.log(JSON.stringify(doc));
//
// },(e)=>{
//     console.log('unable to save',e);
// });


app.listen(8081,()=>{
    console.log('App is running on 8081');
});