import React from 'react'
import { COLS, isOverdue } from '../logic.js'
export default function TaskCard({ task: t, today, onMove, onDelete, onDragStart }) {
  const late = isOverdue(t, today)
  return (
    <article className={'card ' + t.pri} draggable onDragStart={() => onDragStart(t.id)}>
      <b>{t.title}</b>
      <div className="meta"><span className={'pri ' + t.pri}>{t.pri}</span>
        {t.due && <span className={late ? 'due late' : 'due'}>{late ? 'Overdue · ' : 'Due '}{t.due}</span>}</div>
      <div className="acts">
        {COLS.filter(x => x.id !== t.col).map(x => <button key={x.id} aria-label={`Move ${t.title} to ${x.name}`} onClick={() => onMove(t.id, x.id)}>→ {x.name}</button>)}
        <button className="del" aria-label={'Delete ' + t.title} onClick={() => onDelete(t.id)}>Delete</button>
      </div>
    </article>
  )
}
