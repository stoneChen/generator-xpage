import 'normalize.css'
import $ from 'jquery'
import template from 'lodash/template'<% if (isMobile) { %>
import './scripts/responsive' // 动态设置根字体
require('fastclick').attach(document.body)// 引入fastclick，解决300ms延迟问题
<% } %>
import './styles/common.styl'
import data from './scripts/data'
import bindEvents from './scripts/events'
import tpl from './templates/container.html'

const html = template(tpl)(data)
$('body').html(html)
bindEvents()

if (module.hot) {
  module.hot.accept()
}
