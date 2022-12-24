# ProImage

<example />

## API

### ProImage

| Property        | Type      | Default | Description                       |
| --------------- | --------- | ------- | --------------------------------- |
| loadingElement  | ReactNode | -       | A placeholder in the load         |
| errorElement    | ReactNode | -       | A placeholder in case of an error |
| backdropOpacity | number    | 1       | Mask layer transparency           |
| defaultIndex    | number    | 0       | Index that is open by default     |

### ProImage.Group

| Property        | Type   | Default | Description                   |
| --------------- | ------ | ------- | ----------------------------- |
| backdropOpacity | number | 1       | Mask layer transparency       |
| defaultIndex    | number | 0       | Index that is open by default |

### ProImage.Slider

| Property        | Type                 | Default | Description                          |
| --------------- | -------------------- | ------- | ------------------------------------ |
| backdropOpacity | number               | 1       | Mask layer transparency              |
| defaultIndex    | number               | 0       | Index that is open by default        |
| proImageItems   | ProImageItem         | -       | dataSource                           |
| currentIndex    | number               | 0       | Current index                        |
| visible         | boolean              | false   | Open or not                          |
| esc             | boolean              | true    | Whether to support Esc shutdown      |
| onClose         | ()=>void             | -       | Turn off the callback for the Slider |
| onIndexChange   | (index:number)=>void | -       | A callback to an index change        |
