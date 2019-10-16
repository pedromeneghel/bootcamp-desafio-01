const express = require('express');
const server = express();
const projects = [];

// Habilitando suporte a json no body da requisição
server.use(express.json())

//Middlewares

function checkIdProjectInArray (req, res, next) {
  const index = projects.findIndex(obj => obj.id == req.params.id);
  
  if(index === -1) {
    return res.status(400).json({
      error: "Project not found"
    })
  }

  req.index = index;

  return next();
}

//Rotas
server.get('/projects', (req, res) => {
  return res.json(projects)
});

server.get('/projects/:id', checkIdProjectInArray, (req, res) => {
  return res.json(projects[req.index])
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: []
  })

  return res.json(projects);
});

server.post('/projects/:id/tasks', checkIdProjectInArray, (req, res) => {
  projects[req.index].tasks.push(req.body.title);

  return res.json(projects[req.index]);
});

server.put('/projects/:id', checkIdProjectInArray, (req, res) => {
  projects[req.index].title = req.body.title;

  return res.json(projects[req.index]);
})

server.delete('/projects/:id', checkIdProjectInArray, (req, res) => {
  projects.splice(req.index, 1);

  return res.send();
});

// Iniciando o serviço
server.listen(3333);