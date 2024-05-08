import global = require('global')

declare global {
    interface Document {
        /** For IE */
        selection: {
            createRange(): Range
        }
    }
}
