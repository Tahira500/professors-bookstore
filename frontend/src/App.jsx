import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import BookModal from './components/BookModal'
import Home from './pages/Home'
import Admin from './pages/Admin'
import './index.css'

function Store() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

  function addToCart(book) {
    setCart(prev => {
      const existing = prev.find(i => i.id === book.id)
      if (existing) return prev.map(i => i.id === book.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...book, qty: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <Home onAddToCart={addToCart} onViewDetail={setSelectedBook} />
      {cartOpen && <Cart items={cart} onRemove={removeFromCart} onClose={() => setCartOpen(false)} />}
      {selectedBook && <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} onAddToCart={addToCart} />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
