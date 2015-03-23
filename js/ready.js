$(document).ready(function () {

	//load selected style
	var theme = X.Cookie.Get(X.Const.Cookie.Theme);
	if (theme) X.Theme.Swap(theme);
	
	//elements with tabindex
	$(document).on('keypress.navigation', '[tabindex], input[type="checkbox"]', {}, function (e) {
		var l = $(this); if (!l.is(':visible')) return;
		if (X.Event.EnterWasClicked(e)) {
			l.click(); //trigger click on the element
		}
	});
	
	//super important for menus:
	$('body').on('keydown.menu', function (e) {
		//check if any menu is visible
		var menu = $('.ui-menu:visible:first');
		if (menu.length) {
			var focused = menu.find('.ui-menu-item-active:visible:last').closest('.ui-menu-item');
			if (focused.length)
				menu = focused.closest('.ui-menu');

			var kc = X.Event.GetEventKeyCode(e);
				
			switch (kc) {
				case X.Event.Key.down:
					if (focused.length) {
						//check index
						if (focused.index() + 1 == focused.parent().children().length) {
							focused.siblings(':first').find('.ui-menu-item-title:first').trigger('focus');
						} else {
							focused.next().find('.ui-menu-item-title:first').trigger('focus');
						}
					} else {
						//focus first
						menu.find('.ui-menu-item-title:first').trigger('focus');
					}
					e.preventDefault();
				break;
				case X.Event.Key.up:
					if (focused.length) {
						//check index
						if (focused.index() == 0) {
							focused.siblings(':last').find('.ui-menu-item-title:first').trigger('focus');
						} else {
							focused.prev().find('.ui-menu-item-title:first').trigger('focus');
						}
					}
					e.preventDefault();
				break;
				case X.Event.Key.left:
					if (focused.length) {
						if (menu.parent().hasClass('ui-menu-item-container')) {
							//this is a submenu
							menu.hide();
						} else {
							//if possible, show previous master menu
							menu.closest('.ui-menu-container').prev().children('.ui-bar-menu-title').trigger('click');
						}
					} else {
						//check if any ui-menu-container-highlight exist
						focused = $('.ui-menu-container-highlight:first');
						if (focused.length) {
							//activate previous menu
							focused.prev().children('.ui-bar-menu-title').trigger('click');
						}
					}
					e.preventDefault();
				break;
				case X.Event.Key.right:
					if (focused.length) {
						var submenu = focused.find('.ui-menu:first');
						if (submenu.length) {
							//has got sub menu
							if (submenu.is(':visible'))
								submenu.find('.ui-menu-item-title:first').trigger('focus');
							else
								submenu.show();
						} else {
							//if possible, show next master menu
							menu.closest('.ui-menu-container').next().children('.ui-bar-menu-title').trigger('click');
						}
					} else {
						//check if any ui-menu-container-highlight exist
						focused = $('.ui-menu-container-highlight:first');
						if (focused.length) {
							//activate previous menu
							focused.next().children('.ui-bar-menu-title').trigger('click');
						}
					}
					e.preventDefault();
				break;
			}
		}
	});

	require(['scripts/areas/examples/main.js'], function (App) {
		App.start();
	});

});