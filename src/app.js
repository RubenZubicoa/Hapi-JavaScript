const Hapi = require('@hapi/hapi');
require('./database');

const Task = require('./models/Task');

const init = async () => {
    const server = new Hapi.Server({
        port:3000,
        host:'localhost'
    })

    server.route({
        method:'POST',
        path:'/tasks',
        handler: async (req, res) => {
            const task = new Task(req.payload);
            const taskSaved = await task.save();
            return res.response(taskSaved)
        }
    });

    server.route({
        method:'GET',
        path:'/tasks',
        handler: async (req, res) => {
            const tasks = await Task.find()
            return res.response(tasks)
        }
    })

    server.route({
       method:'GET',
       path:'/tasks/{id}',
       handler: async (req, res) => {
           const task = await Task.findById(req.params.id);
           return res.response(task);
       } 
    })

    server.route({
        method:'DELETE',
        path:'/tasks/{id}',
        handler: async (req, res) => {
            const task = await Task.findByIdAndDelete(req.params.id);
            return res.response(task)
        }
    })

    server.route({
        method:'PUT',
        path:'/tasks/{id}',
        handler: async(req, res) => {
            const task = await Task.findByIdAndUpdate(req.params.id, req.payload, {new:true});
            return res.response(task);
        }
    })

    await server.start();
    console.log('Server on port', 3000);
}

init();