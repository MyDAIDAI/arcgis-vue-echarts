# arcgis-vue-echarts

> 一个使用`vue`构建的`arcgis`项目，并且在`arcgis`中使用了`echarts`来进行数据可视化

## 关于版本

- `vue 2.5.2`
- `arcgis 3.20`[文档地址](https://developers.arcgis.com/)
- `echarts 4.2.1`
## `vue`中地图初始化渲染

- 安装`esri-loader` -> `npm install --save esri-loader`
- 引入`esri-loader`并加载需要的模块
  ```javascript
  import * as esriLoader from 'esri-loader'
  esriLoader.loadModules([/*需要引入的模块*/], {
    // javaScript接口地址
    url: 'https://js.arcgis.com/3.29/'
    // url: '/arcgis_js_api/library/3.20/init.js'
  }).then((fnArr) => {
    /*加载地图后所做的操作*/
    this.setMapObject(fnArr) // 将需要引入的模块绑定到 this.ArcMap 与 this.DoJo 对象中
    let GaoDeLayer = this.initGaoDeLayer() // 初始化高德地图图层
    this.map = new this.ArcMap.map('mapContainer', {
      center: [121.26634830225001, 31.161768013013],
      // zooms: [1, 18],
      logo: false, // logo
      slider: false, // 缩小按钮,
      minZoom: 5,
      maxZoom: 18,
      autoResize: true
    })
    let baseLayer = new GaoDeLayer()// 默认加载矢量 new gaodeLayer({layertype:"road"});也可以
    this.map.on('load', () => {
    })
    this.map.addLayer(baseLayer) // 添加高德地图到map容器
  })
  // 将引入模块绑定到相应对象中
  setMapObject (fnArr) {
    this.loadModules.forEach((ele, index) => {
      let data = ele.split('/')
      if (data.length > 1) {
        let type = data[0]
        let classType = data[data.length - 1]
        classType = classType.indexOf('-') > -1 ? Util.toCamelCase(classType) : classType
        if (type === 'dojo') {
          this.DoJo[classType] = fnArr[index]
        } else {
          this.ArcMap[classType] = fnArr[index]
        }
      } else {
        this.DoJo[ele] = fnArr[index]
      }
    })
  }
  // 初始化高德地图瓦片层
  initGaoDeLayer (type = 'road') {
    let that = this
    return this.DoJo.declare(this.ArcMap.TiledMapServiceLayer, {
      layertype: type, // 图层类型
      constructor: function (args) {
        this.spatialReference = new that.ArcMap.SpatialReference({
          wkid: 3857
        })
        // declare.safeMixin(this, args)
        this.fullExtent = new that.ArcMap.Extent(-20037508.342787, -20037508.342787, 20037508.342787, 20037508.342787, this.spatialReference)
        this.initialExtent = this.fullExtent
        this.tileInfo = new that.ArcMap.TileInfo({
          "cols": 256,
          "rows": 256,
          "compressionQuality": 0,
          "origin": new that.ArcMap.Point(-20037508.342787, 20037508.342787, this.spatialReference),
          "spatialReference": this.spatialReference,
          "lods": [{
            "level": 0,
            "resolution": 156543.033928,
            "scale": 591657527.591555
          }, {
            "level": 1,
            "resolution": 78271.5169639999,
            "scale": 295828763.795777
          }, {
            "level": 2,
            "resolution": 39135.7584820001,
            "scale": 147914381.897889
          }, {
            "level": 3,
            "resolution": 19567.8792409999,
            "scale": 73957190.948944
          }, {
            "level": 4,
            "resolution": 9783.93962049996,
            "scale": 36978595.474472
          }, {
            "level": 5,
            "resolution": 4891.96981024998,
            "scale": 18489297.737236
          }, {
            "level": 6,
            "resolution": 2445.98490512499,
            "scale": 9244648.868618
          }, {
            "level": 7,
            "resolution": 1222.99245256249,
            "scale": 4622324.434309
          }, {
            "level": 8,
            "resolution": 611.49622628138,
            "scale": 2311162.217155
          }, {
            "level": 9,
            "resolution": 305.748113140558,
            "scale": 1155581.108577
          }, {
            "level": 10,
            "resolution": 152.874056570411,
            "scale": 577790.554289
          }, {
            "level": 11,
            "resolution": 76.4370282850732,
            "scale": 288895.277144
          }, {
            "level": 12,
            "resolution": 38.2185141425366,
            "scale": 144447.638572
          }, {
            "level": 13,
            "resolution": 19.1092570712683,
            "scale": 72223.819286
          }, {
            "level": 14,
            "resolution": 9.55462853563415,
            "scale": 36111.909643
          }, {
            "level": 15,
            "resolution": 4.77731426794937,
            "scale": 18055.954822
          }, {
            "level": 16,
            "resolution": 2.38865713397468,
            "scale": 9027.977411
          }, {
            "level": 17,
            "resolution": 1.19432856685505,
            "scale": 4513.988705
          }, {
            "level": 18,
            "resolution": 0.597164283559817,
            "scale": 2256.994353
          }, {
            "level": 19,
            "resolution": 0.298582141647617,
            "scale": 1128.497176
          }]
        })
        this.loaded = true
        this.onLoad(this)
      },
      /**
       * 根据不同的layType返回不同的图层
        * @param level
        * @param row
        * @param col
        * @returns {string}
        */
      getTileUrl: function (level, row, col) {
        if (!window.config.local) {
          return window.config.onlineAMapDigitalURL + `&x=${col}&y=${row}&z=${level}`
        }
        var url = ''
        switch (this.layertype) {
          case "road":
            url = window.config.localRoadUrl + '?z=' + level + '&x=' + col + '&y=' + row
            break
          case "night":
            url = window.config.localNightUrl + '?z=' + level + '&x=' + col + '&y=' + row
            break
          case "label":
            url = window.config.localLabelUrl + '?z=' + level + '&x=' + col + '&y=' + row
            break
          default:
            url = window.config.localRoadUrl + '?z=' + level + '&x=' + col + '&y=' + row
            break
        }
        return url
      }
    })
  }
  ```

## 地图标注图片添加

```javascript
this.markerGraphicLayer = new this.ArcMap.GraphicsLayer({
  id: 'markerLayer'
})
this.map.addLayer(this.markerGraphicLayer) // 添加撒点标注图层

// 遍历点的经纬度，添加到标注图层
// 大数据量渲染不推荐该方法
addPointHandler () {
  Points.forEach(ele => {
    let point = new this.ArcMap.Point(ele[1], ele[0])
    let picSymbol = new this.ArcMap.PictureMarkerSymbol({
      'url': '/static/sadian-moren.svg'
    })
    picSymbol.setWidth(32)
    picSymbol.setHeight(51)
    picSymbol.setOffset(0, 25.5)
    let graphic = new this.ArcMap.graphic(point, picSymbol)
    this.markerGraphicLayer.add(graphic)
  })
},
```

## 功能清单

- [x] 地图标注图片添加
- [x] 地图自定义`infoWindow`类
- [ ] 地图`echarts`引用
  - [ ] 地图图层中渲染`echarts`
  - [ ] `infoWindow`中渲染`echarts`

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
