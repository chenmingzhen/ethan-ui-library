import moveable from '@/hoc/moveable'
import resizable from '@/hoc/resizable'
import { compose } from '@/utils/func'
import { editorClass } from 'doc/styles'
import { Button } from 'ethan-ui'
import locate from 'doc/utils/locate'
import React from 'react'

interface PanelProps {
    onClose: () => void
}

const Panel: React.FC<PanelProps> = function (props) {
    const { children, onClose, ...other } = props

    return (
        <div {...other}>
            <div className={editorClass('content')} />
            <div className={editorClass('extra')}>
                <div className={editorClass('handler')} />
                <div className={editorClass('extra-content')}>
                    <Button onClick={() => this.reset()}>{locate('重置', 'reset')}</Button>
                    <Button onClick={() => this.download()} type="primary">
                        {locate('下载', 'download')}
                    </Button>
                </div>
            </div>
            <div className={editorClass('close')} onClick={onClose}>
                <span />
            </div>
        </div>
    )
}

const MixinPanel = compose(moveable(`.${editorClass('main')}`), resizable)(Panel)

export default React.memo(MixinPanel) as typeof Panel
