import { useContext } from 'react'
import MenuContext from '../context/MenuContext'

export default function useInlineIndentStyle(path: React.Key[], isGroup = false) {
    const { mode, inlineIndent } = useContext(MenuContext)
    const style: React.CSSProperties = {}

    if (mode === 'inline') {
        style.paddingLeft = path.length * inlineIndent * (!isGroup ? 1 : 2 / 3)
    }

    return style
}
