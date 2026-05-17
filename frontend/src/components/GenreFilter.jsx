const GENRES = [
  { label: 'All', value: '' },
  { label: 'Personality Development', value: 'Personality Development' },
  { label: 'Exam Books', value: 'Exam Books' },
  { label: 'Urdu Books', value: 'Urdu Books' },
  { label: 'Academic Books', value: 'Academic Books' },
  { label: 'General Books', value: 'General Books' },
  { label: 'Fiction', value: 'Fiction' },
  { label: 'Self-Help', value: 'Self-Help' },
  { label: 'Islamiyat', value: 'Islamiyat' },
  { label: 'Programming', value: 'Programming' },
]

export default function GenreFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 my-5">
      {GENRES.map(g => {
        const active = selected === g.value || (!selected && g.value === '')
        return (
          <button
            key={g.value}
            onClick={() => onSelect(g.value)}
            style={active
              ? { background: '#c97820', color: '#ffffff', border: '1px solid #c97820' }
              : { background: 'transparent', color: '#c9a0d4', border: '1px solid #6b2888' }
            }
            className="px-4 py-1.5 rounded-full text-sm font-medium transition hover:border-orange-500 hover:text-orange-300"
          >
            {g.label}
          </button>
        )
      })}
    </div>
  )
}
