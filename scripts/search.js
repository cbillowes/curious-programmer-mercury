const search = require('algoliasearch');

const client = search.algoliasearch('V33FO4456K', '69bf87d6f01bae7bc3472545cc4b2a81');

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
