import { formatPKR } from '../utils/format'

export default function BookCard({ book, onAddToCart, onViewDetail }) {
  return (
    <div
      style={{ background: '#3d1260', border: '1px solid #6b2888' }}
      className="rounded-xl overflow-hidden flex flex-col hover:border-orange-500 transition cursor-pointer group"
    >
      <div
        style={{ background: '#2d1052' }}
        className="h-44 flex items-center justify-center overflow-hidden relative"
        onClick={() => onViewDetail(book)}
      >
        {book.cover_url
          ? <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
          : <img src="/no-cover.png" alt="No cover" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
        }
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span style={{ color: '#c97820', fontSize: '0.7rem', letterSpacing: '0.12em' }} className="font-semibold uppercase">
          {book.genre || 'General'}
        </span>
        <h3
          style={{ color: '#f0e6ff' }}
          className="font-semibold mt-1 line-clamp-2 text-sm leading-snug group-hover:text-orange-300 transition"
          onClick={() => onViewDetail(book)}
        >
          {book.title}
        </h3>
        <p style={{ color: '#c9a0d4', fontSize: '0.8rem' }} className="mt-0.5">{book.author}</p>
        <p style={{ color: '#8b5fa8', fontSize: '0.75rem' }} className="mt-2 line-clamp-2 flex-1">{book.description}</p>

        <div className="flex items-center justify-between mt-4">
          <span style={{ color: '#e8b07a' }} className="text-base font-bold">
            {book.price ? formatPKR(book.price) : 'Free'}
          </span>
          <button
            onClick={() => onAddToCart(book)}
            style={{ background: '#c97820', color: '#ffffff' }}
            className="text-xs px-3 py-1.5 rounded-lg font-bold hover:brightness-110 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
