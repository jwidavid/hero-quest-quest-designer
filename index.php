<?php

// Load asset definitions from JSON
$assets = json_decode(file_get_contents('assets.json'), true);
$iconIndex = 1;

// Group assets by category derived from file path
$categories = [];
foreach ($assets as $asset) {
    $parts = explode('/', $asset['image']);
    $category = $parts[1] ?? 'Other';
    if (!isset($categories[$category])) {
        $categories[$category] = [];
    }
    $categories[$category][] = $asset;
}
ksort($categories);

?>

<html>
<head>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <style>
        canvas {
            background: #f8f8f8;
            padding: 0;
            margin-bottom: 1rem;
            display: block;
        }
    </style>
</head>
<body>
<div class="container-fluid" style="padding:20px 20px 0 20px;">
    <div class="row">
        <div class="col-md-3" style="margin:0 auto">
            <img src="heroQuestLogo.png" class="mb-4" width="400" style="margin: 0 auto;" alt="HeroQuest Logo">
            <input type="checkbox" id="snapToGrid" name="snapToGrid" onchange="toggleSnapToGrid();" value="true" checked="checked" />
            <label for="snapToGrid">Snap to Grid</label>
            <br><br>
            <div class="accordion" id="iconAccordion">
                                <?php
                                foreach ($categories as $category => $files) {
                                        $catId = strtolower($category);
                                        ?>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading<?= $catId ?>">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse<?= $catId ?>" aria-expanded="false" aria-controls="collapse<?= $catId ?>">
                                                                <?= htmlspecialchars($category) ?>
                            </button>
                        </h2>
                        <div id="collapse<?= $catId ?>" class="accordion-collapse collapse" aria-labelledby="heading<?= $catId ?>" data-bs-parent="#iconAccordion">
                            <div class="accordion-body">
                                                                <?php
                                                                foreach ($files as $file) {
                                                                        $id = 'img' . $iconIndex++;
                                                                        ?>
                                    <img draggable="true" ondragstart="onDragStart(event);" id="<?= $id ?>" class="artifact" width="33" data-dim="<?= $file['dimensions'] ?>" src="<?= $file['image'] ?>" title="<?= htmlspecialchars($file['title']) ?>">
                                                                        <?php
                                                                }
                                                                ?>
                            </div>
                        </div>
                    </div>
                                        <?php
				}
				?>
            </div>
        </div>
        <div class="col-md-9">
            <canvas id="gameCanvas" ondragover="onDragOver(event);"></canvas>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script src="map.js"></script>
</body>
</html>
