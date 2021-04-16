import inputable from '../Form/inputable'
import Upload from './Upload'
import Image from './Image'
import Progress from './Progress'
import Dragger from './Dragger'
import { consumer } from './context'

const exports = inputable(Upload)
exports.Image = inputable(Image)
exports.Button = inputable(Progress)
exports.Dragger = consumer(Dragger)

exports.displayName = 'EthanUpload'

exports.Image.displayName = 'EthanImageUpload'
exports.Button.displayName = 'EthanButtonUpload'
exports.Dragger.displayName = 'EthanDraggerUpload'

export default exports
