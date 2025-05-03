const DadJoke = require('../models/DadJoke')

/* 
These controllers take incoming requests and utilize the
methods provided by the Fellow "model" before sending a
response back to the client (or an error message).
*/

// Get All (Read)
const serveJokes = (req, res) => {
    const jokesList = DadJoke.list();
    res.send(jokesList);
  }
  
  // Get One (Read)
  const serveJoke = (req, res) => {
    const { id } = req.params;
    const joke = DadJoke.findJoke(Number(id));
  
    if (!joke) {
      return res.status(404).send({
        message: `No joke with the id ${id}`
      });
    }
    res.send(joke);
  };
  
  // Create
  const createJoke = (req, res) => {
    const { jokeName } = req.body;
    if (!jokeName) {
      return res.status(400).send({ message: "Invalid Name" });
    }
  
    const newDadJoke = DadJoke.create(jokeName);
    res.send(newDadJoke);
  };
  
  // Update
  const updateJoke = (req, res) => {
    const { jokeName } = req.body;
  
    if (!jokeName) {
      return res.status(400).send({ message: "Invalid Name" });
    }
  
    const { id } = req.params;
    const updatedDadJoke = DadJoke.editJoke(Number(id), jokeName);
  
    if (!updatedDadJoke) {
      return res.status(404).send({
        message: `No joke with the id ${id}`
      });
    }
  
    res.send(updatedDadJoke);
  }
  
  // Delete
  const deleteJoke = (req, res) => {
    const { id } = req.params;
    const didDelete = DadJoke.deleteJoke(Number(id));
  
    if (!didDelete) {
      return res.status(404).send({
        message: `No joke with the id ${id}`
      });
    }
  
    res.sendStatus(204);
  }
  
  module.exports = {
    serveJokes,
    serveJoke,
    createJoke,
    updateJoke,
    deleteJoke
  };