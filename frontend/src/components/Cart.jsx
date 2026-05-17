import { formatPKR } from '../utils/format'

export default function Cart({ items, onRemove, onClose }) {
  const total = items.reduce((sum, i) => sum + Number(i.price) * i.qty, 0)
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div style={{ background: '#2d1052', borderLeft: '1px solid #6b2888' }} className="relative w-full max-w-sm h-full shadow-2xl flex flex-col">
        <div style={{ borderBottom: '1px solid #6b2888' }} className="flex items-center justify-between p-4">
          <h2 style={{ color: '#f0e6ff' }} className="text-lg font-bold">Your Cart</h2>
          <button onClick={onClose} style={{ color: '#c9a0d4' }} className="hover:text-white text-2xl leading-none">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center mt-16">
              <p className="text-4xl mb-3">🛒</p>
              <p style={{ color: '#8b5fa8' }}>Your cart is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} style={{ background: '#3d1260', border: '1px solid #6b2888' }} className="flex items-center gap-3 rounded-xl p-3">
                <div style={{ background: '#2d1052' }} className="w-10 h-14 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                  {item.cover_url
                    ? <img src={item.cover_url} alt="" className="w-full h-full object-cover" />
                    : <span className="text-lg">📖</span>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ color: '#f0e6ff' }} className="font-medium text-sm truncate">{item.title}</p>
                  <p style={{ color: '#c9a0d4' }} className="text-xs">{item.author}</p>
                  <p style={{ color: '#e8b07a' }} className="text-sm font-bold mt-0.5">
                    {formatPKR(item.price)} × {item.qty}
                  </p>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-300 text-xs font-medium shrink-0">
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div style={{ borderTop: '1px solid #6b2888' }} className="p-4">
          <div className="flex justify-between mb-3">
            <span style={{ color: '#c9a0d4' }} className="font-semibold">Total</span>
            <span style={{ color: '#e8b07a' }} className="text-xl font-bold">{formatPKR(total)}</span>
          </div>
          <button
            disabled={items.length === 0}
            style={{ background: items.length ? '#c97820' : '#4a1a6b', color: '#ffffff' }}
            className="w-full py-2.5 rounded-lg font-bold transition disabled:cursor-not-allowed hover:brightness-110"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
