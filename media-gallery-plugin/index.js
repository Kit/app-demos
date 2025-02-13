const express = require('express')
const { search, paginate } = require('./media-generator')
const app = express()
const port = 3001

app.use(express.json())

/**
 * Responds to request for listing media items.
 * - Expects pagination query params: `after`, `before`, and `per_page`.
 * - Expects settings query params: `settings.query` (configured in plugin settings)
 */
app.get('/media', (request, response) => {
  console.log(request.query)

  const mediaItems = search({
    query: request.query.settings?.query,
  })
  const {
    data,
    perPage,
    startCursor,
    endCursor,
    hasPreviousPage,
    hasNextPage,
  } = paginate(mediaItems, {
    after: request.query.after,
    before: request.query.before,
    perPage: Math.min(Number.parseInt(request.query.per_page || '100'), 1000),
  })

  response.json({
    data,
    pagination: {
      per_page: perPage,
      start_cursor: startCursor,
      end_cursor: endCursor,
      has_previous_page: hasPreviousPage,
      has_next_page: hasNextPage,
    },
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
