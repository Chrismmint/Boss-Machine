const express = require('express');
const apiRouter = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

apiRouter.param('minionId', (req, res, next, id) => {
  if (id.isNaN) {
    res.status(404).send("NaN")
  } else {
    req.minionId = id
    minion = getFromDatabaseById('minions', id);
    if (minion) {
      req.minion = minion;
      next()
    } else {
      res.status(404).send();
    }
  }
})

apiRouter.get('/minions', (req, res, next) => {
  const minions = getAllFromDatabase('minions');
  res.status(200).send(minions);
})

apiRouter.get('/minions/:minionId', (req, res, next) => {
  res.send(req.minion);
})

apiRouter.put('/minions/:minionId', (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinion);
})

apiRouter.post('/minions', (req, res, next) => {
  addToDatabase('minions', req.body)
  res.status(201).send(req.body);
})

apiRouter.delete('/minions/:minionId', (req, res, next) => {
  deleteFromDatabasebyId('minions', req.minionId);
  res.status(204).send("Minion Deleted");
})

apiRouter.param('ideaId', (req, res, next, id) => {
  if (id.isNaN) {
    res.status(404).send("NaN")
  } else {
    req.ideaId = id
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
      req.idea = idea;
      next()
    } else {
      res.status(404).send();
    }
  }
})

apiRouter.get('/ideas', (req, res, next) => {
  const minions = getAllFromDatabase('ideas');
  res.status(200).send(minions);
})

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
  res.send(req.idea);
})

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdea);
})

apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next) => {
    addToDatabase('ideas', req.body)
  res.status(201).send(req.body);
})

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
  deleteFromDatabasebyId('ideas', req.ideaId);
  res.status(204).send("Idea Deleted");
})

module.exports = apiRouter;
