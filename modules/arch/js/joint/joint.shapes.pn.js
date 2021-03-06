/*! JointJS v0.8.0 - JavaScript diagramming library  2014-01-22 


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
if (typeof exports === 'object') {

    var joint = {
        util: require('../src/core').util,
        shapes: {
            basic: require('./joint.shapes.basic')
        },
        dia: {
            ElementView: require('../src/joint.dia.element').ElementView,
            Link: require('../src/joint.dia.link').Link
        }
    };
}

joint.shapes.pn = {};

joint.shapes.pn.Place = joint.shapes.basic.Generic.extend({

    markup: '<g class="rotatable"><g class="scalable"><circle class="root"/><g class="tokens" /></g><text class="label"/></g>',

    defaults: joint.util.deepSupplement({

        type: 'pn.Place',
        size: { width: 50, height: 50 },
        attrs: {
            '.root': {
                r: 25,
                fill: 'white',
                stroke: 'black',
                transform: 'translate(25, 25)'
            },
            '.label': {
                'text-anchor': 'middle',
                'ref-x': .5,
                'ref-y': -20,
                ref: '.root',
                fill: 'black',
                'font-size': 12
            },
            '.tokens > circle': {
                fill: 'black',
                r: 5
            },
            '.tokens.one > circle': { transform: 'translate(25, 25)' },
            
            '.tokens.two > circle:nth-child(1)': { transform: 'translate(19, 25)' },
            '.tokens.two > circle:nth-child(2)': { transform: 'translate(31, 25)' },
            
            '.tokens.three > circle:nth-child(1)': { transform: 'translate(18, 29)' },
            '.tokens.three > circle:nth-child(2)': { transform: 'translate(25, 19)' },
            '.tokens.three > circle:nth-child(3)': { transform: 'translate(32, 29)' },

            '.tokens.alot > text': {
		transform: 'translate(25, 18)',
		'text-anchor': 'middle',
                fill: 'black'
            }
        }

    }, joint.shapes.basic.Generic.prototype.defaults)
});


joint.shapes.pn.PlaceView = joint.dia.ElementView.extend({

    initialize: function() {

        joint.dia.ElementView.prototype.initialize.apply(this, arguments);

        this.model.on('change:tokens', function() {

            this.renderTokens();
            this.update();

        }, this);
    },

    render: function() {

        joint.dia.ElementView.prototype.render.apply(this, arguments);

        this.renderTokens();
        this.update();
    },

    renderTokens: function() {

        var $tokens = this.$('.tokens').empty();
        $tokens[0].className.baseVal = 'tokens';

        var tokens = this.model.get('tokens');

        if (!tokens) return;

        switch (tokens) {

          case 1:
            $tokens[0].className.baseVal += ' one';
            $tokens.append(V('<circle/>').node);
            break;
            
          case 2:
            $tokens[0].className.baseVal += ' two';
            $tokens.append(V('<circle/>').node, V('<circle/>').node);
            break;

          case 3:
            $tokens[0].className.baseVal += ' three';
            $tokens.append(V('<circle/>').node, V('<circle/>').node, V('<circle/>').node);
            break;

          default:
            $tokens[0].className.baseVal += ' alot';
            $tokens.append(V('<text/>').text(tokens + '' ).node);
            break;
        }
    }
});

joint.shapes.pn.Actor = joint.shapes.basic.Generic.extend({
    markup: '<g class="rotatable"><g class="scalable"><g transform="translate(10 -30)">' +
            '<circle cx="20" cy="20" r="20"></circle>'+
            '<line x1="20" x2="20" y1="40" y2="75"></line>'+
            '<line x1="20" x2="0" y1="75" y2="105.0"></line>'+
            '<line x1="20" x2="40" y1="75" y2="105.0"></line>'+
            '<line x1="2" x2="38" y1="60.0" y2="60.0"></line></g></g></g>',

        defaults: joint.util.deepSupplement({

            type: 'pn.Actor',
            size: { width: 40, height: 80 },
            attrs: {
                
                'line': {
                    'fill': '#fcfcfc',
                    'stroke': '#000000',
                    'stroke-dasharray': 'none',
                    'stroke-width': 2
                },
                'circle': {
                    'fill': '#fcfcfc',
                    'stroke': '#000000',
                    'stroke-dasharray': 'none',
                    'stroke-width': 2
                },
                '.label': {
                    'text-anchor': 'middle',
                    'ref-x': .5,
                    'ref-y': -20,
                    ref: 'rect',
                    fill: 'black',
                    'font-size': 12
                }
            }

        }, joint.shapes.basic.Generic.prototype.defaults)
});

joint.shapes.pn.Transition = joint.shapes.basic.Generic.extend({

    markup: '<g class="rotatable"><g class="scalable"><rect class="root"/></g></g><text class="label"/>',

    defaults: joint.util.deepSupplement({

        type: 'pn.Transition',
        size: { width: 12, height: 50 },
        attrs: {
            'rect': {
                width: 12,
                height: 50,
                fill: 'black',
                stroke: 'black'
            },
            '.label': {
                'text-anchor': 'middle',
                'ref-x': .5,
                'ref-y': -20,
                ref: 'rect',
                fill: 'black',
                'font-size': 12
            }
        }

    }, joint.shapes.basic.Generic.prototype.defaults)
});

joint.shapes.pn.Link = joint.dia.Link.extend({

    defaults: joint.util.deepSupplement({

        attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }}
        
    }, joint.dia.Link.prototype.defaults)
});

if (typeof exports === 'object') {

    module.exports = joint.shapes.pn;
}
