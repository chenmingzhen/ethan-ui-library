# Step *步骤条*

<example />

## API

### Steps API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| current | String\|Number | 0 | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态 |
| vertical | Boolean | false | 是否垂直显示，默认水平显示 |
| mini | Boolean | false | 是否显示迷你模式 |
| status | String | process | 指定当前步骤的状态，可选 wait process finish error |

### Steps.Item API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | String\|Number | 0 | 步骤标题 |
| description | string | 无 | 步骤的详情描述 |
| icon | ReactElement | 无 | 步骤图标的类型 |
| status | String | wait | 指定当前步骤的状态，可选 wait process finish error |
| onClick | Function | 无 | Item点击回调 |
