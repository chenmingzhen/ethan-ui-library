# Menu

<example />

## API

| Property              | Type                                    | Default  | Description                                  |
| --------------------- | --------------------------------------- | -------- | -------------------------------------------- |
| data                  | object[]                                | []       | Data to render as menu                       |
| mode                  | 'inline' \| 'vertical' \| 'horizontal'  | 'inline' | Menu style                                   |
| renderItem            | (data: object) => ReactNode             | -        | Custom rendering for items                   |
| defaultOpenKeys       | (string\|number)[]                      | []       | Default expanded items                       |
| defaultActiveKey      | string\|number                          | -        | Default active key                           |
| openKeys              | (string\|number)[]                      | []       | Expanded menu items (controlled)             |
| onClick               | (data: Data, path: React.key[]) => void | -        | Click event                                  |
| onSelect              | (data: Data, path: React.key[]) => void | -        | Selection event                              |
| style                 | object                                  | -        | Outermost styling                            |
| inlineIndent          | number                                  | 24       | Indentation width per level                  |
| onOpenChange          | (keys: (string\|number)[]) => void      | -        | Callback for menu expand/collapse            |
| subMenuTriggerActions | 'focus' \| 'mousedown'                  | -        | Submenu expansion trigger in non-inline mode |
