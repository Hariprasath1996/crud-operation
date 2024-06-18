// import axios for api data receive
import axios from "axios"
import './App.css'
import { useEffect, useState } from "react"


function App() {
  const [users, setUsers] = useState([])
  const [filterTextValue, setFilterTextValue] = useState([])
  const [isRecordOpen,setIsRecordOpen]=useState(false);
  // this below state variable create for add or edit to pass to api , 
  const [addData,setAddData]=useState([{name : "",age : "",city : ""}])

  // get data from api to using axios method
  const getAllUsers = async () => {
    await axios.get("http://localhost:8000/users").then((res) => {
      // console.log(res.data)
      setUsers(res.data)
      setFilterTextValue(res.data)
    }
    )
  }
  // use Effect for once app is running data will render one time , bcoz of i selected here empty dependency array
  useEffect(() => {
    getAllUsers()

  }, [])

  // search and get value in this component
  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase()
    // the value get from users
    const filterText = users.filter((user) => user.name.toLowerCase().includes(searchText) || user.city.toLowerCase().includes(searchText))
    setFilterTextValue(filterText)
  }

  // delete method ... 
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are You sure , You want to delete this user ?")
    if (isConfirmed) {
      await axios.delete(`http://localhost:8000/users/${id}`).
        then((res) => {
          setUsers(res.data)
          setFilterTextValue(res.data)
        });
      // after completion this method , create route method to server point to access this delete function
    };
  }

  // Add or create  method 
  
const handleCreateRecord = ()=>{

}

  return (
    <>
      <div className="container">
        <h3>Crud Application With React js Front End and Back End Node Js</h3>
        <div className='input-container'>
          <label htmlFor="Search" >Title : </label>
          <input onChange={handleSearch} placeholder="search here..." type="Search" id='Search' className='Search' />
          <button className='search-btn'>Add Record</button>
        </div>
        <table className='table-head'>
          <thead >
            <>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </>
          </thead>
          <tbody>
            {
              filterTextValue && filterTextValue.map((user, index) => {
                return (
                  <tr key={user.id} >
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td><button className='btn-edit green'onClick={handleCreateRecord}>Edit</button></td>
                    <td><button className='btn-delete red' onClick={() => handleDelete(user.id)}>Delete</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
