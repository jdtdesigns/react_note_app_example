import { useState } from 'react';
import { redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useStore } from '../../store';
import dayjs from 'dayjs';

import { CREATE_NOTE } from './mutations';
import { AUTHENTICATE } from '../../App/queries';

function Dashboard() {
  const { user } = useStore();
  const [formData, setFormData] = useState({
    text: ''
  });
  const [createNote] = useMutation(CREATE_NOTE, {
    // We refetch the user again, to get the updated user's notes, which triggers the html below to reload and show the newly added note
    refetchQueries: [AUTHENTICATE]
  });

  const handleInputChange = e => {
    setFormData({
      ...formData,
      text: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // We trigger the createNote mutation and make sure to wait for it to finish processing. This will ensure that our refetch to AUTHENTICATE waits until the user has been updated on the backend.
      await createNote({
        variables: formData
      });

      // Clear the form for the next note
      setFormData({
        text: ''
      });
    } catch (err) {
      console.log(err);
      redirect('/auth');
    }
  }

  return (
    <main className="dashboard">
      <h1 className="text-center">Welcome, {user.username}!</h1>

      <form onSubmit={handleSubmit} className="column dashboard-form">
        <h2 className="text-center">Create a Note</h2>
        <input value={formData.text} onChange={handleInputChange} type="text" placeholder="Enter your note text" />
        <button>Submit</button>
      </form>

      <h3>Here are your saved notes:</h3>

      <div className="notes">
        {!user.notes.length && <p>No notes have been added.</p>}

        {user.notes.map(note => (
          <div key={note._id} className="note column">
            <h3>{note.text}</h3>
            <div className="column">
              <p>Added On: {dayjs(+note.createdAt).format('MM/DD/YYYY')}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Dashboard;