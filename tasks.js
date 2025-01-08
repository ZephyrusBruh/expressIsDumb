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
    const newId = tasks.length >0 ? Math.max(... tasks.map(task => task.id)) +1 :1;
    const newTask = {
        id: newId,
        description: "Item",
        completed: false
    }
    tasks.push(newTask);
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

app.delete('/tasks/:id', (req,res)=> {
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

// curl -X GET http://localhost:4000/tasks
// curl -X POST http://localhost:4000/tasks -H "Content-Type: application/json" -d "{\"description\":\"New item\", \"completed\":\"true\"}"
// curl -X PUT -d "{\"completed\":\"true\"}" -H "Content-Type: application/json" http://localhost:4000/tasks/1
// curl -X DELETE http://localhost:4000/tasks/1