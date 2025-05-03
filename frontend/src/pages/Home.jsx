import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getAllJokes, createJoke } from '../adapters/jokeAdapters';

function Home () {
  // Get all jokes from the serverstate
  const [jokes, setJokes] = useState([]);
  // form input state
  const [newJokeName, setNewJokeName] = useState('');
  // form submission response state
  const [newlyAddedJoke, setNewlyAddedJokes] = useState({})

  // Get me the most up to date full list of jokes
  useEffect(() => {
    const doFetch = async () => {
      const [allJokes, error] = await getAllJokes()
      setJokes(allJokes);
    }
    doFetch();
  }, [newlyAddedJoke])

  // Use the form data to create a POST request to create a new fellow
  const handleCreateJokes = async (e) => {
    e.preventDefault();
    const [newJokes, error] = await createJoke(newJokeName)
    setNewlyAddedJokes(newJokes);
    setNewJokeName('');
  }

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={handleCreateJokes}>
        <label htmlFor="name">Add A New Jokes</label>
        <input type="text" name="name" id="name" value={newJokeName} onChange={(e) => setNewJokeName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {
          jokes.map((joke) => {
            return <li key={joke.id}>
              <Link to={`/api/joke/${joke.id}`}>
                {joke.joke}
              </Link></li>
          })
        }
      </ul >
    </>
  )
}

export default Home