var exec = require("child_process").exec;

function route(pathname, response) {
    console.log("About to route a request for " + pathname);
    pathname = pathname.substr(1);
    
    if (pathname == 'upload') {
        content = upload(response);
    } else {
        content = index(response);
    }
    return content;
}

function index(response) {
    console.log("Called default routing...");
    var content = "empty";
    
    exec("ls -lah", function (error, stdout, stderr) {
        content = stdout;
    });
    
    return content;
}

function upload(response) {
    console.log("Called upload routing...");
    
    return "Hello upload";
}

exports.route = route;
