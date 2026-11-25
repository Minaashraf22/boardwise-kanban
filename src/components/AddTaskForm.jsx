import React, { useState } from 'react'
export default function AddTaskForm({ onAdd }) {
  const [form, setForm] = useState({ title: '', pri: 'medium', due: '' })
  const [err, setErr] = useState('')
  const submit = e => {
    e.preventDefault()
    if (form.title.trim().length < 3) { setErr('Title needs at least 3 characters'); return }
    setErr(''); onAdd({ title: form.title.trim(), pri: form.pri, due: form.due })
    setForm({ title: '', pri: 'medium', due: '' })
  }
  return (
    <>
      <form onSubmit={submit} className="add" noValidate>
        <input name="title" placeholder="New task title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <select name="pri" aria-label="Priority" value={form.pri} onChange={e => setForm({ ...form, pri: e.target.value })}><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
        <input name="due" type="date" aria-label="Due date" value={form.due} onChange={e => setForm({ ...form, due: e.target.value })} />
        <button className="btn" type="submit">Add task</button>
      </form>
      {err && <p className="err" data-testid="err">{err}</p>}
    </>
  )
}
