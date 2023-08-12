import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { GET_NOTES } from './queries';

function Landing() {
  const { data } = useQuery(GET_NOTES);

  return (
    <main className="landing">
      <h1 className="text-center">Welcome to the future in note taking!</h1>

      <h3>See what notes users are taking:</h3>

      <div className="notes">
        {data && !data.getNotes.length && <p>No notes have been added.</p>}

        {data && data.getNotes.map(note => (
          <div key={note._id} className="note column">
            <h3>{note.text}</h3>
            <div className="column">
              <p>Added On: {dayjs(+note.createdAt).format('MM/DD/YYYY')}</p>
              <p>Added By: {note.author.username}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Landing;