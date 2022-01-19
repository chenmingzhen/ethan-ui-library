/**
 * required校验
 */
export default options => (value, _, callback) => {
    const { message } = options

    if (value == null || value.length === 0) {
        callback(new Error(message))
    } else {
        callback(true)
    }
}
