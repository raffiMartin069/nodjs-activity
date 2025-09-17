/*
  JS Fundamentals UI
  Single-file React component. Tailwind CSS required.
  - Top nav with 4 topics
  - Title, sub-label, description area
  - Example code snippet with copy button
  - Inline SVG illustrations
  - Responsive, accessible, production-ready
*/

import React, { useEffect, useState } from 'react'

const topics = [
  {
    id: 1,
    name: 'Variables',
    subtitle: 'let · const · var — scope and binding',
    description:
      'Compare declarations. Quick rules and short examples to clarify hoisting, scoping, and immutability.',
    code: `// var is function-scoped and hoisted
var a = 1

// let is block-scoped and mutable
let b = 2

// const is block-scoped with immutable binding
const c = 3

function demo() {
  if (true) {
    var a = 10
    let b = 20
    const c = 30
  }
  console.log(a) // 10
  // console.log(b) // ReferenceError
}`,
  },
  {
    id: 2,
    name: 'Objects',
    subtitle: 'Literals, prototypes, immutability patterns',
    description:
      'Object literal, shallow copy, nested structures and practical patterns for immutability and cloning.',
    code: `// object literal
const person = { name: 'Ada', age: 36 }

// shallow clone
const copy = { ...person }

// nested immutability (shallow example)
const updated = { ...person, age: person.age + 1 }

// constructor example
function Person(name) {
  this.name = name
}
const p = new Person('Ada')`,
  },
  {
    id: 3,
    name: 'Arrays',
    subtitle: 'Mutable operations vs. immutable patterns',
    description:
      'Readable examples for creation, traversal, transformation, and common higher-order operators.',
    code: `const nums = [1, 2, 3, 4]

// map
const doubled = nums.map(n => n * 2)

// filter
const evens = nums.filter(n => n % 2 === 0)

// reduce
const sum = nums.reduce((acc, n) => acc + n, 0)

// immutably add
const appended = [...nums, 5]`,
  },
  {
    id: 4,
    name: 'Functions',
    subtitle: 'Declarations, expressions, arrows, async, generators',
    description:
      'Concise examples of common function types and when to use each in production code.',
    code: `// function declaration
function add(a, b) { return a + b }

// function expression
const sub = function(a, b) { return a - b }

// arrow function
const mul = (a, b) => a * b

// async
async function fetchJson(url) {
  const r = await fetch(url)
  return r.json()
}

// IIFE
;(function(){ console.log('run once') })()`,
  },
]

function IconVariables() {
  return (
    <svg viewBox="0 0 64 64" width="120" height="120" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="6" y="10" width="52" height="44" rx="6" fill="#f3f4f6" stroke="#111827" strokeWidth="1" />
      <circle cx="20" cy="28" r="4" fill="#111827" />
      <rect x="30" y="24" width="18" height="8" rx="1" fill="#111827" />
    </svg>
  )
}

function IconObjects() {
  return (
    <svg viewBox="0 0 64 64" width="120" height="120" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="8" y="10" width="48" height="12" rx="2" fill="#eef2ff" stroke="#4338ca" />
      <rect x="8" y="28" width="48" height="12" rx="2" fill="#ecfccb" stroke="#4d7c0f" />
      <rect x="8" y="46" width="48" height="6" rx="2" fill="#fff4e6" stroke="#b45309" />
    </svg>
  )
}

function IconArrays() {
  return (
    <svg viewBox="0 0 64 64" width="120" height="120" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g fill="#111827">
        <rect x="10" y="18" width="10" height="10" rx="2" />
        <rect x="26" y="18" width="10" height="10" rx="2" />
        <rect x="42" y="18" width="10" height="10" rx="2" />
      </g>
      <path d="M8 36h48" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconFunctions() {
  return (
    <svg viewBox="0 0 64 64" width="120" height="120" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 44c6-8 18-8 24 0s18 8 24 0" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="20" r="10" fill="#e6fffa" stroke="#065f46" />
      <text x="32" y="24" textAnchor="middle" fontSize="10" fill="#065f46">ƒ</text>
    </svg>
  )
}

export default function App() {
  const [activeId, setActiveId] = useState(1)
  const active = topics.find(t => t.id === activeId) || topics[0]

  const copy = async text => {
    try {
      await navigator.clipboard.writeText(text)
      // minimal transient UI feedback could be added here
    } catch (e) {
      console.error('copy failed', e)
    }
  }

  const renderIcon = id => {
    switch (id) {
      case 1:
        return <IconVariables />
      case 2:
        return <IconObjects />
      case 3:
        return <IconArrays />
      case 4:
        return <IconFunctions />
      default:
        return null
    }
  }

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch('http://127.0.0.1:4000/topics?topicId=1');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Fetched topics:', data);
      } catch(error: any) {
        alert(`Failed to fetch topics: ${error.message}`);
      }
    }
    fetchTopics();
  }, []);

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
                onClick={() => setActiveId(item.id)}
                className={`px-4 py-2 rounded-md whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 text-sm ${
                  activeId === item.id
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
                <div className="flex gap-2">
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
            {renderIcon(active.id)}
          </div>

          <div className="w-full max-w-xs text-xs text-gray-600 bg-white border border-slate-100 rounded-lg p-3">
            <strong className="block text-sm text-slate-800">Usage</strong>
            <p className="mt-1">Apply these patterns in small modules. Favor immutability for shared state. Prefer clear function signatures.</p>
          </div>
        </aside>
      </main>

      <footer className="mt-6 text-xs text-gray-500">Generated UI. Drop into an app shell and hook to your docs or playground.</footer>
    </div>
  )
}
