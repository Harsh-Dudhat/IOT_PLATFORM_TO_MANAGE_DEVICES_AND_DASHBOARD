var data;
var did;
var para;

$("select#floatingSelect").change(function () {
    did = $(this).children("option:selected").val();
});

$("select#floatingSelect2").change(function () {
    para = $(this).children("option:selected").val();
});

function displayChart() {

    var webSocket = new WebSocket("wss://demo.thingsboard.io/api/ws/plugins/telemetry?token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2ZWplazI5NjQxQHRvdXJjYy5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6IjBmMjNlYWYwLWExM2EtMTFlYy04NmI4LTMzM2ZmNjFiZGNhMyIsImZpcnN0TmFtZSI6IkhhcnJ5IiwibGFzdE5hbWUiOiJKb2hhbnMiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiIwZTljZTBhMC1hMTNhLTExZWMtODZiOC0zMzNmZjYxYmRjYTMiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTE4OTgzMjksImV4cCI6MTY1MzY5ODMyOX0.JK9jvEJJh-g0O8En5w_Yx3tgVV2X1wV4pd0x0X0pCYnL-cctGCxQvqQXcvXO33yRuVOLZIuTL49YdyN4YPFvSw");

    webSocket.addEventListener('open', (event) => {
        console.log("websocket connected")
        var object = {
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: `${did}`,
                    scope: "LATEST_TELEMETRY",
                    cmdId: 1
                }
            ],
            historyCmds: [],
            attrSubCmds: []
        };
        var data = JSON.stringify(object);
        webSocket.send(data);
    });

    // ==========Display Chart==============
    let id = `ch${chcount++}`;
    console.log(id);
    var chartDom = document.getElementById(id);
    var myChart = echarts.init(chartDom, 'dark');


    var option;
    let data1 = [0];
    let data2 = [0]

    option = {
        title: {
            text: para
        },
        tooltip: {
            trigger: 'axis',
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                saveAsImage: {}

            }
        },
        xAxis: {
            type: 'category',
            data: data2
        },

        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],

        },
        series: [
            {
                data: data1,
                type: 'line',
                smooth: true
            }
        ]
    };





    webSocket.onmessage = function (event) {

        var received_msg = event.data;
        let wsdata = JSON.parse(received_msg);
        console.log(wsdata);

        const chval = wsdata.data[`${para}`][0][1]
        console.log(chval);

        // data1.shift();
        data1.push(chval);
        // console.log(data1);

        
        var utcSeconds = wsdata.data[`${para}`][0][0];   
        const dateObject = new Date(utcSeconds)
        const humanDateFormat = dateObject.toLocaleString("en-US", {hour: "numeric",minute: "numeric",second: "numeric"}) 
        console.log(humanDateFormat);
        
        // data2.shift();
        data2.push(humanDateFormat);

        myChart.setOption({
            series: [
                {
                    data: data1,

                }
            ]
        });


        option && myChart.setOption(option);
    }


    makejson(id, did, para)

}


