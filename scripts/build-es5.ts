const { execSync } = require('child_process')

// src经过babel转码 虽然less被引入 但无作用 打包出去的样式靠引入对应的css响应
execSync(`tsc && ts-node scripts/cp-css.ts`)
