let start_camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let take_photo_button = document.querySelector("#take-photo");
let canvas = document.querySelector("#canvas");
let analyze_photo_button = document.querySelector("#analyze-photo");
let result_selector = document.querySelector("#select-result");

start_camera_button.addEventListener('click', async function() {
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;
});

take_photo_button.addEventListener('click', function() {
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg');

   	// data url of the image
   	console.log(image_data_url);
});

analyze_photo_button.addEventListener('click', async function() {
    canvas.toBlob(blob=> {
        console.log(blob);

        let base64 = getBase64StringFromDataURL(blob);
        console.log(base64);
        
        // result_selector.innerHTML = "";
        // let options = ["a1", "b2", "c3", "d4", "e5"]; 
        // for(var i = 0; i < options.length; i++) {
        //     var opt = options[i];
        
        //     var el = document.createElement("option");
        //     el.text = opt;
        //     el.value = opt;
        
        //     result_selector.add(el);
        // };​
    });
});