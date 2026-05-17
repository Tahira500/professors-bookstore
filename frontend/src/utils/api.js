const BASE = '/api/books'

export async function fetchBooks(genre = '', search = '') {
  const params = new URLSearchParams()
  if (genre) params.append('genre', genre)
  if (search) params.append('search', search)
  const res = await fetch(`${BASE}?${params}`)
  const json = await res.json()
  if (!json.success) throw new Error(json.error)
  return json.data
}

export async function fetchBook(id) {
  const res = await fetch(`${BASE}/${id}`)
  const json = await res.json()
  if (!json.success) throw new Error(json.error)
  return json.data
}

export async function createBook(body) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const json = await res.json()
  if (!json.success) throw new Error(json.error)
  return json.data
}

export async function updateBook(id, body) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const json = await res.json()
  if (!json.success) throw new Error(json.error)
  return json.data
}

export async function deleteBook(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  const json = await res.json()
  if (!json.success) throw new Error(json.error)
}
