Page({
  data: {
    charts: [{
      id: 'bar',
      name: '柱状图'
    }, {
      id: 'scatter',
      name: '散点图'
    }, {
      id: 'pie',
      name: '饼图'
    }, {
      id: 'line',
      name: '折线图'
    }, {
      id: 'funnel',
      name: '漏斗图'
    }, {
      id: 'gauge',
      name: '仪表盘'
    }, {
      id: 'k',
      name: 'K 线图'
    }, {
      id: 'radar',
      name: '雷达图'
    }, {
      id: 'heatmap',
      name: '热力图'
    }, {
      id: 'tree',
      name: '树图'
    }, {
      id: 'treemap',
      name: '矩形树图'
    }, {
      id: 'sunburst',
      name: '旭日图'
    }, {
      id: 'map',
      name: '地图'
    }, {
      id: 'graph',
      name: '关系图'
    }, {
      id: 'boxplot',
      name: '箱型图'
    }, {
      id: 'parallel',
      name: '平行坐标图'
    }, {
      id: 'sankey',
      name: '桑基图'
    }, {
      id: 'themeRiver',
      name: '主题河流图'
    }, {
      id: 'liquidfill',
      name: '水波图'
    }],
    chartsWithoutImg: [{
      id: 'lazyLoad',
      name: '延迟加载图表'
    }, {
      id: 'multiCharts',
      name: '一个页面中多个图表'
    }, {
      id: 'move',
      name: '页面不阻塞滚动'
    }, {
      id: 'saveCanvas',
      name: '保存 Canvas 到本地文件'
    }]
  },

  onReady() {
  },

  open: function (e) {
    jd.navigateTo({
      url: '../' + e.target.dataset.chart.id + '/index'
    });
  }
});
