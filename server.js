const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const TaskModels = require('./models/Tasks')


const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/crudoperations",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

app.get('/', (req, res) => { 
    TaskModels.find({})
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err))

})

app.get('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
  
    try {
      const task = await TaskModels.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });


app.get('/gettask/:id', (req, res) => {
    const id = req.params.id;
    TaskModels.findById({ _id })
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err))

})


app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    TaskModels.findByIdAndUpdate({ _id: id }, {
        task: req.body.task,
        description: req.body.description,
        duration: req.body.duration
    })
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    TaskModels.findByIdAndDelete({ _id:id})
        .then(res => res.json(res))
        .catch(err => res.json(err))
})

app.post("/create", (req, res) => {
    TaskModels.create(req.body)
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err))

})
  

app.listen(8081,()=> {
    console.log("Server is Running")
})