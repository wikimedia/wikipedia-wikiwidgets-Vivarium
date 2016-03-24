/**
 * Vivarium is a widget part of the WikiWidgets project.
 * It's meant to be embedded in Wikipedia articles about Conway's Game of Life
 * to aid the understanding of the topic
 *
 * Written by Luis Felipe Schenone in 2015-2016
 *
 * Vivarium is available under the GNU General Public License (http://www.gnu.org/licenses/gpl.html)
 */
var Vivarium = {

	messages: {
		'de': {
			'cell-button': 'Zelle',
			'cell-button-tooltip': 'Zelle hinzufügen oder entfernen',
			'move-button': 'Bewegen',
			'move-button-tooltip': 'Board bewegen',
			'zoom-in-button': 'Einzoomen',
			'zoom-in-button-tooltip': 'Einzoomen',
			'zoom-out-button': 'Auszoomen',
			'zoom-out-button-tooltip': 'Auszoomen',
			'grid-button': 'Raster',
			'grid-button-tooltip': 'Raster',
			'reset-button': 'Zurücksetzen',
			'reset-button-tooltip': 'Zurücksetzen',
			'play-button': 'Abspielen',
			'play-button-tooltip': 'Abspielen',
			'pause-button': 'Pause',
			'pause-button-tooltip': 'Pause', 
			'next-generation-button': 'Weiter',
			'next-generation-button-tooltip': 'Nächste Generation',
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
			'next-generation-button': 'Next generation',
			'next-generation-button-tooltip': 'Next generation',
			'generation-counter': 'Generation ',
			'population-counter': 'Population ',
		},
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
			'next-generation-button': 'Generación siguiente',
			'next-generation-button-tooltip': 'Generación siguiente',
			'generation-counter': 'Generación ',
			'population-counter': 'Población ',
		},
		'fr': {
			'cell-button': 'Cellule',
			'cell-button-tooltip': 'Ajouter ou enlever des cellules',
			'move-button': 'Déplacer',
			'move-button-tooltip': 'Déplacer la carte',
			'zoom-in-button': 'Se rapprocher',
			'zoom-in-button-tooltip': 'Se rapprocher',
			'zoom-out-button': "S'éloigner",
			'zoom-out-button-tooltip': "S'éloigner",
			'grid-button': 'Grille',
			'grid-button-tooltip': 'Grille',
			'reset-button': 'Recommencer',
			'reset-button-tooltip': 'Recommencer',
			'play-button': 'Reproduire',
			'play-button-tooltip': 'Reproduire',
			'pause-button': 'Mettre sur pause',
			'pause-button-tooltip': 'Mettre sur pause',
			'next-generation-button': 'Suivant',
			'next-generation-button-tooltip': 'Generation suivante',
		},
		'it': {
			'cell-button': 'Cellula',
			'cell-button-tooltip': 'Aggiungere o rimuovere le cellule',
			'move-button': 'Spostare',
			'move-button-tooltip': "Spostare l'asse",
			'zoom-in-button': 'Ingrandire',
			'zoom-in-button-tooltip': 'Ingrandire',
			'zoom-out-button': 'Rimpicciolire',
			'zoom-out-button-tooltip': 'Rimpicciolire',
			'grid-button': 'Griglia',
			'grid-button-tooltip': 'Griglia',
			'reset-button': 'Reset',
			'reset-button-tooltip': 'Reset',
			'play-button': 'Giocare',
			'play-button-tooltip': 'Giocare',
			'pause-button': 'Pausa',
			'pause-button-tooltip': 'Pausa',
			'next-generation-button': 'Il prossimo',
			'next-generation-button-tooltip': 'Generazione successiva',
		},
		'pl': {
			'cell-button': 'Komórka',
			'cell-button-tooltip': 'Dodaj lub odejmij komórki',
			'move-button': 'Przejdź dalej',
			'move-button-tooltip': "Przestaw planszę",
			'zoom-in-button': 'Przybliż',
			'zoom-in-button-tooltip': 'Przybliż',
			'zoom-out-button': 'Oddal',
			'zoom-out-button-tooltip': 'Oddal',
			'grid-button': 'Siatka',
			'grid-button-tooltip': 'Siatka',
			'reset-button': 'Reset',
			'reset-button-tooltip': 'Reset',
			'play-button': 'Odtwórz',
			'play-button-tooltip': 'Odtwórz',
			'pause-button': 'Zatrzymaj',
			'pause-button-tooltip': 'Zatrzymaj',
			'next-generation-button': 'Dalej',
			'next-generation-button-tooltip': 'Następne pokolenie',
		},
	},

	/**
	 * Initialisation script
	 */
	init: function () {
		// Set the interface language
		var lang = mw.config.get( 'wgUserLanguage' );
		if ( ! ( lang in Vivarium.messages ) ) {
			lang = 'en'; // Fallback to English
		}
		mw.messages.set( Vivarium.messages[ lang ] );

		$( '.WikiWidget[data-wikiwidget="Vivarium"]' ).each( function () {
			var gui = new Vivarium.GUI( this ),
				board = new Vivarium.Board( gui ),
				game = new Vivarium.Game( board ),
				mouse = new Vivarium.Mouse( board, game );
				touch = new Vivarium.Touch( board );

			gui.bindEvents( board, game, mouse, touch );

			board.init();

			if ( $( this ).data( 'autoplay' ) ) {
				game.play();
			}
		});
	},

	GUI: function ( wrapper ) {

		this.wrapper = $( wrapper );

		this.container = $( '<div>' ).addClass( 'VivariumContainer' );

		this.canvas = $( '<canvas>' ).addClass( 'VivariumCanvas' );

		this.generationCounter = $( '<span>' ).addClass( 'VivariumCounter VivariumGenerationCounter' ).text( mw.message( 'generation-counter' ) + 0 );

		this.populationCounter = $( '<span>' ).addClass( 'VivariumCounter VivariumPopulationCounter' ).text( mw.message( 'population-counter' ) + 0 );

		this.menu = $( '<div>' ).addClass( 'VivariumMenu' );

		this.zoomInButton = $( '<img>' ).attr({
			'class': 'VivariumButton VivariumZoomInButton',
			'src': '//upload.wikimedia.org/wikipedia/commons/2/2e/WikiWidgetZoomInButton.png',
			'title': mw.message( 'zoom-in-button-tooltip' ),
			'alt': mw.message( 'zoom-in-button' )
		});

		this.zoomOutButton = $( '<img>' ).attr({
			'class': 'VivariumButton VivariumZoomOutButton',
			'src': '//upload.wikimedia.org/wikipedia/commons/6/63/WikiWidgetZoomOutButton.png',
			'title': mw.message( 'zoom-out-button-tooltip' ),
			'alt': mw.message( 'zoom-out-button' )
		});

		this.gridButton = $( '<img>' ).attr({
			'class': 'VivariumButton VivariumGridButton',
			'src': '//upload.wikimedia.org/wikipedia/commons/a/a9/WikiWidgetGridButton.png',
			'title': mw.message( 'grid-button-tooltip' ),
			'alt': mw.message( 'grid-button' )
		});

		this.resetButton = $( '<img>' ).attr({
			'class': 'VivariumButton VivariumResetButton',
			'src': '//upload.wikimedia.org/wikipedia/commons/0/0e/WikiWidgetResetButton.png',
			'title': mw.message( 'reset-button-tooltip' ),
			'alt': mw.message( 'reset-button' )
		});

		this.playButton = $( '<img>' ).attr({
			'class': 'VivariumButton VivariumPlayButton',
			'src': '//upload.wikimedia.org/wikipedia/commons/b/b8/WikiWidgetPlayButton.png',
			'title': mw.message( 'play-button-tooltip' ),
			'alt': mw.message( 'play-button' )
		});

		this.pauseButton = $( '<img>' ).attr({
			'class': 'VivariumButton VivariumPauseButton',
			'src': '//upload.wikimedia.org/wikipedia/commons/6/6e/WikiWidgetPauseButton.png',
			'title': mw.message( 'pause-button-tooltip' ),
			'alt': mw.message( 'pause-button' )
		}).hide(); // The pause button starts hidden

		this.nextGenerationButton = $( '<img>' ).attr({
			'class': 'VivariumButton VivariumNextGenerationButton',
			'src': '//upload.wikimedia.org/wikipedia/commons/b/bf/WikiWidgetNextFrameButton.png',
			'title': mw.message( 'next-generation-button-tooltip' ),
			'alt': mw.message( 'next-generation-button' )
		});

		// Put it all together
		this.menu.append(
			this.zoomInButton,
			this.zoomOutButton,
			this.gridButton,
			this.resetButton,
			this.playButton,
			this.pauseButton,
			this.nextGenerationButton
		);
		this.container.append(
			this.canvas,
			this.menu,
			this.generationCounter,
			this.populationCounter
		);
		this.wrapper.html( this.container );

		this.bindEvents = function ( board, game, mouse, touch ) {

			// Board events
			this.zoomOutButton.click( function () { board.zoomOut(); } );
			this.zoomInButton.click( function () { board.zoomIn(); } );
			this.gridButton.click( function () { board.toggleGrid(); } );

			// Game events
			this.resetButton.click( function () { game.reset(); } );
			this.playButton.click( function () { game.play(); } );
			this.pauseButton.click( function () { game.pause(); } );
			this.nextGenerationButton.click( function () { game.nextGeneration(); } );

			// Mouse events
			this.canvas.mousedown( function ( event ) { mouse.down( event ) } );
			this.canvas.mousemove( function ( event ) { mouse.move( event ) } );
			this.canvas.mouseup( function ( event ) { mouse.up( event ) } );

			// Touch events
			this.canvas.bind( 'touchstart', function ( event ) { touch.start( event ) } );
			this.canvas.bind( 'touchmove', function ( event ) { touch.move( event ) } );
			this.canvas.bind( 'touchend', function ( event ) { touch.end( event ) } );
		};
	},

	Board: function ( gui ) {

		this.gui = gui;

		this.canvas = this.gui.canvas[0];
		this.context = this.canvas.getContext( '2d' );

		this.width = this.canvas.width;
		this.height = this.canvas.height;

		this.centerX = 0;
		this.centerY = 0;

		this.cellSize = 4;

		this.xCells = Math.floor( this.width / this.cellSize );
		this.yCells = Math.floor( this.height / this.cellSize );

		this.grid = false;

		this.populationCounter = 0;

		/**
		 * These arrays hold the coordinates of the live cells
		 */
		this.newLiveCells = [];
		this.oldLiveCells = [];

		/**
		 * Constructor
		 */
		this.init = function () {
			this.oldLiveCells = [];
			this.newLiveCells = [];
			this.centerX = 0;
			this.centerY = 0;
			this.setPopulationCounter( 0 );

			var wrapper = this.gui.wrapper,
				width = wrapper.data( 'width' ),
				height = wrapper.data( 'height' ),
				cells = wrapper.data( 'cells' ),
				zoom = wrapper.data( 'zoom' ),
				grid = wrapper.data( 'grid' );

			if ( width ) {
				this.setWidth( width );
			}

			if ( height ) {
				this.setHeight( height );
			}

			if ( cells ) {
				cells = cells.replace( /\s/g, '' ).split( ';' );
				for ( var i in cells ) {
					this.addCell( cells[ i ] );
				}
			}

			if ( zoom ) {
				this.setCellSize( zoom );
			}

			if ( grid ) {
				this.grid = true;
			}

			this.refill();
		};

		/* Getters */

		this.getXcells = function () {
			return Math.floor( this.width / this.cellSize );
		};

		this.getYcells = function () {
			return Math.floor( this.height / this.cellSize );
		};

		/**
		 * Takes a string of coordinates (like "23,-75")
		 * and returns the state of the cell
		 */
		this.getNewState = function ( coords ) {
			if ( this.newLiveCells.indexOf( coords ) === -1 ) {
				return 0; // Dead
			}
			return 1; // Alive
		};
		this.getOldState = function ( coords ) {
			if ( this.oldLiveCells.indexOf( coords ) === -1 ) {
				return 0; // Dead
			}
			return 1; // Alive
		};

		/**
		 * Takes a string of coordinates (like "23,-75")
		 * and returns an array with the neighboring coordinates
		 */
		this.getNeighbors = function ( coords ) {
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
		};

		/**
		 * Takes a string of coordinates (like "23,-75")
		 * and returns the number of live neighbors
		 */
		this.getLiveNeighborCount = function ( coords ) {
			var neighbors = this.getNeighbors( coords ),
				liveNeighborCount = 0;
			for ( var i = 0, len = neighbors.length; i < len; i++ ) {
				if ( this.oldLiveCells.indexOf( neighbors[ i ] ) > -1 ) {
					liveNeighborCount++;
				}
			}
			return liveNeighborCount;
		};

		/* Setters */

		this.setWidth = function ( value ) {
			this.width = value;
			this.canvas.setAttribute( 'width', value );
			this.xCells = this.getXcells();
		};

		this.setHeight = function ( value ) {
			this.height = value;
			this.canvas.setAttribute( 'height', value );
			this.yCells = this.getYcells();
		};

		this.setCellSize = function ( value ) {
			this.cellSize = parseInt( value );
			this.xCells = this.getXcells();
			this.yCells = this.getYcells();
		};

		this.setPopulationCounter = function ( value ) {
			this.populationCounter = value;
			this.gui.populationCounter.text( mw.message( 'population-counter' ) + value );
		};

		/* Actions */

		this.zoomIn = function () {
			if ( this.cellSize === 32 ) {
				return;
			}
			this.setCellSize( this.cellSize * 2 );
			this.refill();
		};

		this.zoomOut = function () {
			if ( this.cellSize === 1 ) {
				return;
			}
			this.setCellSize( this.cellSize / 2 );
			this.refill();
		};

		this.toggleGrid = function () {
			this.grid = this.grid ? false : true;
			this.refill();
		};

		this.drawGrid = function () {
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
		};

		this.fill = function () {
			for ( var i = 0, len = this.newLiveCells.length; i < len; i++ ) {
				this.fillCell( this.newLiveCells[ i ] );
			}
			if ( this.grid ) {
				this.drawGrid();
			}
		};

		this.clear = function () {
			this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		};

		this.refill = function () {
			this.clear();
			this.fill();
		};

		this.fillCell = function ( coords ) {
			var coords = coords.split( ',' ),
				x = parseInt( coords[0] ),
				y = parseInt( coords[1] ),
				minX = this.centerX - Math.floor( this.xCells / 2 ),
				minY = this.centerY - Math.floor( this.yCells / 2 ),
				maxX = minX + this.xCells,
				maxY = minY + this.yCells;
			if ( x < minX || y < minY || x > maxX || y > maxY ) {
				return; // If the cell is beyond view, don't draw it
			}
			var rectX = Math.abs( this.centerX - Math.floor( this.xCells / 2 ) - x ) * this.cellSize,
				rectY = Math.abs( this.centerY - Math.floor( this.yCells / 2 ) - y ) * this.cellSize,
				rectW = this.cellSize - ( this.grid && this.cellSize >= 4 ? 1 : 0 ), // Don't draw over the grid
				rectH = this.cellSize - ( this.grid && this.cellSize >= 4 ? 1 : 0 );
			this.context.fillStyle = 'white';
			this.context.fillRect( rectX, rectY, rectW, rectH );
		};

		this.clearCell = function ( coords ) {
			var coords = coords.split( ',' ),
				x = coords[0],
				x = parseInt( x ),
				y = coords[1],
				y = parseInt( y ),
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
		};

		this.addCell = function ( coords ) {
			this.newLiveCells.push( coords );
			this.fillCell( coords );
			this.setPopulationCounter( this.populationCounter + 1 );
		};

		this.removeCell = function ( coords ) {
			var index = this.newLiveCells.indexOf( coords );
			this.newLiveCells.splice( index, 1 ); // Remove the coords from the array
			this.clearCell( coords );
			this.setPopulationCounter( this.populationCounter - 1 );
		};
	},

	Game: function ( board ) {

		this.board = board;

		this.playing = false;

		this.generationCounter = 0;

		/* Setters */

		this.setGenerationCounter = function ( value ) {
			this.generationCounter = value;
			this.board.gui.generationCounter.text( mw.message( 'generation-counter' ) + value );
		};

		/* Actions */

		/**
		 * This method is the heart of the widget
		 */
		this.nextGeneration = function () {
			this.setGenerationCounter( this.generationCounter + 1 );
			this.board.oldLiveCells = this.board.newLiveCells.slice(); // Clone the array
			var liveCells = this.board.oldLiveCells,
				coords,
				neighbors,
				relevantCells = liveCells, // The relevant cells are the live ones plus their neighbors minus the duplicates
				seen = [],
				state,
				liveNeighborCount;
			for ( var i = 0, len = liveCells.length; i < len; i++ ) {
				coords = liveCells[ i ];
				neighbors = this.board.getNeighbors( coords );
				relevantCells = relevantCells.concat( neighbors );
			}
			for ( var i = 0, len = relevantCells.length; i < len; i++ ) {
				coords = relevantCells[ i ];
				if ( seen.indexOf( coords ) > -1 ) {
					continue; // Ignore duplicates
				}
				seen.push( coords );
				state = this.board.getOldState( coords );
				liveNeighborCount = this.board.getLiveNeighborCount( coords );
				// Death by underpopulation or overpopulation
				if ( state === 1 && ( liveNeighborCount < 2 || liveNeighborCount > 3 ) ) {
					this.board.removeCell( coords );
				}
				// Reproduction
				else if ( state === 0 && liveNeighborCount === 3 ) {
					this.board.addCell( coords );
				}
			}
		};

		this.reset = function () {
			// Reset the board
			this.board.init();

			// Reset the game
			this.pause();
			this.setGenerationCounter( 0 );
		};

		this.play = function () {
			if ( this.playing ) {
				return; // The game is already playing
			}
			var game = this;
			this.playing = setInterval( function () { game.nextGeneration(); }, 1 ); // The interval id is stored in the playing property
			this.board.gui.playButton.hide();
			this.board.gui.pauseButton.show();
		};

		this.pause = function () {
			if ( !this.playing ) {
				return; // The game is already paused
			}
			clearInterval( this.playing );
			this.playing = false;
			this.board.gui.playButton.show();
			this.board.gui.pauseButton.hide();
		};
	},

	Mouse: function ( board, game ) {

		this.board = board;
		this.game = game;

		/**
		 * The position relative to the origin of the coordinate system of the board (in cells, not pixels)
		 */
		this.newX = null;
		this.newY = null;
		this.oldX = null;
		this.oldY = null;

		this.state = null; // up or down
		this.drag = false;

		/**
		 * Getters
		 */
		this.getX = function ( event ) {
			var offsetX = event.pageX - $( event.target ).offset().left - 1, // The -1 is to correct a minor displacement
				newX = this.board.centerX - Math.floor( this.board.xCells / 2 ) + Math.floor( offsetX / this.board.cellSize );
			return newX;
		};

		this.getY = function ( event ) {
			var offsetY = event.pageY - $( event.target ).offset().top - 2, // The -2 is to correct a minor displacement
				newY = this.board.centerY - Math.floor( this.board.yCells / 2 ) + Math.floor( offsetY / this.board.cellSize );
			return newY;
		};

		/**
		 * Event handlers
		 */
		this.down = function ( event ) {
			this.state = 'down';
			this.newX = this.getX( event );
			this.newY = this.getY( event );
		};

		this.move = function ( event ) {
			if ( this.state === 'down' ) {

				this.oldX = this.newX;
				this.oldY = this.newY;
				this.newX = this.getX( event );
				this.newY = this.getY( event );

				if ( this.newX !== this.oldX || this.newY !== this.oldY ) {

					this.drag = true;

					this.board.centerX += this.oldX - this.newX;
					this.board.centerY += this.oldY - this.newY;
					this.board.refill();

					// Bugfix: without the following, the board flickers when moving, not sure why
					this.newX = this.getX( event );
					this.newY = this.getY( event );
				}
			}
		};

		this.up = function ( event ) {
			this.state = 'up';

			if ( !this.drag ) {

				this.game.pause();

				var coords = String( this.newX + ',' + this.newY );

				if ( this.board.getNewState( coords ) === 0 ) {
					this.board.addCell( coords );
				} else {
					this.board.removeCell( coords );
				}
			}
			this.drag = false;
		};
	},

	Touch: function ( board ) {

		this.board = board;

		// The distance from the origin of the coordinate system in virtual pixels (not real ones)
		this.newX = null;
		this.newX = null;
		this.oldX = null;
		this.oldY = null;

		this.moved = false;

		/**
		 * Getters
		 */
		this.getX = function ( event ) {
			var offsetX = event.originalEvent.changedTouches[0].pageX - $( event.target ).offset().left,
				newX = this.board.centerX - Math.floor( this.board.xCells / 2 ) + Math.floor( offsetX / this.board.cellSize );
			return newX;
		};

		this.getY = function ( event ) {
			var offsetY = event.originalEvent.changedTouches[0].pageY - $( event.target ).offset().top,
				newY = this.board.centerY - Math.floor( this.board.yCells / 2 ) + Math.floor( offsetY / this.board.cellSize );
			return newY;
		};

		/**
		 * Event handlers
		 */
		this.start = function ( event ) {
			this.newX = this.getX( event );
			this.newY = this.getY( event );
		};

		this.move = function ( event ) {
			this.oldX = this.newX;
			this.oldY = this.newY;
			this.newX = this.getX( event );
			this.newY = this.getY( event );

			this.board.centerX += this.oldX - this.newX;
			this.board.centerY += this.oldY - this.newY;
			this.board.refill();

			// Bugfix: without the following, the board flickers when moving, not sure why
			this.newX = this.getX( event );
			this.newY = this.getY( event );

			this.moved = true;

			event.preventDefault();
		};

		this.end = function ( event ) {
			this.moved = false;
		};
	}
}

jQuery( Vivarium.init );