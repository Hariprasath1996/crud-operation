const express = require("express")
const users = require("./sample.json")
const cors = require("cors")
// file system
const fs = require("fs")


const app = express()
const port = 8000;
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"]
}))

// display users 
app.get("/users", (req, res) => {
    return res.json(users)
})

// delete method 
app.delete("/users/:id", (req, res) => {
    let id = Number(req.params.id);
    let filteredUsers = users.filter((user) => user.id !== id);
    // fs.write  file for create a new file instead of sample file in index.js that filter from same index.js file
    // stringify for json file convert to string file instead of others 
    fs.writeFile("./sample.json", JSON.stringify(filteredUsers), (err, data) => {
        return res.json(filteredUsers)
    }); 
});

app.listen(port, (err) => {
    console.log(`App is running on the port ${port}`);
});