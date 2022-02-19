export default fn => (value, formData, callback) => {
    if (value == null || value.length === 0) {
        callback(true)
        return
    }

    fn(value, formData, callback)
}
