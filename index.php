<html>

<head>
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<style>
		canvas {
			background: #f8f8f8;
			padding: 0;
			margin: 0 auto;
			margin-bottom: 1rem;
			display: block;
		}
	</style>

</head>

<body>
	<div class="container" style="padding-top:20px;">
		<div class="row">
			<div class="col-md-4">
				<center><img src="heroQuestLogo.png" width="400"></center>
				<br>
				<input type="checkbox" id="snapToGrid" name="snapToGrid" onchange="toggleSnapToGrid();" value="true" checked="checked" />
			<label for="snapToGrid">Snap to Grid (top left of token will snap to cursor square)</label>
			<br><br>
			<img draggable="true" ondragstart="onDragStart(event);" id="img1" class="artifact" width=33 src="icons/Creatures/SVG/Goblin.svg">
			<img draggable="true" ondragstart="onDragStart(event);" id="img2" class="artifact" width=33 src="icons/Creatures/SVG/Orc.svg">
			</div>
			<div class="col-md-8">
				<canvas id="gameCanvas" width="911" height="666" ondragover="onDragOver(event);"></canvas>
			</div>
		</div>
	</div>
	
	
	<script src="map.js"></script>
</body>

</html>
