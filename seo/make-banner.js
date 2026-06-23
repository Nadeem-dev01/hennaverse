const sharp = require('sharp');
sharp('D:/mehndiweb/seo/gig-banner.svg', { density: 96 })
  .png()
  .toFile('D:/mehndiweb/seo/gig-banner.png')
  .then(info => console.log('done', JSON.stringify(info)))
  .catch(err => { console.error(err); process.exit(1); });
