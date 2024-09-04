const token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2ZWplazI5NjQxQHRvdXJjYy5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6IjBmMjNlYWYwLWExM2EtMTFlYy04NmI4LTMzM2ZmNjFiZGNhMyIsImZpcnN0TmFtZSI6IkhhcnJ5IiwibGFzdE5hbWUiOiJKb2hhbnMiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiIwZTljZTBhMC1hMTNhLTExZWMtODZiOC0zMzNmZjYxYmRjYTMiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTE4OTgzMjksImV4cCI6MTY1MzY5ODMyOX0.JK9jvEJJh-g0O8En5w_Yx3tgVV2X1wV4pd0x0X0pCYnL-cctGCxQvqQXcvXO33yRuVOLZIuTL49YdyN4YPFvSw"


// ============= OPTIONS FOR CUSTOMER =============
const storedata = window.localStorage.getItem("json");
const csdata = JSON.parse(storedata);
// console.log(csdata);

let max = csdata["totalElements"];
let listarr = [];
for (let i = 0; i < max; i++) {

    listarr.push(csdata['data'][i]['title'])
}

var opt = `<option selected disabled></option>`
for (var j = 0; j < listarr.length; j++) {
    opt += "<option value='" + listarr[j] + "'>" + listarr[j] + "</option>"
}

$("select[name='floatingSelect']").append($(opt));

// =============Device Data=============
const storedata2 = window.localStorage.getItem("djson");
const ddata = JSON.parse(storedata2)
// console.log(ddata);


//   ---------insert into table data for device--------------------
var selectedRow = null;
var formdata = {};

function deviceform() {

    var formdata = readformdata();
    if (selectedRow == null) {
        insertNewRecord(formdata);
    }
    else {
        updateRecord(formdata);
    }
    document.getElementById("myform").reset();
}
function readformdata() {
    formdata["name"] = document.getElementById("name").value;
    formdata["type"] = document.getElementById("type").value;
    formdata["label"] = document.getElementById("label").value;
    formdata["floatingSelect"] = document.getElementById("floatingSelect").value;
    return formdata;
}

function insertNewRecord(data) {
    var table = document.getElementById("tb1").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.type;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.label
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.floatingSelect;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button type="button" class="btn btn-outline-secondary" onclick="fun11(this)" data-bs-toggle="modal"
    data-bs-target="#assigncs"> <i class="bi bi-person-plus-fill"></i> Assign</button><button  class="btn btn-outline-danger" onClick='onDelete(this)')><i class="bi bi-trash-fill"></i>
    Delete</button>`
}



function onDelete(td) {
    // =============Device Data=============
    const storedata2 = window.localStorage.getItem("djson");
    const ddata = JSON.parse(storedata2)
    // console.log(ddata);

    if (confirm("are you want to delete this record??")) {

        devicename = td.parentElement.parentElement.childNodes[0].innerHTML;


        const max = ddata["totalElements"];
        for (let index = 0; index < max; index++) {
            info = ddata.data[index].name;
            if (devicename == info) {
                did = ddata.data[index].id.id;
                // console.log(did);
            }
        }
        fetch(`https://demo.thingsboard.io:443/api/device/${did}`, {
            method: "DELETE",
            headers: { "X-Authorization": token }
        })
            .then((response) => {
                return response;
            })
            .catch(err => console.log(err));

        row = td.parentElement.parentElement;
        document.getElementById("tb1").deleteRow(row.rowIndex);


    }
}





// =================FOR FORM SUBMITING=================
const form = document.querySelector('.contact-device');
form.addEventListener('submit', devicejson);

function devicejson(event) {

    const data = new FormData(event.target);

    var selected = [];
    for (var option of document.getElementById('floatingSelect').options) {
        if (option.selected) {
            selected.push(option.value);
            // console.log(option.value);
            abc = option.value
            // console.log(abc);
        }
    }

    let max = csdata["totalElements"];
    for (let i = 0; i < max; i++) {
        info = csdata.data[i].title;
        if (abc == info) {
            cid = csdata.data[i].id.id;
            cname = info;
            // console.log(abc);
            // console.log(cid);
        }
    }

    const formJSON = Object.fromEntries(data.entries());



    newObj = {

        "tenantId": {
            "id": "0e9ce0a0-a13a-11ec-86b8-333ff61bdca3",
            "entityType": "TENANT"
        },
        "customerId": {
            "id": `${cid}`,
            "entityType": "CUSTOMER"
        },
    }

    for (let key in formJSON) {
        newObj[key] = formJSON[key]

    }
    // console.log(newObj);

    // =====add new Devive=======
    fetch('https://demo.thingsboard.io:443/api/device', {
        method: "POST",
        body: JSON.stringify(newObj),
        headers: { "Content-type": "application/json; charset=UTF-8", "X-Authorization": token }
    })

        .then((response) => {
            return response.json();
        })
        .then(myJSON => {

            if (myJSON.status == 400) {
                alert(myJSON.message);
            }
            else {
                deviceform();
                updateLocal()
            }
        })
        .catch(err => console.log(err));
}

// ======DIsplay Devicedata=========
window.onload = (event) => {
    // GET Request.
    fetch('https://demo.thingsboard.io:443/api/tenant/devices?pageSize=100&page=0&sortProperty=createdTime&sortOrder=ASC', {
        method: "GET",
        headers: { "Accept": "application/json ", "X-Authorization": token }
    })

        .then(response => response.json())
        .then(djson => {
            // console.log(djson);
            if (Response) {
                hideloader();
            }
            window.localStorage.setItem("djson", JSON.stringify(djson));

            // =============Device Data=============
            const storedata2 = window.localStorage.getItem("djson");
            const ddata = JSON.parse(storedata2);
            console.log(ddata);

            let max = ddata.totalElements;
            // console.log(max);
            for (let index = 0; index < max; index++) {

                var name = ddata.data[index].name;
                var type = ddata.data[index].type;
                var label = ddata.data[index].label;
                var customer = null;

                var table = document.getElementById("tb1").getElementsByTagName('tbody')[0];
                var newRow = table.insertRow(table.length);
                cell0 = newRow.insertCell(0);
                cell0.innerHTML = name;
                cell1 = newRow.insertCell(1);
                cell1.innerHTML = type;
                cell2 = newRow.insertCell(2);
                cell2.innerHTML = label;

                a = ddata.data[index].customerId.id;
                let max = csdata.totalElements;
                for (let index = 0; index < max; index++) {
                    b = csdata.data[index].id.id;
                    if (a == b) {
                        var customer = csdata.data[index].title;
                    }
                }
                cell3 = newRow.insertCell(3);
                cell3.innerHTML = customer;
                cell4 = newRow.insertCell(4);
                cell4.innerHTML = `<button type="button" class="btn btn-outline-secondary" onclick="fun11(this)" data-bs-toggle="modal"
                data-bs-target="#assigncs"> <i class="bi bi-person-plus-fill"></i> Assign</button><button  class="btn btn-outline-danger" onClick='onDelete(this)'><i class="bi bi-trash-fill"></i>Delete</button>`
            }
        })
        .catch(err => console.log('Request Failed', err));
};

// ===========option in assign==============
var opt3 = ""
for (var j = 0; j < listarr.length; j++) {
    opt3 += "<option value='" + listarr[j] + "'>" + listarr[j] + "</option>"
}
$("select[name='floatingSelect3']").append($(opt3));

function fun11(td) {
    dname = td.parentElement.parentElement.childNodes[0].innerHTML;
    console.log(dname);
    let max2 = ddata["totalElements"];
    for (let index = 0; index < max2; index++) {
        info = ddata.data[index].name;
        if (dname == info) {
            did = ddata.data[index].id.id;
            console.log(did);
        }
    }
    csname1 = td.parentElement.parentElement.childNodes[3];
    console.log(csname1);
}




// ================ For Assigncsform Submiting=============
const form2 = document.querySelector('.csassignform');
form2.addEventListener('submit', assigncsjson);

function assigncsjson(event) {
    // =============Device Data=============
    const storedata2 = window.localStorage.getItem("djson");
    const ddata = JSON.parse(storedata2)
    // console.log(ddata);

    console.log(floatingSelect3.value);
    abc = floatingSelect3.value;
    let max = csdata["totalElements"];
    for (let i = 0; i < max; i++) {
        info = csdata.data[i].title;
        if (abc == info) {
            cid = csdata.data[i].id.id;
            console.log(cid);
        }
    }

    fetch(`https://demo.thingsboard.io:443/api/customer/${cid}/device/${did}`, {

        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8", "X-Authorization": token }
    }).then((response) => {
        return response.json();
    }).then(myJSON => {

        if (myJSON.status == 400) {
            alert(myJSON.message);
        }
        else {
            csname1.innerHTML = floatingSelect3.value;
        }
    }).catch(err => console.log(err));

}

function hideloader() {
    // Setting display of spinner
    // element to none
    document.getElementById('loading')
        .style.display = 'none';
}

function updateLocal() {
    fetch('https://demo.thingsboard.io:443/api/tenant/devices?pageSize=100&page=0&sortProperty=createdTime&sortOrder=ASC', {
        method: "GET",
        headers: { "Accept": "application/json ", "X-Authorization": token }
    })
        .then(response => response.json())
        .then(djson => {
            window.localStorage.setItem("djson", JSON.stringify(djson));
            // ============Device Data=============
            const storedata2 = window.localStorage.getItem("djson");
            const ddata = JSON.parse(storedata2)
            console.log(ddata);
        })
        .catch(err => console.log('Request Failed', err));
};