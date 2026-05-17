import { useState, useEffect } from 'react'
import AdminBookForm from '../components/AdminBookForm'
import { fetchBooks, createBook, updateBook, deleteBook } from '../utils/api'
import { formatPKR } from '../utils/format'

export default function Admin() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => { loadBooks() }, [])

  async function loadBooks() {
    try {
      setLoading(true)
      const data = await fetchBooks()
      setBooks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(formData) {
    if (editingBook) {
      await updateBook(editingBook.id, formData)
    } else {
      await createBook(formData)
    }
    setShowForm(false)
    setEditingBook(null)
    loadBooks()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this book? This cannot be undone.')) return
    try {
      setDeletingId(id)
      await deleteBook(id)
      setBooks(prev => prev.filter(b => b.id !== id))
    } catch (err) {
      alert('Delete failed: ' + err.message)
    } finally {
      setDeletingId(null)
    }
  }

  function openEdit(book) {
    setEditingBook(book)
    setShowForm(true)
  }

  function openAdd() {
    setEditingBook(null)
    setShowForm(true)
  }

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-indigo-600 hover:underline text-sm">← Back to Store</a>
            <span className="text-gray-300">|</span>
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <button
            onClick={openAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            + Add New Book
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-3xl font-bold text-indigo-600">{books.length}</p>
            <p className="text-sm text-gray-500 mt-1">Total Books</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-3xl font-bold text-green-600">
              {[...new Set(books.map(b => b.genre).filter(Boolean))].length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Genres</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-3xl font-bold text-purple-600">
              {books.filter(b => b.cover_url).length}
            </p>
            <p className="text-sm text-gray-500 mt-1">With Cover Image</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-400 w-64"
          />
          <span className="text-sm text-gray-400">{filtered.length} books</span>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Cover</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Author</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Genre</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Price</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(book => (
                  <tr key={book.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="w-10 h-14 rounded overflow-hidden bg-indigo-100 flex items-center justify-center">
                        {book.cover_url
                          ? <img src={book.cover_url} alt="" className="w-full h-full object-cover" />
                          : <span className="text-lg">📖</span>
                        }
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 max-w-[180px] truncate">{book.title}</td>
                    <td className="px-4 py-3 text-gray-500">{book.author}</td>
                    <td className="px-4 py-3">
                      {book.genre && (
                        <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full text-xs font-medium">
                          {book.genre}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {book.price ? formatPKR(book.price) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(book)}
                          className="bg-amber-50 text-amber-600 border border-amber-200 px-3 py-1 rounded-lg text-xs font-medium hover:bg-amber-100 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(book.id)}
                          disabled={deletingId === book.id}
                          className="bg-red-50 text-red-500 border border-red-200 px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-100 transition disabled:opacity-50"
                        >
                          {deletingId === book.id ? '...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="text-center text-gray-400 py-10">No books found.</p>
            )}
          </div>
        )}
      </div>

      {showForm && (
        <AdminBookForm
          book={editingBook}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingBook(null) }}
        />
      )}
    </div>
  )
}
