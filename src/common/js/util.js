export default {
  /**
   * 驼峰转下划线
   * @param str
   */
  humpToUnderline (str) {
    return str.replace(/\B([A-Z])/g, '_$1').toLowerCase()
  },
  toCamelCase (string) {
    // Support: IE9-11+
    return string.replace(/-([a-z])/g, function (all, letter) {
      return letter.toUpperCase()
    })
  }
}
