var express=require('express');
var bodyParser=require('body-parser');
var _=require('lodash');
var {ObjectID}=require('mongodb');
var {todo}=require('./models/todo');
var {User}=require('./models/User');
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

app.post('/users',(req,res)=>{
    console.log(`users`);
    // var newuser=new User({
    //     email:req.body.email,
    //     password:req.body.password
    // });

    var body=_.pick(req.body,['email','password']);
    console.log(body);
    var user=new User(body);

    // user.save().then((data)=>{
    //     console.log(`saved`);
    //     let token = user.generateAuthToken();
    //     token.then((t)=>{
    //         res.header('x-auth',t).send(user);
    //     }).catch((err)=>{console.log(err.message)});
    // }).catch((err)=>{console.log(err.message)});

    user.save().then((data)=>{
        console.log(`inside save`);
        let token = user.generateAuthToken();


    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send();
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

app.delete('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id))
    {
        return res.status(404).send();
    }

    todo.findByIdAndRemove(id).then((todo)=>{
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
app.patch('/todos/:id',(req,res)=>{
    var id=req.params.id;

    var body=_.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(id))
    {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed)&& body.completed)
    {
        body.completed=new Date().getTime();
    }
    else {
        body.completed=false;
        body.completedAt=null;
    }

    todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
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



app.listen(8081,()=>{
    console.log('App is running on 8081');
});