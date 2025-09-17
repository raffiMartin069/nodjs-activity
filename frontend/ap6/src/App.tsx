import { useEffect, useState } from 'react'

type Topic = {
  id: number
  name: string
  subtitle: string
  description: string
  code: string
  image: string
}

export default function App() {
  const [activeId, setActiveId] = useState(1)
  const [topics, setTopics] = useState<Topic[]>([])
  const [topic, setTopic] = useState('')
  const active = topics.find(t => t.id === activeId) || topics[0]
  const [copied, setCopied] = useState(false)

  const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    setCopied(true)

    // hide after 1.5 seconds
    setTimeout(() => setCopied(false), 1500)
  } catch (e) {
    console.error('copy failed', e)
  }
}

  const renderIcon = (imgUrl: string) => {
    return (
      <img
      src={imgUrl}
      alt="Functions icon"
      width={420}
      height={420}
      className="rounded"
    />
    )
  }

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        // const q: string = topic ? topic : 'variables'
        const res = await fetch(`http://localhost:3000/topics`)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        setTopics(data.results)
      } catch (error: Error | any) {
        alert(`Failed to fetch topics: ${error.message}`)
      }
    }
    fetchTopics()
  }, [topic])

  // 🔑 guard against undefined before rendering UI
  if (!active) {
    return <div className="p-6 text-gray-500">Loading topics...</div>
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Top bar */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">JS Fundamentals — Quick Reference</h2>
          <p className="text-sm text-gray-500 mt-1">Practical cheat-sheet for variables, objects, arrays, and function types</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="hidden sm:flex text-xs text-gray-600">Status</div>
          <div className="px-3 py-1 text-xs bg-slate-100 rounded">Stable</div>
        </div>
      </header>

      {/* Nav */}
      <nav className="mt-6 overflow-auto">
        <ul className="flex gap-3" role="tablist" aria-label="JS topics">
          {topics.map(item => (
            <li key={item.id}>
              <button
                role="tab"
                aria-selected={activeId === item.id}
                onClick={() => { setActiveId(item.id); setTopic(item.name); }}
                className={`px-4 py-2 rounded-md whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 text-sm ${activeId === item.id
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-white text-slate-700 border border-slate-200'
                  }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content panel */}
      <main className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <section className="md:col-span-2">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-xl font-bold">{active.name}</h3>
              <div className="text-sm text-gray-500 mt-1">{active.subtitle}</div>
            </div>
          </div>

          <div className="mt-4 bg-white border border-slate-100 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-slate-700">{active.description}</p>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">Example</div>
                <div className="flex gap-2 items-center">
                  {copied ? <span className="text-xs text-green-600">Copied!</span> : null}
                  <button
                    onClick={() => copy(active.code)}
                    className="text-xs px-2 py-1 bg-slate-50 border rounded text-slate-700"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <pre className="mt-2 whitespace-pre-wrap bg-slate-50 p-3 rounded text-sm overflow-x-auto border border-slate-100">
                <code>{active.code}</code>
              </pre>
            </div>
          </div>
        </section>

        <aside className="flex flex-col items-center gap-4">
          <div className="w-full max-w-xs bg-white border border-slate-100 rounded-lg p-5 flex items-center justify-center">
            {renderIcon(active.image)}
          </div>

          <div className="w-full max-w-xs text-xs text-gray-600 bg-white border border-slate-100 rounded-lg p-3">
            <strong className="block text-sm text-slate-800">Usage</strong>
            <p className="mt-1">Apply these patterns in small modules. Favor immutability for shared state. Prefer clear function signatures.</p>
          </div>
        </aside>
      </main>

      <footer className="mt-6 text-xs text-gray-500">AP 6 - Activity | Node.js Backend.</footer>
    </div>
  )
}
