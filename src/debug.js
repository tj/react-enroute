export function warnNotFound(routes, location) {
  if (process.env.NODE_ENV === 'production') return

  const tried = Object.keys(routes)
    .map(path => {
      if (!path) path = "''"
      return `\n- ${path}`
    })

  console.warn(
    `[react-enroute] route for '${location}' not found. ` +
    `Tried ${tried.length} routes:\n[${tried.join('')}\n]\n`
  )
}
