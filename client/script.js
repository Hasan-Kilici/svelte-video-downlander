let serverURL = null;

window.onload = ()=>{
let Btn = document.getElementById('btn');
let URLinput = document.querySelector('.URL-input');
let select = document.querySelector('.opt');
serverURL = document.location;

Btn.addEventListener('click', () => {
	if (!URLinput.value) {
		alert('Enter YouTube URL');
	} else {
			downloadMp4(URLinput.value);
	}
});
}

async function downloadMp4(query) {
	const res = await fetch(`${document.location.href}/downloadmp4?url=${query}`);
	if(res.status == 200) {
		var a = document.createElement('a');
  		a.href = `${serverURL}/downloadmp4?url=${query}`;
  		a.setAttribute('download', '');
		a.click();
	} else if(res.status == 400) {
		alert('Invalid url');
	 }
 }
