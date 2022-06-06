let start_camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let take_photo_button = document.querySelector("#take-photo");
let canvas = document.querySelector("#canvas");

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