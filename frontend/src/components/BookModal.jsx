import { formatPKR } from '../utils/format'

export default function BookModal({ book, onClose, onAddToCart }) {
  if (!book) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div
        style={{ background: '#3d1260', border: '1px solid #6b2888', maxHeight: '90vh' }}
        className="relative rounded-2xl shadow-2xl w-full max-w-lg overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{ background: '#2d1052', color: '#c9a0d4', border: '1px solid #6b2888' }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center hover:text-white text-lg leading-none"
        >
          &times;
        </button>

        {/* Full cover image */}
        <div
          style={{ background: '#2d1052', minHeight: '320px' }}
          className="w-full flex items-center justify-center overflow-hidden rounded-t-2xl"
        >
          <img
            src={book.cover_url || '/no-cover.png'}
            alt={book.title}
            className="w-full object-contain"
            style={{ maxHeight: '420px' }}
          />
        </div>

        {/* Book details */}
        <div className="p-5">
          <span style={{ color: '#c97820', fontSize: '0.7rem', letterSpacing: '0.12em' }} className="font-semibold uppercase">
            {book.genre}
          </span>
          <h2 style={{ color: '#f0e6ff' }} className="text-xl font-bold mt-1 leading-tight">{book.title}</h2>
          <p style={{ color: '#c9a0d4' }} className="text-sm mt-0.5">by {book.author}</p>

          <p style={{ color: '#c9a0d4' }} className="text-sm mt-3 leading-relaxed">{book.description}</p>

          <div className="flex items-center justify-between mt-5">
            <p style={{ color: '#e8b07a' }} className="text-2xl font-bold">
              {book.price ? formatPKR(book.price) : 'Free'}
            </p>
            <button
              onClick={() => { onAddToCart(book); onClose() }}
              style={{ background: '#c97820', color: '#ffffff' }}
              className="px-6 py-2.5 rounded-lg font-bold hover:brightness-110 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
