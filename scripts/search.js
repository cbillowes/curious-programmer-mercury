const search = require('algoliasearch');

require('dotenv').config();

const client = search.algoliasearch('V33FO4456K', process.env.ALGOLIA_API_KEY);

fetch('https://curiousprogrammer.dev/api/search')
  .then((res) => res.json())
  .then((content) => {
    return client.saveObjects({ indexName: 'Pages', objects: content });
  })
  .then(() => {
    console.log('Successfully indexed objects!');
  })
  .catch((err) => {
    console.error(err);
  });
