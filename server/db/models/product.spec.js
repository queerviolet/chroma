/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  it('has name, rgb, and price', async () => {
    const avocado = {
      name: 'Ugly Avocado',
      red: 27,
      green: 129,
      blue: 11,
      price: '10.00',
    }
    const p = await Product.create(avocado)
    expect(p).to.have.property('name', avocado.name)
    expect(p).to.have.property('red', avocado.red)
    expect(p).to.have.property('green', avocado.green)
    expect(p).to.have.property('blue', avocado.blue)
    expect(p).to.have.property('price', avocado.price)
  })
}) // end describe('Product model')
