import App from "./components/App.html";

const mnt = document.getElementById("mnt");

function boot(App) {
  new App({ target: ((mnt.innerHTML = ""), mnt) });
}

boot(App);

if (module.hot) {
  module.hot.accept(["./components/App.html"], () => {
    const { default: NextApp } = require("./components/App.html");
    boot(NextApp);
  });
}
