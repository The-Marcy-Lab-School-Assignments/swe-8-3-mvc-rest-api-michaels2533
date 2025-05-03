import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getJokeById, updateJokeName, deleteJoke } from '../adapters/jokeAdapters';

const JokesDetails = () => {
  const [jokes, setJokes] = useState({})
  const [newJokesName, setNewJokesName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  // on load, get the jokes by id
  useEffect(() => {
    const doFetch = async () => {
      const [foundJokes, error] = await getJokeById(id);
      setJokes(foundJokes);
    };
    doFetch();
  }, [])

  // when the delete button is pressed, send a DELETE request
  const handleDeleteJokes = async () => {
    await deleteJoke(id);
    navigate('/');
  }

  // when the form is filled out, send a PATCH request
  const handleUpdateJokes = async (e) => {
    e.preventDefault();

    const [updatedJokes, error] = await updateJokeName(id, newJokesName);
    setJokes(updatedJokes);

    setNewJokesName('');
  }

  return (
    <>
      <Link to='/'>Go Home</Link>
      <h1>Jokes Details</h1>
      <p>Joke: {jokes.joke}</p>
      <p>Id: {jokes.id}</p>
      <form onSubmit={handleUpdateJokes}>
        <label htmlFor="name">Update Jokes</label>
        <input type="text" name="name" id="name" value={newJokesName} onChange={(e) => setNewJokesName(e.target.value)} placeholder='New Joke' />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleDeleteJokes} className='danger'>Delete Jokes</button>
    </>
  )
}

export default JokesDetails;