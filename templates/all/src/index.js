require('normalize.css');
require('./styles/common.styl');
require('fastclick').attach(document.body);//引入fastclick，解决300ms延迟问题

import template from 'lodash/string/template';
import $ from 'jquery';
import data from './scripts/data';
import bindEvents from './scripts/events';
const tpl = require('./templates/index.html');

const html = template(tpl)(data);
$('body').html(html);
bindEvents();

if (module.hot) {
  module.hot.accept();
}
