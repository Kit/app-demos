require('dotenv').config()
const express = require('express')
const { search, paginate, find } = require('./media-generator')
const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

/**
 * Responds to request for listing media items.
 * - Expects pagination query params: `after`, `before`, and `per_page`.
 * - Expects search query param: `search.<setting name>` (configured in plugin settings)
 * - Expects filter query params: `filters.<setting name>` (configured in plugin settings)
 * - Expects sort query param: `sort.<setting name>` (configured in plugin settings)
 */
app.get('/media', (request, response) => {
  console.log(request.query)

  const mediaItems = search({
    query: request.query.search?.query,
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

/**
 * Responds to request that a media item was downloaded.
 */
app.post('/media/:id/downloaded', (request, response) => {
  const media = find(request.url)
  console.log(
    `${media.title} ${media.href} ${request.params.id} was downloaded!`
  )

  response.sendStatus(204)
})

app.listen(port, () => {
  console.log(`Server running at :${port}`)
})
