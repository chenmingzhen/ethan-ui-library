# Input

<example />

## API

### Input

| Property            | Type                                        | Default | Description                                                                                                                                                                                       |
| ------------------- | ------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data                | any[]                                       | -       | data source                                                                                                                                                                                       |
| lineHeight          | number                                      | -       | The height of Item                                                                                                                                                                                |
| height              | number                                      | -       | Scroll the height of the container                                                                                                                                                                |
| renderItem          | (value: any) => ReactNode                   | -       | Render item function                                                                                                                                                                              |
| shouldRecomputed    | (prevData: any[], nextData: any[])=>boolean | -       | When the length of the data source changes and the data source length is greater than 1, the function is passed to determine whether the corresponding scroll value is allowed to be recalculated |
| defaultIndex        | number                                      | 0       | The data source starts at Index, the default hover location, and the view will scroll to that 处                                                                                                  |
| onScrollStateChange | (params:LazyListState)=>void                | -       | Callback when the roll coefficient changes                                                                                                                                                        |
| keyboardControl     | boolean                                     | false   | Whether the keyboard can be used for scrolling                                                                                                                                                    |
