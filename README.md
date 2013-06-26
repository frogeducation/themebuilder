FrogOS ThemeBuilder
===================

###Frog 13
Presentations from Frog 13 are available online, also on Github
[Adam's](http://proxymoron.org/pres/a) | [Source on Github](http://github.com/adamhepton/frog13)
[V's](http://proxymoron.org/pres/v) | [Source on Github[(http://github.com/FirsRdJnr/reveal.js)

####Combines the offline theme builder and theme boilerplate files
------------------------

Whats in it?
------------------------
* Offline theme builder
* Example FrogOS widgets
* New HTML boilerplate files
* Extended LESS/CSS markup

How to use it
------------------------

**Host it**

As the ThemeBuilder has been based on the FrogOS platform, you will need to host this tool on a web server to view your theme. If you don't have access to a web server you can use a localhost server - like <a href="http://www.apachefriends.org/en/xampp.html">xampp</a> - which will return the same results.

Once you have your server/localhost setup, move the ThemeBuilder files into this folder and open index.html. You should be able to see the updated boilerplate files with widget content. You can alter the amount of text

**How do I edit a theme?**

If you open the /themebuilder/theme/ folder you will see a collection of files that make up the boilerplate;

* theme.ejs
* screenshot.png
* logo.png
* background-btm.png
* cont-bg.png
* 4 font files - for browsers compatibility
* test-files folder

You can jump straight in, if you’re confident with HTML and CSS, by editing the theme.ejs file. This contains the CSS at the top of the file and the HTML below. If you’d rather play around with the code first, you can open the test-files folder where there’s HTML, LESS and CSS files that you can edit to give you an idea of what it will look like when you convert it to an .ejs file.

Things to remember
------------------------

* All the content needs to be flexible and wrap
* All files used to create a theme need to be under 800kb
* Update the screenshot.png file; this is used as a thumbnail in FrogOS
* Test your theme with both small and large content
* Wrap long words using word-wrap css selector
* Make sure the content area is at least 960px
* Embed all your fonts
* Check font colours
* Don’t use JavaScript
* Will work in anything above IE7, so test accordingly

If you need anymore information, email <a href="mailto:victoria.baron@frogtrade.com">Victoria Baron</a>.
