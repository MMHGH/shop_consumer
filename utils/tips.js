"use strict";
var showBusy = function (o) {
    return wx.showToast({title: o, icon: "loading", duration: 2e3})
}, showSuccess = function (o) {
    return wx.showToast({title: o, icon: "success", duration: 2e3})
}, showModel = function (o, n) {
    wx.hideToast(), wx.showModal({title: o, content: JSON.stringify(n), showCancel: !1})
}, showLoading = function (o) {
    return wx.showToast({title: o, icon: "loading", mask: !0, duration: 1e4})
}, hideLoading = function () {
    wx.hideToast()
}, showWarning = function (o, n) {
    wx.hideToast(), wx.showModal({title: o, content: n, showCancel: !1})
}, showConfirm = function (o, n, s) {
    wx.hideToast(), wx.showModal({
        title: o, content: n, success: function (o) {
            o.confirm && "function" == typeof s && s()
        }
    })
};
module.exports = {
    showBusy: showBusy,
    showSuccess: showSuccess,
    showModel: showModel,
    showLoading: showLoading,
    hideLoading: hideLoading,
    showWarning: showWarning,
    showConfirm: showConfirm
};