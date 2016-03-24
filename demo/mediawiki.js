/**
 * This file contains a minimal replacement of the mw object
 * so that the demo can run without MediaWiki
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