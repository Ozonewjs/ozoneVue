export function validUsername(str) {
    const valid_map = ['admin', 'editor','001']
    return valid_map.indexOf(str.trim()) >= 0
}
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }