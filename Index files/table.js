// var token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2ZWplazI5NjQxQHRvdXJjYy5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6IjBmMjNlYWYwLWExM2EtMTFlYy04NmI4LTMzM2ZmNjFiZGNhMyIsImZpcnN0TmFtZSI6IkhhcnJ5IiwibGFzdE5hbWUiOiJKb2hhbnMiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiIwZTljZTBhMC1hMTNhLTExZWMtODZiOC0zMzNmZjYxYmRjYTMiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTAwODY0MTQsImV4cCI6MTY1MTg4NjQxNH0.iqMnoTXwA5lmtkCpczGF9cEhOuuws9tCU3QKoeuxvVnJ0dtzbULvWtaj4NzR2e4o2Xtmv4rJhJ6iYqGDdzS-sQ"

let collength;
var para = [];
var did;

$("select#floatingSelect5").change(function () {
  did = $(this).children("option:selected").val();
});


$("select#floatingSelect6").change(function () {
  para = [];
  $.each($("select#floatingSelect6 option:selected"), function () {
    para.push($(this).val());
  });
  // console.log(para);
});



function displayTable() {

  let id = `tb${tbcount++}`;
  // console.log(id);
  // console.log(para);

  // GET Request.
  fetch(`https://demo.thingsboard.io:443/api/plugins/telemetry/DEVICE/${did}/values/timeseries?keys=${para}&startTs=1651104000000&endTs=1651190399000&orderBy=ASC`, {
    method: "GET",
    headers: { "Accept": "application/json ", "X-Authorization": token }
  })
    .then(response => response.json())
    .then(json => {
      console.log(json);


      var html = "";
      html += `<table class="table table-dark table-sm display cell-border" id="abc" style="width:100%">
           <thead>
           <tr>
           <th>TimeStamp</th>`;

      for (var i = 0; i < para.length; i++) {
        html += "<th>" + para[i] + "</th>"
      }

      html += `</tr>
          </thead>
          <tbody>`

      for (let index = 0; index < json[para[0]].length; index++) {
        var utcSeconds = json.speed[index].ts;   
        const dateObject = new Date(utcSeconds)
        const humanDateFormat = dateObject.toLocaleString("en-US", {hour: "numeric",minute: "numeric",second: "numeric"}) 

        html += `<tr>
                 <td>`+ humanDateFormat +`</td>`

        for (let i = 0; i < para.length; i++) {
          html += "<td>" + json[para[i]][index].value + "</td>"
        }
        html += `</tr>`
      }

      html += `</tbody>
            </table>`

      // console.log(html)
      $(`#${id}`).html(html);

      $("select#floatingSelect6").empty()
      document.getElementById("tabform").reset();
      para.length = 0


      var t = $('#abc').DataTable({
        dom: 'lBfrtip',
        lengthMenu: [5, 10, 20, 50, 100, 200, 500],
        bSort: false,
        bStateSave: true,
        buttons: [
          'excel', 'pdf', 'print', 'copy'
        ]
      });

    })
    .catch(err => console.log('Request Failed', err));
}