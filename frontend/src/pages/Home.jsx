import { useState, useEffect } from 'react'
import BookCard from '../components/BookCard'
import GenreFilter from '../components/GenreFilter'
import { fetchBooks } from '../utils/api'

const CATEGORIES = [
  { icon: '🧠', title: 'Personality Development', sub: 'Build Confidence, Lead a Better Life', value: 'Personality Development' },
  { icon: '📝', title: 'Exam Books', sub: 'All Subjects, All Levels', value: 'Exam Books' },
  { icon: 'اردو', title: 'Urdu Books', sub: 'Adab, Poetry, Novels & More', value: 'Urdu Books', urdu: true },
  { icon: '🎓', title: 'Academic Books', sub: 'School, College & University', value: 'Academic Books' },
  { icon: '📚', title: 'General Books', sub: 'History, Psychology, Self Help & More', value: 'General Books' },
]

const FEATURES = [
  { icon: '🏅', title: 'Quality Books', sub: 'Carefully Selected' },
  { icon: '👨‍🏫', title: 'Best Guidance', sub: 'By a Professor' },
  { icon: '📖', title: 'Wide Range', sub: 'For Every Reader' },
  { icon: '🛡️', title: 'Trusted Service', sub: 'Your Satisfaction is Our Priority' },
]

export default function Home({ onAddToCart, onViewDetail }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [genre, setGenre] = useState('')
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    setLoading(true)
    fetchBooks(genre, query)
      .then(setBooks)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [genre, query])

  function handleSearch(e) {
    e.preventDefault()
    setQuery(search)
  }

  function handleCategoryClick(val) {
    setGenre(val)
    document.getElementById('books-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ background: '#1e0a35', minHeight: '100vh' }}>

      {/* ── HERO IMAGE BANNER ── */}
      <section className="relative overflow-hidden" style={{ borderBottom: '1px solid #c9782040' }}>
        <img
          src="/hero-banner.png"
          alt="Professor's Book Store"
          className="w-full object-cover"
          style={{ maxHeight: '480px', display: 'block' }}
        />
      </section>

      {/* ── HERO TEXT (hidden — inside the image) ── */}
      <section style={{ display:'none' }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div style={{ height: '1px', width: '60px', background: '#c97820' }} />
            <span style={{ color: '#c97820', fontSize: '0.75rem', letterSpacing: '0.25em' }}>EST. 2024</span>
            <div style={{ height: '1px', width: '60px', background: '#c97820' }} />
          </div>

          <h1 style={{ color: '#c97820', fontWeight: 900, fontSize: 'clamp(2rem, 6vw, 3.5rem)', letterSpacing: '0.04em', lineHeight: 1.1 }}>
            PROFESSOR'S
          </h1>
          <h2 style={{ color: '#ffffff', fontWeight: 700, fontSize: 'clamp(1rem, 3vw, 1.6rem)', letterSpacing: '0.3em', marginTop: '4px' }}>
            BOOK STORE
          </h2>

          <div className="flex items-center justify-center gap-3 my-4">
            <div style={{ height: '1px', flex: 1, maxWidth: '80px', background: '#c9782060' }} />
            <span className="text-2xl">📚</span>
            <div style={{ height: '1px', flex: 1, maxWidth: '80px', background: '#c9782060' }} />
          </div>

          <p style={{ color: '#c9c9c9', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600 }}>
            BOOKS THAT BUILD KNOWLEDGE, CHARACTER &amp; SUCCESS
          </p>

          <p style={{ color: '#c97820', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontFamily: 'serif', marginTop: '10px', direction: 'rtl' }}>
            کتابیں جو شخصیت سنوارین، مستقبل بنائیں
          </p>
        </div>
      </section>

      {/* ── CATEGORY CARDS ── */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              style={{ background: '#3d1260', border: '1px solid #6b2888' }}
              className="rounded-xl p-4 text-center hover:border-yellow-500 hover:scale-105 transition-all duration-200 flex flex-col items-center gap-2"
            >
              <span style={cat.urdu ? { color: '#c97820', fontSize: '1.5rem', fontFamily: 'serif', lineHeight: 1 } : { fontSize: '2rem' }}>
                {cat.icon}
              </span>
              <p style={{ color: '#f0e6ff', fontSize: '0.78rem', fontWeight: 700, lineHeight: 1.3 }}>{cat.title}</p>
              <p style={{ color: '#5a7090', fontSize: '0.68rem', lineHeight: 1.4 }}>{cat.sub}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ── FEATURES BAR ── */}
      <section style={{ background: '#c97820', borderTop: '2px solid #a05010', borderBottom: '2px solid #a05010' }} className="py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FEATURES.map(f => (
              <div key={f.title} className="flex items-center gap-2">
                <span className="text-xl">{f.icon}</span>
                <div>
                  <p style={{ color: '#2d1052', fontWeight: 700, fontSize: '0.78rem' }}>{f.title}</p>
                  <p style={{ color: '#3a2800', fontSize: '0.68rem' }}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKS SECTION ── */}
      <section id="books-section" className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center gap-4 mb-6">
          <div style={{ height: '2px', width: '40px', background: '#c97820' }} />
          <h2 style={{ color: '#f0e6ff', fontWeight: 700, fontSize: '1.25rem' }}>Our Collection</h2>
          <div style={{ height: '2px', flex: 1, background: '#6b2888' }} />
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mb-4">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: '#3d1260', border: '1px solid #6b2888', color: '#f0e6ff' }}
            className="flex-1 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-yellow-500 placeholder-gray-600"
          />
          <button type="submit" style={{ background: '#c97820', color: '#2d1052' }} className="px-4 py-2 rounded-lg text-sm font-bold hover:brightness-110 transition">
            Search
          </button>
          {query && (
            <button type="button" onClick={() => { setSearch(''); setQuery('') }} style={{ color: '#6b7e99' }} className="px-2 text-sm hover:text-white">
              Clear
            </button>
          )}
        </form>

        <GenreFilter selected={genre} onSelect={setGenre} />

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ background: '#3d1260' }} className="rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-400">Failed to load books: {error}</p>
            <p style={{ color: '#8b5fa8' }} className="text-sm mt-1">Make sure the API is running on port 3000</p>
          </div>
        )}

        {!loading && !error && books.length === 0 && (
          <p style={{ color: '#8b5fa8' }} className="text-center mt-12">No books found.</p>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
            {books.map(book => (
              <BookCard key={book.id} book={book} onAddToCart={onAddToCart} onViewDetail={onViewDetail} />
            ))}
          </div>
        )}
      </section>

      {/* ── FOOTER BANNER ── */}
      <footer className="mt-8">
        <img src="/promo-banner.png" alt="One Book Can Change Your Life" className="w-full object-cover" style={{ display: 'block', maxHeight: '200px' }} />
        <p style={{ display:'none', color: '#2d1052', fontWeight: 800, letterSpacing: '0.2em', fontSize: '0.9rem' }}>
          ✦ ONE BOOK CAN CHANGE YOUR LIFE ✦
        </p>
      </footer>
    </div>
  )
}
