import classGenerate from '../utils/classname'
import * as exampleLess from './example.less'
import * as homeLess from './home.less'
import * as mainLess from './index.less'
import * as markDownLess from './markdown.less'
import * as navLess from './nav.less'
import * as headerless from './header.less'

export const exampleClass = classGenerate(exampleLess, 'example')
export const headerClass = classGenerate(headerless, 'header')
export const homeClass = classGenerate(homeLess, 'home')
export const mainClass = classGenerate(mainLess, 'main')
export const markdownClass = classGenerate(markDownLess, 'markdown')
export const navClass = classGenerate(navLess, 'nav')
