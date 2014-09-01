;(function($) {
    var abbr    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        today   = new Date();

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
            futureYears:    5,
            oncompile:      null
        },
        opts = $.extend(defaults, options);              
  
        this.each(function() {
            var self    = this,
                $group  = null,
                $day    = null,
                $month  = null,
                $year   = null,
                compile = function() {

                    self.value = $month[0].value+opts.separator+$day[0].value+opts.separator+$year[0].value;
                    
                    if ( opts.oncompile && typeof opts.oncompile === 'function' ) {
                        opts.oncompile.call(self, self.value)
                    }
                },
                selectClass = (opts.selectClass.length ? ' '+opts.selectClass : '');

            $day = createSelect(opts.prefix+'day'+selectClass, function() {
                var pdnm = '',
                    days = [];    

                for (var d = 1; d <= 31; d++ ) {
                    pdnm = padNumber(d);
                    days.push('<option value="'+pdnm+'"'+(d == today.getDate() ? ' selected="selected"' : '')+'>'+pdnm+'</option>');
                }

                return days; 
            }, compile);

            $month = createSelect(opts.prefix+'month'+selectClass, function() {
                var months  = [];

                for (var m = 0; m < 12; m++ ) {
                    months.push('<option value="'+padNumber((m+1))+'"'+(m == today.getMonth() ? ' selected="selected"' : '')+'>'+abbr[m]+'</option>');
                }

                return months;
            }, compile);

            $year = createSelect(opts.prefix+'year'+selectClass, function() {
                var thisYear    = today.getFullYear(),
                    years       = [];

                for (var y = 1; y <= opts.futureYears; y++) {
                    years.push('<option value="'+thisYear+'">'+thisYear+'</option>');
                    thisYear++;
                }

                return years;
            }, compile);

            if ( opts.groupInputs ) {
                $group = $('<div/>', {
                    'class': opts.groupClass
                }).append([$day, $month, $year])
            } else {
                $group = [$day, $month, $year]
            }

            $(this).css({
                'opacity':  0,
                'height':   0,
                'padding':  0,
                'margin':   0
            }).val('').before($group);

        });
        
        return this;
    };
})(jQuery);