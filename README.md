# Universal "kitchen sink" unitlity functions

Like @lodash, but with more dashes (lots of functionality, and uses underscores instead of camelCase). Kitchen sink utilities and "pure" functions (almost pure - sorting use [].sort()). Promises, filtering, sorting, combining, text analysis, math, curry, sleep, etc.

See also: [@twodash/node](#) and [@twodash/browser](#), which are structured the same way, but are less pure and more platform-specific. Planned for the future are more platform-specific functions: "@twodash/rnative" for React Native, "@twodash/ionic", and in a galaxy far far away "@twodash/quasar".

Inspired by [Lodash](https://lodash.com/docs/4.17.15). This library contains some functions useful to me ([Paul Shorey](https://paulshorey.com)) which are not included in Lodash. Please contribute. I'd love to add you as an equal [@twodash](https://www.npmjs.com/~twodash) team member.

# Installation

These are exported for your choice of environment. When importing, specify **cjs**/**esm**/**\_\_** format. The **\_\_** is meant to be used with the browser `<script>` tag. It creates a `window.__` variable.

```JavaScript
  import { sort_by_rating_and_position } from "@twodash/universal/esm/sort_strings"
```

```JavaScript
  const sort_strings = require("@twodash/universal/esm/sort_strings")
```

```JavaScript
  <!-- download all functions into window.__ -->
  <script src="https://cdn.jsdelivr.net/npm/@twodash/universal@latest/__/index.js"></script>
  <!-- download only the types of functions you need_ -->
  <script src="https://cdn.jsdelivr.net/npm/@twodash/universal@latest/__/sort_strings.js"></script>
```

# Documentation

### Lodash contents (for comparison and reference):

- [Array](https://lodash.com/docs/4.17.15#chunk)
- [Collection](https://lodash.com/docs/4.17.15#countBy) - work with Arrays, Objects, or Arrays of Objects
- [Function](https://lodash.com/docs/4.17.15#after)
- [Lang](https://lodash.com/docs/4.17.15#castArray) - convert and compare different variable types
- [Math](https://lodash.com/docs/4.17.15#add) - mean, sum, divide, etc.
- [Number](https://lodash.com/docs/4.17.15#clamp) - clamp, inRange, random between lower/upper bounds
- [Obj](https://lodash.com/docs/4.17.15#assign)
- [Seq](https://lodash.com/docs/4.17.15#lodash) - "\_" wrapper allows for chaining values and functions
- [String](https://lodash.com/docs/4.17.15#camelCase)
- [Util](https://lodash.com/docs/4.17.15#attempt)
- [Properties](https://lodash.com/docs/4.17.15#VERSION)
- [Methods](https://lodash.com/docs/4.17.15#templateSettings-imports-_)

### Twodash contents (documentation pages coming soon):

- coming soon - for now please see "./src" folder which uses standard JsDoc comments

### Other libraries to try (steal functions from):

- [universal-utils](https://github.com/matthiasak/universal-utils#readme) - useful stuff for Node and browser!
- [javascript-algorithms](https://github.com/trekhleb/javascript-algorithms)
- [todash](https://github.com/hannq/todash/tree/master/src) - comments/readme all in Chinese
- [numjs](#) - brings some array/math functionality from Python to JS

# Featured (examples):

### Universal functions:

`str_hash()` to make a unique number out of a long or short string of text. Not for security or cryptography, but helps a lot to make a unique ID.

`syllable_count()` returns number of syllables for a given word

`arr_remove_item()` removes a value from an array, by value

`ends_in_vowel()` returns true if the input word ends in a vowel

`sort_objects_by_property()` just like `sort_by_rating_and_position()`, but instead of taking a list of items and object of ratings as separate parameters, it takes a list of objects, and sorts the list based on a property of each object.

`sleep()` returns a Promise after a number of milliseconds. Use with async/await to mimic other programming languages like Bash

`for_each_promise_all()` returns a Promise - like a [].forEach, executes the function on each value in array - but with Promises

`call_later()` a taste of curry - define the function and arguments seprately, to be called later.

`parse_error_message()` Error messages come in all shapes and sizes. From simple string, to standard `new Error('...')` to Axios/fetch promises containing an error... Returns a string which you can display to your user, without fear.

### For browser only:

`load_script()` loads a script file into your document

`object_from_querystring()` and other URL utils

`is_retina()` true if on MacBook for example, or any other "retina" or higher resolution screen

### For node.js only:

`parse_cli_args()` gets arguments passed to NodeJS process when it was started

### And many more

As I make write (or find on Stackoverflow) a new function for myself/clients/employers, I copy it to this library. Please contribute your own. Let's combine efforts!

See [CodePen example](https://codepen.io/paulshorey/pen/bGweWaB?editors=0012). Play around with all the functions.

# Development:

This project is built using ES Modules in `./esm`. It is then compiled into CommonJS into `./cjs` and for the browser (exported as window.**) in `./**`. Read more about [ES Modules](https://nodejs.org/api/esm.html).

Please try it, file an issue, add or fix some code, make a pull request. I'd love to make you an equal contributor. Contact [Paul Shorey](https://paulshorey.com) with any feaute requests or bugs. Thank you! Unit tests, code sandbox examples, and better documentation coming soon.
