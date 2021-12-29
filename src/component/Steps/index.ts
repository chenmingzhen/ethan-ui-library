import { MemoExoticComponent } from 'react'
import Steps, { StepsProps } from './Steps'
import StepItem from './StepItem'

export interface StepsComponents extends MemoExoticComponent<React.FC<StepsProps>> {
    StepItem: typeof StepItem
}

const ComputedSteps = (Steps as unknown) as StepsComponents

ComputedSteps.StepItem = StepItem

export default ComputedSteps
