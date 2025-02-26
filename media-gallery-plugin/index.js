require('dotenv').config()
const express = require('express')
const {
  search,
  filter,
  sort,
  paginate,
  find,
  MEDIA_ITEMS,
} = require('./media-generator')
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

  const searchedMedia = search(MEDIA_ITEMS, request.query.settings?.query)
  const filteredMedia = filter(searchedMedia, request.query.settings || {})
  const sortedMedia = sort(filteredMedia, request.query.settings || {})
  const {
    data: paginatedMedia,
    perPage,
    startCursor,
    endCursor,
    hasPreviousPage,
    hasNextPage,
  } = paginate(sortedMedia, {
    after: request.query.after,
    before: request.query.before,
    perPage: Math.min(Number.parseInt(request.query.per_page || '100'), 1000),
  })
  const data = paginatedMedia.map(mediaItem => ({
    id: mediaItem.id,
    type: mediaItem.type,
    alt: mediaItem.alt,
    caption: mediaItem.caption,
    title: mediaItem.title,
    href: mediaItem.href,
    hotlink: mediaItem.hotlink,
    attribution: mediaItem.attribution,
    notify_download_url: mediaItem.notify_download_url,
  }))

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

/**
 * Responds to request for listing folder options for dynamic select setting
 */
app.get('/folders', (request, response) => {
  response.json({
    options: [
      { label: 'Home', value: 'home' },
      { label: 'Favorites', value: 'favorites' },
      { label: 'Shared', value: 'shared' },
    ],
  })
})

app.listen(port, () => {
  console.log(`Server running at :${port}`)
})
