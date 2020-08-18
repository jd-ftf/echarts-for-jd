const app = getApp();

Page({
  data: {
    value: null
  },

  onReady() {
    var ctx = jd.createCanvasContext('measure');
    var value = ctx.measureText('国国国国', '12px san-serif');
    this.setData({
      value: value.width
    });
  }
});
