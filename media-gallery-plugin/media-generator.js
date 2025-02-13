const { faker } = require('@faker-js/faker')
const Fuse = require('fuse.js')

/**
 * Fake media items. For a real plugin, this would come from a database or API.
 */
const MEDIA_ITEMS = faker.helpers.multiple(
  () => ({
    id: faker.string.nanoid(),
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
    attribution: faker.datatype.boolean()
      ? {
          label: faker.person.fullName(),
          href: `https://${faker.internet.domainName()}/abc?utm_source=your_app_name&utm_medium=referral`,
        }
      : null,
  }),
  { count: 2000 }
)

/**
 * Searches for media items using settings. Search uses a fuzzy search.
 */
function search({ query }) {
  if (query) {
    const fuse = new Fuse(MEDIA_ITEMS, {
      keys: ['title', 'caption', 'attribution.label'],
    })
    return fuse.search(query).map(search => search.item)
  }
  return MEDIA_ITEMS
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

module.exports = {
  MEDIA_ITEMS,
  search,
  paginate,
}
