const express = require('express');
const server = express();
const projects = [];

// Habilitando suporte a json no body da requisição
server.use(express.json())

//Middlewares

function checkIdProjectInArray (req, res, next) {
  const index = projects.findIndex( req.params.id);
  console.log(index)
  if(index === -1) {
    return res.status(400).json({
      error: "Project not found"
    })
  }

  return next();
}

//Rotas
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
  
});

server.get('/projects', (req, res) => {
  return res.json(projects)
});

server.get('/projects/:id', checkIdProjectInArray, (req, res) => {
  return res.json(projects[req.params.id])
})














// Iniciando o serviço
server.listen(3333);