/**
 * Vivarium is a simple widget meant to be embedded in Wikipedia articles about Conway's Game of Life
 * to aid the understanding of the topic
 *
 * Written by Luis Felipe Schenone in 2015
 *
 * Vivarium is available under the GNU General Public License (http://www.gnu.org/licenses/gpl.html)
 */
var Vivarium = {

	/**
	 * Localisation to Spanish
	 */
	messages: {
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

	/**
	 * Convenience method that returns a localised message for the given key
	 */
	getMessage: function( key ) {
		return this.messages[ key ];
	},

	/**
	 * Initialise Vivarium
	 */
	init: function () {
		// Build the GUI and bind the events
		Vivarium.gui.buildAndBind()

		// Add cells as the default action 
		$( '.VivariumCellButton' ).click();

		// Start with the "acorn" seed pattern
		var seed = [ "0,0", "-1,0", "0,1", "1,0", "-1,-1" ];
		for ( var i = 0; i < seed.length; i++ ) {
			Vivarium.board.addCell( seed[ i ] );
		}
		Vivarium.board.fill();
		Vivarium.game.play();
	},

	gui: {
		buildAndBind: function () {
			var wikiwidget = $( '.WikiWidget[data-wikiwidget="Vivarium"]' );
			var canvas = $( '<canvas>' ).attr( 'class', 'VivariumCanvas' );
			var menu = $( '<div>' ).attr( 'class', 'VivariumMenu' );

			var cellButton = $( '<img>' ).attr({
				'class': 'button VivariumCellButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/f/ff/WikiWidgetCellButton.png',
				'title': Vivarium.getMessage( 'cell-button-tooltip' ),
				'alt': Vivarium.getMessage( 'cell-button' )
			});
			var moveButton = $( '<img>' ).attr({
				'class': 'button VivariumMoveButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/1/15/WikiWidgetMoveButton.png',
				'title': Vivarium.getMessage( 'move-button-tooltip' ),
				'alt': Vivarium.getMessage( 'move-button' )
			});
			var zoomInButton = $( '<img>' ).attr({
				'class': 'button VivariumZoomInButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/2/2e/WikiWidgetZoomInButton.png',
				'title': Vivarium.getMessage( 'zoom-in-button-tooltip' ),
				'alt': Vivarium.getMessage( 'zoom-in-button' )
			});
			var zoomOutButton = $( '<img>' ).attr({
				'class': 'button VivariumZoomOutButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/6/63/WikiWidgetZoomOutButton.png',
				'title': Vivarium.getMessage( 'zoom-out-button-tooltip' ),
				'alt': Vivarium.getMessage( 'zoom-out-button' )
			});
			var gridButton = $( '<img>' ).attr({
				'class': 'button VivariumGridButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/a/a9/WikiWidgetGridButton.png',
				'title': Vivarium.getMessage( 'grid-button-tooltip' ),
				'alt': Vivarium.getMessage( 'grid-button' )
			});
			var resetButton = $( '<img>' ).attr({
				'class': 'button VivariumResetButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/0/0e/WikiWidgetResetButton.png',
				'title': Vivarium.getMessage( 'reset-button-tooltip' ),
				'alt': Vivarium.getMessage( 'reset-button' )
			});
			var playButton = $( '<img>' ).attr({
				'class': 'button VivariumPlayButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/b/b8/WikiWidgetPlayButton.png',
				'title': Vivarium.getMessage( 'play-button-tooltip' ),
				'alt': Vivarium.getMessage( 'play-button' )
			});
			var pauseButton = $( '<img>' ).attr({
				'class': 'button VivariumPauseButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/6/6e/WikiWidgetPauseButton.png',
				'title': Vivarium.getMessage( 'pause-button-tooltip' ),
				'alt': Vivarium.getMessage( 'pause-button' )
			}).hide(); // The pause button starts hidden
			var nextButton = $( '<img>' ).attr({
				'class': 'button VivariumNextButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/b/bf/WikiWidgetNextFrameButton.png',
				'title': Vivarium.getMessage( 'next-button-tooltip' ),
				'alt': Vivarium.getMessage( 'next-button' )
			});
			var generationCounter = $( '<span>' ).attr( 'class', 'VivariumGenerationCounter' ).text( 0 );

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
			wikiwidget.html( canvas ).append( menu );

			// Set the variables that must wait for the DOM to be loaded
			Vivarium.board.setCanvas( canvas[0] );
			Vivarium.board.setWidth( wikiwidget.width() );
			Vivarium.board.setHeight( wikiwidget.height() );

			// Bind events
			canvas.mousedown( function ( event ) {
				Vivarium.mouse.down( event );
			}).mousemove( function ( event ) {
				Vivarium.mouse.move( event );
			}).mouseup( function ( event ) {
				Vivarium.mouse.up( event );
			});
			moveButton.click( function () {
				Vivarium.mouse.downAction = null;
				Vivarium.mouse.dragAction = 'moveBoard';
				Vivarium.mouse.upAction = null;
			});
			cellButton.click( function () {
				Vivarium.mouse.downAction = 'addRemoveCell';
				Vivarium.mouse.dragAction = 'addRemoveCell';
				Vivarium.mouse.upAction = null;
			});
			resetButton.click( function () {
				Vivarium.game.reset();
			});
			playButton.click( function () {
				Vivarium.game.play();
			});
			pauseButton.click( function () {
				Vivarium.game.pause();
			});
			nextButton.click( function () {
				Vivarium.game.next();
			});
			zoomOutButton.click( function () {
				Vivarium.board.zoomOut();
			});
			zoomInButton.click( function () {
				Vivarium.board.zoomIn();
			});
			gridButton.click( function () {
				Vivarium.board.grid = Vivarium.board.grid === true ? false : true;
				Vivarium.board.refill();
			});
			$( '.button', menu ).click( function () {
				Vivarium.gui.update();
			});
		},

		/**
		 * Updates the state of all the GUI elements
		 */
		update: function () {
			$( '.VivariumGenerationCounter' ).text( Vivarium.game.generation );

			$( '.VivariumMenu .button' ).removeClass( 'disabled active' );

			if ( Vivarium.mouse.dragAction === 'moveBoard' ) {
				$( '.VivariumMoveButton' ).addClass( 'active' );
			}
			if ( Vivarium.mouse.dragAction === 'addRemoveCell' ) {
				$( '.VivariumCellButton' ).addClass( 'active' );
			}
			if ( Vivarium.board.cellSize < 4 ) {
				$( '.VivariumGridButton' ).addClass( 'disabled' );
			}
			if ( Vivarium.board.cellSize === 1 ) {
				$( '.VivariumZoomOutButton' ).addClass( 'disabled' );
			}
			if ( Vivarium.board.cellSize === 32 ) {
				$( '.VivariumZoomInButton' ).addClass( 'disabled' );
			}
		},
	},

	game: {

		speed: 1000,

		generation: 0,

		playing: false,

		/* Setters */

		setGeneration: function ( value ) {
			this.generation = value;
			Vivarium.gui.update();
		},

		/* Actions */

		/**
		 * This method is the heart of the widget
		 */
		next: function () {
			Vivarium.game.setGeneration( Vivarium.game.generation + 1 );
			Vivarium.board.previousLiveCoords = Vivarium.board.currentLiveCoords.slice(); // Clone
			var liveCoords = Vivarium.board.previousLiveCoords,
				neighboringCoords,
				relevantCoords = liveCoords, // The relevant coordinates are the live ones plus their neighbors minus the duplicates
				coords,
				state,
				liveNeighborCount;
			for ( var i = 0, len = liveCoords.length; i < len; i++ ) {
				neighboringCoords = Vivarium.board.getNeighboringCoords( liveCoords[ i ] );
				relevantCoords = relevantCoords.concat( neighboringCoords.filter( function ( coords ) {
					return relevantCoords.indexOf( coords ) < 0; // Remove duplicates
				}));
			}
			for ( var i = 0, len = relevantCoords.length; i < len; i++ ) {
				coords = relevantCoords[ i ];
				state = Vivarium.board.getState( coords );
				liveNeighborCount = Vivarium.board.getLiveNeighborCount( coords );
				// Death by underpopulation
				if ( state === 1 && liveNeighborCount < 2 ) {
					Vivarium.board.removeCell( relevantCoords[ i ] );
				}
				// Death by overpopulation
				else if ( state === 1 && liveNeighborCount > 3 ) {
					Vivarium.board.removeCell( relevantCoords[ i ] );
				}
				// Reproduction
				else if ( state === 0 && liveNeighborCount === 3 ) {
					Vivarium.board.addCell( relevantCoords[ i ] );
				}
			}
			Vivarium.board.refill();
		},

		play: function () {
			if ( this.playing ) {
				return; // If the game is already playing, exit
			}
			var interval = 1000 / this.speed;
			this.playing = setInterval( this.next, interval ); // The interval's id is stored in the playing property
			$( '.VivariumPlayButton' ).hide();
			$( '.VivariumPauseButton' ).show();
		},

		pause: function () {
			if ( !this.playing ) {
				return; // If the game is already paused, exit
			}
			clearInterval( this.playing );
			this.playing = false;
			$( '.VivariumPlayButton' ).show();
			$( '.VivariumPauseButton' ).hide();
		},

		reset: function () {
			// Reset the game
			this.setGeneration( 0 );

			// Reset the board
			var board = Vivarium.board;
			board.centerX = 0;
			board.centerY = 0;
			board.currentLiveCoords = [];
			board.refill();
		}
	},

	mouse: {
		/**
		 * The distance from the origin of the coordinate system in cells (not pixels)
		 */
		currentX: null,
		currentY: null,
		previousX: null,
		previousY: null,

		state: 'up', // up, down or drag
		upAction: null,
		dragAction: null,
		downAction: null,

		/* Getters */

		getCurrentX: function ( event ) {
			var board = Vivarium.board;
			var offsetX = event.pageX - $( event.target ).offset().left - 1; // The -1 is to correct a minor displacement
			return board.centerX - Math.floor( board.xCells / 2 ) + Math.floor( offsetX / board.cellSize );
		},

		getCurrentY: function ( event ) {
			var board = Vivarium.board;
			var offsetY = event.pageY - $( event.target ).offset().top - 2; // The -2 is to correct a minor displacement
			return board.centerY - Math.floor( board.yCells / 2 ) + Math.floor( offsetY / board.cellSize );
		},

		/* Events */

		up: function ( event ) {
			this.state = 'up';
			if ( this.upAction ) {
				this[ this.upAction ]( event );
			}
		},

		move: function ( event ) {
			this.previousX = this.currentX;
			this.previousY = this.currentY;
			this.currentX = this.getCurrentX( event );
			this.currentY = this.getCurrentY( event );

			// If the mouse is being dragged, not just moved
			var moved = ( this.currentX - this.previousX ) || ( this.currentY - this.previousY );
			if ( this.state === 'down' && moved && this.dragAction ) {
				this[ this.dragAction ]( event );
			}
		},

		down: function ( event ) {
			this.state = 'down';
			if ( this.downAction ) {
				this[ this.downAction ]( event );
			}
		},

		/* Actions */

		moveBoard: function ( event ) {
			Vivarium.board.centerX += this.previousX - this.currentX;
			Vivarium.board.centerY += this.previousY - this.currentY;
			Vivarium.board.refill();

			// Bugfix: without the following, the board flickers when moving, not sure why
			this.currentX = this.getCurrentX( event );
			this.currentY = this.getCurrentY( event );
		},

		addRemoveCell: function ( event ) {
			Vivarium.game.pause();
			var coords = this.currentX + ',' + this.currentY;
			if ( Vivarium.board.currentLiveCoords.indexOf( coords ) === -1 ) {
				Vivarium.board.addCell( coords );
			} else {
				Vivarium.board.removeCell( coords );
			}
			Vivarium.board.refill();
		}
	},

	board: {

		canvas: {},
		context: {},

		width: null,
		height: null,

		centerX: 0,
		centerY: 0,

		cellSize: 4,

		xCells: null,
		yCells: null,

		grid: false,

		/**
		 * These arrays hold the coordinates of the LIVE cells
		 */
		currentLiveCoords: [],
		previousLiveCoords: [],

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
		getState: function ( coords ) {
			if ( Vivarium.board.previousLiveCoords.indexOf( coords ) < 0 ) {
				return 0; // Dead
			}
			return 1; // Alive
		},

		/**
		 * Takes a string of coordinates (like "23,-75")
		 * and returns an array with the neighboring coordinates
		 */
		getNeighboringCoords: function ( coords ) {
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
			var neighboringCoords = Vivarium.board.getNeighboringCoords( coords ),
				liveNeighborCount = 0;
			for ( var i = 0, len = neighboringCoords.length; i < len; i++ ) {
				if ( Vivarium.board.previousLiveCoords.indexOf( neighboringCoords[ i ] ) > -1 ) {
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
			if ( this.cellSize === 32 ) {
				return;
			}
			this.setCellSize( this.cellSize * 2 );
			this.refill();
		},

		zoomOut: function () {
			if ( this.cellSize === 1 ) {
				return;
			}
			this.setCellSize( this.cellSize / 2 );
			this.refill();
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
			for ( var i = 0, len = this.currentLiveCoords.length; i < len; i++ ) {
				Vivarium.board.fillCell( this.currentLiveCoords[ i ] );
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
				rectW = this.cellSize,
				rectH = this.cellSize;
			this.context.fillStyle = 'white';
			this.context.fillRect( rectX, rectY, rectW, rectH );
		},

		addCell: function ( coords ) {
			this.currentLiveCoords.push( coords );
		},

		removeCell: function ( coords ) {
			var index = this.currentLiveCoords.indexOf( coords );
			this.currentLiveCoords.splice( index, 1 ); // Remove the coords from the array
		}
	}
}

jQuery( Vivarium.init );