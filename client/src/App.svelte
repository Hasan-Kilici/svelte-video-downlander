<script>
	import "../style.css";
  import "../script.js";
</script>

<svelte:head>
<title>Video Yükle</title>
</svelte:head>
<h1 class='heading'>Paste YouTube URL</h1>
	<input class='URL-input' placeholder='https://www.youtube.com/watch?v=MtN1YnoL46Q' />

	<button class='convert-button' id='btn'>Convert</button>

<style>
.URL-input {
	margin: auto;
	border-radius: 4px 0px 0px 4px;
	width: 30em;
	text-align: left;
	border: 2px solid #eeeeee;
	background: #eeeeee;
	outline: none;
}

.URL-input:focus {
	border: 2px solid #0485ff;
}

.convert-button {
	margin: 2% auto;
	border: 2px solid #0485ff;
	background: #0485ff;
	color: white;
	transition: 0.15s;
}

.convert-button:hover {
	background: #016acc;
	border-color: #016acc;
}

@media only screen and (max-width: 600px) {
	body {
		display: grid;
		grid-template-columns: auto;
		justify-content: center;
	}

	.URL-input {
		margin: auto;
		width: 100%;
	}

	.convert-button {
		margin: 7% auto;
		width: 100%;
	}
}

.opt {
	width: 30vw;
	margin: 2% auto;
	padding: 4px;
	border-radius: 7%;
}
</style>
