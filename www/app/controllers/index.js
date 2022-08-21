import Controller from '@ember/controller';
import { inject } from '@ember/controller';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Controller.extend({
  applicationController: inject('application'),
  stats: computed.reads('applicationController'),
  config: computed.reads('applicationController.config'),

  cachedLogin: Ember.computed('login', {
    get() {
      return this.get('login') || Ember.$.cookie('login');
    },
    set(key, value) {
      Ember.$.cookie('login', value);
      this.set('model.login', value);
      return value;
    }
  }),
  chartOptions: Ember.computed("model.hashrate", {
    get() {
      var e = this,
        t = e.getWithDefault("stats.model.poolCharts"),
        a = {
          chart: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            zoomType: 'x',
            height: 300,
            marginRight: 10,
            events: {
              load: function() {
                var series = this.series[0];
                setInterval(function() {var x = (new Date(this.x)).getTime(), y = e.getWithDefault("model.Hashrate") / 1000000; series.addPoint([x, y], true, true)}, 1090000000);
              }
            }
          },
          title: {
            text: "POOL HASHRATE"
          },
          subtitle: {
            text: document.ontouchstart === undefined ?
              'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
          },
          xAxis: {
            labels: {
              style: {
                color: "#000"
              }
            },
            ordinal: false,
            type: "datetime"
          },
          yAxis: {
            title: {
              text: "HASHRATE",
              style: {
                color: "#000"
              }
            },
            min: 0,
            labels: {
              style: {
                color: "#000"
              }
            }
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: "#000"
          }],
          plotOptions: {
            area: {
              fillColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
                },
                stops: [
                  [0, Highcharts.getOptions().colors[0]],
                  [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
              },
              marker: {
                radius: 2
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1
                }
              },
              threshold: null
            }
          },
          legend: {
            enabled: false
          },
          tooltip: {
            formatter: function() {
              return this.y > 1000000000000 ? "<b>" + this.point.d + "<b><br>Hashrate&nbsp;" + (this.y / 1000000000000).toFixed(2) + "&nbsp;TH/s</b>" : this.y > 1000000000 ? "<b>" + this.point.d + "<b><br>Hashrate&nbsp;" + (this.y / 1000000000).toFixed(2) + "&nbsp;GH/s</b>" : this.y > 1000000 ? "<b>" + this.point.d + "<b><br>Hashrate&nbsp;" + (this.y / 1000000).toFixed(2) + "&nbsp;MH/s</b>" : "<b>" + this.point.d + "<b><br>Hashrate<b>&nbsp;" + this.y.toFixed(2) + "&nbsp;H/s</b>"
            },
            useHTML: true
          },
          exporting: {
            enabled: false
          },
          series: [{
            name: "Hashrate",
            type: 'area',
            data: function() {
              var e, a = [];
              if (t!=null) {
                for (e = 0; e <= t.length - 1; e += 1) {
                  var n = 10,
                    r = 20,
                    l = 30;
                  r = new Date(1e3 * t[e].x);
                  l = r.toLocaleString();
                  n = t[e].y; a.push({
                    x: r,
                    d: l,
                    y: n
                  });
                }
              } else {
                a.push({
                  x: 10,
                  d: 20,
                  y: 30
                });
              }
              return a;
            }()
          }]
        };
      a.title.text = this.get('config.highcharts.main.title') || "POOL HASHRATE";
      a.yAxis.title.text = this.get('config.highcharts.main.ytitle') || "";
      a.chart.height = this.get('config.highcharts.main.height') || 300;
    //  a.chart.type = this.get('config.highcharts.main.type') || 'spline';
   //   a.series[0].color = this.get('config.highcharts.main.color') || '#2357ab3';
      return a;
    }
  })
});
