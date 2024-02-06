import { useContext } from 'react'
import MenuContext from '../context/MenuContext'

function usePathStr(path: React.Key[]) {
    const { chainKey } = useContext(MenuContext)

    return path.join(chainKey)
}

export default usePathStr
