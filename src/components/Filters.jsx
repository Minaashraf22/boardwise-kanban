import React from 'react'
export default function Filters({ q, setQ, pri, setPri }) {
  return (
    <div className="filters">
      <input placeholder="Search tasks" aria-label="Search" value={q} onChange={e => setQ(e.target.value)} />
      <select aria-label="Filter priority" value={pri} onChange={e => setPri(e.target.value)}><option value="all">All priorities</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
    </div>
  )
}
