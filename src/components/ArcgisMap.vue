<template>
  <div class="map-wrapper">
    <div style="padding: 20px">
      <button @click="addPointHandler">撒点</button>
      <button @click="clearPointHandler">清除撒点</button>
    </div>
    <div id="mapContainer" class="map-container"></div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
import Util from '@/common/js/util'
import $ from 'jquery'
const Points = [[39.9180560000, 116.3970270000], [40.0773300000, 116.6003900000], [39.9111400000, 116.4113500000], [39.9350000000, 116.4543600000]]
export default {
  name: 'arcgisMap',
  data () {
    return {
      map: '',
      ArcMap: {},
      DoJo: {},
      markerGraphicLayer: '',
      infoWindowObj: {}
    }
  },
  created () {
    this.loadModules = [
      'dojo',
      'dojo/_base/declare',
      'dojo/dom',
      'dojo/on',
      'dojo/dom-construct',
      'dojo/Evented',
      'dojo/parser',
      'dojo/_base/array',
      'dojo/dom-style',
      'dojo/dom-class',
      'dojo/fx',
      'dojo/Deferred',
      'dojo/_base/lang',
      'esri/domUtils',
      'esri/InfoWindowBase',
      'esri/map',
      'esri/graphic',
      'esri/layers/GraphicsLayer',
      'esri/symbols/PictureMarkerSymbol',
      'esri/InfoTemplate',
      'esri/symbols/SimpleMarkerSymbol',
      'esri/symbols/SimpleFillSymbol',
      'esri/symbols/SimpleLineSymbol',
      'esri/Color',
      'esri/geometry/Extent',
      'esri/SpatialReference',
      'esri/geometry/Point',
      'esri/geometry/Multipoint',
      "esri/geometry/Circle",
      'esri/layers/TileInfo',
      'esri/layers/TiledMapServiceLayer',
      'esri/toolbars/draw',
      'esri/dijit/InfoWindow',
      'esri/symbols/PictureFillSymbol',
      'esri/symbols/CartographicLineSymbol',
      'esri/geometry/webMercatorUtils',
      "esri/dijit/PopupTemplate",
      "esri/dijit/Popup"
    ]
    this.initMap()
  },
  methods: {
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
    clearPointHandler () {
      this.markerGraphicLayer.clear()
    },
    initMap () {
      esriLoader.loadModules(this.loadModules, {
        // javaScript接口地址
        url: 'https://js.arcgis.com/3.29/'
        // url: '/arcgis_js_api/library/3.20/init.js'
      }).then((fnArr) => {
        this.setMapObject(fnArr)
        let GaoDeLayer = this.initGaoDeLayer()
        this.overrideFn = this.overrideHandler()
        let InfoWindow = this.initInfoWindow()
        let infoWindow = new InfoWindow({domNode: this.DoJo.domConstruct.create("div", null, this.DoJo.dom.byId("mapContainer")), width: 300, height: 200})
        this.map = new this.ArcMap.map('mapContainer', {
          center: [116.3970270000, 39.9180560000],
          // zooms: [1, 18],
          logo: false, // logo
          slider: false, // 缩小按钮,
          minZoom: 10,
          maxZoom: 18,
          autoResize: true,
          infoWindow: infoWindow
        })
        let baseLayer = new GaoDeLayer()// 默认加载矢量 new gaodeLayer({layertype:"road"});也可以
        this.markerGraphicLayer = new this.ArcMap.GraphicsLayer({
          id: 'markerLayer'
        })
        this.map.on('load', () => {
        })
        this.markerGraphicLayer.on('click', (evt) => {
          let graphic = evt.graphic
          console.log('evt', evt)
          // var loc = this.map.toScreen(graphic.geometry)
          // this.map.infoWindow.setFeatures([graphic])
          // this.map.infoWindow.show(loc)
          // console.log('graphic', graphic)
          this.setInfoWindow(graphic)
        })

        this.map.addLayer(baseLayer) // 添加高德地图到map容器
        this.map.addLayer(this.markerGraphicLayer) // 添加撒点标注图层
      }).catch(err => {
        console.log('err', err)
      })
    },
    setInfoWindow (data) {
      let point = new this.ArcMap.Point(data.geometry.x, data.geometry.y)
      this.map.infoWindow.resize(364)
      this.map.infoWindow.setContent(this.setInfoContent())
      this.map.infoWindow.show(point)
    },
    setInfoContent () {
      return `<div style="padding: 16px 20px">
        这是一个窗口
        </div>`
    },
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
      console.log('ArcMap', this.ArcMap, this.DoJo)
    },
    // inherited 严格模式兼容处理
    overrideHandler () {
      let slice = Array.prototype.slice
      return function (method) {
        let proxy

        /** @this target object */
        proxy = function () {
          let me = this
          var inherited = (this.getInherited && this.getInherited({
            // emulating empty arguments
            callee: proxy,
            length: 0
          })) || function () {}

          return method.apply(me, [function () {
            return inherited.apply(me, arguments)
          }].concat(slice.apply(arguments)))
        }

        proxy.method = method
        proxy.overrides = true

        return proxy
      }
    },
    initInfoWindow () {
      let infoWidth = 324
      let infoHeight = 200
      let initMapCenter
      let initScreenCenter
      let showMapPoint = null
      let showScreenPoint = null
      let that = this
      return that.DoJo.declare([that.ArcMap.InfoWindowBase, that.DoJo.Evented],
        {
          constructor: function (parameters) {
            that.DoJo.lang.mixin(this, parameters)
            that.DoJo.domClass.add(this.domNode, "myInfoWindow")
            this._closeButton = that.DoJo.domConstruct.create("div", {"class": "info-close", "title": "关闭"}, this.domNode)
            this._title = that.DoJo.domConstruct.create("div", {"class": "info-title"}, this.domNode)
            this._content = that.DoJo.domConstruct.create("div", {"class": "info-content"}, this.domNode)
            this._arrow = that.DoJo.domConstruct.create("div", {"class": "info-arrow"}, this.domNode)
            that.DoJo.on(this._closeButton, "click", that.DoJo.lang.hitch(this, function () {
              this.hide()
            }))
            that.ArcMap.domUtils.hide(this.domNode)
            this.isShowing = false
          },
          setMap: that.overrideFn(function (inherited, map) {
            inherited(arguments)
            map.on("pan", that.DoJo.lang.hitch(this, function (pan) {
              let movePoint = pan.delta
              if (this.isShowing) {
                if (showScreenPoint !== null) {
                  this._showInfoWindow(showScreenPoint.x + movePoint.x, showScreenPoint.y + movePoint.y)
                }
              }
            }))
            map.on("pan-end", that.DoJo.lang.hitch(this, function (panend) {
              var movedelta = panend.delta
              if (this.isShowing) {
                showScreenPoint.x = showScreenPoint.x + movedelta.x
                showScreenPoint.y = showScreenPoint.y + movedelta.y
              }
            }))
            map.on("zoom-start", that.DoJo.lang.hitch(this, function () {
              that.ArcMap.domUtils.hide(this.domNode)
              this.onHide()
            }))
            map.on("zoom-end", that.DoJo.lang.hitch(this, function () {
              if (this.isShowing) {
                showScreenPoint = that.map.toScreen(showMapPoint)
                this._showInfoWindow(showScreenPoint.x, showScreenPoint.y)
              }
            }))
          }),
          setTitle: function (title) {
            this.place(title, this._title)
          },
          setContent: function (content) {
            this.place(content, this._content)
          },
          _showInfoWindow: function (x, y) {
            that.DoJo.domStyle.set(this.domNode, {
              "left": x - infoWidth / 2 + this.offset.x + "px",
              "top": y - infoHeight - 50 - this.offset.y + "px"
            })
            that.ArcMap.domUtils.show(this.domNode)
          },
          show: function (location, offset) {
            this.offset = that.DoJo.dojo.mixin({x: 0, y: 0}, offset)
            showMapPoint = location
            initMapCenter = that.map.extent.getCenter()
            initScreenCenter = that.map.toScreen(initMapCenter)
            infoHeight = $(".myInfoWindow").height()
            infoWidth = $(".myInfoWindow").width()
            if (infoWidth < 20 || infoHeight < 20) {
              this.resize(300, 200)
            }
            if (location.spatialReference) {
              location = that.map.toScreen(location)
            }
            var left = location.x - infoWidth / 2
            var top = location.y - infoHeight - 75
            showScreenPoint = location
            if (top < 5) {
              initScreenCenter.y = initScreenCenter.y + top - 5
            }
            if (left < 5) {
              initScreenCenter.x = initScreenCenter.x + left - 5
            }
            this._showInfoWindow(showScreenPoint.x, showScreenPoint.y)
            // initMapCenter = that.map.toMap(initScreenCenter)
            // this.map.centerAt(initMapCenter);
            this.isShowing = true
            this.onShow()
          },
          hide: function () {
            that.ArcMap.domUtils.hide(this.domNode)
            this.isShowing = false
            this.onHide()
          },
          resize: function (width, height) {
            that.DoJo.domStyle.set(this._content, {
              "width": width + "px",
              "height": (height - 60) + "px"
            })
            that.DoJo.domStyle.set(this._title, {
              "width": width + "px"
            })
          },
          destroy: function () {
            that.DoJo.domConstruct.destroy(this.domNode)
            this._closeButton = this._title = this._content = null
          }
        })
    },
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.map-wrapper {
  width: 100%;
  height: 100%;
}
.map-container {
  width: 100%;
  height: 80%;
  position: relative;
  /*flex: 1;*/
}
.myInfoWindow {
  position: absolute;
  z-index: 100;
  font-family: sans-serif;
  font-size: 12px;
  background:rgba(255,255,255,1);
  filter: drop-shadow(0px 2px 5px rgba(31,56,88,0.3));
  box-shadow:0px 2px 5px 0px rgba(31,56,88,0.3);
  border-radius:3px 3px 3px 0px;
  width: 364px;
  height: 200px;
  box-sizing: border-box;
}
.info-content {
  border-radius:10px;
  position: relative;
  background-color:#ffffff;
  color:#353535;
  overflow: auto;
}
.info-close {
  position: absolute; top: 5px; right: 5px;
  cursor: pointer;
  /*background: url(../images/infowindow_close.png) no-repeat scroll 0 0 transparent;*/
  width: 12px;
  height: 12px;
}
.info-close:hover  {
  background-color: red;
}
.info-title {
  border-radius:10px;
  font-weight: bold;
  /* background-color:#4774d9; */
  color:#ffffff;
  /*height:20px;*/
}
.info-arrow {
  width: 0;
  height: 0;
  position: absolute;
  bottom: -8px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #ffffff;
  margin-left: 178px;
  /*box-shadow:0px 2px 5px 0px rgba(31,56,88,0.3);*/
}
</style>
