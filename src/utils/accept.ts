// @ts-nocheck
const attrAccept = (file, acceptedFiles) => {
    if (file && acceptedFiles) {
        const acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',')
        const fileName = file.name || ''
        const mimeType = file.type || ''
        const baseMimeType = mimeType.replace(/\/.*$/, '')

        return acceptedFilesArray.some(type => {
            const validType = type.trim()
            if (validType.charAt(0) === '.') {
                return fileName.toLowerCase().endsWith(validType.toLowerCase())
            }
            if (/\/\*$/.test(validType)) {
                return baseMimeType === validType.replace(/\/.*$/, '')
            }
            return mimeType === validType
        })
    }

    return true
}

export default attrAccept
