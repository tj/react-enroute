export function warnNotFound(routes, location) {
  if (process.env.NODE_ENV === 'production') return

  const tried = Object.keys(routes)
    .map(path => "\n- " + (path || "''"))
    .join('')

  console.warn(
    `[react-enroute] route for '${location}' not found. ` +
    `Tried ${routes.length} routes:\n[${tried}\n]\n`
  )
}
