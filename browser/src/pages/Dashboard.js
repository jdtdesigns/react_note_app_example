function Dashboard(props) {
  return (
    <main className="dashboard">
      <h1 className="text-center">Welcome, {props.state.user.username}!</h1>

      <h3>Here are your saved notes:</h3>

      <div className="notes">
        <p>No notes have been added</p>
      </div>
    </main>
  )
}

export default Dashboard;