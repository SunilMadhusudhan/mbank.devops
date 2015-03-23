//Setup
(function () {

	require.config({
			baseUrl: (function () { var a = document.URL.split('#')[0].split('/'); a[a.length - 1] = ''; return a.join('/') + '' } ()),
			paths: {
				'text' : 'js/require.text'
			},
			urlArgs: 'bust=' + (new Date()).getTime()
	});

	Backbone.View.prototype.close = function () {
		this.remove();
		this.unbind();
		if (this.onClose) {
			this.onClose();
		}
	};

	Backbone.View.prototype.compileTemplate = function (tpl) {
			var backboneView = this;
			var underscoreTemplateFunction = _.template(tpl);

			return function (data) {
					var generatedHTML = underscoreTemplateFunction(_.extend(data || {}, backboneView.viewHelpers));
					var html = $(generatedHTML);

					return html;
			};
	};

	if ('Marionette' in Backbone) {
		Backbone.Marionette.View.prototype.templateHelpers = Backbone.View.prototype.viewHelpers;

		Backbone.Marionette.TemplateCache.prototype.loadTemplate = function (t) {
      return t;
    };
		
		//extend and override base Backbone.Marionette.Region prototype
		_.extend(Backbone.Marionette.Region.prototype, {
			
			forwardViewEvents: function (view) {
				this.listenTo(view, 'all', function () {
					Backbone.Marionette.triggerMethod.apply(this, Array.prototype.slice.call(arguments));
				}, this);
			},
			
			stopListeningToView: function () {
				var view = this.currentView;
				if (!view || view.isClosed) { return; }
				this.stopListening(view);
			},
			
			show: function (view) {
				this.ensureEl();

				if (view !== this.currentView) {
					this.close();
					this.forwardViewEvents(view);
					view.render();
					this.open(view);
				} else {
					view.render();
				}

				Backbone.Marionette.triggerMethod.call(view, "show");
				Backbone.Marionette.triggerMethod.call(this, "show", view);

				this.currentView = view;
			},
			
			close: function () {
				var view = this.currentView;
				if (!view || view.isClosed) { return; }

				if (view.close) { view.close(); }
				else if (view.remove) { view.remove(); }
				
				this.stopListening(view);
				
				Marionette.triggerMethod.call(this, "close");

				delete this.currentView;
			},
			
			attachView: function (view) {
				this.stopListeningToView();
				this.currentView = view;
				this.forwardViewEvents(view);
			}
			
		});
		
  }

	_.templateSettings.escape = /\{\{(.+?)\}\}/g;
	_.templateSettings.evaluate = /\{%(.+?)%\}/g;
	_.templateSettings.interpolate = /\{#(.+?)#\}/g;

	Backbone.View.prototype.viewHelpers = {
			i18n: function () {
					return I18n.t(_.toArray(arguments).join('.'));
			}
	};

	//setup I18n
	var translations = I18n.translations = {};
	I18n.locale = 'en';
	I18n.defaultLocale = 'en';
	
	require(['js/i18n/en.js', 'js/i18n/pl.js'], function (en, pl) {
		$.extend(translations, en);
		$.extend(translations, pl);
	});
	
})();