const express = require('express')
const router = express.Router()
const supabase = require('../utils/supabase')

// GET all books — optional ?genre=Fiction filter
router.get('/', async (req, res) => {
  try {
    let query = supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false })

    if (req.query.genre) {
      query = query.ilike('genre', req.query.genre)
    }

    if (req.query.search) {
      query = query.or(
        `title.ilike.%${req.query.search}%,author.ilike.%${req.query.search}%`
      )
    }

    const { data, error } = await query
    if (error) throw error
    res.json({ success: true, count: data.length, data })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// GET one book — /api/books/:id
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', req.params.id)
      .single()
    if (error) throw error
    if (!data) return res.status(404).json({ success: false, error: 'Book not found' })
    res.json({ success: true, data })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// POST create book — /api/books
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, price, cover_url, description } = req.body

    if (!title || !author) {
      return res.status(400).json({ success: false, error: 'title and author are required' })
    }
    if (price !== undefined && isNaN(Number(price))) {
      return res.status(400).json({ success: false, error: 'price must be a number' })
    }

    const { data, error } = await supabase
      .from('books')
      .insert({ title, author, genre, price: price ? Number(price) : null, cover_url, description })
      .select()
      .single()

    if (error) throw error
    res.status(201).json({ success: true, data })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// PUT update book — /api/books/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, author, genre, price, cover_url, description } = req.body
    const updates = {}

    if (title !== undefined) updates.title = title
    if (author !== undefined) updates.author = author
    if (genre !== undefined) updates.genre = genre
    if (price !== undefined) updates.price = Number(price)
    if (cover_url !== undefined) updates.cover_url = cover_url
    if (description !== undefined) updates.description = description

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, error: 'No fields to update' })
    }

    const { data, error } = await supabase
      .from('books')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single()

    if (error) throw error
    if (!data) return res.status(404).json({ success: false, error: 'Book not found' })
    res.json({ success: true, data })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// DELETE book — /api/books/:id
router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', req.params.id)
    if (error) throw error
    res.json({ success: true, message: 'Book deleted successfully' })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

module.exports = router
