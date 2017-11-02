const db = require('.')
    , {Emoji} = require('./models')
const emoji = require('gemoji')

db.sync({force: true})
  .then(() => 
    Promise.all(
      Object.values(emoji.name)
        .map(data => Emoji.create(data))
    ))
  .then(emoji => console.log(`seeded ${emoji.length} emojis ok.`))
  .catch(console.error)
