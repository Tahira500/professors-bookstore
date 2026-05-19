import { useState } from 'react'

const GENRES = ['Fiction', 'Self-Help', 'Dystopian', 'Programming', 'Sci-Fi', 'Classic', 'Romance', 'History', 'Biography', 'Other']

export default function AdminBookForm({ book, onSave, onClose }) {
  const editing = !!book
  const [form, setForm] = useState({
    title: book?.title || '',
    author: book?.author || '',
    genre: book?.genre || '',
    price: book?.price || '',
    description: book?.description || '',
    cover_url: book?.cover_url || ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(book?.cover_url || null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function uploadImage() {
    if (!imageFile) return form.cover_url
    setUploading(true)
    const formData = new FormData()
    formData.append('image', imageFile)
    const apiUrl = import.meta.env.VITE_API_URL || ''
    const res = await fetch(`${apiUrl}/api/upload/cover`, { method: 'POST', body: formData })
    const json = await res.json()
    setUploading(false)
    if (!json.success) throw new Error('Image upload failed: ' + json.error)
    return json.url
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!form.title || !form.author) {
      setError('Title and Author are required')
      return
    }
    try {
      setSaving(true)
      const cover_url = await uploadImage()
      await onSave({ ...form, cover_url, price: Number(form.price) })
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-bold text-gray-800">
            {editing ? 'Edit Book' : 'Add New Book'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Cover image upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Book Cover</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-28 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border">
                {imagePreview
                  ? <img src={imagePreview} alt="cover" className="w-full h-full object-cover" />
                  : <span className="text-3xl">📖</span>
                }
              </div>
              <div>
                <label className="cursor-pointer bg-indigo-50 text-indigo-600 border border-indigo-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition">
                  {uploading ? 'Uploading...' : 'Choose Image'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP — max 5MB</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input name="title" value={form.title} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
              placeholder="e.g. The Alchemist" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
            <input name="author" value={form.author} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
              placeholder="e.g. Paulo Coelho" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
              <select name="genre" value={form.genre} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400">
                <option value="">Select genre</option>
                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs)</label>
              <input name="price" value={form.price} onChange={handleChange} type="number" min="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
                placeholder="e.g. 1500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 resize-none"
              placeholder="Short description of the book..." />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" disabled={saving || uploading}
              className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50">
              {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
