import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'

function App() {
  const [name, setName] = useState('')
  const [hobby, setHobby] = useState('')
  const [favoriteColor, setFavoriteColor] = useState('')
  const [usersData, setUsersData] = useState([])
  const [editUserId, setEditUserId] = useState(null)
  const [isLoading, setIsLoading] = useState(true) // New state variable for loading indicator

  useEffect(() => {
    axios
      .get('https://crud-mern-app-2wzv.onrender.com/api/user/get-all-entries')
      .then((response) => {
        setUsersData(response.data)
        setIsLoading(false) // Set loading to false when data is fetched
      })
      .catch((error) => console.log(error))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editUserId) {
      // If editUserId is not null, update existing user
      axios
        .put(
          `https://crud-mern-app-2wzv.onrender.com/api/user/update-entry/${editUserId}`,
          {
            name,
            hobby,
            favoriteColor,
          }
        )
        .then((response) => {
          console.log(response)
          const updatedUsersData = usersData.map((user) =>
            user._id === editUserId ? response.data : user
          )
          setUsersData(updatedUsersData)
          setEditUserId(null)
          setName('')
          setHobby('')
          setFavoriteColor('')
        })
        .catch((err) => console.log(err))
    } else {
      // If editUserId is null, create new user
      axios
        .post('https://crud-mern-app-2wzv.onrender.com/api/user/create-entry', {
          name,
          hobby,
          favoriteColor,
        })
        .then((response) => {
          console.log(response)
          setUsersData([...usersData, response.data])
          setName('')
          setHobby('')
          setFavoriteColor('')
        })
        .catch((err) => console.log(err))
    }
  }

  const handleEdit = (id) => {
    const userToEdit = usersData.find((user) => user._id === id)
    if (userToEdit) {
      setEditUserId(id)
      setName(userToEdit.name)
      setHobby(userToEdit.hobby)
      setFavoriteColor(userToEdit.favoriteColor)
    }
  }

  const handleDelete = (id) => {
    axios
      .delete(
        `https://crud-mern-app-2wzv.onrender.com/api/user/delete-entry/${id}`
      )
      .then(() => {
        setUsersData(usersData.filter((user) => user._id !== id))
        // Reset input fields if the deleted user was being edited
        if (editUserId === id) {
          setEditUserId(null)
          setName('')
          setHobby('')
          setFavoriteColor('')
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      {' '}
      <h1 className="crud-heading">The Crud App</h1>
      <div className="container">
        <div className="registration-form">
          <h2>{editUserId ? 'Edit Entry' : 'Create Entry'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                className="form-control"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="hobby">
                <strong>Hobby</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Hobby"
                autoComplete="off"
                name="hobby"
                className="form-control"
                required
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="favoriteColor">
                <strong>Favorite Color</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Favorite Color"
                autoComplete="off"
                name="favoriteColor"
                className="form-control"
                required
                value={favoriteColor}
                onChange={(e) => setFavoriteColor(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success">
              {editUserId ? 'Update' : 'Create'}
            </button>
          </form>
        </div>

        <div className="registered-users">
          <h2>List of Users</h2>
          {isLoading ? ( // Show loading indicator if data is still loading
            <p style={{ textAlign: 'center' }}>Loading...</p>
          ) : (
            <React.Fragment>
              {usersData.length === 0 ? (
                <p className="no-user-message">
                  No data found, please add some!
                </p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Hobby</th>
                      <th>Favorite Color</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData.map((user) => (
                      <tr
                        key={user._id}
                        style={{
                          backgroundColor: user.favoriteColor,
                          color:
                            user.favoriteColor === 'black'
                              ? 'white'
                              : 'inherit',
                        }}
                      >
                        <td>{user.name}</td>
                        <td>{user.hobby}</td>
                        <td>{user.favoriteColor}</td>
                        <td>
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEdit(user._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
      <footer className="footer">
        <p className="copyright">
          &copy; {new Date().getFullYear()} iBelieve. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default App
