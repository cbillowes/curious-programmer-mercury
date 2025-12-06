const search = require('algoliasearch');

require('dotenv').config({
  path: '.env.production',
})

const client = search.algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);

fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/search`)
  .then((res) => res.json())
  .then((content) => {
    return client.saveObjects({ indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME, objects: content });
  })
  .then(() => {
    console.log('Successfully indexed objects!');
  })
  .catch((err) => {
    console.error(err);
  });
