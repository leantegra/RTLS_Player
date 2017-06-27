var sass = require('node-sass');

sass.render({
    file: 'global.sass',
    output: 'global.css',
    includePaths: [ 'node_modules/'],
    outputStyle: 'compressed'
}, function(error, result) { // node-style callback from v3.0.0 onwards
    if (error) {
        console.log(error.status); // used to be "code" in v2x and below
        console.log(error.column);
        console.log(error.message);
        console.log(error.line);
    }
    else {
        console.log(result.css.toString());
    }
})
