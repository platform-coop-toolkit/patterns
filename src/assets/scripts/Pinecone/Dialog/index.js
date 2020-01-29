/**
 * Dialog Handler.
 */

/**
 * Dialog class.
 */
class Dialog {
	/**
	 * Constructor.
	 *
	 * @param {DomNode} btn
	 * @param {Object} options
	 */
	constructor( btn, options ) {
		this.btn = btn;
		this.config = {
			...{
				callback:
					/**
					 * Callback for when one was not provided.
					 */
					() => {
						console.error( 'No callback provided.' ); // eslint-disable-line
					}
			},
			...options
		};

		this.invokeDialog = this.invokeDialog.bind( this );
		this.handleClick = this.handleClick.bind( this );
		this.addEventListeners();
	}

	/**
	 *
	 *
	 */
	handleClick() {
		this.invokeDialog( this.config.callback );
	}

	/**
	 * Invoke dialog.
	 *
	 * @param {Function} callback
	 */
	invokeDialog( callback ) {
		const elems = document.querySelectorAll( 'body > *' );
		Array.prototype.forEach.call( elems, ( elem ) => {
			elem.setAttribute( 'inert', 'inert' );
		} );

		const unique = +new Date();

		const dialog = document.createElement( 'div' );
		dialog.setAttribute( 'role', 'dialog' );
		dialog.setAttribute( 'aria-labelledby', `q-${unique}` );
		dialog.innerHTML = `
        	<p id="q-${unique}">${this.config.question}</p>
            <div class="buttons">
				<button class="dismiss">${this.config.dismiss}</button>
				<button class="confirm">${this.config.confirm}</button>
            </div>
		  `;
		const overlay = document.createElement( 'div' );
		overlay.setAttribute( 'inert', 'inert' );
		overlay.classList.add( 'overlay' );

		/**
		 * Handle close event.
		 */
		const close = () => {
			Array.prototype.forEach.call( elems, elem => {
				if ( elem !== dialog ) {
					elem.removeAttribute( 'inert' );
				}
			} );
			dialog.parentNode.removeChild( dialog );
			overlay.parentNode.removeChild( overlay );
			trigger.focus();
		};

		const confirm = dialog.querySelector( '.confirm' );
		const dismiss = dialog.querySelector( '.dismiss' );
		const trigger = this.btn;

		document.body.appendChild( overlay );
		document.body.appendChild( dialog );

		dismiss.focus();

		confirm.onclick = () => {
			close();
			callback();
		};
		dismiss.onclick = () => close();
		dialog.addEventListener( 'keydown', e => {
			if ( 27 == e.keyCode ) {
				e.preventDefault();
				close();
			}
		} );
	}

	/**
	 * Add event listeners.
	 */
	addEventListeners() {
		this.btn.addEventListener( 'click', this.handleClick, false );
	}
}

export default Dialog;
