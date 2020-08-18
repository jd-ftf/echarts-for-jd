# 在京东小程序中使用 ECharts

本项目是 ECharts 的京东小程序版本，以及使用的示例。

开发者可以通过熟悉的 ECharts 配置方式，快速开发图表，满足各种可视化需求。

## 下载

为了兼容小程序 Canvas，我们提供了一个小程序的组件，用这种方式可以方便地使用 ECharts。

首先，下载本项目。

其中，`ec-canvas` 是我们提供的组件，其他文件是如何使用该组件的示例。

`ec-canvas` 目录下有一个 `echarts.js`，默认我们会在每次 `echarts-for-jd` 项目发版的时候替换成最新版的 ECharts。

如果需要定制化以减少包体积，下载 [jd-ftf/incubator-echarts](https://github.com/jd-ftf/incubator-echarts)，先 `npm i` 安装依赖，然后在根目录下的 `echarts.all.js` 中选择自己需要的模块，将不要的模块注释掉，执行 `npm run release` 进行打包构建，打包完后将 `dist/echarts.min.js` 文件复制到 `ec-canvas` 中替换掉 `echarts.js`。

## 引入组件

京东小程序的项目创建可以参见[京东小程序开发文档](http://mp.jd.com/docs/dev/)。

在创建项目之后，可以将下载的 [jd-ftf/echarts-for-jd](https://github.com/jd-ftf/echarts-for-jd) 项目完全替换新建的项目，然后将修改代码；或者仅拷贝 `ec-canvas` 目录到新建的项目下，然后做相应的调整。

如果采用完全替换的方式，`pages` 目录下的每个文件夹是一个页面，可以根据情况删除不需要的页面，并且在 `app.json` 中删除对应页面。

如果仅拷贝 `ec-canvas` 目录，则可以参考 `pages/bar` 目录下的几个文件的写法。下面，我们具体地说明。


## 创建图表

首先，在 `pages/bar` 目录下新建以下几个文件：`index.js`、 `index.json`、 `index.jxml`、 `index.jxss`。并且在 `app.json` 的 `pages` 中增加 `'pages/bar/index'`。

`index.json` 配置如下：

```json
{
  "usingComponents": {
    "ec-canvas": "../../ec-canvas/ec-canvas"
  }
}
```

这一配置的作用是，允许我们在 `pages/bar/index.jxml` 中使用 `<ec-canvas>` 组件。注意路径的相对位置要写对，如果目录结构和本例相同，就应该像上面这样配置。

`index.jxml` 中，我们创建了一个 `<ec-canvas>` 组件，内容如下：

```xml
<view class="container">
  <ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>
</view>
```

> 注意此处的 `.container`，新建小程序项目后，其中 `app.jxss` 中默认自动生成的此 class 与本 demo 中的可能不一致，导致图表不能正常显示，只显示空白。请注意参考 `app.jxss` 修改样式，保证图表的初始化的时候是有宽度和高度的。

其中 `ec` 是一个我们在 `index.js` 中定义的对象，它使得图表能够在页面加载后被初始化并设置。`index.js` 的结构如下：

```js
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);

  var option = {
    ...
  };
  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  }
});
```

这对于所有 ECharts 图表都是通用的，用户只需要修改上面 `option` 的内容，即可改变图表。`option` 的使用方法参见 [ECharts 配置项文档](http://echarts.baidu.com/option.html)。对于不熟悉 ECharts 的用户，可以参见 [5 分钟上手 ECharts](http://echarts.baidu.com/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts) 教程。

完整的例子请参见 [jd-ftf/echarts-for-jd](https://github.com/jd-ftf/echarts-for-jd) 项目。

## FAQ
### 如何获取图表实例？

`echarts.init` 返回的即为图表实例，可以参考 [pages/bar/index.js](/blob/master/pages/bar/index.js) 的写法。

### 如何延迟加载图表？

参见 `pages/lazyLoad` 的例子，可以在获取数据后再初始化数据。

### 如何在一个页面中加载多个图表？

参见 `pages/multiCharts` 的例子。

### 如何使用 Tooltip？

目前，本项目已支持 ECharts Tooltip，但是由于 ECharts 相关功能尚未发版，因此需要使用当前本项目中 `ec-canvas/echarts.js`，这个文件包含了可以在微信中使用 Tooltip 的相关代码。目前在 ECharts 官网下载的 `echarts.js` 还不能直接替换使用，等 ECharts 正式发版后即可。

具体使用方法和 ECharts 相同，例子参见 `pages/line/index.js`。

目前一个已知的 bug 是，有些图表的 tooltip 会显示 `<br/>` 而非换行符。这一问题将在之后修复，暂时碰到这一问题时，开发者可以通过在 formatter 中使用 `\n` 作为换行。

### 如何保存为图片？

参见 `pages/saveCanvas` 的例子。

## 暂不支持的功能

ECharts 中的绝大部分功能都支持小程序版本，因此这里仅说明不支持的功能，以及存在的问题。

- 图片
- 多个 zlevel 分层
