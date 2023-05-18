import React from 'react'
import { isObject } from '@/utils/is'
import MenuItem from './MenuItem'
import { MenuBaseData } from './type'
import SubMenu from './SubMenu'

interface GetOptionReturn {
    key: 'height' | 'width'
    pos: 'Top' | 'Left'
    direction: 'Y' | 'X'
}

export function getOption(mode): GetOptionReturn {
    return mode.indexOf('vertical') === 0 || mode === 'inline'
        ? {
              key: 'height',
              pos: 'Top',
              direction: 'Y',
          }
        : {
              key: 'width',
              pos: 'Left',
              direction: 'X',
          }
}

export function getPathStr(path: React.Key[]) {
    const ETHAN_MENU_SEPARATOR = '_@ETHAN@_'

    return path.join(ETHAN_MENU_SEPARATOR)
}

export function parseChildren(data: MenuBaseData[]) {
    return (data || [])
        .map((item, index) => {
            if (isObject(item)) {
                const { title, children, key, ...restProps } = item
                const mergedKey = key || index

                if (children) {
                    return (
                        <SubMenu key={mergedKey} {...restProps} dataItem={item}>
                            {parseChildren(children)}
                        </SubMenu>
                    )
                }

                return (
                    <MenuItem key={mergedKey} {...restProps} itemData={item}>
                        {title}
                    </MenuItem>
                )
            }

            return null
        })
        .filter((opt) => opt)
}
