import webpack from 'webpack'
import Log from '../../scripts/utils/log'
import distConfig from '../config.dist'

webpack(distConfig, (err, multiStats) => {
    if (err || multiStats.hasErrors()) {
        multiStats.stats.forEach((stats) => {
            if (stats.hasErrors()) {
                Log.error(stats.toString())
            }
        })
    }
})
