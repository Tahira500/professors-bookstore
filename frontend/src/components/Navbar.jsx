export default function Navbar({ cartCount, onCartClick }) {
  return (
    <nav style={{ background: '#2d1052', borderBottom: '1px solid #6b288840' }} className="sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <div>
              <p style={{ color: '#c97820', fontWeight: 800, fontSize: '1rem', lineHeight: 1, letterSpacing: '0.05em' }}>
                PROFESSOR'S
              </p>
              <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.2em' }}>
                BOOK STORE
              </p>
            </div>
          </a>
          <a href="/admin" style={{ color: '#c9a0d4', fontSize: '0.85rem' }} className="hover:text-orange-400 transition">
            Admin
          </a>
        </div>
        <button
          onClick={onCartClick}
          style={{ background: '#c97820', color: '#ffffff' }}
          className="relative flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm hover:brightness-110 transition"
        >
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}
