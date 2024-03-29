import immer from 'immer'

const names = [
    'delay',
    'rules',
    'formDatum',
    'forceChange',
    'trim',
    'beforeChange',
    'info',
    'onInternalError',
    'validate',
    'control',
    'focus',
    'zIndex',
    'scrollToError',
]

// Warning: Invalid value for prop `info` on <input>
// react规定 在原始标签中，添加自定义属性不能是方法  info={()=>{}} 错误

/**
 * delete some props if needed, will not modify the pass argument
 * @param props
 */
export default function cleanProps(props) {
    return immer(props, (draft) => {
        names.forEach((p) => delete draft[p])
    })
}
