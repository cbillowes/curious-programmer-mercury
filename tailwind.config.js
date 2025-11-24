import flowbitePlugin from 'flowbite/plugin';

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}' // Add this
  ],
  plugins: [flowbitePlugin],
}
