# Kaleidoscope
Embodied Carbon Design Tool

## New Developer Setup
 * Install nodejs // only need to do this once (install the program; this is not a command)
 * Clone this repository // only need to do this once
 * npm install // only need to do this once
 * npm start
 
Then head to <http://localhost:3000>
* This allows you to view changes as you edit
* Save the file you're working on and then localhost:3000 will refresh with your changes

* Type CTRL+C in terminal to stop npm start command
* Do this before you move to the next step for production build

## Production Build
 * npm run deploy
 * view at <https://payette.com/kaleidoscope/> or <https://payette.github.io/Kaleidoscope/>

## Wordpress Setup
Paste contents of `wordpress_embed_code.html` into a page at the payette.com Wordpress site to embed Kaleidoscope into a Wordpress page. You only have to do this one time, or anytime you update the `wordpress_embed_code.html` file.