;(function($) {
    var monthNames  = ['January','February','March','April','May','June','July','August','September','October','November','December'],
        today       = new Date(),
        thisDay     = today.getDate(),
        thisMonth   = today.getMonth(),
        thisYear    = today.getFullYear();

    function padNumber(n) {
        return (n < 10 ? '0' : '')+n;
    }
    
    function createSelect(clsNm, elmArr, changeFnc) {
        return $('<select/>', {
            'class': clsNm,
            'style': 'margin-right:20px;'
        }).html((function() {           
            return elmArr().join('');
        }())).on('change', changeFnc);
    } 
    
    $.fn.datecompiler = function(options) {
        var defaults = {
            prefix:         'dc__',
            separator:      '/',
            groupInputs:    true,
            groupClass:     '',
            selectClass:    'form-control',
            abbrMonths:     true,
            startYear:      thisYear,
            futureYears:    5,
            inputOrder:     {
                day:    0,
                month:  1,
                year:   2
            },
            outputOrder: {
                day:    1,
                month:  0,
                year:   2
            },
            oncompile:      null,
            css:            {
                'opacity':  0,
                'height':   0,
                'padding':  0,
                'margin':   0,
                'position': 'absolute',
                'z-index': '-100'
            }
        },
        opts = $.extend(true, defaults, options);
  
        this.each(function() {
            var _self   = this,
                $self   = $(_self),
                $group  = null,
                inputs  = {},
                outputs = [],
                compile = function() {
                    var ret = []
                    
                    $.each(opts.outputOrder, function(key, i) {
                       ret[i] = inputs['$'+key][0].value
                    })

                    _self.value = ret.join(opts.separator);
                    
                    if ( opts.oncompile && typeof opts.oncompile === 'function' ) {
                        opts.oncompile.call(_self, _self.value)
                    }
                },
                selectClass = (opts.selectClass.length ? ' '+opts.selectClass : '');

            inputs['$day'] = createSelect(opts.prefix+'day'+selectClass, function() {
                var pdnm    = '',
                    days    = [];    

                for (var d = 1; d <= 31; d++ ) {
                    pdnm = padNumber(d);
                    days.push('<option value="'+pdnm+'"'+(d == thisDay ? ' selected="selected"' : '')+'>'+pdnm+'</option>');
                }

                return days; 
            }, compile);

            inputs['$month'] = createSelect(opts.prefix+'month'+selectClass, function() {
                var months      = [],
                    pdnm, monthName;

                for (var m = 0; m < 12; m++ ) {
                    pdnm = padNumber((m+1))
                    monthName = opts.abbrMonths == 'number' ? pdnm : opts.abbrMonths ? monthNames[m].substring(0,3) : monthNames[m]
                    months.push('<option value="'+pdnm+'"'+(m == thisMonth ? ' selected="selected"' : '')+'>'+monthName+'</option>');
                }

                return months;
            }, compile);

            inputs['$year'] = createSelect(opts.prefix+'year'+selectClass, function() {                
                var startYear       = parseInt(opts.startYear,10),
                    maxYear         = startYear + ((thisYear - startYear) + opts.futureYears),
                    years           = [];

                for (var y = startYear; y <= maxYear; y++) {
                    years.push('<option value="'+y+'"'+(y == thisYear ? ' selected="selected"' : '')+'>'+y+'</option>');
                }

                return years;
            }, compile);

            $.each(opts.inputOrder, function(key, i) {
                outputs[i] = inputs['$'+key]
            })

            if ( opts.groupInputs ) {
                $group = $('<div/>', {
                    'class': opts.groupClass
                }).append(outputs)
            } else {
                $group = outputs
            }

            $self.css((opts.css === 'reset' ? {} : opts.css)).val('').before($group);

        });
        
        return this;
    };
})(jQuery);