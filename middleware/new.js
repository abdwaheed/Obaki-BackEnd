function myMiddleware(req, res, next) {
  // console.log(localStorage.getItem("token"));
  req.user = "hello";
  next();
}

module.exports = myMiddleware;
