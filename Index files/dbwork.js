const token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2ZWplazI5NjQxQHRvdXJjYy5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6IjBmMjNlYWYwLWExM2EtMTFlYy04NmI4LTMzM2ZmNjFiZGNhMyIsImZpcnN0TmFtZSI6IkhhcnJ5IiwibGFzdE5hbWUiOiJKb2hhbnMiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiIwZTljZTBhMC1hMTNhLTExZWMtODZiOC0zMzNmZjYxYmRjYTMiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTE4OTgzMjksImV4cCI6MTY1MzY5ODMyOX0.JK9jvEJJh-g0O8En5w_Yx3tgVV2X1wV4pd0x0X0pCYnL-cctGCxQvqQXcvXO33yRuVOLZIuTL49YdyN4YPFvSw"

// =============Dashboard Data=============
const storedata4 = window.localStorage.getItem("dbjson");
const dbdata = JSON.parse(storedata4)
// console.log(dbdata);


// =========================== FOR DEVICE OPTIONS ==================
const storedata2 = window.localStorage.getItem("djson");
const ddata = JSON.parse(storedata2)
// console.log(ddata);

let max = ddata.totalElements;
let listarr = [];
let paraid = [];
for (let index = 0; index < max; index++) {

    // var dname = ddata.data[index].name; 
    listarr.push(ddata.data[index].name)
    paraid.push(ddata.data[index].id.id)

}

var opt = `<option selected disabled></option>`;
for (var j = 0; j < listarr.length; j++) {
    opt += "<option value='" + paraid[j] + "'>" + listarr[j] + "</option>"
}

$("select[name='floatingSelect']").append($(opt));
// $("select[name='floatingSelect3']").append($(opt));
$("select[name='floatingSelect4']").append($(opt));
$("select[name='floatingSelect5']").append($(opt));


// ===================== FOR PARAMATERS OPTIONS  charts=====================
$(document).ready(function () {
    $("select#floatingSelect").change(function () {
        var x = $(this).children("option:selected").val();


        fetch(`https://demo.thingsboard.io:443/api/plugins/telemetry/DEVICE/${x}/keys/timeseries`, {
            method: "GET",
            headers: { "Accept": "application/json ", "X-Authorization": token }
        })

            .then(response => response.json())
            .then(pjson => {
                $("select#floatingSelect2").empty()
                console.log(pjson);
                max = pjson.length
                // console.log(max);

                let listarr2 = [];
                for (let i = 0; i < max; i++) {

                    listarr2.push(pjson[i])
                    $("#floatingSelect2").select2({
                        data: listarr2
                    });
                }
            })
            .catch(err => console.log('Request Failed', err));
    });
});


// ===================== FOR PARAMATERS OPTIONS  Gauge=====================
$(document).ready(function () {
    $("select#floatingSelect4").change(function () {
        var x = $(this).children("option:selected").val();


        fetch(`https://demo.thingsboard.io:443/api/plugins/telemetry/DEVICE/${x}/keys/timeseries`, {
            method: "GET",
            headers: { "Accept": "application/json ", "X-Authorization": token }
        })

            .then(response => response.json())
            .then(pjson => {
                $("select#floatingSelect3").empty()
                // console.log(pjson);
                max = pjson.length
                // console.log(max);

                let listarr2 = [];
                for (let i = 0; i < max; i++) {

                    listarr2.push(pjson[i])
                    $("#floatingSelect3").select2({
                        data: listarr2,
                    });
                }
            })
            .catch(err => console.log('Request Failed', err));
    });
});

// ================================ PARA FOR TABLE =============================
$(document).ready(function () {
    $("select#floatingSelect5").change(function () {
        var x = $(this).children("option:selected").val();

        fetch(`https://demo.thingsboard.io:443/api/plugins/telemetry/DEVICE/${x}/keys/timeseries`, {
            method: "GET",
            headers: { "Accept": "application/json ", "X-Authorization": token }
        })

            .then(response => response.json())
            .then(pjson => {
                $("select#floatingSelect6").empty()
                // console.log(pjson);

                // ============= FOR TABLE AND CHART ============
                max = pjson.length

                let listarr2 = [];

                for (let i = 0; i < max; i++) {

                    listarr2.push(pjson[i])
                    $("#floatingSelect6").select2({
                        data: listarr2
                    });

                }

            })

            .catch(err => console.log('Request Failed', err));
    });
});


var retrievedUsername = localStorage.getItem('user_name'); //retrieve the key
// console.log(retrievedUsername);
document.getElementById("navname").innerHTML = retrievedUsername;

// =============================ADD WIDJET==================================

function addWidgetGauge() {
    grid.addWidget({ x: 0, y: 0, w: 4, h: 4, content: '<div ><sapn style="font-size:25px">Guage</sapn><button onclick="grid.removeWidget(this.parentNode.parentNode.parentNode)" type="button" class="btn btn-outline-dark" style="display:flex;float:right">X</button></div><div style="width:100%;height:100%"><button class="btn btn-primary configbtn" data-bs-toggle="modal" data-bs-target="#gaugetype" onclick="setIdGauge(this)">Config</button></div>' });
};

function addWidgetChart() {
    grid.addWidget({ x: 0, y: 0, w: 6, h: 4, content: '<div ><sapn style="font-size:25px">Chart</sapn><button onclick="grid.removeWidget(this.parentNode.parentNode.parentNode)" type="button" class="btn btn-outline-dark" style="display:flex; float:right">X</button></div><div style="width: 100%;height:100%"><button class="btn btn-primary configbtn" data-bs-toggle="modal" data-bs-target="#charttype" onclick="setIdChart(this)">Config</button></div>' });

};

function addWidgetTable() {

    grid.addWidget({ x: 0, y: 0, w: 8, h: 4, content: `<div ><sapn style="font-size:25px">Table</sapn><button onclick="grid.removeWidget(this.parentNode.parentNode.parentNode)" type="button" class="btn btn-outline-dark" style="display:flex; float:right">X</button></div>
                    <div style="width: 100%;height: auto;
                    background-color: white;
                    border: 7px solid #111;">
                <button class="btn btn-primary configbtn" data-bs-toggle="modal" data-bs-target="#tabletype" onclick="setIdTable(this)">Config</button></div>` });
};

// ====================FOR ASSIGNING ID TO WIDGET==================
var tbcount = 0;
var chcount = 0;
var ggcount = 0;


function setIdGauge(event) {
    if (event.parentElement.getAttribute('id') == null) {
        event.parentElement.id = `gg${ggcount}`;
    }
    console.log(event.parentElement.id);
}

function setIdChart(event) {
    if (event.parentElement.getAttribute('id') == null) {
        event.parentElement.id = `ch${chcount}`;
    }
    console.log(event.parentElement.id);
}

function setIdTable(event) {
    if (event.parentElement.getAttribute('id') == null) {
        event.parentElement.id = `tb${tbcount}`;
    }
    // console.log(event.parentElement.id);
}





// =========================GRIDSTACK CODE=====================

var grid = GridStack.init({});

let options = {
    column: 6,
    minRow: 8,
    cellHeight: 70,
    disableOneColumnMode: true,
    float: false,
    removable: '.trash',
    // acceptWidgets: function (el) { return true; }
};

function compact(i) {
    grids[i].compact();
}

let grids = GridStack.initAll(options);

grid.on('added removed change', function (e, items) {
    let str = '';
    items.forEach(function (item) { str += ' (x,y)=' + item.x + ',' + item.y; });
    // console.log(e.type + ' ' + items.length + ' items:' + str);
});

// let serializedData = [];

// serializedData.forEach((n, i) => 
//     n.content = `<div><sapn style='text-size=20px'></sapn><button onclick="grid.removeWidget(this.parentNode.parentNode.parentNode)" type="button" class="btn btn-outline-dark" style="display:flex;float:right">X</button></div><div id=${i} style="width:100%;height:100%"> ${n.content ? n.content : ''}`);
// let serializedFull;





// 2.x method
saveGrid = function () {
    // delete serializedFull;
    serializedData = grid.save();
    console.log(serializedData);
    let savedata = JSON.stringify(serializedData, null, ' ');
    console.log(savedata);

    let dbid = localStorage.getItem('dbid')
    console.log(idpobj);

    var idpobjnew = {
        "data": idpobj
    }

    // console.log(JSON.stringify(idpobjnew));


    var newObj = {
        "Id": dbid,
        "Savejson": savedata,
        "idpobj": JSON.stringify(idpobjnew)
    }
    console.log(newObj);
    fetch(`http://localhost:8080/endpoint`, {
        method: "POST",
        body: JSON.stringify({
            "FunctionName": "savejson",
            "ReqID": "725795",
            "InData": JSON.stringify(newObj)
        }),
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => {
            return response;
        })
        .catch(err => console.log(err));

}


// 2.x method - just saving list of widgets with content (default)
loadGrid = function () {
    fetch('http://localhost:8080/endpoint', {
        method: "POST",
        body: JSON.stringify({
            "FunctionName": "loadjson",
            "ReqID": "725795",
            "InData": JSON.stringify({ "Id": localStorage.getItem("dbid") })
        }),
        headers: { "Content-Type": "application/json " }
    }).then(response => response.json())
        .then(response => {
            // console.log(response.OutData.Savejson);
            // console.log(JSON.parse(response.OutData.Savejson));
            let serializedData = JSON.parse(response.OutData.Savejson)
            grid.load(serializedData, true);

            info = JSON.parse(response.OutData.Idpobj);
            // console.log(info);

            var ele = $("div.grid-stack-item-content");
            // console.log($("div.grid-stack-item-content"));

            // console.log(ele.length);
            chcount = ele.length + 2
            ggcount = ele.length + 2
            ttcount = ele.length + 2
            // console.log(chcount, ggcount, ttcount);

            for (let index = 0; index < ele.length; index++) {
                // ============close button of Widjet disable=================
                ele[index].children[0].childNodes[1].style.display = "none";

                ele[index].childNodes[1].attributes[2].nodeValue = null;

                let id = ele[index].childNodes[1].attributes[1].nodeValue;
                // console.log(id)

                if (id.slice(0, 2) == "ch") {
                    // max = info.data.length
                    for (let index = 0; index < info.data.length; index++) {
                        a = info.data[index].id
                        if (id == a) {
                            did = info.data[index].deviceid
                            para = info.data[index].selectpara
                            chartload(id, did, para);
                        }
                    }
                } else if (id.slice(0, 2) == "gg") {
                    for (let index = 0; index < info.data.length; index++) {
                        a = info.data[index].id
                        if (id == a) {
                            did = info.data[index].deviceid
                            para = info.data[index].selectpara
                            gaugeload(id, did, para);
                        }
                    }

                }
            }

        })

    // =========initially onload option of edit off ======================
    editGridoff();
}

// ===================================Edit Mode=======================================
$("#editmode").on('click', function () {
    if (this.checked) {
        // console.log("i am checked");
        editGrid();
    }
    else {
        // console.log(" iam not checked");
        editGridoff();
    }
})

function editGrid() {
    let editcolor = $("label.btn.btn-outline-primary");
    // console.log(editcolor);
    editcolor.css("background-color","green");
  
    var ele2 = $("a.tab")
    // console.log(ele2);
    for (let index = 0; index < ele2.length; index++) {
        ele2[index].classList.remove("disabled")
        ele2[index].style.opacity = "1"
    }
    var links = $("a.alink")
    // console.log(links);
    for (let index = 0; index < links.length; index++) {
        links[index].classList.remove("disabled")
        links[index].style.opacity = "1"
    }
    var ele = $("div.grid-stack-item-content");
    // console.log(ele);
    for (let index = 0; index < ele.length; index++){
        ele[index].children[0].childNodes[1].style.display = "block";
    }
}
function editGridoff() {
    let editcolor = $("label.btn.btn-outline-primary");
    // console.log(editcolor);
    editcolor.css("background-color","white");

    var ele2 = $("a.tab")
    // console.log(ele2);
    for (let index = 0; index < ele2.length; index++) {
        ele2[index].classList.add("disabled")
        ele2[index].style.opacity = "0.5"
    }
    var links = $("a.alink")
    // console.log(links);
    for (let index = 0; index < links.length; index++) {
        links[index].classList.add("disabled")
        links[index].style.opacity = "0.5"
    }
    var ele = $("div.grid-stack-item-content");
    // console.log(ele);
    for (let index = 0; index < ele.length; index++){
        ele[index].children[0].childNodes[1].style.display = "none";
    }
}


// ====================Claer Grid======================= 
clearGrid = function () {
    grid.removeAll();
}


// ==========create idpobj when any form is fill up =========================
const idpobj = [];
function makejson(id, device, param) {
    const obj = {
        'id': id,
        'deviceid': device,
        'selectpara': param
    }
    // console.log(obj)
    idpobj.push(obj);
    console.log(idpobj);
}


window.onload = loadGrid();