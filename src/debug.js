export function warnNotFound(routes, location) {
  if (process.env.NODE_ENV === 'production') return

  const paths = Object.keys(routes)
  const tried = paths
    .map(path => "\n- " + (path || "''"))
    .join('')

  console.warn(
    `[react-enroute] route for '${location}' not found. ` +
    `Tried ${paths.length} routes:\n[${tried}\n]\n`
  )
}
