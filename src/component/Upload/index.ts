import withControl from '../../hoc/withControl'
import Upload from './Upload'
import Image from './Image'
import Progress from './Progress'
import { UploadComponent } from './type'

const UploadContainer = withControl(Upload) as UploadComponent

UploadContainer.Image = withControl(Image)
UploadContainer.Button = withControl(Progress)

export default UploadContainer
