var fs = require('fs');
var Mustache = require("mustache");

function loadTemplate(templatePath, params) {
    var html = fs.readFileSync(templatePath, {encoding:'UTF-8'});
    console.log("read html as ", html);
    return doneReadingTemplate(html, params);
}

/**
 * Use mustache to render the template
 */
function doneReadingTemplate(html, params) {
    var output = Mustache.render(html, params);
    console.log("HTML is ", output);
    return output;
}

exports.loadTemplate = loadTemplate;
