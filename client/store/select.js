export default function select(...fields) {
  const src = `
    state => {
      ${fields.map(field => `const ${field} = state.${field}`).join(';')}
      return {${fields.join(', ')}};
    }
  `
  return eval(src)
}
