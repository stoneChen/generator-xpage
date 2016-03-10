import 'normalize.css'
import $ from 'jquery'
import template from 'lodash/string/template'
// import './scripts/responsive' // 动态设置根字体
import './styles/common.scss'
import data from './scripts/data'
import bindEvents from './scripts/events'

require('fastclick').attach(document.body)// 引入fastclick，解决300ms延迟问题

const tpl = require('./templates/container.html')
const html = template(tpl)(data)
$('body').html(html)
bindEvents()

if (module.hot) {
  module.hot.accept()
}
