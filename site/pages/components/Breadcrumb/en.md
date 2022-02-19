# Breadcrumb

<example />

## API

| Property  | Type             | Default | Description                                                    |
| --------- | ---------------- | ------- | -------------------------------------------------------------- |
| data      | BreadcrumbData[] | []      | The array of breadcrumb objects, see data                      |
| separator | ReactNode        | "/"     | A breadcrumb separator which can be strings or custom elements |

### BreadcrumbData

| Property | Type       | Default | Description               |
| -------- | ---------- | ------- | ------------------------- |
| title    | ReactNode  | -       | Displayed content         |
| url      | string     | -       | Link address              |
| onClick  | () => void | -       | The click event           |
| icon     | ReactNode  | 无      | Breadcrumb item ReactNode |
