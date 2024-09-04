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


// =============assest Data=============
const storedata3 = window.localStorage.getItem("ajson");
const adata = JSON.parse(storedata3)
// console.log(adata);

// ---------insert into table data for assests--------------------
var selectedRow = null;
var formdata = {};


function assestform() {
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
    cell3.innerHTML = data.label;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.floatingSelect;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button type="button" class="btn btn-outline-secondary" onclick="fun11(this)" data-bs-toggle="modal"
    data-bs-target="#assigncs"> <i class="bi bi-person-plus-fill"></i> Assign</button>    <button  class="btn btn-outline-danger" onClick='onDelete(this)')><i class="bi bi-trash-fill"></i>
    Delete</button>`
}




function onDelete(td) {
    // =============assest Data=============
    const storedata3 = window.localStorage.getItem("ajson");
    const adata = JSON.parse(storedata3)
    // console.log(adata);
    if (confirm("are you want to delete this record??")) {

        assestname = td.parentElement.parentElement.childNodes[0].innerHTML;

        const max = adata["totalElements"];
        for (let index = 0; index < max; index++) {
            info = adata.data[index].name;
            if (assestname == info) {
                aid = adata.data[index].id.id;
                // console.log(aid);
            }
        }
        fetch(`https://demo.thingsboard.io:443/api/asset/${aid}`, {
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

// =====================FOR FORM SUBMITING===============
const form = document.querySelector('.contact-form');
form.addEventListener('submit', assetsjson);

function assetsjson(event) {

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
            "id": "f2800ab0-aa61-11ec-a0c1-cff7830564bf",
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



    fetch('https://demo.thingsboard.io:443/api/asset', {

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
                assestform();
                updateLocal()
            }


        })
        .catch(err => console.log(err));

}


// ======DIsplay assetsData=========
window.onload = (event) => {
    // GET Request.
    fetch('https://demo.thingsboard.io:443/api/tenant/assets?pageSize=100&page=0&sortProperty=createdTime&sortOrder=ASC', {
        method: "GET",
        headers: { "Accept": "application/json ", "X-Authorization": token }
    })

        .then(response => response.json())
        .then(ajson => {
            // console.log(ajson);
            if (Response) {
                hideloader();
            }
            window.localStorage.setItem("ajson", JSON.stringify(ajson));

            // =============Assests Data=============
            const storedata3 = window.localStorage.getItem("ajson");
            const adata = JSON.parse(storedata3);
            console.log(adata);

            let max = adata.totalElements;
            // console.log(max);
            for (let index = 0; index < max; index++) {

                var name = adata.data[index].name;
                var type = adata.data[index].type;
                var label = adata.data[index].label;
                // var customer = null;

                var table = document.getElementById("tb1").getElementsByTagName('tbody')[0];
                var newRow = table.insertRow(table.length);
                cell1 = newRow.insertCell(0);
                cell1.innerHTML = name;
                cell2 = newRow.insertCell(1);
                cell2.innerHTML = type;
                cell3 = newRow.insertCell(2);
                cell3.innerHTML = label;
                cell4 = newRow.insertCell(3);

                a = adata.data[index].customerId.id;
                let max2 = csdata.totalElements;
                for (let index = 0; index < max2; index++) {
                    b = csdata.data[index].id.id;
                    if (a == b) {
                        // console.log(a);
                        // console.log(b);
                        cell4.innerHTML = csdata.data[index].title;
                    }

                }

                cell5 = newRow.insertCell(4);
                cell5.innerHTML = `<button type="button" class="btn btn-outline-secondary" onclick="fun11(this)" data-bs-toggle="modal"
                data-bs-target="#assigncs"> <i class="bi bi-person-plus-fill"></i> Assign</button><button  class="btn btn-outline-danger" onClick='onDelete(this)')><i class="bi bi-trash-fill"></i>
            Delete</button>`
            }
        })
        .catch(err => console.log('Request Failed', err));
};





// ===========option in assign==============
var opt2 = ""
for (var j = 0; j < listarr.length; j++) {
    opt2 += "<option value='" + listarr[j] + "'>" + listarr[j] + "</option>"
}
$("select[name='floatingSelect2']").append($(opt2));

function fun11(td) {
    // =============assest Data=============
    const storedata3 = window.localStorage.getItem("ajson");
    const adata = JSON.parse(storedata3)
    // console.log(adata);
    asname = td.parentElement.parentElement.childNodes[0].innerHTML;
    console.log(asname);
    let max2 = adata["totalElements"];
    for (let index = 0; index < max2; index++) {
        info = adata.data[index].name;
        if (asname == info) {
            aid = adata.data[index].id.id;
            console.log(aid);
        }
    }
    csname12 = td.parentElement.parentElement.childNodes[3];
    console.log(csname12);
}




// ================ For Assigncsform Submiting=============
const form2 = document.querySelector('.csassignform');
form2.addEventListener('submit', assigncsjson);

function assigncsjson(event) {

    console.log(floatingSelect2.value);
    abc = floatingSelect2.value;
    let max = csdata["totalElements"];
    for (let i = 0; i < max; i++) {
        info = csdata.data[i].title;
        if (abc == info) {
            cid = csdata.data[i].id.id;
            console.log(cid);
        }
    }

    fetch(`https://demo.thingsboard.io:443/api/customer/${cid}/asset/${aid}`, {

        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8", "X-Authorization": token }
    }).then((response) => {
        return response.json();
    }).then(myJSON => {

        if (myJSON.status == 400) {
            alert(myJSON.message);
        }
        else {
            csname12.innerHTML = floatingSelect2.value;
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
    fetch('https://demo.thingsboard.io:443/api/tenant/assets?pageSize=100&page=0&sortProperty=createdTime&sortOrder=ASC', {
        method: "GET",
        headers: { "Accept": "application/json ", "X-Authorization": token }
    })
        .then(response => response.json())
        .then(ajson => {
            window.localStorage.setItem("ajson", JSON.stringify(ajson));
            // ============Device Data=============
            const storedata3 = window.localStorage.getItem("ajson");
            const adata = JSON.parse(storedata3)
            console.log(adata);
        })
        .catch(err => console.log('Request Failed', err));
};