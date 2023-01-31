import Upload from './Upload'
import UploadImage from './Image'
import Progress from './Progress'
import { UploadProps } from './type'

interface UploadComponent extends React.FunctionComponent<UploadProps> {
    Image: typeof UploadImage
    Button: typeof Progress
}

const UploadContainer = Upload as unknown as UploadComponent

UploadContainer.Image = UploadImage
UploadContainer.Button = Progress

export default UploadContainer
