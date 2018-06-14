## What is Collapsable-Menu? 

Collapseable Menu is a simple HTML menu that progressively collapses based on available width. I had
need of a simple menu that would expand and contract horizontally depending on the width of the 
viewport, but I wanted to ensure that all selections would still be available regardless of the
width.

For example, consider the menu 

![wide menu](https://github.com/ChrisMaunder/collapsable-menu/raw/master/Images/menu1.PNG "Wide menu")

This is fine on a wide screen, but on a narrow screen you either chop off items or wrap. What if
we wanted to keep it all on a single line, and have any overflow items appear in a dropdown:

![narrow menu](https://github.com/ChrisMaunder/collapsable-menu/raw/master/Images/Menu2.PNG "Narrow menu")

Simply setup your menu as such:

```html
<div class="collapse-menu">
    <div class="menu-item"><a href="#">Long Item 1</a></div>
    <div class="menu-item"><a href="#">Item 2</a></div>
    <div class="menu-item"><a href="#">Extremely Long Item 3</a></div>
    <div class="menu-item"><a href="#">Item 4</a></div>
    <div class="menu-item"><a href="#">Item 5</a></div>
    <div class="menu-item"><a href="#">Medium Item 6</a></div>
</div>
```

and include the collapse-menu.min.js and collapse-menu.min.css (1.7Kb total) and you're done.

When the comtaining element gets too narrow to contain the menu an item will be added labelled 
"..." which will have a dropdown menu containing the overflowing items. 

You can also supply a `data-promoted-class` attribute to the main `collapse-menu` meny wrapper to
specify a class name that should be applied to the dropdown menu's anchor button if it appears on 
any item that has overflowed.

For example

```html
<div class="collapse-menu" data-promoted-class="selected">
    <div class="menu-item"><a href="#">Long Item 1</a></div>
    <div class="menu-item"><a href="#">Item 2</a></div>
    <div class="menu-item"><a href="#">Extremely Long Item 3</a></div>
    <div class="menu-item selected"><a href="#">Item 4</a></div>
    <div class="menu-item"><a href="#">Item 5</a></div>
    <div class="menu-item"><a href="#">Medium Item 6</a></div>
</div>
```
If item 4 is forced into the dropdown menu then the dropdown menu will have the "selected" class 
added to it.

## Limitations

This is a single-level menu. It doesn't support dropdown menus from any of the top level menu items.
It's just not designed that that type of application. 

## Installation

Simply copy the .js and .css files into a handy directory and reference them from your HTML page. 
You'll need to ensure you have jQuery included as well:

```html
<html>
<head>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script type="text/javascript" src="collapse-menu.min.js"></script>
<link type="text/css" rel="stylesheet" href="collapse-menu.min.css">
</head>
<body>
```

## Contributing

Feel free to improve the menu and send a pull request. The code itself is inside a Visual Studio
2017 solution simply to enable CSS and Javascript minification using Mads' minifier addin. The
actual code is in the src directory and can be used as-is in whatever editor and environment you
wish.
