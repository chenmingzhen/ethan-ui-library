import React from 'react'
import { PureComponent } from '@/utils/component'

export default Origin => {
    class FormProvider extends PureComponent {
        render() {
            const { datum, labelAlign, labelVerticalAlign, labelWidth, disabled } = this.props
            const value = {
                formDatum: datum,
                disabled,
                labelAlign,
                labelVerticalAlign,
                labelWidth,
            }

            return (
                <FormProvider value={value}>
                    <Origin {...this.props} />
                </FormProvider>
            )
        }
    }

    return FormProvider
}
