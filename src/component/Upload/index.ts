import inputable from '../Form/inputable'
import Upload from './Upload'
import Image from './Image'
import Progress from './Progress'
import Dragger from './Dragger'
import { consumer } from './context'

const UploadContainer = inputable(Upload)
UploadContainer.Image = inputable(Image)
UploadContainer.Button = inputable(Progress)
UploadContainer.Dragger = consumer(Dragger)

UploadContainer.displayName = 'EthanUpload'

UploadContainer.Image.displayName = 'EthanImageUpload'
UploadContainer.Button.displayName = 'EthanButtonUpload'
UploadContainer.Dragger.displayName = 'EthanDraggerUpload'

export default UploadContainer
