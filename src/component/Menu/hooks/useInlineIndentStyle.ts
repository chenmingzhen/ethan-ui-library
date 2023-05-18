import { useContext } from 'react'
import MenuContext from '../context/MenuContext'

export default function useInlineIndentStyle(path: React.Key[]) {
    const { mode, inlineIndent } = useContext(MenuContext)
    const style: React.CSSProperties = {}

    if (mode === 'inline') {
        style.paddingLeft = path.length * inlineIndent
    }

    return style
}
