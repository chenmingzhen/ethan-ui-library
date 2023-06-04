# More

<example />

## API

### More

| Property            | Type                                                    | Default  | Description                                                  |
| ------------------- | ------------------------------------------------------- | -------- | ------------------------------------------------------------ |
| data                | T                                                       | required | datasource                                                   |
| compressed          | boolean                                                 | false    | Compression or not display                                   |
| getItemDoms         | (container: HTMLElement)=>NodeListOf&lt;HTMLElement&gt; | required | Provides a method for the More component to get all Item dom |
| getContainerElement | ()=>HTMLEmenet                                          | required | Provides more components to get the container dom method     |
| getMoreText         | (moreNodesLen:number)=>string                           | '...'    | Displays more text for participating in the calculation      |
| renderItem          | (dataItem: T) => ReactNode                              | required | Render functions for each Item                               |
| renderMore          | (moreNodes: React.ReactNode[]) => React.ReactNode       | required | Render More                                                  |
