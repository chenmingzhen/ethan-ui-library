# Scroll

<example />

## API

| Property        | Type                          | Default | Description                              |
| --------------- | ----------------------------- | ------- | ---------------------------------------- |
| scroll          | 'x'\|'y'\|'both'              | 'x'     | Direction of scroll                      |
| scrollLeftRatio | number                        | -       | Horizontal scroll ratio                  |
| scrollTopRatio  | number                        | -       | Vertical scroll ratio                    |
| scrollHeight    | number                        | -       | Scroll content height                    |
| scrollWidth     | number                        | -       | Scroll content width                     |
| className       | string                        | -       | Container className                      |
| style           | React.CSSProperties           | -       | Container style                          |
| onScroll        | (evt:ScrollChangeEvent)=>void | -       | Callbacks when the scroll ratio changes  |
| maxHeight       | number                        | -       | Maximum height limit                     |
| maxWidth        | number                        | -       | Maximum width limit                      |
| containerHeight | number                        | -       | Container height                         |
| containerWidth  | number                        | -       | Container width                          |
| symbol          | any                           | -       | Mark that the container size has changed |
