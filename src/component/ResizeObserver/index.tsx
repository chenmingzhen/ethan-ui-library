import useRefMethod from '@/hooks/useRefMethod'
import useResizeObserver, { UseResizeObserverProps } from '@/hooks/useResizeObserver'
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

interface ResizeObserverProps extends Omit<UseResizeObserverProps, 'getTargetElement'> {
    children: React.ReactNode
}

class Wrapper extends React.PureComponent {
    render() {
        return <>{this.props.children}</>
    }
}

const ResizeObserver: React.FC<ResizeObserverProps> = function (props) {
    const { children, ...resizeProps } = props
    const wrapper = useRef<Wrapper>()

    const getTargetElement = useRefMethod(() => {
        const node = ReactDOM.findDOMNode(wrapper.current)

        if (node instanceof Text) return null

        return node
    })

    useResizeObserver({ ...resizeProps, getTargetElement })

    return <Wrapper ref={wrapper}>{children}</Wrapper>
}

export default React.memo(ResizeObserver)
