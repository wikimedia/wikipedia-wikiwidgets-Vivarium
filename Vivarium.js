/**
 * Vivarium is a widget part of the WikiWidgets project.
 * It's meant to be embedded in Wikipedia articles about Conway's Game of Life
 * to aid the understanding of the topic
 *
 * Written by Luis Felipe Schenone in 2015
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
			'previous-pattern-button': 'Zurücksetzen',
			'previous-pattern-button-tooltip': 'Zurücksetzen',
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
			'previous-pattern-button': 'Previous pattern',
			'previous-pattern-button-tooltip': 'Previous pattern',
			'play-button': 'Play',
			'play-button-tooltip': 'Play',
			'pause-button': 'Pause',
			'pause-button-tooltip': 'Pause',
			'next-generation-button': 'Next generation',
			'next-generation-button-tooltip': 'Next generation',
			'next-pattern-button': 'Next pattern',
			'next-pattern-button-tooltip': 'Next pattern',
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
			'previous-pattern-button': 'Patrón anterior',
			'previous-pattern-button-tooltip': 'Patrón anterior',
			'play-button': 'Reproducir',
			'play-button-tooltip': 'Reproducir',
			'pause-button': 'Pausar',
			'pause-button-tooltip': 'Pausar',
			'next-generation-button': 'Generación siguiente',
			'next-generation-button-tooltip': 'Generación siguiente',
			'next-pattern-button': 'Patrón siguiente',
			'next-pattern-button-tooltip': 'Patrón siguiente',
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
			'previous-pattern-button': 'Recommencer',
			'previous-pattern-button-tooltip': 'Recommencer',
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
			'previous-pattern-button': 'Reset',
			'previous-pattern-button-tooltip': 'Reset',
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
			'previous-pattern-button': 'Reset',
			'previous-pattern-button-tooltip': 'Reset',
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

		// Build the GUI and bind the events
		Vivarium.gui.buildAndBind()

		// Set the default action 
		Vivarium.gui.clickCellButton();

		// Autoplay the first pattern
		Vivarium.game.nextPattern();
		Vivarium.game.play();
	},

	gui: {
		buildAndBind: function () {
			var wikiwidget = $( '.WikiWidget[data-wikiwidget="Vivarium"]' ),
				container = $( '<div>' ).addClass( 'VivariumContainer' ),
				canvas = $( '<canvas>' ).addClass( 'VivariumCanvas' ),
				generationCounter = $( '<span>' ).addClass( 'VivariumGenerationCounter' ).text( mw.message( 'generation-counter' ) + 0 ),
				populationCounter = $( '<span>' ).addClass( 'VivariumPopulationCounter' ).text( mw.message( 'population-counter' ) + 0 ),
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
			var previousPatternButton = $( '<img>' ).attr({
				'class': 'VivariumButton VivariumPreviousPatternButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/0/0e/WikiWidgetResetButton.png',
				'title': mw.message( 'previous-pattern-button-tooltip' ),
				'alt': mw.message( 'previous-pattern-button' )
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
			var nextGenerationButton = $( '<img>' ).attr({
				'class': 'VivariumButton VivariumNextGenerationButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/b/bf/WikiWidgetNextFrameButton.png',
				'title': mw.message( 'next-generation-button-tooltip' ),
				'alt': mw.message( 'next-generation-button' )
			});
			var nextPatternButton = $( '<img>' ).attr({
				'class': 'VivariumButton VivariumNextPatternButton',
				'src': '//upload.wikimedia.org/wikipedia/commons/6/63/WikiWidgetNextButton.png',
				'title': mw.message( 'next-pattern-button-tooltip' ),
				'alt': mw.message( 'next-pattern-button' )
			});

			// Put it all together
			menu.append( cellButton )
				.append( moveButton )
				.append( zoomInButton )
				.append( zoomOutButton )
				.append( gridButton )
				.append( previousPatternButton )
				.append( playButton )
				.append( pauseButton )
				.append( nextGenerationButton )
				.append( nextPatternButton )
				.append( generationCounter )
				.append( populationCounter );
			container.append( canvas )
				.append( menu )
				.append( generationCounter )
				.append( populationCounter );
			wikiwidget.append( container );

			// Set the variables that must wait for the DOM to be loaded
			Vivarium.board.setCanvas( canvas[0] );
			Vivarium.board.setWidth( 400 );
			Vivarium.board.setHeight( 300 );

			// Bind events
			canvas.mousedown( Vivarium.mouse.down ).mousemove( Vivarium.mouse.move ).mouseup( Vivarium.mouse.up );
			moveButton.click( Vivarium.gui.clickMoveButton );
			cellButton.click( Vivarium.gui.clickCellButton );
			previousPatternButton.click( Vivarium.game.previousPattern );
			playButton.click( Vivarium.game.play );
			pauseButton.click( Vivarium.game.pause );
			nextGenerationButton.click( Vivarium.game.nextGeneration );
			nextPatternButton.click( Vivarium.game.nextPattern );
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

		population: 0,

		playing: false,

		patterns: {
			0: [],

			1: ['0,0','-1,0','0,1','1,0','-1,-1'], // R-pentomino

			// Oscillators
			2: ["0,0","10,-1","11,2","-14,-1","-13,-1","-13,0","-15,2","-16,2","-16,1","-4,21","-4,20","-5,22","-6,22","-9,20","-6,17","-2,20","-2,21","-1,22","0,22","0,17","3,20","0,24","-1,24","-2,25","-2,26","-4,25","-4,26","-5,24","-6,24","-9,26","-6,29","0,29","3,26","15,15","15,16","15,17","15,14","16,13","17,13","18,13","19,13","20,14","20,15","20,16","20,17","19,18","18,18","17,18","16,18","18,11","19,11","19,10","18,10","13,14","13,15","12,14","12,15","16,20","17,20","16,21","17,21","22,16","22,17","23,17","23,16","-17,13","-16,14","20,4","20,3","21,3","23,7","24,7","24,6","30,6","31,6","31,5","27,1","26,1","26,2","38,5","37,5","38,4","33,-1","32,-1","32,0","44,4","45,4","45,3","39,-3","38,-3","38,-2","19,16","0,1","0,-1","10,0","11,0","10,1","11,1","-14,0","-15,1","-4,19","-7,22","-9,19","-7,17","-2,19","1,22","1,17","3,19","1,24","-2,27","-4,27","-7,24","-9,27","-7,29","1,29","3,27","17,17","-18,14","-17,12","-16,15","-15,13","22,4","22,6","30,4","28,2","36,4","34,0","44,2","40,-2","18,15","-6,9","3,9","28,4","36,2","34,2","42,2","40,0","42,0","16,-5","16,-6","17,-6","18,-6","19,-7","19,-8","18,-9","17,-8","16,-8","15,-9","15,-10","16,-11","15,-12","14,-12","13,-11","13,-10","13,-9","12,-9","-5,-8","-4,-8","-4,-9","-5,-9","-7,-9","-8,-10","-5,-11","-6,-12","-8,-12","-8,-13","-9,-13","-9,-12","-25,6","-26,6","-26,5","-26,4","-25,4","-27,7","-28,6","-30,6","-30,7","-31,6","-32,6","-32,7","-33,5","-32,4","-32,2","-32,1","-32,0","-33,2","-33,0","-31,-1","-30,0","-28,0","-27,0","-26,0","-28,-1","-26,-1","-25,1","-26,2","-22,-6","-21,-6","-23,-7","-24,-8","-25,-9","-25,-10","-24,-11","-23,-12","-22,-13","-21,-13","-20,-12","-19,-11","-18,-10","-18,-9","-19,-8","-20,-7","-5,9","-4,8","-4,10","-3,9","-2,9","-1,9","0,9","1,8","1,10","2,9","-9,25","-5,29","-1,29","3,25","-1,17","3,21","-5,17","-9,21","1,-29","1,-28","0,-29","0,-28","3,-29","3,-28","3,-27","3,-26","4,-30","5,-29","7,-29","6,-29","8,-29","9,-28","10,-27","11,-27","11,-28","8,-27","7,-27","6,-27","8,-26","8,-25","7,-24","6,-23","6,-22","7,-22","4,-25","5,-25","6,-25","6,-31","6,-32","5,-32","27,-21","27,-20","27,-19","28,-18","29,-18","30,-18","31,-18","27,-22","25,-20","25,-19","24,-19","24,-20","28,-16","29,-16","29,-15","28,-15","32,-19","31,-20","33,-20","32,-21","31,-22","29,-22","30,-22","29,-21","28,-23","29,-24","29,-25","28,-25","-42,23","-40,23","-41,23","-39,23","-38,23","-37,23","-35,25","-34,25","-35,26","-35,21","-34,21","-35,20","-44,21","-44,20","-45,21","-44,25","-44,26","-45,25","-33,26","-33,27","-33,28","-32,28","-33,20","-33,19","-33,18","-32,18","-46,20","-46,19","-46,18","-47,18","-46,26","-46,27","-46,28","-47,28","31,25","31,24","32,23","33,24","34,25","33,26","33,27","34,27","36,25","37,26","37,27","36,27","37,24","38,23","39,24","39,25","-23,-24","-23,-25","-22,-25","-21,-24","-21,-23","-21,-22","-20,-21","-19,-21","-18,-22","-18,-23","-18,-24","-17,-25","-16,-25","-16,-24"],

			// Spaceships
			3: ["-39,-12","-39,1","-40,1","-41,1","-42,1","-43,1","-44,0","-39,0","-39,-1","-40,-2","-44,-2","-42,-3","-39,12","-40,12","-41,12","-42,12","-43,12","-44,12","-45,11","-45,9","-39,11","-39,10","-40,9","-42,8","-43,8","-39,-21","-39,-22","-40,-21","-40,-23","-41,-21","-39,-10","-40,-13","-39,-11","-40,-10","-41,-10","-42,-10","-43,-11","-43,-13"],

			// Still life
			4: ["-18,2","-18,3","-17,3","-17,2","-7,-5","-6,-5","-8,-4","-5,-4","-7,-3","-6,-3","1,4","0,4","2,5","2,6","-1,5","0,6","1,7","-10,13","-10,12","-9,12","-9,14","-8,13","8,17","7,18","9,18","8,19","18,0","19,0","17,1","20,1","17,2","18,3","19,3","20,2","7,-13","7,-14","8,-14","8,-12","9,-12","9,-13","-13,15","-14,15","-14,16","-13,17","-12,16","-12,18","-11,17","12,14","13,13","13,15","14,14","11,13","12,12","-15,-12","-16,-12","-17,-11","-14,-11","-16,-10","-15,-9","-14,-9","-13,-10","23,-11","23,-10","24,-11","25,-10","25,-9","25,-8","26,-8","-19,19","-18,19","-19,20","-17,20","-18,21","-17,22","-16,22","-16,21","-36,0","-36,-1","-35,-1","-33,0","-33,1","-34,1","28,13","28,12","29,12","29,11","29,10","30,9","31,9","32,10","32,11","31,12","31,11","31,13","30,14","29,14","16,-22","16,-23","17,-23","18,-21","17,-21","19,-22","20,-22","20,-21","31,-3","31,-2","32,-2","33,-3","33,-4","33,-5","34,-6","35,-6","35,-5","-6,-19","-6,-20","-5,-20","-4,-19","-3,-19","-3,-20","34,-18","33,-18","33,-17","34,-16","35,-16","36,-17","36,-18","36,-19","36,-20","37,-21","38,-21","39,-20","39,-19","38,-19"],
		},

		currentPattern: 0,

		/* Setters */

		setGeneration: function ( value ) {
			Vivarium.game.generation = value;
			$( '.VivariumGenerationCounter' ).text( mw.message( 'generation-counter' ) + value );
		},

		setPopulation: function ( value ) {
			Vivarium.game.population = value;
			$( '.VivariumPopulationCounter' ).text( mw.message( 'population-counter' ) + value );
		},

		/* Actions */

		/**
		 * This method is the heart of the widget
		 */
		nextGeneration: function () {
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
			Vivarium.game.playing = setInterval( Vivarium.game.nextGeneration, 1 ); // The interval's id is stored in the playing property
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

		previousPattern: function () {
			// Only go to the previous pattern if the game hasn't started
			if ( Vivarium.game.generation === 0 ) {
				if ( Vivarium.game.currentPattern === 0 ) {
					Vivarium.game.currentPattern = Object.keys( Vivarium.game.patterns ).length - 1;
				} else {
					Vivarium.game.currentPattern--;
				}
			}

			// Reset the game
			Vivarium.game.pause();
			Vivarium.game.setGeneration( 0 );

			// Reset the board
			Vivarium.board.centerX = 0;
			Vivarium.board.centerY = 0;
			Vivarium.board.oldLiveCells = [];

			// Load the previous pattern
			Vivarium.board.newLiveCells = Vivarium.game.patterns[ Vivarium.game.currentPattern ].slice();
			Vivarium.board.refill();
		},

		nextPattern: function () {
			// Reset the game
			Vivarium.game.pause();
			Vivarium.game.setGeneration( 0 );

			// Reset the board
			Vivarium.board.centerX = 0;
			Vivarium.board.centerY = 0;
			Vivarium.board.oldLiveCells = [];

			// Load the next pattern
			if ( Vivarium.game.currentPattern === Object.keys( Vivarium.game.patterns ).length - 1 ) {
				Vivarium.game.currentPattern = 0;
			} else {
				Vivarium.game.currentPattern++;
			}
			Vivarium.board.newLiveCells = Vivarium.game.patterns[ Vivarium.game.currentPattern ].slice();
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

		/**
		 * The current state of the mouse (up, drag or down) and the method to run on each state
		 */
		state: null,
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
			Vivarium.board.grid = Vivarium.board.grid ? false : true;
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
			Vivarium.game.setPopulation( this.newLiveCells.length );
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
				rectW = this.cellSize - ( this.grid && this.cellSize >= 4 ? 1 : 0 ), // Don't draw over the grid
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
			Vivarium.game.setPopulation( Vivarium.game.population + 1 );
		},

		removeCell: function ( coords ) {
			var index = this.newLiveCells.indexOf( coords );
			this.newLiveCells.splice( index, 1 ); // Remove the coords from the array
			this.clearCell( coords );
			Vivarium.game.setPopulation( Vivarium.game.population - 1 );
		}
	}
}

jQuery( Vivarium.init );