//import { pageConfig } from '../../global.config'
//const { share : wechatShare } = pageConfig
import $ from 'jquery'
import { pageConfig } from '../../global.config'

const shareHandler = function (configData) {
  const { result, status } = configData
  if (status !== 'success') {
    console.error('获取配置错误')
    return
  }
  const { wechatShare } = result
  const wx = window.wx
  if (wx && wechatShare) {
    wx.config({
      debug: false,
      appId: wechatShare.appId,
      timestamp: wechatShare.timestamp,
      nonceStr: wechatShare.nonceStr,
      signature: wechatShare.signature,
      jsApiList: [ 'onMenuShareTimeline', 'onMenuShareAppMessage' ]
    })

    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: wechatShare.shareTitle,
        link: wechatShare.shareLink,
        imgUrl: wechatShare.imageShareLink,
        success: function () {
        },
        cancel: function () {
        }
      })
      wx.onMenuShareAppMessage({
        title: wechatShare.shareTitle,
        desc: wechatShare.shareDescription,
        link: wechatShare.shareLink,
        imgUrl: wechatShare.imageShareLink,
        type: '',
        dataUrl: wechatShare.shareLink,
        success: function () {
        },
        cancel: function () {
        }
      })
    })
  }
}

const pageUrl = window.location.href
const match = pageUrl.match(/\/cover\/([^\/]+)/)

const coverId = (match && match.length && match[1]) || pageConfig.coverId
const ajaxUrl = `${window.location.origin}/micro/config`
$.get(ajaxUrl, {
  id: coverId,
  type: 'cover',
  shareUrl: window.location.href
})
  .done(shareHandler)
