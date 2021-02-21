const { execSync } = require('child_process')

execSync(`cross-env NODE_ENV=publish babel src --out-dir publish/css && node scripts/cp-css.js`)
