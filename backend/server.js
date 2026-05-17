require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/books', require('./routes/books'))
app.use('/api/upload', require('./routes/upload'))

app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }))

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, error: 'Something went wrong' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Bookstore API running on http://localhost:${PORT}`))
