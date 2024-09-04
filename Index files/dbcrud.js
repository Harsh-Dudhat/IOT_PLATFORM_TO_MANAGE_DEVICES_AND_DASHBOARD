const token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2ZWplazI5NjQxQHRvdXJjYy5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6IjBmMjNlYWYwLWExM2EtMTFlYy04NmI4LTMzM2ZmNjFiZGNhMyIsImZpcnN0TmFtZSI6IkhhcnJ5IiwibGFzdE5hbWUiOiJKb2hhbnMiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiIwZTljZTBhMC1hMTNhLTExZWMtODZiOC0zMzNmZjYxYmRjYTMiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTE4OTgzMjksImV4cCI6MTY1MzY5ODMyOX0.JK9jvEJJh-g0O8En5w_Yx3tgVV2X1wV4pd0x0X0pCYnL-cctGCxQvqQXcvXO33yRuVOLZIuTL49YdyN4YPFvSw" 

// =============Dashboard Data=============
// let storedata4 = window.localStorage.getItem("dbjson");
// let dbdata = JSON.parse(storedata4)
// console.log(dbdata);

// ---------insert into table data for dashboard--------------------
var selectedRow = null;
var formdata = {};

function dashboardform() {
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
    formdata["title"] = document.getElementById("title").value;
    formdata["description"] = document.getElementById("description").value;
    // formdata["floatingSelect"] = document.getElementById("floatingSelect").value;
    return formdata;
}

function insertNewRecord(data) {
    var table = document.getElementById("tb1").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.title;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.description;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = "";
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<button type="button" class="btn btn-outline-secondary" onclick="fun11(this)" data-bs-toggle="modal"
    data-bs-target="#assigncs"> <i class="bi bi-person-plus-fill"></i> Assign</button>
    <button type="button" class="btn btn-outline-info" onclick="window.location.assign('dbwork.html'),savedbname(this)",> <i class="bi bi-grid-1x2-fill"></i> Open</button>
    <button type="button" class="btn btn-outline-info" onclick="window.location.assign('dbwork.html'),savedbname(this)",> <i class="bi bi-grid-1x2-fill"></i> Open</button>
    <button type="button" class="btn btn-outline-danger" onClick='onDelete(this)'><i class="bi bi-trash-fill"></i>  Delete</button>`;
}

function onDelete(td,id) {
    if (confirm("Do you want to delete this record??")) {
        console.log(id);
        dbname = td.parentElement.parentElement.childNodes[0].innerHTML;

        const max = dbdata["totalElements"];
        for (let index = 0; index < max; index++) {
            info = dbdata.data[index].name;
            if (dbname == info) {
                dbid = dbdata.data[index].id.id;
                console.log(dbid);
            }
        }
        var newObj={"Id":id}
        fetch(`http://localhost:8080/endpoint`, {
            method: "POST",
            body:JSON.stringify({
                "FunctionName": "deletedata",
                "ReqID": "725795",
                "InData":JSON.stringify(newObj)}),
            headers: {"Content-Type":"application/json"}
        })
            .then((response) => {
                return response;
            })
            .catch(err => console.log(err));


        row = td.parentElement.parentElement;
        document.getElementById("tb1").deleteRow(row.rowIndex);
    }

}


// ================ For DashboardForm Submiting=============
const form = document.querySelector('.contact-form');
form.addEventListener('submit', dashboardjson);

function dashboardjson(event) {
    const data = new FormData(event.target);
    const formJSON = Object.fromEntries(data.entries());


    newObj = {};

    for (let key in formJSON) {
        newObj[key] = formJSON[key]

    }
    jsondata = {
        "FunctionName": "savedata",
        "ReqID": "725795",
        "InData":    JSON.stringify(newObj),
    }
    // console.log(newObj);

    fetch('http://localhost:8080/endpoint', {
        method: "POST",
        body: JSON.stringify(jsondata),
        headers: { "Content-type": "application/json; charset=UTF-8"}
    })


        .then((response) => {
            return response.json();
        })
        .then(myJSON => {

            if (myJSON.status == 400) {
                alert(myJSON.message);
            }
            else {
                dashboardform();
                updatelocal();
            }

        })
        .catch(err => console.log(err));
window.location.reload();
}




// ============= OPTIONS FOR CUSTOMER =============
const storedata = window.localStorage.getItem("json");
const csdata = JSON.parse(storedata);
// console.log(csdata);

let max = csdata["totalElements"];
let listarr = [];
for (let i = 0; i < max; i++) {
    listarr.push(csdata['data'][i]['title'])
}

var opt = ""
for (var j = 0; j < listarr.length; j++) {
    opt += "<option value='" + listarr[j] + "'>" + listarr[j] + "</option>"
}
$("select[name='floatingSelect']").append($(opt));



function fun11(td) {
    // // =============Dashboard Data=============
    let storedata4 = window.localStorage.getItem("dbjson");
    let dbdata = JSON.parse(storedata4)
    console.log(dbdata);
    dbname = td.parentElement.parentElement.childNodes[0].innerHTML;
    console.log(dbname);
    let max2 = dbdata["totalElements"];
    for (let index = 0; index < max2; index++) {
        info = dbdata.data[index].name;
        if (dbname == info) {
            dbid = dbdata.data[index].id.id;
            console.log(dbid);
        }
    }
    csname123 = td.parentElement.parentElement.childNodes[2];
}



// ================ For Assigncsform Submiting=============
const form2 = document.querySelector('.csassignform');
form2.addEventListener('submit', assigncsjson);

function assigncsjson(event) {

    // console.log(floatingSelect.value);
    abc = floatingSelect.value;
    let max = csdata["totalElements"];
    for (let i = 0; i < max; i++) {
        info = csdata.data[i].title;
        if (abc == info) {
            cid = csdata.data[i].id.id;
            // console.log(cid);
        }
    }

    fetch(`https://demo.thingsboard.io:443/api/customer/${cid}/dashboard/${dbid}`, {

        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8", "X-Authorization": token }
    }).then((response) => {
        return response.json();
    }).then(myJSON => {

        if (myJSON.status == 400) {
            alert(myJSON.message);
        }
        else {
            csname123.innerHTML += floatingSelect.value + "<br>";
        }
    }).catch(err => console.log(err));

}

// ======DIsplay DashboardData=========
window.onload = (event) => {


    fetch('http://localhost:8080/endpoint', {
        method: "POST",
        body: JSON.stringify({
            "FunctionName": "getdata",
            "ReqID": "725795",
            "InData": "{}"}),
        headers: { "Content-Type": "application/json " }
    }).then(response => response.json())
        .then(response => {
            if (Response) {
                hideloader();
            }
            // console.log(response)
            var res=response;
            console.log(res)

            // window.localStorage.setItem("dbjson", JSON.stringify(dbjson));
            // // console.log(dbjson);

            // // =============Dashboard Data=============
            // let storedata4 = window.localStorage.getItem("dbjson");
            // let dbdata = JSON.parse(storedata4);


            // let max = dbdata.totalElements;
            // console.log(max);
            for (let index = 0; index < response.OutData.length; index++) {

                var id=response.OutData[index].Id;
                // console.log(id);
                var title = response.OutData[index].Title;
                var desc=response.OutData[index].Description;
                var cust=response.OutData[index].Customer;

                var table = document.getElementById("tb1").getElementsByTagName('tbody')[0];
                var newRow = table.insertRow(table.length);
                cell1 = newRow.insertCell(0);
                cell1.innerHTML = title;
                cell2 = newRow.insertCell(1);
                cell2.innerHTML = desc;
                cell3 = newRow.insertCell(2);

                if (response.OutData[index].Customers == null) {
                    cell3.innerHTML = cust;
                }
                else {
                    maxx = dbdata.data[index].assignedCustomers.length;
                    for (let i = 0; i < maxx; i++) {
                        cell3.innerHTML += dbdata.data[index].assignedCustomers[i].title + '<br>';
                    }
                }
                cell4 = newRow.insertCell(3);
                cell4.innerHTML = `<button type="button" class="btn btn-outline-secondary" onclick="fun11(this)" data-bs-toggle="modal"
                data-bs-target="#assigncs"> <i class="bi bi-person-plus-fill"></i> Assign</button>
                <button type="button" class="btn btn-outline-info" onclick="window.location.assign('dbwork.html'),savedbname(this,${id})",> <i class="bi bi-grid-1x2-fill"></i> Open</button>
                <button type="button" class="btn btn-outline-danger" onClick='onDelete(this,${id})')><i class="bi bi-trash-fill"></i>  Delete</button>`
            }
            
        })
        .catch(err => console.log('Request Failed', err));

}


// function updatelocal() {
//     fetch('https://demo.thingsboard.io:443/api/tenant/dashboards?pageSize=100&page=0&sortProperty=createdTime&sortOrder=ASC', {
//         method: "GET",
//         headers: { "Accept": "application/json ", "X-Authorization": token }
//     }).then(response => response.json())
//         .then(dbjson => {

//             window.localStorage.setItem("dbjson", JSON.stringify(dbjson));
//             // console.log(dbjson);

//             // =============Dashboard Data=============
//             // const storedata4 = window.localStorage.getItem("dbjson");
//             // const dbdata = JSON.parse(storedata4);
//             // console.log(dbdata);
//         })
// }

function hideloader() {
    // Setting display of spinner
    // element to none
    document.getElementById('loading')
        .style.display = 'none';
}

function savedbname(e,id) {
    savename = e.parentElement.parentElement.childNodes[0].innerHTML;
    localStorage.setItem('user_name', savename); //store a key/value
    localStorage.setItem('dbid', id); //store a key/value
    // var retrievedUsername = localStorage.getItem('user_name'); //retrieve the key
    // var retrievedUsername = localStorage.getItem('dbid'); //retrieve the key
    // console.log(localStorage.getItem('dbid'));
    // console.log(retrievedUsername);
}