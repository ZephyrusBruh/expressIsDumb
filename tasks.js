const express = require("express");
const app = express();
const PORT = 4000;
app.use(express.json());

let tasks = [ 
    { id: 1, description: 'Learn Express', completed: false },
    { id: 2, description: 'Build a REST API', completed: false }
];

app.get("/", (req,res)=>{
    res.send('roots');
})

app.get("/tasks", (req,res)=>{
    res.json(tasks);
});

app.get('/tasks/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const task= tasks.find((task) => task.id == id);
    if(task){
        res.json(task);
    } else {
        res.status(404).json({message: "oops"});
    }
});

app.post('/tasks', (req,res)=>{
    const newId = tasks.length >0 ? Math.max(... tasks.map(item => task.id)) +1 :1;
    const newTask = {
        id: newId,
        description: "Item",
        completed: false
    }
    items.push(newItem);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const task = tasks.find((task)=> task.id == id);
    if(task){
        task.description = req.body.description;
        task.completed = req.body.completed;
        res.json(task);
    } else {
        res.status(404).json({message: "Task not found"});
    }
});

app.delete('/item/:id', (req,res)=> {
    const id = parseInt(req.params.id);
    const task = tasks.find((task)=> task.id == id);
    if(task){
        const index = tasks.indexOf(task);
        const deletedTask = tasks.splice(index,1);
        res.json(deletedTask);
    } else {
        res.status(404).json({message: "Nuhuh"});
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});