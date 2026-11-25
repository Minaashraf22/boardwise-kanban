import React from 'react'
export default function Stats({ total, overdue }) {
  return <div className="stats"><span data-testid="total">{total} tasks</span><span data-testid="overdue" className={overdue ? 'bad' : ''}>{overdue} overdue</span></div>
}
