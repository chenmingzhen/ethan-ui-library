# Loading 

<example />

## API

### Steps API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| current | String\|Number | 0 | Specifies the current step, counting from 0.Within the child Step element, state can be overridden by the status attribute |
| vertical | Boolean | false | Vertical display, default horizontal display |
| mini | Boolean | false | Whether to display mini mode |
| status | String | process | Specifies the status of the current step, optionally wait process finish error |

### Step.Item API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| title | String\|Number | 0 | Step title |
| description | string | none | Detailed description of the steps |
| icon | ReactElement | none | Step icon |
| status | String | wait | Specifies the status of the current step, optionally wait process finish error |
| onClick | Function | none | Item click callback |

