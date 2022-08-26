const swal = require("sweetalert2");
const Wdw = window;
const urlWindow = Wdw.location.href; // mengambil URL web yang sedang diakses

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let prediction = "";
var xhr = new XMLHttpRequest();
var url = "https://7ea5-35-237-222-61.ngrok.io/predict";
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
                title: "Danger",
                html: "Your input has been detected as SQL Injection <br />",
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