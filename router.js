var view = require("./view");

function route(pathname, response) {
    console.log("About to route a request for " + pathname);
    pathname = pathname.substr(1);
    
    if (pathname == 'upload') {
        content = upload(response);
    } else {
        content = index(response);
    }
}

function index(response) {
    console.log("Called default routing...");
    console.log("View: ", view);
    var content = "empty";
    var params = {
        name: 'Harris'
    };
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(view.loadTemplate("view/index.html", params));
    response.end();
}

function upload(response) {
    console.log("Called upload routing...");
    var date = new Date();
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World!" + date.getTime());
    response.end();
}

exports.route = route;
