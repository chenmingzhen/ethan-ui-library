import Motion from './Motion'
import Transition from './Transition'
import { MotionProps } from './type'

interface MotionComponent extends React.FunctionComponent<MotionProps> {
    Transition: typeof Transition
}

const MotionContainer = Motion as unknown as MotionComponent

MotionContainer.Transition = Transition

export default MotionContainer
