import React from 'react'
import { WIP_LIMIT } from '../logic.js'
import TaskCard from './TaskCard.jsx'
export default function Column({ col, total, tasks, today, onMove, onDelete, onDragStart, onDropTask }) {
  return (
    <section className="col" data-col={col.id} onDragOver={e => e.preventDefault()} onDrop={() => onDropTask(col.id)}>
      <h2>{col.name} <span className="count" data-testid={'count-' + col.id}>{total}{col.id === 'doing' ? ` / ${WIP_LIMIT}` : ''}</span></h2>
      {tasks.map(t => <TaskCard key={t.id} task={t} today={today} onMove={onMove} onDelete={onDelete} onDragStart={onDragStart} />)}
      {tasks.length === 0 && <p className="empty">No tasks</p>}
    </section>
  )
}
