# Breadcrumb _面包屑_

<example />

## API

| 属性      | 类型             | 默认值 | 说明                                    |
| --------- | ---------------- | ------ | --------------------------------------- |
| data      | BreadcrumbData[] | []     | 面包屑对象数组，见 data                 |
| separator | ReactNode        | "/"    | 面包屑分隔符,可以是字符串或自定义的元素 |

### BreadcrumbData

| 属性    | 类型       | 默认值 | 说明                         |
| ------- | ---------- | ------ | ---------------------------- |
| title   | ReactNode  | 无     | 显示内容                     |
| url     | string     | 无     | 链接地址，onClick 属性二选一 |
| onClick | () => void | 无     | 点击事件                     |
| icon    | ReactNode  | 无     | 图标                         |
