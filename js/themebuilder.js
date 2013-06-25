// *** THEMEBUILDER FILES; DO NOT EDIT ***

(function(){
	var Themebuilder = can.Control("Themebuilder",{
	},{
		titles: {
			'short' : 'Lorem',
			'normal' : 'Lorem Ipsum Dolor ',
			'long' : 'Lorem Ipsum Dolor Sit amet, consectetur adipiscing elit. Donec vulputate mi nec quam dictum suscipit.'
		},
		description: {
			'short': 'Lorem ipsum dolor sit amet',
			'normal' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			'long' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate mi nec quam dictum suscipit.'
		},
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate mi nec quam dictum suscipit. Curabitur posuere odio sit amet erat laoreet sit amet auctor arcu facilisis. Sed pretium, nunc eget euismod placerat, magna sem bibendum erat, sed accumsan dui tellus a metus. Duis pellentesque, nisi vitae vulputate venenatis, neque libero tempor nulla, in dictum massa risus vitae lorem. Etiam consequat justo vel felis sollicitudin eu cursus justo venenatis. In arcu mi, porta non venenatis id, vulputate ut erat. Quisque et leo in mi consectetur consectetur vitae vel elit. Morbi sit amet nisi sit amet nulla scelerisque bibendum nec dictum mauris. Pellentesque nec nisi vel purus fermentum adipiscing. Aenean non erat justo, nec placerat lorem. Donec condimentum urna sit amet lectus fringilla dignissim nec sed tellus. ',


		'ul.nav>li click' : function( el, ev ) {
			el.parent('ul').find('li.active').removeClass('active');
			el.addClass('active');
		},

		'#theme-container click': function( el, ev ) {
			this.resetNav();
		},

		'button.editable-text click': function( el, ev ) {
			el.toggleClass('disabled');
			this.setEditable( !el.hasClass( 'disabled' ) );
		},

		'ul.theme-content>li click': function( el, ev ) {
			this.setSelected( el.parent('ul'), el );
			var contentLen = el.data('type');
			this.setContent( contentLen );
		},

		'ul.menu-level>li click': function( el, ev ) {
			this.setSelected( el.parent('ul'), el );
			var menuLevel = el.data('count');

			this.setNav( menuLevel );
		},

		'a.themebuilder-checker-close click': function( el, ev ) {
			var self = this;
			el.parent('div').fadeOut(500, function(){
				$(this).remove();
				self.resetNav();
			});
		},


		'li.theme-check click': function( el, ev ) {
			//run the checker
			var validation = this.validateTheme();
			//pass messages to the display box
			this.element.append( can.view( './views/checker.ejs', validation ) );
		},

		setSelected : function( parent, el ) {
			parent.find('li.selected').removeClass('selected');
			el.addClass('selected');
		},

		init: function() {
			var currentPath = window.location.pathname.split('/');
			currentPath.pop();

			var newPath = currentPath.join('/') + '/theme/';


			this.element.prepend( can.view( './views/menu.ejs' ) )
			.find('#theme-container')
			.append( can.view( 'theme/theme.ejs', {DIR: newPath }) );

			this.setNav( 3 );

			//set the content
			this.setContent( 'normal' );
		},

		resetNav: function(){
			var $active = this.element.find('ul.nav').find('li.active');
			if ( $active.length ) {
				$active.removeClass('active');
			};
		},

		setNav : function( level ) {
			this.element.find('div.main-menu').html( can.view( './views/nav.ejs', {level : level } ) );
		},

		setEditable: function( enabled ) {
			if( enabled ) {
				this.editableElements( 'true' );
			}else{
				this.editableElements( 'false' );
			}
		},

		editableElements: function( bool ){
			this.element.find( 'h1[data-attr="site-title"]' ).attr( 'contenteditable', bool ).end()
				.find( 'p[data-attr="site-desc"]' ).attr( 'contenteditable', bool).end()
				.find( 'div[data-attr="content"]' ).attr( 'contenteditable', bool ).end()
				.find( 'div.main-menu ul').attr( 'contenteditable', bool);
		},

		setContent : function( len ) {
			//set the title
			this.element.find('h1[data-attr="site-title"]').text( this.titles[ len ] );
			this.element.find('p[data-attr="site-desc"]').text( this.description[ len ] );

			var contentCount = len === 'normal' ? 10 : len === 'short' ? 5 : 30,
				contentContent = '';

			for(var i=0; i < contentCount; i++ ) {
				contentContent += this.content;

				if( i % 2 === 0) {
					contentContent += '<br /><br />';
				}
			}

            this.element.find('div[data-attr="content"]').html( contentContent ).prepend( can.view( './views/content.ejs' ) );
		},
		validateTheme: function(){
			var response = {};
				requiredEls = [
					{ 'element' : 'h1',  'attribute' : 'site-title', 'name' : 'title' },
					{ 'element' : 'p',   'attribute' : 'site-desc',  'name' : 'description' },
					{ 'element' : 'div', 'attribute' : 'content',    'name' : 'content' },
					{ 'element' : 'div', 'attribute' : 'site-menu',  'name' : 'menu' }
				],
				reqLen = requiredEls.length;
			response.errors = [];
			//loop through requiredEls and find el
			for( var i=0; i < reqLen; i++){
				var elm = requiredEls[i],
					foundEl = this.element.find(elm.element + '[data-attr="' + elm.attribute + '"]' );

				if(! foundEl.length ){
					response.errors.push(elm.name + ' is missing or lacks data-attr["' + elm.attribute +'"]' );
				}

				//check the menu

				if( elm.attribute === 'site-menu' && foundEl.length){
					//if there's a number in there, we need to ensure that there's 3 in total
					if( foundEl.data('level') !== 'full') {

					}
				}
			}

			//check the menu
			//look for any ids in the dom
			if( response.errors.length === 0) {
				response.message = "No problems with your theme";
			} else {
				response.message = "Please resolve the following errors:";
			}



			return response;
		}
	});

new Themebuilder('div.themebuilder');

})();
