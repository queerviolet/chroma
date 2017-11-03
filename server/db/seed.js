const db = require('.')
    , {Promise} = db
    , {Emoji} = require('./models')

// Source data. This gem has all
// emoji by name!
const gemoji = require('gemoji')
    , {unicode: emoji} = gemoji
  
db.sync({force: true})
  .then(() => 
    Promise.map(
      Object.keys(emoji),
      code => Emoji.create(
        Object.assign(emoji[code])
      ))
    )
  .then(emoji => console.log(`seeded ${emoji.length} emojis ok.`))
  .catch(console.error)
