let start_camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let take_photo_button = document.querySelector("#take-photo");
let canvas = document.querySelector("#canvas");
let analyze_photo_button = document.querySelector("#analyze-photo");
let result_selector = document.querySelector("#select-result");

const getBase64StringFromDataURL = (dataURL) =>
    dataURL.replace('data:', '').replace(/^.+,/, '');

start_camera_button.addEventListener('click', async function () {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
});

take_photo_button.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg');

    // data url of the image
    console.log(image_data_url);
});

analyze_photo_button.addEventListener('click', async function () {
    //Get picture bytes base64 encoded
    let image_data_url = canvas.toDataURL('image/jpeg');
    console.log(image_data_url);
    console.log(getBase64StringFromDataURL(image_data_url));
    let pictureBytes = { pictureBytes: getBase64StringFromDataURL(image_data_url)}
    
    //Wrap in JSON
    let requestBody = JSON.stringify(pictureBytes);
    console.log(requestBody);

    //Call API
    let xhr = new XMLHttpRequest();
    let url = "https://heat-counter-api.azurewebsites.net/api/analyzePicture" 
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            console.log(json);
        }
    }   ;
    var data = requestBody;
    xhr.send(data);


    result_selector.innerHTML = "";
    let options = ["a1", "b2", "c3", "d4", "e5"]; 
    for(var i = 0; i < options.length; i++) {
        var opt = options[i];

        var el = document.createElement("option");
        el.text = opt;
        el.value = opt;

        result_selector.add(el);
    };
});
