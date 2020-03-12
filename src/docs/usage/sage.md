# Using Pinecone in a Sage 10 Project

This document assumes that you are using [Sage 10](https://github.com/roots/sage/tree/10.0.0-dev).

## Prerequisites

1. Install [Node.js and npm](https://nodejs.org/en/download/).

2. [Create a package.json](https://docs.npmjs.com/creating-a-package-json-file) file in your project.

## Installation

Pinecone must be installed from [NPM](https://npmjs.com). In order to add Pinecone to your project, you'll need to run the following command:

    ```bash
    npm install --save @platform-coop-toolkit/pinecone
    ```

## Build Configuration

[Sage 10](https://github.com/roots/sage/tree/10.0.0-dev) uses [Laravel Mix](https://laravel-mix.com). To use Pinecone, your `webpack.mix.js` file should look like this:

    ```javascript
    const mix = require('laravel-mix');

    mix.setPublicPath('./dist')
        .browserSync('pinecone.test'); // Replace this with your local development URL.

    mix.sass('resources/assets/styles/main.scss', 'styles', {
        sassOptions: {
            includePaths: [path.join(__dirname, 'node_modules')],
        },
    });

    mix.js('resources/assets/scripts/main.js', 'scripts')
        .extract();

    mix.copy('resources/assets/images', 'dist/images')
        .copy('resources/assets/fonts', 'dist/fonts')
        .copy('node_modules/@platform-coop-toolkit/pinecone/src/assets/images', 'dist/images')
        .copy('node_modules/@platform-coop-toolkit/pinecone/src/assets/fonts', 'dist/fonts');

    mix.options({
        processCssUrls: false,
    });
    ```

### Sass

At the top of `resources/assets/styles/main.scss`, add the following line:

    ```scss
    @import "~@platform-coop-toolkit/pinecone";
    ```

Pinecone's component styles, Sass functions and utility classes will now be available for use within your theme's Sass.

### JavaScript

At the top of `resources/assets/scripts/main.js`, add the following line:

    ```javascript
    import Pinecone from '@platform-coop-toolkit/pinecone';
    ```

Pinecone's JavaScript classes will now be available for use within your theme's JavaScript.
