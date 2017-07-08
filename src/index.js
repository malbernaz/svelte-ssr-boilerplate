import App from "./components/App.html";

const mnt = document.querySelector("main");

let app;
function boot(App) {
  app = new App({ target: mnt });
}

boot(App);

if (module.hot) {
  module.hot.accept(["./components/App.html"], () => {
    const { default: NextApp } = require("./components/App.html");
    app.destroy();
    boot(NextApp);
  });
}
