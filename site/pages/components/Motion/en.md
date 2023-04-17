# Motion

<example />

## API

### Motion

| Property          | Type                        | Default | Description                                                    |
| ----------------- | --------------------------- | ------- | -------------------------------------------------------------- |
| destroyAfterLeave | boolean                     | false   | Whether to destroy the DOM after executing the exit animation. |
| leaveClassName    | string                      | -       | The class name after the exit animation is performed.          |
| name              | string                      | -       | Animation name prefix.                                         |
| enter             | boolean                     | true    | Whether to execute the enter animation.                        |
| leave             | boolean                     | true    | Whether to execute the leave animation.                        |
| visible           | boolean                     | -       | Begins to execute the enter or leave animation.                |
| onEnterPrepare    | (element:HTMLElement)=>void | -       | Trigger when enter prepare.                                    |
| onEnterStart      | (element:HTMLElement)=>void | -       | Trigger when enter start.                                      |
| onEnterActive     | (element:HTMLElement)=>void | -       | Trigger when enter active.                                     |
| onEnterEnd        | (element:HTMLElement)=>void | -       | Trigger when enter end.                                        |
| onLeavePrepare    | (element:HTMLElement)=>void | -       | Trigger when leave prepare.                                    |
| onLeaveStart      | (element:HTMLElement)=>void | -       | Trigger when leave start.                                      |
| onLeaveActive     | (element:HTMLElement)=>void | -       | Trigger when leave active.                                     |
| onLeaveEnd        | (element:HTMLElement)=>void | -       | Trigger when leave end.                                        |

### Motion.Transition

**_Ready-to-use transition animation component_**

| 属性              | 类型                     | 默认值   | 说明                                                           |
| ----------------- | ------------------------ | -------- | -------------------------------------------------------------- |
| destroyAfterLeave | boolean                  | false    | Whether to destroy the DOM after executing the exit animation. |
| visible           | boolean                  | -        | Begins to execute the enter or leave animation.                |
| className         | string                   | -        | Class name                                                     |
| height            | number                   | -        | Transition component container height                          |
| transitionTypes   | TransitionType[]         | -        | Transition types                                               |
| display           | string                   | 'div'    | Element display style                                          |
| duration          | 'fast'\|'medium'\|'slow' | 'medium' | Transition duration                                            |
| tag               | string                   | 'div'    | Element type                                                   |
