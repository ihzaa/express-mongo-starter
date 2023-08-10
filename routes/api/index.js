import fs from "fs";

function importRoute(app, dir_path, sub_dir_path = "") {
  fs.readdirSync(dir_path + sub_dir_path).forEach(async function (file) {
    if (file == "index.js") return;
    if (!file.includes(".js")) {
      importRoute(app, `${dir_path}`, `${sub_dir_path}${file}/`);
    } else {
      let route = await import(`./${sub_dir_path}${file}`);
      route.default(app);
    }
  });
}

export default importRoute;
