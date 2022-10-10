import { Options, renderFile, render, compile } from 'ejs'

function asyncRenderFile(path: string, data: Record<string, any>, options?: Options) {
    return new Promise<string>((resolve, reject) => {
        renderFile(path, data, options, (error, str) => {
            if (error) {
                reject(error)

                return
            }

            resolve(str)
        })
    })
}

export default { asyncRenderFile, render, compile }
