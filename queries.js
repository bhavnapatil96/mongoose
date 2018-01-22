const {mongoos}=require('./db/mongoose1');
const  {todo}=require('./models/todo');

var id='5a657a3e4aba880ee4f43756';

todo.find({
    _id:id
}).then((todos)=>{
    console.log(todos);
});

todo.findOne({
    _id:id
}).then((todos)=>{
    console.log(todos);
});
todo.findById(id).then((todo)=>{
    if(!todo)
        console.log('Id not found');
    console.log(todo);
});
