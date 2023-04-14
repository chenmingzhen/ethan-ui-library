# Motion

<example />

## API

### Motion

| Property       | Type                        | Default | Description                                                    |
| -------------- | --------------------------- | ------- | -------------------------------------------------------------- |
| destroyOnLeave | boolean                     | false   | Whether to destroy the DOM after executing the exit animation. |
| leaveClassName | string                      | -       | The class name after the exit animation is performed.          |
| name           | string                      | -       | Animation name prefix.                                         |
| enter          | boolean                     | true    | Whether to execute the enter animation.                        |
| leave          | boolean                     | true    | Whether to execute the leave animation.                        |
| visible        | boolean                     | -       | Begins to execute the enter or leave animation.                |
| onEnterStart   | (element:HTMLElement)=>void | -       | Trigger when enter start.                                      |
| onEnterActive  | (element:HTMLElement)=>void | -       | Trigger when enter active.                                     |
| onEnterEnd     | (element:HTMLElement)=>void | -       | Trigger when enter end.                                        |
| onLeaveStart   | (element:HTMLElement)=>void | -       | Trigger when leave start.                                      |
| onLeaveActive  | (element:HTMLElement)=>void | -       | Trigger when leave active.                                     |
| onLeaveEnd     | (element:HTMLElement)=>void | -       | Trigger when leave end.                                        |
