# Icon

<example />

## API

### Icon *function(url, fontFamily, prefix):ReactClass*
Function, returns a new component. A project can create more than one, but fontFamily must be the unique.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| url | string |  | The address of css or js file of the icon. If it has been introduced in the link/script tag, it can be empty. |
| fontFamily | string | 'iconfont' | The font-family needs to be the same as the font-family in the introduced CSS/JS file. |
| prefix | string | 'icon' | The prefix of the class |

### IconComponent *Component created by the Icon function*
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | string | - | The unicode code of the icon. |
| name | string | '' | The name of the icon class (without prefix). |
| fontSize | string | - | The size of the icon, same as the style.fontSize. |
| style | object | - | Extend style. |
| type | string | 'default' | Built-in color, options: \['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger'] |

### FontAwesome *The packaged Icon component*
Parameters are the same as MyIcon，to[Fontawesome](http://www.fontawesome.com.cn/) to choose design
