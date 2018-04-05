/*
 Collapsible horizontal menu
 Author: Chris Maunder <chris@codeproject.com>
 Site: http://www.codeproject.com
 Twitter: @Chris_Maunder


To use:

1. Setup your menu, taking note to use the correct tag type (DIV) and classes.

   <div class="collapse-menu" data-promoted-class="selected">
	 <div class="menu-item">Long Item 1</div>
	 <div class="menu-item">Item 2</div>
	 <div class="menu-item">Extremely Long Item 3</div>
	 <div class="menu-item selected">Item 4</div>
	 <div class="menu-item">Item 5</div>
	 <div class="menu-item">Medium Item 6</div>
   </div>

2. Include this script.

en the comtaining element gets too narrow to contain the menu an item will be added labelled "..." 
which will have a dropdown menu containing the overflowing items. The data-promoted-class allows 
you to specify a class name that should be applied to the dropdown menu's anchor button if it 
appears on any item that's overflowed.

If item 4 in the example above is forced into the dropdown menu then the dropdown menu will have
the "selected" class added to it.
*/

; (function (window, $, undefined) {
    'use strict';

    /*
     * Utility functions
     */

    var adjustSize = function () {

        var $mainMenu = $('.collapse-menu');
        var maxWidth = $mainMenu.width();
        var promotedClass = $mainMenu.attr('data-promoted-class');
        var currentWidth = 0;

        // Get current overflow menu
        var $overflow = $('.collapse-overflow');
        if ($overflow.length === 0) {
            // Add an overflow menu if none exists. We do this so we can get its size later
            $overflow = $('<div class="collapse-overflow">' +
                '<div class="menu-item menu-anchor">...</div>' +
                '<div class="collapse-overflow-menu"></div>' +
                '</div>');
            $mainMenu.append($overflow);
            // $overflow = $('.collapse-overflow'); - not needed
        }
        else {
            // Remove any menu items currently in the overflow dropdown
            $overflow.find('div.menu-item').each(function (index) {
                if (!$(this).hasClass('menu-anchor'))
                    $(this).appendTo($mainMenu); // pop the items back onto the main menu
            });
        }

        // We'll go through each menu item until we overflow the space available and 
        // push any leftover items into a overflow menu
        var $overflowAnchor = $overflow.find('.menu-anchor');
        var anchorWidth     = $overflowAnchor.outerWidth(true);
        var $overflowMenu   = $overflow.find('.collapse-overflow-menu');
        var exceededWidth   = false;
        var $menuItems      = $mainMenu.find('.menu-item');
        var initialTop      = 0;

        if (promotedClass)
            $overflowAnchor.removeClass(promotedClass);

        $menuItems.each(function (index) {

            var $button = $(this);
            if (index == 0)
                initialTop = $button.position().top;

            if ($button.hasClass('menu-anchor'))
                return;

            if (!exceededWidth) {

                if ($button.position().top > initialTop) { // has it wrapped?
                    exceededWidth = true;
                }
                else {
                    var width = parseFloat($button.outerWidth(true));
                    currentWidth += width;

                    currentWidth = parseFloat($button.position().left) + parseFloat($button.outerWidth(true));

                    // We've hit the limit of what we can fit it. Add an overflow placeholder and 
                    // prepare for overflow. Note that for the first n-1 items we need to also 
                    // ensure we have room for the "..." button. For the last item we'll only add 
                    // an overflow if we exceed the full space available
                    if (currentWidth > (index < $menuItems.length - 1 ? maxWidth - anchorWidth : maxWidth)) {
                        exceededWidth = true;
                        currentWidth -= width; // reset back to the end of the previous. 
                        // Note: this includes the "..." button.
                    }
                }
            }

            // Pop excess menu items into the overflow
            if (exceededWidth) {
                $button.appendTo($overflowMenu);

                if (promotedClass && $button.hasClass(promotedClass))
                    $overflowAnchor.addClass(promotedClass);
            }
        });

        // And finally: remove or move the overflow menu to the end
        if (exceededWidth)
            $overflow.appendTo($mainMenu);
        else
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
            if (!uniqueId)
                uniqueId = "Ensure you have a unique ID if you're calling this more than once";

            if (timers[uniqueId])
                clearTimeout(timers[uniqueId]);

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