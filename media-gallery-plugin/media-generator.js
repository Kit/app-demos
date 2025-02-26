const { faker } = require('@faker-js/faker')
const Fuse = require('fuse.js')

/**
 * Fake media items. For a real plugin, this would come from a database or API.
 */
const MEDIA_ITEMS = faker.helpers.multiple(
  () => {
    const id = faker.string.nanoid()
    return {
      id,
      type: 'image',
      alt: faker.lorem.sentence(),
      caption: faker.lorem.words(),
      title: faker.system.commonFileName('jpg'),
      href: faker.image.urlPicsumPhotos({
        width: 600,
        height: 900,
        blur: 0,
        grayscale: false,
      }),
      hotlink: faker.datatype.boolean(),
      ...(faker.datatype.boolean() && {
        attribution: {
          label: faker.person.fullName(),
          href: `https://${faker.internet.domainName()}/abc?utm_source=your_app_name&utm_medium=referral`,
        },
      }),
      ...(faker.datatype.boolean() && {
        notify_download_url: `${process.env.URL}/media/${id}/downloaded`,
      }),

      labels: faker.helpers.arrayElement([
        [],
        ['my_content'],
        ['my_content', 'favorite'],
        ['shared'],
      ]),
      created_at: faker.date.anytime(),
    }
  },
  { count: 2000 }
)

/**
 * Searches for media items using query.
 */
function search(items, query) {
  const fuse = new Fuse(items, {
    threshold: 0.8,
    keys: ['title', 'caption', 'attribution.label'],
  })
  if (query) {
    return fuse.search(query).map(search => search.item)
  }
  return items
}

/**
 * Filters for media items
 */
function filter(items, params) {
  if (params.label) {
    return items.filter(item => item.labels.includes(params.label))
  }
  return items
}

/**
 * Sort for media items
 */
function sort(items, params) {
  if (params.sort === 'alphabetical_asc') {
    return items.slice().sort((a, b) => a.caption.localeCompare(b.caption))
  } else if (params.sort === 'alphabetical_desc') {
    return items.slice().sort((a, b) => a.caption.localeCompare(b.caption) * -1)
  } else if (params.sort === 'created_asc') {
    return items.slice().sort((a, b) => b.created_at - a.created_at)
  } else if (params.sort === 'created_desc') {
    return items.slice().sort((a, b) => (b.created_at - a.created_at) * -1)
  }
  return items
}

/**
 * Paginates through media items. Uses limit/offset approach.
 */
function paginate(data, { before, after, perPage }) {
  const decodedBefore =
    before && Buffer.from(before, 'base64').toString('ascii')
  const decodedAfter = after && Buffer.from(after, 'base64').toString('ascii')

  let startCursor = 0

  if (after) {
    startCursor = Number.parseInt(decodedAfter)
  } else if (before) {
    startCursor = Number.parseInt(decodedBefore) - perPage
  }

  const pagedData = data.slice(startCursor, startCursor + perPage)

  return {
    data: pagedData,
    perPage,
    startCursor: Buffer.from(startCursor.toString()).toString('base64'),
    endCursor: Buffer.from((startCursor + perPage).toString()).toString(
      'base64'
    ),
    hasPreviousPage: startCursor > 0,
    hasNextPage: startCursor + perPage <= data.length,
  }
}

function find({ url }) {
  return MEDIA_ITEMS.find(media => media.notify_download_url === url)
}

module.exports = {
  MEDIA_ITEMS,
  search,
  filter,
  sort,
  paginate,
  find,
}
