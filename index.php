<?php
/**
 * Build a list of categories present in the icons directory. Each category
 * contains a sub directory named "SVG" with the icon files. The function
 * returns an associative array where the key is the category name and the
 * value is an array of paths to each svg file under that category.
 */
function get_icon_categories( $baseDir = 'icons' ) {
        $categories = [];
        foreach ( scandir( $baseDir ) as $entry ) {
                if ( $entry[0] === '.' || $entry === '__MACOSX' ) {
                        continue;
                }

                $svgDir = $baseDir . DIRECTORY_SEPARATOR . $entry . '/SVG';
                if ( is_dir( $svgDir ) ) {
                        $icons = [];
                        foreach ( scandir( $svgDir ) as $file ) {
                                if ( pathinfo( $file, PATHINFO_EXTENSION ) === 'svg' ) {
                                        $icons[] = $svgDir . '/' . $file;
                                }
                        }
                        if ( $icons ) {
                                $categories[$entry] = $icons;
                        }
                }
        }

        return $categories;
}

$iconCategories = get_icon_categories();
?>
<!DOCTYPE html>
<html>

<head>
        <meta charset="utf-8">
        <title>Hero Quest Quest Designer</title>
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
                .icon-list img {
                        margin: 2px;
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

<?php foreach ( $iconCategories as $category => $icons ): ?>
                                <details class="mb-2">
                                        <summary class="h6 text-capitalize"><?= htmlspecialchars( $category ) ?></summary>
                                        <div class="icon-list">
<?php foreach ( $icons as $index => $path ): ?>
                                                <?php $id = htmlspecialchars( $category . '_' . pathinfo( $path, PATHINFO_FILENAME ) ); ?>
                                                <img draggable="true" ondragstart="onDragStart(event);" id="<?= $id ?>" class="artifact" width="33" src="<?= htmlspecialchars( $path ) ?>" alt="<?= htmlspecialchars( pathinfo( $path, PATHINFO_FILENAME ) ) ?>">
<?php endforeach; ?>
                                        </div>
                                </details>
<?php endforeach; ?>

                        </div>
                        <div class="col-md-8">
                                <canvas id="gameCanvas" width="911" height="666" ondragover="onDragOver(event);"></canvas>
                        </div>
                </div>
        </div>


        <script src="map.js"></script>
</body>

</html>
