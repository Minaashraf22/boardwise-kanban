export const COLS = [{ id: 'todo', name: 'To do' }, { id: 'doing', name: 'In progress' }, { id: 'done', name: 'Done' }]
export const WIP_LIMIT = 3
export const iso = d => d.toISOString().slice(0, 10)
export const isOverdue = (t, today) => t.col !== 'done' && !!t.due && t.due < today
export function canMove(tasks, id, to) {
  const t = tasks.find(x => x.id === id)
  if (!t) return { ok: false, reason: 'Task not found' }
  if (t.col === to) return { ok: true }
  if (to === 'doing' && tasks.filter(x => x.col === 'doing').length >= WIP_LIMIT) return { ok: false, reason: `In progress is limited to ${WIP_LIMIT} tasks` }
  return { ok: true }
}
export const move = (tasks, id, to) => tasks.map(t => (t.id === id ? { ...t, col: to } : t))
export function seed(todayStr) {
  const d = n => { const x = new Date(todayStr + 'T12:00:00'); x.setDate(x.getDate() + n); return iso(x) }
  return [
    { id: 1, title: 'Draft launch announcement', pri: 'high', due: d(-2), col: 'todo' },
    { id: 2, title: 'Review onboarding copy', pri: 'medium', due: d(3), col: 'todo' },
    { id: 3, title: 'Set up analytics events', pri: 'low', due: '', col: 'todo' },
    { id: 4, title: 'Fix signup form validation', pri: 'high', due: d(1), col: 'doing' },
    { id: 5, title: 'Design settings page', pri: 'medium', due: d(5), col: 'doing' },
    { id: 6, title: 'Write release notes', pri: 'low', due: d(-4), col: 'done' },
  ]
}
