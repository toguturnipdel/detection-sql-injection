const swal = require("sweetalert2");
const Wdw = window;
const urlWindow = Wdw.location.href; // mengambil URL web yang sedang diakses

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let prediction = "";
var xhr = new XMLHttpRequest();
var url = "https://7d35-35-186-174-124.ngrok.io/predict";
const detectSqlInject = () => {
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let json = JSON.parse(xhr.responseText);
        prediction = json.message;
        if(prediction == 'sql injection')
        {
            swal.fire({
                title: "Bahaya",
                html: "Inputan anda dideteksi bersifat SQL Injection <br />",
                icon: "warning",
                confirmButtonText: "Tutup",
                timer: 3000,
                timerProgressBar: true,
            });
        }
    }
};
    var data = JSON.stringify({"url": urlWindow});
    xhr.send(data);
}

detectSqlInject();