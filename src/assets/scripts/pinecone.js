/* global Pinecone */

const menu = document.querySelector( '.menu' );
const menuToggle = document.querySelector( '.menu-toggle' );

if ( menu && menuToggle ) {
	new Pinecone.Menu( menu, menuToggle );
}

const cards = document.querySelectorAll( '.card' );

if ( cards ) {
	Array.prototype.forEach.call( cards, card => {
		new Pinecone.Card( card );
	} );
}


const accordions = document.querySelectorAll( '.accordion' );

if ( accordions ) {
	Array.prototype.forEach.call( accordions, accordion => {
		new Pinecone.Accordion( accordion );
	} );
}
