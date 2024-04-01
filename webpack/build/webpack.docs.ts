import webpack from 'webpack'
import rimraf from 'rimraf'
import Log from '../../scripts/utils/log'
import docsConfigs from '../config.doc'

rimraf.sync('./docs-pages')

webpack(docsConfigs, (err, stats) => {
    if (err || stats.hasErrors()) {
        Log.error(err)
    }
})
