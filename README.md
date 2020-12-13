# Browser-specific functions - to help with AJAX, URLs, Promises, Retina, OS, etc.

**NOTE:** Please see also: [@twodash/universal](#), which has much more functionality. Any JavaScript functions that can be used in Node as well as the browser are stored in [@twodash/universal](#). This package has only functions that can NOT be used in Node.js, such as is_retina, http_ajax, http_get, querystring_from_object, etc.


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


# Development:

This project is built using ES Modules in `./esm`. It is then compiled into CommonJS into `./cjs` and for the browser (exported as window.**) in `./**`. Read more about [ES Modules](https://nodejs.org/api/esm.html).

Please try it, file an issue, add or fix some code, make a pull request. I'd love to make you an equal contributor. Contact [Paul Shorey](https://paulshorey.com) with any feaute requests or bugs. Thank you! Unit tests, code sandbox examples, and better documentation coming soon.
