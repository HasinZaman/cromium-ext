document.addEventListener('DOMContentLoaded', () => {
    let data = document.getElementById("data");
    let button = document.getElementById("submit");

    button.onclick = () => {
        submit(data.value);
    };
});

function submit(data) {
    let body = document.body;

    body.innerHTML = "<img src=\"img/working.svg\">";

    fetch("http://127.0.0.1/messages", {
        method: "POST",
        body: data,
        headers: {"content-type": "text/plain"},
    })
    .then((res) => {
        if (res.ok) { // ok if status is 2xx
            console.log('OK ' + res.statusText);
        } else {
            console.log('Request failed.  Returned status of ' + res.status);
        }

        return res.blob()
    })
    .then((blob) => {
        result = blob
        blob.text()
            .then((data) => JSON.parse(data))
            .then((text) => {

                console.log(text)
                summary(text.summary)
            })
        // window.result = blob
    })
}

function summary(data) {
    let body = document.body;

    body.innerHTML = "<img src=\"img/done.svg\"><h1>summary:"+data+"</h1>";
}