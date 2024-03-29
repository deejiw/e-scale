const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const config = require('config')

app.use(express.json())

// DB Config
const db = config.get('mongoURI')

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected..'))
  .catch(err => console.log(err))

// Use routes
app.use('/api/partners', require('./routes/api/partners'))
app.use('/api/transactions', require('./routes/api/transactions'))
app.use('/api/payers', require('./routes/api/payers'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
