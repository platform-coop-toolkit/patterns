import 'wicg-inert';

/**
 * Icon Handler.
 */
export function icons() {
	// Props Chris Coyier (https://css-tricks.com/inline-svg-cached/)

	const icons = document.querySelectorAll( 'svg.icon' );

	icons.forEach( icon => {
		const iconClasses = icon.classList;
		const ariaHidden = icon.getAttribute( 'aria-hidden' );
		const viewBox = icon.getAttribute( 'viewBox' );
		const url = ( icon.querySelector( 'use' ) ) ? icon.querySelector( 'use' ).getAttribute( 'href' ) : false;
		if ( url ) {
			fetch( url )
				.then( response => response.text() )
				.then( data => {
					const newEl = document.createElement( 'span' );
					newEl.innerHTML = data;
					newEl.firstChild.setAttribute( 'class', iconClasses );
					if ( ariaHidden )
						newEl.firstChild.setAttribute( 'aria-hidden', true );
					if ( viewBox )
						newEl.firstChild.setAttribute( 'viewBox', viewBox );
					icon.parentNode.replaceChild( newEl, icon );

					const parent = newEl.parentNode;
					while ( newEl.firstChild ) parent.insertBefore( newEl.firstChild, newEl );
					parent.removeChild( newEl );
				} );
		}
	} );
}

/**
 * Menu Handler.
 */
export function menu() {
	// Menu

	const menuToggle = document.querySelector( '.menu-toggle' );
	const primaryMenu = document.querySelector( '.menu' );

	if ( menuToggle && primaryMenu ) {
		const topLevelMenuItems = document.querySelectorAll( '.menu > li > *' );
		const parentMenus = primaryMenu.querySelectorAll( '.menu__submenu-wrapper' );

		menuToggle.onclick = () => {
			const currentState = menuToggle.getAttribute( 'aria-expanded' );
			const newState = ( 'true' !== currentState );
			menuToggle.setAttribute( 'aria-expanded', newState );
		};

		Array.prototype.forEach.call( parentMenus, parentMenu => {
			const linkEl = parentMenu.querySelector( 'a' );
			const menuButton = document.createElement( 'button' );
			menuButton.className = 'menu__item';
			menuButton.setAttribute( 'aria-expanded', false );
			menuButton.innerHTML = `${linkEl.innerHTML}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="icon icon-chevron-down"><path d="m15 9-5 5-5-5" fill="none" stroke="#203131" stroke-linecap="round" stroke-linejoin="round" class="stroke" stroke-width="2"></path></svg>`;
			parentMenu.insertBefore( menuButton, parentMenu.firstChild );
			parentMenu.removeChild( linkEl );
			menuButton.addEventListener( 'click', () => {
				const currentState = menuButton.getAttribute( 'aria-expanded' );
				const newState = ( 'true' !== currentState );
				menuButton.setAttribute( 'aria-expanded', newState );
			} );
			document.addEventListener( 'click', event => {
				if ( ! parentMenu.contains( event.target ) ) {
					menuButton.setAttribute( 'aria-expanded', false );
				}
			} );
			document.onkeydown = function( evt ) {
				evt = evt || window.event;
				let isEscape = false;
				if ( 'key' in evt ) {
					isEscape = 'Escape' == evt.key || 'Esc' == evt.key;
				} else {
					isEscape = 27 == evt.keyCode;
				}
				if ( isEscape ) {
					menuButton.setAttribute( 'aria-expanded', false );
				}
			};
		} );

		Array.prototype.forEach.call( topLevelMenuItems, topLevelMenuItem => {
			topLevelMenuItem.addEventListener( 'focus', () => {
				const openDropDown = primaryMenu.querySelector( '[aria-expanded="true"]' );
				if ( ! openDropDown ) {
					return;
				}
				openDropDown.setAttribute( 'aria-expanded', false );
			} );
		} );
	}
}

/**
 * Card Handler.
 **/
export function cards() {
	// Props Heydon Pickering (https://inclusive-components.design/cards/)
	const cards = document.querySelectorAll( '.card' );

	Array.prototype.forEach.call( cards, card => {
		const link = card.querySelector( 'h2 a' );
		let down, up;
		card.style.cursor = 'pointer';
		card.onmousedown = () => down = +new Date();
		card.onmouseup = () => {
			up = +new Date();
			if ( 200 > ( up - down ) ) {
				link.click();
			}
		};
	} );
}

/**
 * Accordion Handler.
 */
export function accordions() {
	// Props Heydon Pickering (https://inclusive-components.design/collapsible-sections/)
	const accordionGroups = document.querySelectorAll( '.accordions' );

	Array.prototype.forEach.call( accordionGroups, accordionGroup => {
		if ( null === accordionGroup.offsetParent ) {
			return;
		}

		const accordions = accordionGroup.querySelectorAll( '.accordion' );
		const headings = accordionGroup.querySelectorAll( '.accordion__heading' );

		Array.prototype.forEach.call( headings, heading => {
			const accordion = heading.parentNode;
			const contents = heading.nextElementSibling;
			const btn = document.createElement( 'button' );
			btn.setAttribute( 'class', 'accordion__control' );
			btn.setAttribute( 'aria-expanded', 'false' );
			btn.setAttribute( 'type', 'button' );
			btn.innerHTML = `
					${heading.textContent}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="icon icon-add" aria-hidden="true"><g fill="none" stroke="#203131" stroke-linecap="round" stroke-miterlimit="10" class="stroke" stroke-width="2"><path class="vert" d="m10 5v10"></path><path d="m5 10h10"></path></g></svg>
				`;
			heading.parentNode.insertBefore( btn, heading.nextElementSibling );
			heading.parentNode.removeChild( heading );

			contents.hidden = true;

			btn.onclick = () => {
				const expanded = 'true' === btn.getAttribute( 'aria-expanded' ) || false;
				Array.prototype.forEach.call( accordions, accordion => {
					const contents = accordion.querySelector( '.accordion__content' );
					const btn = accordion.querySelector( '.accordion__control' );
					accordion.classList.remove( 'accordion--expanded' );
					contents.hidden = true;
					btn.setAttribute( 'aria-expanded', false );
				} );
				btn.setAttribute( 'aria-expanded', !expanded );
				if ( expanded ) {
					accordion.classList.remove( 'accordion--expanded' );
				} else {
					accordion.classList.add( 'accordion--expanded' );
				}
				contents.hidden = expanded;
			};
		} );
	} );
}

/**
 * Dialog Handler.
 */
export function dialogs() {
	const invokeButton = document.getElementById( 'invoke-dialog' );
	if ( null === invokeButton.offsetParent ) {
		return;
	}
	const elems = document.querySelectorAll( 'body > *' );
	const dialogSource = invokeButton.nextElementSibling;
	const dialogTitle = dialogSource.firstElementChild;
	const dialogContent = dialogTitle.nextElementSibling;

	invokeButton.onclick = () => {
		Array.prototype.forEach.call( elems, elem => {
			elem.setAttribute( 'inert', 'inert' );
		} );
		const unique = +new Date();
		const dialog = document.createElement( 'article' );
		dialog.classList.add( 'has-dark-mint-500-background-color' );
		dialog.setAttribute( 'role', 'dialog' );
		dialog.setAttribute( 'aria-labelledby', `h-${unique}` );
		dialog.innerHTML = `
			<button id="dialog__close"><span class="button__label">Close</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="icon icon-close"><g fill="none" stroke="#203131" stroke-linecap="round" stroke-miterlimit="10" class="stroke" stroke-width="2"><path d="m5 15 10-10"></path><path d="m15 15-10-10"></path></g></svg></button>
			<h1 class="dialog__header" id="h-${unique}">${ dialogTitle.innerHTML }</h1>
			<div class="dialog__content ${ dialogContent.classList }">${ dialogContent.innerHTML }</div>
		`;
		document.body.appendChild( dialog );
		if ( dialogContent.classList.contains( 'accordions' ) ) {
			accordions();
		}

		/**
		 * Close the dialog.
		 */
		const close = () => {
			Array.prototype.forEach.call( elems, elem => {
				if ( elem !== dialog ) {
					elem.removeAttribute( 'inert' );
				}
			} );
			dialog.parentNode.removeChild( dialog );
			invokeButton.focus();
		};

		const closeButton = document.getElementById( 'dialog__close' );
		closeButton.onclick = () => {
			close();
		};

		document.onkeydown = function( evt ) {
			evt = evt || window.event;
			let isEscape = false;
			if ( 'key' in evt ) {
				isEscape = 'Escape' == evt.key || 'Esc' == evt.key;
			} else {
				isEscape = 27 == evt.keyCode;
			}
			if ( isEscape ) {
				close();
			}
		};
	};
}

/**
 * Filter List Handler.
 */
export function filterList() {
	const controls = document.querySelectorAll( '.input-group [aria-expanded]' );
	Array.prototype.forEach.call( controls, control => {
		control.onclick = () => {
			const expanded = 'true' === control.getAttribute( 'aria-expanded' ) || false;
			control.setAttribute( 'aria-expanded', !expanded );
		};
	} );

	const parentFilters = document.querySelectorAll( '.input-group__parent > li > [role="checkbox"]' );
	Array.prototype.forEach.call( parentFilters, filter => {
		filter.addEventListener( 'click', function( event ) {
			let childFilters = false;
			const subList = event.target.parentNode.querySelector( '.input-group__descendant' );
			if ( subList ) {
				childFilters = subList.querySelectorAll( '[type="checkbox"]' );
				if ( childFilters ) {
					Array.prototype.forEach.call( childFilters, childFilter => {
						childFilter.checked = 'false' === event.target.getAttribute( 'aria-checked' ) || false;
					} );
				}
			}
		} );
	} );

	const descendantFilters = document.querySelectorAll( '.input-group__descendant > li > [type="checkbox"]' );
	Array.prototype.forEach.call( descendantFilters, filter => {
		filter.addEventListener( 'change', ( event ) => {
			const parentFilter = event.currentTarget.parentNode.parentNode.parentNode.querySelector( '.input-group__parent > li > [role="checkbox"]' );
			const parentInput = event.currentTarget.parentNode.parentNode.parentNode.querySelector( '.input-group__parent > li > [type="checkbox"]' );
			const siblingFilters = event.currentTarget.parentNode.parentNode.querySelectorAll( '[type="checkbox"]' );
			const checkedSiblingFilters = event.currentTarget.parentNode.parentNode.querySelectorAll( '[type="checkbox"]:checked' );
			if ( event.currentTarget.checked ) {
				if ( checkedSiblingFilters.length === siblingFilters.length ) {
					parentFilter.setAttribute( 'aria-checked', 'true' );
					parentInput.checked = true;
				} else {
					parentFilter.setAttribute( 'aria-checked', 'mixed' );
					parentInput.checked = false;
				}
			} else {
				if ( 0 < checkedSiblingFilters.length ) {
					parentFilter.setAttribute( 'aria-checked', 'mixed' );
					parentInput.checked = false;
				} else {
					parentFilter.setAttribute( 'aria-checked', 'false' );
					parentInput.checked = false;
				}
			}
		} );
	} );
}
