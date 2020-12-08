export default options => (value, formData, callback) => {
  const { message } = options
  if (value == null || value.length === 0) {
    callback(new Error(message))
  } else {
    callback(true)
  }
}
