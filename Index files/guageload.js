
function  gaugeload(id, did, para) {
    var webSocket = new WebSocket("wss://demo.thingsboard.io/api/ws/plugins/telemetry?token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2ZWplazI5NjQxQHRvdXJjYy5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6IjBmMjNlYWYwLWExM2EtMTFlYy04NmI4LTMzM2ZmNjFiZGNhMyIsImZpcnN0TmFtZSI6IkhhcnJ5IiwibGFzdE5hbWUiOiJKb2hhbnMiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiIwZTljZTBhMC1hMTNhLTExZWMtODZiOC0zMzNmZjYxYmRjYTMiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTE4OTgzMjksImV4cCI6MTY1MzY5ODMyOX0.JK9jvEJJh-g0O8En5w_Yx3tgVV2X1wV4pd0x0X0pCYnL-cctGCxQvqQXcvXO33yRuVOLZIuTL49YdyN4YPFvSw");
    webSocket.addEventListener('open', (event) => {
        console.log("websocket connected")
        var object = {
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: did,
                    cmdId: 4
                }
            ],
            historyCmds: [],
            attrSubCmds: []
        };
        var data = JSON.stringify(object);
        webSocket.send(data);
    });

    //  ==== Display Gauge====
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
                    fontSize: 20
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
                    show: true,
                },
                detail: {
                    valueAnimation: true,
                    fontSize: 40,
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

        // ================value that dislpay into Gauge====================
        let gval = wsdata.data[`${para}`][0][1];
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
}
