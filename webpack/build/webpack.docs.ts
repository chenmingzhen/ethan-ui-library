import webpack from 'webpack'
import Log from '../../scripts/utils/log'
import distConfig from '../config.doc'

webpack(distConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
        Log.error(err)
    }
})
