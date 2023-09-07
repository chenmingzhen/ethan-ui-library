import React from 'react'
import { isObject } from '@/utils/is'
import MenuItem from './MenuItem'
import { MenuBaseData } from './type'
import SubMenu from './SubMenu'
import MenuItemGroup from './MenuItemGroup'

export const ETHAN_MENU_SEPARATOR = '_E@T_'

export function getPathStr(path: React.Key[] = []) {
    return path.join(ETHAN_MENU_SEPARATOR)
}

export function parseChildren(data: MenuBaseData[]) {
    return (data || [])
        .map((dataItem, index) => {
            if (isObject(dataItem)) {
                const { title, children, key, type, ...restProps } = dataItem
                const mergedKey = key || index

                if (type === 'group') {
                    return (
                        <MenuItemGroup key={mergedKey} {...restProps} dataItem={dataItem}>
                            {parseChildren(children)}
                        </MenuItemGroup>
                    )
                }

                if (children) {
                    return (
                        <SubMenu key={mergedKey} {...restProps} dataItem={dataItem}>
                            {parseChildren(children)}
                        </SubMenu>
                    )
                }

                return (
                    <MenuItem key={mergedKey} {...restProps} dataItem={dataItem}>
                        {title}
                    </MenuItem>
                )
            }

            return null
        })
        .filter((opt) => opt)
}

export const INTERNAL_MORE_KEY = '__INTERNAL_MORE_KEY__'
