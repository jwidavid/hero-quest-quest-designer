let grid;

class Grid {

	constructor( tileSize ) {
		this.canvas = undefined;
		this.ctx = undefined;
		this.tileSize = tileSize ? tileSize * window.devicePixelRatio : 35 * window.devicePixelRatio;
		this.artifacts = [];
		this.snapToGrid = true;
	}

	init() {
		// set our config variables
		this.canvas = document.getElementById( 'gameCanvas' );
		this.ctx = this.canvas.getContext( '2d' );
		this.ctx.imageSmoothingEnabled = false;
		this.resizeCanvas();
		window.addEventListener( 'resize', () => this.resizeCanvas() );

		this.canvas.onclick = ( e ) => this.onClick( e );
		this.canvas.ondragover = ( e ) => e.preventDefault();
		this.canvas.ondrop = ( e ) => this.onDrop( e );
		this.canvas.onmousedown = ( e ) => this.onMouseDown( e );
	}

	resizeCanvas() {
		const tilesY = 19;
		const tilesX = 26;

		const availableHeight = window.innerHeight - 100;
		const availableWidth = this.canvas.parentElement.clientWidth;

		const tileSizeHeight = availableHeight / tilesY;
		const tileSizeWidth = availableWidth / tilesX;
		const tileSize = Math.min( tileSizeHeight, tileSizeWidth );

		const width = tileSize * tilesX;
		const height = tileSize * tilesY;

		this.tileSize = tileSize * window.devicePixelRatio;
		this.canvas.width = width * window.devicePixelRatio;
		this.canvas.height = height * window.devicePixelRatio;
		this.canvas.style.width = `${width}px`;
		this.canvas.style.height = `${height}px`;

		// redraw grid and rooms on resize
		if ( this.ctx ) {
			this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
			this.createGrid();
			this.createRooms();
		}
	}

        createArtifact( imageId, x, y ) {
                const imgElem = document.getElementById( imageId );
                const dims = imgElem.dataset.dim.split( 'x' );
                const w = ( this.tileSize * parseInt( dims[0] ) ) + 1;
                const h = ( this.tileSize * parseInt( dims[1] ) ) + 1;

		// use coords and dimensions to copy data for what is under the artifact
		const underlay = this.ctx.getImageData( x, y, w, h );

		this.artifacts.push( {
			gridX: x,
			gridY: y,
			width: w,
			height: h,
			underlay: underlay
		} );
	}

	createGrid() {
		// our end points
		const width = this.canvas.width;
		const height = this.canvas.height;
	
		// set our styles
		this.ctx.save();
		this.ctx.strokeStyle = 'gray'; // line colors
		this.ctx.fillStyle = 'black'; // text color
		this.ctx.font = '14px Monospace';
		this.ctx.lineWidth = 0.35;
	
		// draw vertical from X to Height
		for ( let x = 0; x < width; x += this.tileSize ) {
			// draw vertical line
			this.ctx.beginPath();
			this.ctx.moveTo( x, 0 );
			this.ctx.lineTo( x, height );
			this.ctx.stroke();
		}
	
		// draw horizontal from Y to Width
		for ( let y = 0; y < height; y += this.tileSize ) {
			// draw horizontal line
			this.ctx.beginPath();
			this.ctx.moveTo( 0, y );
			this.ctx.lineTo( width, y );
			this.ctx.stroke();
		}
	
		// restore the styles from before this function was called
		this.ctx.restore();
	}

	createRooms() {
		// Reference: Quadrants are 13 x 9
	
		// Quadrant 1
		this.ctx.strokeRect( this.tileSize, this.tileSize, this.tileSize * 4, this.tileSize * 3 );
		this.ctx.strokeRect( this.tileSize * 5, this.tileSize, this.tileSize * 4, this.tileSize * 3 );
		this.ctx.strokeRect( this.tileSize, this.tileSize * 4, this.tileSize * 4, this.tileSize * 5 );
		this.ctx.strokeRect( this.tileSize * 5, this.tileSize * 4, this.tileSize * 4, this.tileSize * 5 );
		this.ctx.strokeRect( this.tileSize * 9, this.tileSize, this.tileSize * 3, this.tileSize * 5 );
	
		// Quadrant 2
		this.ctx.strokeRect( this.tileSize * 14, this.tileSize, this.tileSize * 3, this.tileSize * 5 );
		this.ctx.strokeRect( this.tileSize * 17, this.tileSize, this.tileSize * 4, this.tileSize * 4 );
		this.ctx.strokeRect( this.tileSize * 21, this.tileSize, this.tileSize * 4, this.tileSize * 4 );
		this.ctx.strokeRect( this.tileSize * 17, this.tileSize * 5, this.tileSize * 4, this.tileSize * 4 );
		this.ctx.strokeRect( this.tileSize * 21, this.tileSize * 5, this.tileSize * 4, this.tileSize * 4 );
	
		// Quadrant 3
		this.ctx.strokeRect( this.tileSize, this.tileSize * 10, this.tileSize * 4, this.tileSize * 4 );
		this.ctx.strokeRect( this.tileSize * 5, this.tileSize * 10, this.tileSize * 2, this.tileSize * 3 );
		this.ctx.strokeRect( this.tileSize * 7, this.tileSize * 10, this.tileSize * 2, this.tileSize * 3 );
		this.ctx.strokeRect( this.tileSize, this.tileSize * 14, this.tileSize * 4, this.tileSize * 4 );
		this.ctx.strokeRect( this.tileSize * 5, this.tileSize * 13, this.tileSize * 4, this.tileSize * 5 );
		this.ctx.strokeRect( this.tileSize * 9, this.tileSize * 13, this.tileSize * 3, this.tileSize * 5 );
	
		// Quadrant 4
		this.ctx.strokeRect( this.tileSize * 14, this.tileSize * 13, this.tileSize * 4, this.tileSize * 5 );
		this.ctx.strokeRect( this.tileSize * 18, this.tileSize * 14, this.tileSize * 3, this.tileSize * 4 );
		this.ctx.strokeRect( this.tileSize * 21, this.tileSize * 14, this.tileSize * 4, this.tileSize * 4 );
		this.ctx.strokeRect( this.tileSize * 21, this.tileSize * 10, this.tileSize * 4, this.tileSize * 4 );
		// custom draw the final room
		this.ctx.beginPath();
		this.ctx.moveTo( this.tileSize * 21, this.tileSize * 10 );
		this.ctx.lineTo( this.tileSize * 17, this.tileSize * 10 );
		this.ctx.lineTo( this.tileSize * 17, this.tileSize * 13 );
		this.ctx.stroke();
	
		// Center Room
		this.ctx.strokeRect( this.tileSize * 10, this.tileSize * 7, this.tileSize * 6, this.tileSize * 5 );
	}

	getCursorCoords( e ) {
		const rect = this.canvas.getBoundingClientRect();
		const cursorX = ( e.clientX - rect.left ) * window.devicePixelRatio;
		const cursorY = ( e.clientY - rect.top ) * window.devicePixelRatio;

		return { x: cursorX, y: cursorY };
	}

	getTileCoords( e ) {
		const cursor = this.getCursorCoords( e );
		// Get the tile position and add 1 to snap the image to grid
		const tileX = ( Math.floor( cursor.x / this.tileSize ) * this.tileSize ) + 1;
		const tileY = ( Math.floor( cursor.y / this.tileSize ) * this.tileSize ) + 1;
	
		return { x: tileX, y: tileY };
	}

	onClick( e ) {
		const cursorCoords = this.getCursorCoords( e );

		// check if clicked on artifact
		let artifact = this.artifacts.find( a => {
			return (
				cursorCoords.x > a.gridX
				&& cursorCoords.x < ( a.gridX + a.width )
				&& cursorCoords.y > a.gridY
				&& cursorCoords.y < ( a.gridY + a.height )
			)
		} );

		// replace artifact with underlay
		if ( artifact ) {
			this.ctx.putImageData( artifact.underlay, artifact.gridX, artifact.gridY );
		}
	}

	onDrop( e ) {
		e.preventDefault();

                const imageId = e.dataTransfer.getData( 'image' );
                const imgElem = document.getElementById( imageId );
                const dims = imgElem.dataset.dim.split( 'x' ).map( d => parseInt( d ) );
                let coords;
		
		if ( this.snapToGrid ) {
			// snap to grid
                        coords = this.getTileCoords( e );
                        this.ctx.clearRect( coords.x, coords.y, this.tileSize * dims[0] - 2, this.tileSize * dims[1] - 2 );
		} else {
			coords = this.getCursorCoords( e );
			// image offset
			coords.x = coords.x - ( e.dataTransfer.getData( 'grabbedX' ) * window.devicePixelRatio );
			coords.y = coords.y - ( e.dataTransfer.getData( 'grabbedY' ) * window.devicePixelRatio );
		}

                // create the artifact
                this.createArtifact( imageId, coords.x, coords.y );

                // drawImage at the drop point using the dropped image
                this.ctx.drawImage(
                        imgElem,
                        coords.x,
                        coords.y,
                        this.tileSize * dims[0],
                        this.tileSize * dims[1]
                );
		e.dataTransfer.clearData();
	}

	onMouseDown( e ) {
		// var mouseX = e.pageX - this.offsetLeft;
		// var mouseY = e.pageY - this.offsetTop;
	
		// if ( mouseX >= ( currentX - star_img.width/2 ) &&
		// 	mouseX <= ( currentX + star_img.width/2 ) &&
		// 	mouseY >= ( currentY - star_img.height/2 ) &&
		// 	mouseY <= ( currentY + star_img.height/2 ) ) 
		// {
		// 	isDraggable = true;
		// }
	}
}

function onDragStart( e ) {
	const coords = getCoordsOverImg( e );
	e.dataTransfer.setData( 'image', e.target.id );
	e.dataTransfer.setData( 'grabbedX', coords.x );
	e.dataTransfer.setData( 'grabbedY', coords.y );
}

function toggleSnapToGrid() {
	grid.snapToGrid = !grid.snapToGrid;
}
  
function getCoordsOverImg( e ) {
	// get coords of cursor within the element
	const rect = e.target.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;
	
	return { x: x, y: y };
}

document.addEventListener( 'DOMContentLoaded', () => {
	grid = new Grid();
	grid.init();
} );
