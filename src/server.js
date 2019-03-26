const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const database = {
  users: [
    {
      id: '123',
      name: 'john',
      email: 'john@email.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'sally',
      email: 'sally@email.com',
      password: 'ananas',
      entries: 0,
      joined: new Date()
    }
  ]
}

// === SEND ALL USERS ===
app.get('/', (req, res) => {
  res.send(database.users)
})

// === CHECK IF USER'S EMAIL AND PASSWORD MATCH ===
app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json('success')
  } else {
    res.status(400).json('error logging in')
  }
})

// === SEARCHING USER? NOT SURE YET MIGHT BE USEFUL ===
app.get('/profile/:userId', (req, res) => {
  for (let i = 0; i <= database.users.length; i++) {
    if (database.users[i].id === req.params.userId) {
      res.send(database.users[i])
    } else {
      res.json(`Can't find that user`)
    }
  }
})

// === REGISTER NEW USER ===
app.post('/register', (req, res) => {
  const { email, name, password } = req.body
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1])
})

// === UPDATE USER'S SCORE ===
// === NEEDS REFACTORING ===
// === POSSIBLE FROM COOKIES? ===
// === PUSH UPDATED SCORE TO DB ===
app.put('/score/:userId', (req, res) => {
  res.json(`Got a PUT request at ${req.params.userId}`)
})

app.listen(3000, () => {
  console.log('App is running on port 3000')
})
