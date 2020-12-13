# Browser-specific functions - to help with AJAX, URLs, Promises, Retina, OS, etc.

### Please see also: [@twodash/universal](#),

That one has much more functionality. Any JavaScript functions that can be used in Node as well as the browser are stored in [@twodash/universal](#). This package has only functions that can NOT be used in Node.js, such as is_retina, http_ajax, http_get, querystring_from_object, etc.

### PLEASE NOTE:

All names in this library (functions, files) will change. Currently figuring out what to call everything. This library will be stabled when released as **`version 1`**.


# Installation

These are exported for your choice of environment. When importing, specify **cjs**/**esm**/**\_\_** format. The **\_\_** is meant to be used with the browser `<script>` tag. It creates a `window.__` variable.

```JavaScript
  <!-- download all functions into window.__ -->
  <script src="https://cdn.jsdelivr.net/npm/@twodash/universal@latest/__/index.js"></script>
  <!-- download only the types of functions you need_ -->
  <script src="https://cdn.jsdelivr.net/npm/@twodash/universal@latest/__/sort_strings.js"></script>
```

## ES Modules
```JavaScript
  import { sort_by_rating_and_position } from "@twodash/universal/esm/sort_strings"
```

## CommonJS
```JavaScript
  const sort_strings = require("@twodash/universal/esm/sort_strings")
```

# Documentation

### Twodash contents (documentation pages coming soon):

- coming soon - for now please see "./src" folder which uses standard JsDoc comments


# Develop:

Please try it, file an issue, add or fix some code, make a pull request. I'd love to make you an equal contributor. Contact [Paul Shorey](https://paulshorey.com) with any feaute requests or bugs. Thank you! Unit tests, code sandbox examples, and better documentation coming soon.

This project is built using ES Modules in `./esm`. It is then compiled into CommonJS into `./cjs` and for the browser (exported as window.**) in `./**`. Read more about [ES Modules](https://nodejs.org/api/esm.html).

## npm run build:

**npm run build** runs these npm scripts, in this order:

1. **ignore_index** - Copy ./esm/index.js to ./index.mjs (so it does not get converted in next step \*\*)
2. **esm_cjs** - Convert ./esm to ./cjs
3. **putback_index** - Copy ./index.mjs back to ./esm/index.js
4. **esm_cjs_index** - Convert ./esm/index.js to ./cjs/index.js (so it can get processed without reference to other files)
5. **browser** - Convert ./esm to ./__

\*\* Don't want to convert `./esm/index.js` to `./cjs/index.js` along with all the other modules in `./esm`, because `rollup` breaks up the functions to prevent redundant code. But I actually want `index.js` to be redundant, to contain code that is already in the other module files. This way, `index.js` is self-contained, and other files are self-contained, not importing anything. I could not figure out how to configure `rollup` command to NOT build with `require()` commands. Can not have `require()` commands because the `parcel` command does convert to browser code well with require commands. Each file already needs to be self-contained before running `parcel build`.
