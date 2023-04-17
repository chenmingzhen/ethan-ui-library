# Motion _渐变/动画_

<example />

## API

### Motion

| 属性              | 类型                        | 默认值 | 说明                         |
| ----------------- | --------------------------- | ------ | ---------------------------- |
| destroyAfterLeave | boolean                     | false  | 执行完退场动画后是否销毁 DOM |
| leaveClassName    | string                      | -      | 执行完退场动画后的样式名称   |
| name              | string                      | -      | 动画名称前缀                 |
| enter             | boolean                     | true   | 是否执行进场动画             |
| leave             | boolean                     | true   | 是否执行退场动画             |
| visible           | boolean                     | -      | 开始执行进场或退场动画       |
| onEnterPrepare    | (element:HTMLElement)=>void | -      | 准备进场动画的回调           |
| onEnterStart      | (element:HTMLElement)=>void | -      | 开始进场动画的回调           |
| onEnterActive     | (element:HTMLElement)=>void | -      | 进行进场动画的回调           |
| onEnterEnd        | (element:HTMLElement)=>void | -      | 结束进场动画的回调           |
| onLeavePrepare    | (element:HTMLElement)=>void | -      | 准备离场动画的回调           |
| onLeaveStart      | (element:HTMLElement)=>void | -      | 开始退场动画的回调           |
| onLeaveActive     | (element:HTMLElement)=>void | -      | 进行退场动画的回调           |
| onLeaveEnd        | (element:HTMLElement)=>void | -      | 结束退场动画的回调           |

### Motion.Transition

**_内置开箱即用的过渡动画组件_**

| 属性              | 类型                     | 默认值   | 说明                         |
| ----------------- | ------------------------ | -------- | ---------------------------- |
| destroyAfterLeave | boolean                  | false    | 执行完退场动画后是否销毁 DOM |
| visible           | boolean                  | -        | 开始执行进场或退场动画       |
| className         | string                   | -        | 样式名称                     |
| height            | number                   | -        | 容器高度                     |
| transitionTypes   | TransitionType[]         | -        | 过渡的类型                   |
| display           | string                   | 'div'    | 元素的 display 样式          |
| duration          | 'fast'\|'medium'\|'slow' | 'medium' | 过渡持续的时间               |
| tag               | string                   | 'div'    | 元素类型                     |
