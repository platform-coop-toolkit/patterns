// Props Chris Coyier (https://css-tricks.com/inline-svg-cached/)

const icons = document.querySelectorAll( 'svg.icon' );

icons.forEach( icon => {
	const iconClasses = icon.classList;
	const url = icon.querySelector( 'use' ).getAttribute( 'xlink:href' );
	fetch( url )
		.then( response => response.text() )
		.then( data => {
			const newEl = document.createElement( 'span' );
			newEl.innerHTML = data;
			newEl.firstChild.setAttribute( 'class', iconClasses );
			icon.parentNode.replaceChild( newEl, icon );

			const parent = newEl.parentNode;
			while ( newEl.firstChild ) parent.insertBefore( newEl.firstChild, newEl );
			parent.removeChild( newEl );
		} );
} );

const menuToggle = document.querySelector( '.menu-toggle' );
const primaryMenu = document.querySelector( '.menu' );
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
	menuButton.innerHTML = `${linkEl.innerHTML}<svg class="icon icon--chevron-s" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="9.8" height="5.886" viewBox="0 0 9.8 5.886"><path d="M15.3,10.3a1,1,0,0,1,1.4,1.4l-4,4a1,1,0,0,1-1.4,0l-4-4a1,1,0,0,1,1.4-1.4L12,13.59l3.3-3.3Z" transform="translate(-7.1 -10.1)" fill="currentColor" fill-rule="evenodd"/></svg>
	`;
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
