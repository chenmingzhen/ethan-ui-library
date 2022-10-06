import React, { PureComponent } from 'react'

export interface TrimProps {
    trim?: boolean
}

export interface ITrimProps extends TrimProps {
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    onChange: (value: string) => void
    value?: string | number
}

export default Origin =>
    class extends PureComponent<ITrimProps> {
        get trim() {
            const { trim } = this.props

            if (trim !== undefined) return trim

            return false
        }

        /** 失焦删除空白字符 */
        handleBlur = e => {
            const { value, onBlur, onChange } = this.props

            if (this.trim) {
                const trimValue = e.target.value.trim()

                if (value !== trimValue) onChange(trimValue)
            }

            if (onBlur) onBlur(e)
        }

        render() {
            return <Origin {...this.props} onBlur={this.handleBlur} />
        }
    }
