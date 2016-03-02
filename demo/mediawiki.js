/**
 * This file contains a minimal replacement of the mw object
 * So that the widget can run in index.php without MediaWiki
 */
mw = {
	config: {
		get: function ( key ) {
			return 'en'; // Manually change this if you want to test another language
		}
	},
	messages: {
		set: function ( value ) {
			this.messages = value; 
		}
	},
	message: function ( key ) {
		return this.messages.messages[ key ];
	}
};