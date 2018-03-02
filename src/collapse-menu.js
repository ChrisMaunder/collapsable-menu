/*
 Collapsible horizontal menu
 Author: Chris Maunder <chris@codeproject.com>
 Site: http://www.codeproject.com
 Twitter: @Chris_Maunder
*/


; (function (window, $, undefined) {
    'use strict';

    /*
     * Utility functions
     */

    var adjustSize = function () {

        var $mainMenu    = $('.collapse-menu');
        var maxWidth     = $mainMenu.width();
        var currentWidth = 0;        

        // Get current overflow menu
        var $overflow = $('.collapse-overflow');
        if ($overflow.length === 0) {
            // Add an overflow menu if none exists. We do this so we can get its size later
            $overflow = $('<div class="collapse-overflow">'+
                             '<div class="menu-item menu-anchor">...</div>' +
                             '<ul class="collapse-overflow-menu"></ul>' +
                          '</div>');
            $mainMenu.append($overflow);
        }
        else {
            // Remove any menu items currently in the overflow dropdown
            $overflow.find('li').each(function (index) {
                $(this).appendTo($mainMenu); // pop the items back onto the main menu
            });
        }
    
        // We'll go through each menu item until we overflow the space available and 
        // push any leftover items into a overflow menu
		var $overflowAnchor = $overflow.find('.menu-anchor');
        var anchorWidth     = $overflowAnchor.outerWidth(true);
        var $overflowMenu   = $overflow.find('.collapse-overflow-menu');
        var exceededWidth   = false;
        var $menuItems      = $mainMenu.children('.menu-item');
        
        $menuItems.each(function (index) {
                    
            var $button = $(this);
            
            if (!exceededWidth) {
                var width     = parseFloat($button.outerWidth(true));
                currentWidth += width;

                currentWidth = parseFloat($button.position().left) + parseFloat($button.outerWidth(true));

                // We've hit the limit of what we can fit it. Add a overflow and prepare for overflow
                // Note that for the first n-1 items we need to also ensure we have room for the "..."
                // button. For the last item we'll only add a overflow if we exceed the full space 
				// available
                if (currentWidth > (index < $menuItems.length-1 ? maxWidth - anchorWidth : maxWidth)) {
                    exceededWidth = true;
					currentWidth -= width; // reset back to the end of the previous. 
					                       // Note: this includes the "..." button.
                }
            }
            
            // Pop excess menu items into the overflow
            if (exceededWidth) {
                $button.appendTo($overflowMenu);
            }
        });
        
        // And finally: remove or move the overflow menu to the end
        if (exceededWidth) {
            $overflow.appendTo($mainMenu);
			// $overflowMenu.css('right', anchorWidth.toString() + 'px');
			$overflowMenu.css('right', '4px');
        } else
            $overflow.remove();
    };
    

    var initialise = function () {

        // Push the menu items off the main menu onto the end of the main menu. The effect of this
        // is to remove any whitespace between items
        var $mainMenu = $('.collapse-menu');
        var $menuItems = $mainMenu.children('.menu-item');
        $menuItems.each(function (index) {
            $(this).appendTo($mainMenu); // pop the items back onto the main menu
        });

        adjustSize();
    };

    var waitForFinalEvent = (function () {
        var timers = {};
        
        return function (callback, timeout, uniqueId) {
            if (!uniqueId) {
                uniqueId = "Ensure you have a unique ID if you're calling this more than once";
            }
            
            if (timers[uniqueId]) {
                clearTimeout(timers[uniqueId]);
            }
            
            timers[uniqueId] = setTimeout(callback, timeout);
        };
    })();

    /*
     * Event listeners
     */

    // resize function
    $(window).resize(function () {

        adjustSize();

        waitForFinalEvent(function () {
            adjustSize();
        }, 200, "finished resizing");
    });

    // initial load
    $(document).ready(function () {
        initialise();
    });


})(window, jQuery);