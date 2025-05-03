const getId = require('../utils/getId')

// The mock database including 5 random dad jokes.
const dadJokes = [
    {
        "joke": "To the person who stole my bed: I won't rest until I find you.",
        id:getId()
    },
    {
        "joke": "I have a joke about kites, but it would just sail over your head.",
        id:getId()
    },
    {
        "joke": "Mom says I have no sense of direction, so I packed my bags and right.",
        id:getId()
    },
    {
        "joke": "What do you call a cow with two legs? Lean beef.",
        id:getId()
    },
    {
        "joke": "To the person who stole my bed: I won't rest until I find you.",
        id:getId()
    }
]

class DadJoke {
    // Creates and adds the new joke to the "database"
    static create(name) {
        const newJoke = {
            name, 
            id: getId()
        }
        dadJokes.push(newJoke);
        return newJoke;
    }

    // Get all the values from the 'database" 
    static list() {
        return [...dadJokes]
    }

    // Get a single value from the 'database'
    static findJoke(id) {
        return dadJokes.find((joke) => joke.id === id);
    }

   // Update a single value from the 'database' 
    static editJoke(id, newJoke) {
        const joke = DadJoke.findJoke(id);
        if (!joke) return null;
        joke.joke = newJoke;
        return joke;

    }
   // Delete a single value from the 'database'
    static deleteJoke(id) {
        const jokeIndex = dadJokes.findIndex((joke) => joke.id === id);
        if (jokeIndex < 0) return false;
        dadJokes.splice(jokeIndex, 1);
        return true;
    }
}

module.exports = DadJoke;