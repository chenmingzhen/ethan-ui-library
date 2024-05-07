import webpack from 'webpack'
import rimraf from 'rimraf'
import Log from '../../scripts/utils/log'
import docsConfigs from '../config.doc'

rimraf.sync('./docs-pages')

webpack(docsConfigs, (err, multiStats) => {
    if (err || multiStats.hasErrors()) {
        multiStats.stats.forEach((stats) => {
            if (stats.hasErrors()) {
                Log.error(stats.toString())
            }
        })
    }
})
