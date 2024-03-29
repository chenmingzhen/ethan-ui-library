# Popover

<example />

## API

### Popover

| Property           | Type                                                                                                                                                                   | Default     | Description                                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| visible            | boolean                                                                                                                                                                | -           | Whether to show                                                                                                                        |
| onVisibleChange    | (visible: boolean) => void                                                                                                                                             | -           | The event of visible change                                                                                                            |
| mouseEnterDelay    | number                                                                                                                                                                 | 0.15        | the show delay of mouseenter(ms)                                                                                                       |
| mouseLeaveDelay    | number                                                                                                                                                                 | 0.15        | the hidden delay of mouseleave (ms)                                                                                                    |
| className          | string                                                                                                                                                                 | -           | Extend className                                                                                                                       |
| children           | ReactNode                                                                                                                                                              | required    | Pop-up content.                                                                                                                        |
| position           | 'top-left' \| 'top' \| 'top-right' \| 'left-top' \| 'left' \| 'left-bottom' \| 'right-top' \| 'right' \| 'right-bottom' \| 'bottom-left' \| 'bottom' \| 'bottom-right' | 'top'       | The position of pop-up layer                                                                                                           |
| style              | object                                                                                                                                                                 | -           | The pop-up container style                                                                                                             |
| trigger            | 'click' \| 'hover'                                                                                                                                                     | 'hover'\|[] | type of show                                                                                                                           |
| priorityDirection  | string                                                                                                                                                                 | 'vertical'  | Popup location priority, default is left and right priority, only valid when position is not set, Options: \['vertical', 'horizontal'] |
| getPopupContainer  | () => HTMLElement                                                                                                                                                      | none        | Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement                            |
| showArrow          | boolean                                                                                                                                                                | true        | Whether to show arrow                                                                                                                  |
| autoAdjustOverflow | boolean                                                                                                                                                                | true        | Whether the popover automatically adjusts its position when it is blocked                                                              |

### Popover.Confirm

| Property    | Type        | Default                             | Description                                                                     |
| ----------- | ----------- | ----------------------------------- | ------------------------------------------------------------------------------- |
| onOk        | () => void  | none                                | ok button click callback, will close tooltip while returned promise resolve     |
| onCancel    | () => void  | none                                | cancel button click callback, will close tooltip while returned promise resolve |
| text        | object      | { ok: 'Ok', cancel: 'Cancel' }      | button text                                                                     |
| type        | string      | _warning_                           | icon type \[_success_, _info_, _warning_, _danger(error)_]                      |
| description | ReactNode   | none                                | Confirm the description of the box                                              |
| buttonProps | ButtonProps | {ok:ButtonProps,cancel:ButtonProps} | ButtonProps                                                                     |

### PopoverNote

Please ensure that the child node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onClick` events.
