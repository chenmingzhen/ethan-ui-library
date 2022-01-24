export interface BaseOptions {
    required?:
        | {
              message?: string

              tip?: string
          }
        | true
}

export type BaseOptionKeys = keyof BaseOptions

export type Validator = {
    [key in string]?: (val: number, formData: string, callback, props) => void | Promise<void | Error>
}

export interface BaseOptionRuleOutput {
    required: (message: string) => void | Promise<void | Error>
}
