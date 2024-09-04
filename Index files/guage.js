var data;
var did;
var para;

$("select#floatingSelect4").change(function () {
  did = $(this).children("option:selected").val();
});

$("select#floatingSelect3").change(function () {
  para = $(this).children("option:selected").val();
  // console.log(para);
});

function diaplayGauge() {
  var webSocket = new WebSocket("wss://demo.thingsboard.io/api/ws/plugins/telemetry?token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2ZWplazI5NjQxQHRvdXJjYy5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6IjBmMjNlYWYwLWExM2EtMTFlYy04NmI4LTMzM2ZmNjFiZGNhMyIsImZpcnN0TmFtZSI6IkhhcnJ5IiwibGFzdE5hbWUiOiJKb2hhbnMiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiIwZTljZTBhMC1hMTNhLTExZWMtODZiOC0zMzNmZjYxYmRjYTMiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTE4OTgzMjksImV4cCI6MTY1MzY5ODMyOX0.JK9jvEJJh-g0O8En5w_Yx3tgVV2X1wV4pd0x0X0pCYnL-cctGCxQvqQXcvXO33yRuVOLZIuTL49YdyN4YPFvSw");
  
  webSocket.addEventListener('open', (event) => {
      console.log("websocket connected")
      var object = {
        tsSubCmds: [
          {
            entityType: "DEVICE",
            entityId: `${did}`,
            cmdId: 2,
            scope: "LATEST_TELEMETRY",
            // keys : ['temp' ,'speed'],
            // startTs : 1649651400000,
            // endTs : 1649676600000
          }
        ],
        historyCmds: [],
        attrSubCmds: []
      };
      var data = JSON.stringify(object);
      webSocket.send(data);
  });
  // console.log(did);
  // console.log(para);

  //  ==== Display Gauge====
  let id = `gg${ggcount++}`;
  console.log(id);
  var chartDom = document.getElementById(id);
  var myChart = echarts.init(chartDom, 'dark');

  var option;
  option = {
    title: {
      text: para,
      left: '1%'
  },
    series: [
      {
        type: 'gauge',
        progress: {
          show: true,
          width: 18
        },
        axisLine: {
          lineStyle: {
            width: 18
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          length: 15,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 25,
          color: '#999',
          fontSize: 15
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 25,
          itemStyle: {
            borderWidth: 10
          }
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          fontSize: 25,
          offsetCenter: [0, '70%']
        },
      }
    ]
  };
  option && myChart.setOption(option);


  webSocket.onmessage = function (event) {

    var received_msg = event.data;
    let wsdata = JSON.parse(received_msg);
    console.log(wsdata);

    console.log(para);
    // ================value that dislpay into Gauge====================
    const gval = wsdata.data[`${para}`][0][1];
    console.log(gval);
    
    myChart.setOption({
        series: [
            {
                data: [
                    {
                        value: gval,
                    }

                ]
            }
        ]
    });
    option && myChart.setOption(option);
  };

  makejson(id,did, para)
  
}

