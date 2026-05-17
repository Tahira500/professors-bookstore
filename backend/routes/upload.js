const express = require('express')
const router = express.Router()
const multer = require('multer')
const supabase = require('../utils/supabase')

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files allowed'))
  }
})

// POST /api/upload/cover
router.post('/cover', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: 'No image file provided' })

    const ext = req.file.originalname.split('.').pop()
    const fileName = `${Date.now()}.${ext}`

    const { error } = await supabase.storage
      .from('book-covers')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true
      })

    if (error) throw error

    const { data } = supabase.storage.from('book-covers').getPublicUrl(fileName)

    res.json({ success: true, url: data.publicUrl })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

module.exports = router
