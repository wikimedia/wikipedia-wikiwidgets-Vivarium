/**
 * Vivarium is a simple widget meant to be embedded in Wikipedia articles about Conway's Game of Life
 * to aid the understanding of the topic
 *
 * Written by Luis Felipe Schenone in 2015
 *
 * Vivarium is available under the GNU General Public License (http://www.gnu.org/licenses/gpl.html)
 */
var Vivarium = {

	messages: {
		'es': {
			'cell-button': 'Celda',
			'cell-button-tooltip': 'Agregar o quitar celdas',
			'move-button': 'Mover',
			'move-button-tooltip': 'Mover el tablero',
			'zoom-in-button': 'Acercar',
			'zoom-in-button-tooltip': 'Acercar',
			'zoom-out-button': 'Alejar',
			'zoom-out-button-tooltip': 'Alejar',
			'grid-button': 'Grilla',
			'grid-button-tooltip': 'Grilla',
			'reset-button': 'Reiniciar',
			'reset-button-tooltip': 'Reiniciar',
			'play-button': 'Reproducir',
			'play-button-tooltip': 'Reproducir',
			'pause-button': 'Pausar',
			'pause-button-tooltip': 'Pausar',
			'next-button': 'Siguiente',
			'next-button-tooltip': 'Generación siguiente',
		},
		'en': {
			'cell-button': 'Cell',
			'cell-button-tooltip': 'Add or remove cells',
			'move-button': 'Move',
			'move-button-tooltip': 'Move the board',
			'zoom-in-button': 'Zoom in',
			'zoom-in-button-tooltip': 'Zoom in',
			'zoom-out-button': 'Zoom out',
			'zoom-out-button-tooltip': 'Zoom out',
			'grid-button': 'Grid',
			'grid-button-tooltip': 'Grid',
			'reset-button': 'Reset',
			'reset-button-tooltip': 'Reset',
			'play-button': 'Play',
			'play-button-tooltip': 'Play',
			'pause-button': 'Pause',
			'pause-button-tooltip': 'Pause',
			'next-button': 'Next',
			'next-button-tooltip': 'Next generation',
		},
	}, 

	/**
	 * Initialisation script
	 */
	init: function () {
		// Set the interface messages
		mw.messages.set( Vivarium.messages[ mw.config.get( 'wgUserLanguage' ) ] );

		// Build the GUI and bind the events
		Vivarium.gui.buildAndBind()

		// Set the default action 
		Vivarium.gui.clickCellButton();

		// Start with the "acorn" seed pattern
		var seed = [ '0,0', '-1,0', '0,1', '1,0', '-1,-1' ];
		for ( var i in seed ) {
			Vivarium.board.addCell( seed[ i ] );
		}
	},

	gui: {
		buildAndBind: function () {
			var container = $( '.WikiWidget[data-wikiwidget="Vivarium"]' ),
				canvas = $( '<canvas>' ).addClass( 'VivariumCanvas' ),
				menu = $( '<div>' ).addClass( 'VivariumMenu' );

			var cellButton = $( '<img>' ).attr({
				'class': 'VivariumButton VivariumCellButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/f/ff/WikiWidgetCellButton.png',
				'title': mw.message( 'cell-button-tooltip' ),
				'alt': mw.message( 'cell-button' )
			});
			var moveButton = $( '<img>' ).attr({
				'class': 'VivariumButton VivariumMoveButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/1/15/WikiWidgetMoveButton.png',
				'title': mw.message( 'move-button-tooltip' ),
				'alt': mw.message( 'move-button' )
			});
			var zoomInButton = $( '<img>' ).attr({
				'class': 'VivariumButton VivariumZoomInButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/2/2e/WikiWidgetZoomInButton.png',
				'title': mw.message( 'zoom-in-button-tooltip' ),
				'alt': mw.message( 'zoom-in-button' )
			});
			var zoomOutButton = $( '<img>' ).attr({
				'class': 'VivariumButton VivariumZoomOutButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/6/63/WikiWidgetZoomOutButton.png',
				'title': mw.message( 'zoom-out-button-tooltip' ),
				'alt': mw.message( 'zoom-out-button' )
			});
			var gridButton = $( '<img>' ).attr({
				'class': 'VivariumButton VivariumGridButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/a/a9/WikiWidgetGridButton.png',
				'title': mw.message( 'grid-button-tooltip' ),
				'alt': mw.message( 'grid-button' )
			});
			var resetButton = $( '<img>' ).attr({
				'class': 'VivariumButton VivariumResetButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/0/0e/WikiWidgetResetButton.png',
				'title': mw.message( 'reset-button-tooltip' ),
				'alt': mw.message( 'reset-button' )
			});
			var playButton = $( '<img>' ).attr({
				'class': 'VivariumButton VivariumPlayButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/b/b8/WikiWidgetPlayButton.png',
				'title': mw.message( 'play-button-tooltip' ),
				'alt': mw.message( 'play-button' )
			});
			var pauseButton = $( '<img>' ).attr({
				'class': 'VivariumButton VivariumPauseButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/6/6e/WikiWidgetPauseButton.png',
				'title': mw.message( 'pause-button-tooltip' ),
				'alt': mw.message( 'pause-button' )
			}).hide(); // The pause button starts hidden
			var nextButton = $( '<img>' ).attr({
				'class': 'VivariumButton VivariumNextButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/b/bf/WikiWidgetNextFrameButton.png',
				'title': mw.message( 'next-button-tooltip' ),
				'alt': mw.message( 'next-button' )
			});
			var generationCounter = $( '<span>' ).addClass( 'VivariumGenerationCounter' ).text( 0 );

			// Put it all together
			menu.append( cellButton )
				.append( moveButton )
				.append( zoomInButton )
				.append( zoomOutButton )
				.append( gridButton )
				.append( resetButton )
				.append( playButton )
				.append( pauseButton )
				.append( nextButton )
				.append( generationCounter );
			container.html( canvas ).append( menu );

			// Set the variables that must wait for the DOM to be loaded
			Vivarium.board.setCanvas( canvas[0] );
			Vivarium.board.setWidth( 400 );
			Vivarium.board.setHeight( 300 );
			container.width( Vivarium.board.width );

			// Bind events
			canvas.mousedown( Vivarium.mouse.down ).mousemove( Vivarium.mouse.move ).mouseup( Vivarium.mouse.up );
			moveButton.click( Vivarium.gui.clickMoveButton );
			cellButton.click( Vivarium.gui.clickCellButton );
			resetButton.click( Vivarium.game.reset );
			playButton.click( Vivarium.game.play );
			pauseButton.click( Vivarium.game.pause );
			nextButton.click( Vivarium.game.next );
			zoomOutButton.click( Vivarium.board.zoomOut );
			zoomInButton.click( Vivarium.board.zoomIn );
			gridButton.click( Vivarium.board.toggleGrid );
		},

		clickMoveButton: function () {
			Vivarium.mouse.onDown = null;
			Vivarium.mouse.onDrag = Vivarium.moveBoard;
			Vivarium.mouse.onUp = null;
			$( '.VivariumMoveButton' ).addClass( 'active' ).siblings().removeClass( 'active' );
		},

		clickCellButton: function () {
			Vivarium.mouse.onDown = Vivarium.addRemoveCell;
			Vivarium.mouse.onDrag = Vivarium.addRemoveCell;
			Vivarium.mouse.onUp = null;
			$( '.VivariumCellButton' ).addClass( 'active' ).siblings().removeClass( 'active' );
		}
	},

	game: {

		generation: 0,

		playing: false,

		/* Setters */

		setGeneration: function ( value ) {
			Vivarium.game.generation = value;
			$( '.VivariumGenerationCounter' ).text( value );
		},

		/* Actions */

		/**
		 * This method is the heart of the widget
		 */
		next: function () {
			Vivarium.game.setGeneration( Vivarium.game.generation + 1 );
			Vivarium.board.oldLiveCells = Vivarium.board.newLiveCells.slice(); // Clone the array
			var liveCells = Vivarium.board.oldLiveCells,
				coords,
				neighbors,
				relevantCells = liveCells, // The relevant cells are the live ones plus their neighbors minus the duplicates
				seen = [],
				state,
				liveNeighborCount;
			for ( var i = 0, len = liveCells.length; i < len; i++ ) {
				coords = liveCells[ i ];
				neighbors = Vivarium.board.getNeighbors( coords );
				relevantCells = relevantCells.concat( neighbors );
			}
			for ( var i = 0, len = relevantCells.length; i < len; i++ ) {
				coords = relevantCells[ i ];
				if ( seen.indexOf( coords ) > -1 ) {
					continue; // Ignore duplicates
				}
				seen.push( coords );
				state = Vivarium.board.getOldState( coords );
				liveNeighborCount = Vivarium.board.getLiveNeighborCount( coords );
				// Death by underpopulation or overpopulation
				if ( state === 1 && ( liveNeighborCount < 2 || liveNeighborCount > 3 ) ) {
					Vivarium.board.removeCell( coords );
				}
				// Reproduction
				else if ( state === 0 && liveNeighborCount === 3 ) {
					Vivarium.board.addCell( coords );
				}
			}
		},

		play: function () {
			if ( Vivarium.game.playing ) {
				return; // The game is already playing
			}
			Vivarium.game.playing = setInterval( Vivarium.game.next, 1 ); // The interval's id is stored in the playing property
			$( '.VivariumPlayButton' ).hide();
			$( '.VivariumPauseButton' ).show();
		},

		pause: function () {
			if ( !Vivarium.game.playing ) {
				return; // The game is already paused
			}
			clearInterval( Vivarium.game.playing );
			Vivarium.game.playing = false;
			$( '.VivariumPlayButton' ).show();
			$( '.VivariumPauseButton' ).hide();
		},

		reset: function () {
			// Reset the game
			Vivarium.game.pause();
			Vivarium.game.setGeneration( 0 );

			// Reset the board
			Vivarium.board.centerX = 0;
			Vivarium.board.centerY = 0;
			Vivarium.board.newLiveCells = [];
			Vivarium.board.oldLiveCells = [];
			Vivarium.board.refill();
		}
	},

	mouse: {
		/**
		 * The position relative to the origin of the coordinate system of the board (in cells, not pixels)
		 */
		newX: null,
		newY: null,
		oldX: null,
		oldY: null,

		state: 'up', // up, down or drag
		onUp: null,
		onDrag: null,
		onDown: null,

		/* Getters */

		getNewX: function ( event ) {
			var board = Vivarium.board,
				offsetX = event.pageX - $( event.target ).offset().left - 1, // The -1 is to correct a minor displacement
				newX = board.centerX - Math.floor( board.xCells / 2 ) + Math.floor( offsetX / board.cellSize );
			return newX;
		},

		getNewY: function ( event ) {
			var board = Vivarium.board,
				offsetY = event.pageY - $( event.target ).offset().top - 2, // The -2 is to correct a minor displacement
				newY = board.centerY - Math.floor( board.yCells / 2 ) + Math.floor( offsetY / board.cellSize );
			return newY;
		},

		/* Events */

		up: function ( event ) {
			Vivarium.mouse.state = 'up';
			if ( Vivarium.mouse.onUp ) {
				Vivarium.mouse.onUp( event );
			}
		},

		move: function ( event ) {
			Vivarium.mouse.oldX = Vivarium.mouse.newX;
			Vivarium.mouse.oldY = Vivarium.mouse.newY;
			Vivarium.mouse.newX = Vivarium.mouse.getNewX( event );
			Vivarium.mouse.newY = Vivarium.mouse.getNewY( event );

			// If the mouse is being dragged, not just moved
			var moved = ( Vivarium.mouse.newX - Vivarium.mouse.oldX ) || ( Vivarium.mouse.newY - Vivarium.mouse.oldY );
			if ( Vivarium.mouse.state === 'down' && moved && Vivarium.mouse.onDrag ) {
				Vivarium.mouse.onDrag( event );
			}
		},

		down: function ( event ) {
			Vivarium.mouse.state = 'down';
			if ( Vivarium.mouse.onDown ) {
				Vivarium.mouse.onDown( event );
			}
		}
	},

	moveBoard: function ( event ) {
		Vivarium.board.centerX += Vivarium.mouse.oldX - Vivarium.mouse.newX;
		Vivarium.board.centerY += Vivarium.mouse.oldY - Vivarium.mouse.newY;
		Vivarium.board.refill();

		// Bugfix: without the following, the board flickers when moving, not sure why
		Vivarium.mouse.newX = Vivarium.mouse.getNewX( event );
		Vivarium.mouse.newY = Vivarium.mouse.getNewY( event );
	},

	addRemoveCell: function ( event ) {
		Vivarium.game.pause();
		var coords = String( Vivarium.mouse.newX + ',' + Vivarium.mouse.newY );
		if ( Vivarium.board.getNewState( coords ) === 0 ) {
			Vivarium.board.addCell( coords );
		} else {
			Vivarium.board.removeCell( coords );
		}
	},

	board: {

		canvas: null,
		context: null,

		width: null,
		height: null,

		centerX: 0,
		centerY: 0,

		cellSize: 4,

		xCells: null,
		yCells: null,

		grid: false,

		/**
		 * These arrays hold the coordinates of the live cells
		 */
		newLiveCells: [],
		oldLiveCells: [],

		/* Getters */

		getXcells: function () {
			return Math.floor( this.width / this.cellSize );
		},

		getYcells: function () {
			return Math.floor( this.height / this.cellSize );
		},

		/**
		 * Takes a string of coordinates (like "23,-75")
		 * and returns the state of the cell
		 */
		getNewState: function ( coords ) {
			if ( Vivarium.board.newLiveCells.indexOf( coords ) === -1 ) {
				return 0; // Dead
			}
			return 1; // Alive
		},
		getOldState: function ( coords ) {
			if ( Vivarium.board.oldLiveCells.indexOf( coords ) === -1 ) {
				return 0; // Dead
			}
			return 1; // Alive
		},

		/**
		 * Takes a string of coordinates (like "23,-75")
		 * and returns an array with the neighboring coordinates
		 */
		getNeighbors: function ( coords ) {
			coords = coords.split( ',' );
			var x = parseInt( coords[0] ),
				y = parseInt( coords[1] );
			return [
				( x - 1 ) + ',' + ( y - 1 ),
				( x - 1 ) + ',' + ( y + 0 ),
				( x - 1 ) + ',' + ( y + 1 ),
				( x + 0 ) + ',' + ( y + 1 ),
				( x + 0 ) + ',' + ( y - 1 ),
				( x + 1 ) + ',' + ( y - 1 ),
				( x + 1 ) + ',' + ( y + 0 ),
				( x + 1 ) + ',' + ( y + 1 )
			];
		},

		/**
		 * Takes a string of coordinates (like "23,-75")
		 * and returns the number of live neighbors
		 */
		getLiveNeighborCount: function ( coords ) {
			var neighbors = Vivarium.board.getNeighbors( coords ),
				liveNeighborCount = 0;
			for ( var i = 0, len = neighbors.length; i < len; i++ ) {
				if ( Vivarium.board.oldLiveCells.indexOf( neighbors[ i ] ) > -1 ) {
					liveNeighborCount++;
				}
			}
			return liveNeighborCount;
		},

		/* Setters */

		setCanvas: function ( value ) {
			this.canvas = value;
			this.context = value.getContext( '2d' );
		},

		setWidth: function ( value ) {
			this.width = value;
			this.canvas.setAttribute( 'width', value );
			this.xCells = this.getXcells();
		},

		setHeight: function ( value ) {
			this.height = value;
			this.canvas.setAttribute( 'height', value );
			this.yCells = this.getYcells();
		},

		setCellSize: function ( value ) {
			this.cellSize = parseInt( value );
			this.xCells = this.getXcells();
			this.yCells = this.getYcells();
		},

		/* Actions */

		zoomIn: function () {
			if ( Vivarium.board.cellSize === 32 ) {
				return;
			}
			Vivarium.board.setCellSize( Vivarium.board.cellSize * 2 );
			Vivarium.board.refill();
		},

		zoomOut: function () {
			if ( Vivarium.board.cellSize === 1 ) {
				return;
			}
			Vivarium.board.setCellSize( Vivarium.board.cellSize / 2 );
			Vivarium.board.refill();
		},

		toggleGrid: function () {
			Vivarium.board.grid = Vivarium.board.grid === true ? false : true;
			Vivarium.board.refill();
		},

		drawGrid: function () {
			if ( this.cellSize < 4 ) {
				return; // Cells are too small for the grid
			}
			this.context.beginPath();
			for ( var x = 0; x <= this.xCells; x++ ) {
				this.context.moveTo( x * this.cellSize - 0.5, 0 ); // The 0.5 avoids getting blury lines
				this.context.lineTo( x * this.cellSize - 0.5, this.height );
			}
			for ( var y = 0; y <= this.yCells; y++ ) {
				this.context.moveTo( 0, y * this.cellSize - 0.5 );
				this.context.lineTo( this.width, y * this.cellSize - 0.5 );
			}
			this.context.strokeStyle = '#333';
			this.context.stroke();
		},

		fill: function () {
			for ( var i = 0, len = this.newLiveCells.length; i < len; i++ ) {
				Vivarium.board.fillCell( this.newLiveCells[ i ] );
			}
			if ( this.grid ) {
				this.drawGrid();
			}
		},

		clear: function () {
			this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		},

		refill: function () {
			this.clear();
			this.fill();
		},

		fillCell: function ( coords ) {
			var coords = coords.split( ',' ),
				x = coords[0],
				y = coords[1],
				minX = this.centerX - Math.floor( this.xCells / 2 ),
				minY = this.centerY - Math.floor( this.yCells / 2 ),
				maxX = minX + this.xCells,
				maxY = minY + this.yCells;
			if ( x < minX || y < minY || x > maxX || y > maxY ) {
				return; // If the cell is beyond view, don't draw it
			}
			var rectX = Math.abs( this.centerX - Math.floor( this.xCells / 2 ) - x ) * this.cellSize,
				rectY = Math.abs( this.centerY - Math.floor( this.yCells / 2 ) - y ) * this.cellSize,
				rectW = this.cellSize - ( this.grid && this.cellSize >= 4 ? 1 : 0 ), // Don't overwrite the grid
				rectH = this.cellSize - ( this.grid && this.cellSize >= 4 ? 1 : 0 );
			this.context.fillStyle = 'white';
			this.context.fillRect( rectX, rectY, rectW, rectH );
		},

		clearCell: function ( coords ) {
			var coords = coords.split( ',' ),
				x = coords[0],
				y = coords[1],
				minX = this.centerX - Math.floor( this.xCells / 2 ),
				minY = this.centerY - Math.floor( this.yCells / 2 ),
				maxX = minX + this.xCells,
				maxY = minY + this.yCells;
			if ( x < minX || y < minY || x > maxX || y > maxY ) {
				return; // If the cell is beyond view, there's no need to erase it
			}
			var rectX = Math.abs( this.centerX - Math.floor( this.xCells / 2 ) - x ) * this.cellSize,
				rectY = Math.abs( this.centerY - Math.floor( this.yCells / 2 ) - y ) * this.cellSize,
				rectW = this.cellSize - ( this.grid && this.cellSize >= 4 ? 1 : 0 ), // Don't erase the grid
				rectH = this.cellSize - ( this.grid && this.cellSize >= 4 ? 1 : 0 );
			this.context.clearRect( rectX, rectY, rectW, rectH );
		},

		addCell: function ( coords ) {
			this.newLiveCells.push( coords );
			this.fillCell( coords );
		},

		removeCell: function ( coords ) {
			var index = this.newLiveCells.indexOf( coords );
			this.newLiveCells.splice( index, 1 ); // Remove the coords from the array
			this.clearCell( coords );
		}
	}
}

jQuery( Vivarium.init );