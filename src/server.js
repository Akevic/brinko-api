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

app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json('success')
  } else {
    res.status(400).json('error logging in')
  }
})

app.get('/profile/:userId', (req, res) => {
  for (let i = 0; i <= database.users.length; i++) {
    if (database.users[i].id === req.params.userId) {
      res.send(database.users[i])
    } else {
      res.json(`Can't find that user`)
    }
  }
})

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

app.listen(3000, () => {
  console.log('App is running on port 3000')
})

/*
/ --> res = this is working
/signing --> POST = succes/fail
/register --> POST = new user object
/profile/:userId --> GET = user by id
/image --> PUT = updated user
*/
