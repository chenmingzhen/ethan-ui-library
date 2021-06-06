module.exports = function(resource) {
    // import chasingDotsLess from './spin/chasing-dots.less';

    // 见 style/index classnames style
    const nameLessReg = /import * as ([a-zA-Z]+) from '[a-zA-Z\/\.\-]+.less';/g
    const lessReg = /import '[a-zA-Z\/\.\-]+.less';/g

    if (nameLessReg.test(resource)) {
        return resource.replace(nameLessReg, 'var $1 = {};')
    }
    if (lessReg.test(resource)) {
        return resource.replace(lessReg, '')
    }
    return resource
}
