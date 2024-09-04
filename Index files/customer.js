const token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2ZWplazI5NjQxQHRvdXJjYy5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6IjBmMjNlYWYwLWExM2EtMTFlYy04NmI4LTMzM2ZmNjFiZGNhMyIsImZpcnN0TmFtZSI6IkhhcnJ5IiwibGFzdE5hbWUiOiJKb2hhbnMiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiIwZTljZTBhMC1hMTNhLTExZWMtODZiOC0zMzNmZjYxYmRjYTMiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTE4OTgzMjksImV4cCI6MTY1MzY5ODMyOX0.JK9jvEJJh-g0O8En5w_Yx3tgVV2X1wV4pd0x0X0pCYnL-cctGCxQvqQXcvXO33yRuVOLZIuTL49YdyN4YPFvSw"


// =============CS Data=============
// const storedata = window.localStorage.getItem("json");
// const csdata = JSON.parse(storedata);

// ---------insert into table data for customer--------------------
var selectedRow = null;
var formdata = {};


function thingsboard() {
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
    formdata["email"] = document.getElementById("email").value;
    formdata["country"] = document.getElementById("country").value;
    formdata["city"] = document.getElementById("city").value;
    return formdata;
}
function insertNewRecord(data) {
    var table = document.getElementById("tb1").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.title;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.country
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button  class="btn btn-outline-danger" onClick='onDelete(this)')><i class="bi bi-trash-fill"></i>
    Delete</button>`
}


function onDelete(td) {
    // ============CS data===========
     csdata = window.localStorage.getItem("json");
     csdata = JSON.parse(csdata)
    // console.log(csdata);

    if (confirm("Do you want to delete this record??")) {
        title = td.parentElement.parentElement.childNodes[0].innerHTML;
        const max = csdata["totalElements"];
        for (let index = 0; index < max; index++) {
            info = csdata.data[index].title;
            if (title == info) {
                cid = csdata.data[index].id.id;
                console.log(cid);
            }
        }
        fetch(`https://demo.thingsboard.io:443/api/customer/${cid}`, {
            method: "DELETE",
            headers: { "X-Authorization": token },
        })
            .then((response) => {
                return response;
            })
            .catch(err => console.log(err));

        row = td.parentElement.parentElement;
        document.getElementById("tb1").deleteRow(row.rowIndex);
    }
}





//------------ create json---------
function handleFormSubmit(event) {
    // event.preventDefault();

    const data = new FormData(event.target);
    const formJSON = Object.fromEntries(data.entries());
    // console.log(formJSON);

    newObj = {
        "tenantId": {
            "id": "784f394c-42b6-435a-983c-b7beff2784f9",
            "entityType": "TENANT"
        },

    }

    for (let key in formJSON) {
        newObj[key] = formJSON[key]
    }

    // ==============Add Customer==============
    fetch('https://demo.thingsboard.io:443/api/customer', {

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
                thingsboard();
                updateLocal();
            }


        })
        .catch(err => console.log(err));

}

const form = document.querySelector('.contact-form');
form.addEventListener('submit', handleFormSubmit);



window.onload = (event) => {
    // GET Request.
    fetch('https://demo.thingsboard.io:443/api/customers?pageSize=50&page=0&sortProperty=createdTime&sortOrder=ASC', {
        method: "GET",
        headers: { "Accept": "application/json ", "X-Authorization": token }
    })
        .then(response => response.json())
        .then(json => {
            // console.log(json);
            if (Response) {
                hideloader();
            }

            window.localStorage.setItem("json", JSON.stringify(json));

            // =============CS Data=============
            const storedata = window.localStorage.getItem("json");
            const csdata = JSON.parse(storedata)
            console.log(csdata);

            const max = json["totalElements"];
            // console.log(max);

            for (let index = 0; index < max; index++) {

                var title = csdata.data[index].title;
                var email = csdata.data[index].email;
                var country = csdata.data[index]["country"];
                var city = csdata.data[index].city;
                var table = document.getElementById("tb1").getElementsByTagName('tbody')[0];
                var newRow = table.insertRow(table.length);
                cell1 = newRow.insertCell(0);
                cell1.innerHTML = title;
                cell2 = newRow.insertCell(1);
                cell2.innerHTML = email;
                cell3 = newRow.insertCell(2);
                cell3.innerHTML = country;
                cell4 = newRow.insertCell(3);
                cell4.innerHTML = city;
                cell5 = newRow.insertCell(4);
                cell5.innerHTML = `<button  class="btn btn-outline-danger" onClick='onDelete(this)')><i class="bi bi-trash-fill"></i>
                Delete</button>`
            }

        })
        .catch(err => console.log('Request Failed', err));
};

function hideloader() {
    // Setting display of spinner
    // element to none
    document.getElementById('loading')
        .style.display = 'none';
}

function updateLocal() {
    fetch('https://demo.thingsboard.io:443/api/customers?pageSize=50&page=0&sortProperty=createdTime&sortOrder=ASC', {
        method: "GET",
        headers: { "Accept": "application/json ", "X-Authorization": token }
    })
        .then(response => response.json())
        .then(json => {
            window.localStorage.setItem("json", JSON.stringify(json));
            // ============CS Data=============
            const storedata = window.localStorage.getItem("json");
            const csdata = JSON.parse(storedata)
            console.log(csdata);
        })
        .catch(err => console.log('Request Failed', err));
};
