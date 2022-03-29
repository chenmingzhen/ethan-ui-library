import inputable from '../Form/inputable'
import Upload from './Upload'
import Image from './Image'
import Progress from './Progress'
import { UploadComponent } from './type'

const UploadContainer = inputable(Upload) as UploadComponent

UploadContainer.Image = inputable(Image)
UploadContainer.Button = inputable(Progress)

export default UploadContainer
