/**
 * Toggle Button class.
 */
class ToggleButton {
	/**
	 * Constructor.
	 *
	 * @param {Object} options
	 */
	constructor( options ) {
		this.config = {
			...{
				selector: '.button--toggle'
			},
			...options
		};

		this.handleClick = this.handleClick.bind( this );
		this.addEventListeners();
	}

	/**
	 * Handle click.
	 *
	 * @param {Event} event
	 */
	handleClick( event ) {
		if ( ! event.target.closest( this.config.selector ) ) return;

		const btn = event.target.closest( this.config.selector );
		const pressed = 'true' === btn.getAttribute( 'aria-pressed' ) || false;
		btn.setAttribute( 'aria-pressed', !pressed );
	}

	/**
	 * Add event listeners.
	 */
	addEventListeners() {
		document.addEventListener( 'click', this.handleClick );
	}
}

export default ToggleButton;
