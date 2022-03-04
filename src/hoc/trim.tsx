import React, { PureComponent } from 'react'
import config from '../config'

interface TrimProps {
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    onChange: (value: string) => void
    trim?: boolean
    value?: string | number
}

export default Origin =>
    class extends PureComponent<TrimProps> {
        get trim() {
            const { trim } = this.props

            if (trim !== undefined) return trim

            if (config.trim !== undefined) return config.trim

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
