## What is Collapsable-Menu? 

Collapseable Menu is a simple HTML menu that progressively collapses based on available width. I had
need of a simple menu that would expand and contract horizintally depending on the width of the 
viewport, but I wanted to ensure that all selections would still be available regardless of the
width.

For example, consider the menu 

![wide menu](https://github.com/ChrisMaunder/collapsable-menu/raw/master/Images/Menu1.PNG "Wide menu")

This is fine on a wide screen, but on a narrow screen you either chop off items or wrap. What if
we wanted to keep it all on a single line, and have any overflow items appear in a dropdown:

![narrow menu](https://github.com/ChrisMaunder/collapsable-menu/raw/master/Images/Menu2.PNG "Narrow menu")

Simply setup your menu as such:

```
<ul class="collapse-menu">
	<li class="menu-item">Long Item 1</li>
	<li class="menu-item">Item 2</li>
	<li class="menu-item">Extremely Long Item 3</li>
	<li class="menu-item">Item 4</li>
	<li class="menu-item">Item 5</li>
	<li class="menu-item">Medium Item 6</li>
</ul>
```

and include the collapse-menu.min.js and collapse-menu.min.css (1.7Kb total) and you're done.

## Limitations

This is a single-level menu. It doesn't support dropdown menus from any of the top level menu items.
It's just not designed that that type of application. 
## Installation

Simply copy the .js and .css files into a handy directory and reference them from your HTML page. 
You'll need to ensure you have jQuery included as well:

```
<html>
<head>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script type="text/javascript" src="collapse-menu.min.js"></script>
<link type="text/css" rel="stylesheet" href="collapse-menu.min.css">
</head>
<body>
...

## Contributing

Feel free to improve the menu and send a pull request. The code itself is inside a Visual Studio
2017 solution simply to enable CSS and Javascript minification using Mads' minifier addin. The
actual code is in the src directory and can be used as-is in whatever editor and environment you
wish.

## License

Code released under the [Apache 2.0 licence](http://www.apache.org/licenses).