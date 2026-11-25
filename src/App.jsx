import React, { useEffect, useState } from 'react'
import { COLS, iso, isOverdue, canMove, move, seed } from './logic.js'
import Header from './components/Header.jsx'
import Stats from './components/Stats.jsx'
import AddTaskForm from './components/AddTaskForm.jsx'
import Filters from './components/Filters.jsx'
import Column from './components/Column.jsx'

const today = iso(new Date(new Date().setHours(12)))
const load = () => { try { return JSON.parse(localStorage.getItem('bw-tasks')) || seed(today) } catch { return seed(today) } }

export default function App() {
  const [tasks, setTasks] = useState(load)
  const [q, setQ] = useState('')
  const [pri, setPri] = useState('all')
  const [notice, setNotice] = useState('')
  const [drag, setDrag] = useState(null)
  useEffect(() => localStorage.setItem('bw-tasks', JSON.stringify(tasks)), [tasks])

  const go = (id, to) => {
    const r = canMove(tasks, id, to)
    if (!r.ok) { setNotice(r.reason); return }
    setNotice(''); setTasks(move(tasks, id, to))
  }
  const add = t => setTasks([...tasks, { id: Date.now(), col: 'todo', ...t }])
  const visible = t => (pri === 'all' || t.pri === pri) && t.title.toLowerCase().includes(q.trim().toLowerCase())

  return (
    <div>
      <Header />
      <main>
        <Stats total={tasks.length} overdue={tasks.filter(t => isOverdue(t, today)).length} />
        <AddTaskForm onAdd={add} />
        <Filters q={q} setQ={setQ} pri={pri} setPri={setPri} />
        {notice && <p className="notice" data-testid="notice">{notice}</p>}
        <div className="board">
          {COLS.map(c => (
            <Column key={c.id} col={c} total={tasks.filter(t => t.col === c.id).length} tasks={tasks.filter(t => t.col === c.id && visible(t))} today={today}
              onMove={go} onDelete={id => setTasks(tasks.filter(y => y.id !== id))} onDragStart={setDrag}
              onDropTask={to => { if (drag) go(drag, to); setDrag(null) }} />
          ))}
        </div>
      </main>
    </div>
  )
}
