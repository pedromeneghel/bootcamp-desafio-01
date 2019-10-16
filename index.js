const express = require('express');
const server = express();
const projects = [];
let count = 0;

// Habilitando suporte a json no body da requisição
server.use(express.json())

//Middlewares
server.use((req, res, next) => {
  count++;

  console.log(`Total transactions: ${count}`);
  return next()
})

function checkIdProjectInArray (req, res, next) {
  const { id } = req.params;
  const index = projects.findIndex(obj => obj.id == id);
  
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
  const { title } = req.body;
  const { index } = req;
  projects[index].tasks.push(title);

  return res.json(projects[index]);
});

server.put('/projects/:id', checkIdProjectInArray, (req, res) => {
  const { title } = req. body;
  const { index } = req;

  projects[index].title = title;

  return res.json(projects[index]);
})

server.delete('/projects/:id', checkIdProjectInArray, (req, res) => {
  const { index } = req;

  projects.splice(index, 1);

  return res.send();
});

// Iniciando o serviço
server.listen(3333);