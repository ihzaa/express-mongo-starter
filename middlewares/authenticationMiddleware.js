const flash_message_helper = require("../utils/flash_message_helper");

const guest = (req, res, next) => {
  if (req.session.user != undefined) {
    res.redirect("/admin/dashboard");
    res.end();
  } else next();
};

const auth = (req, res, next) => {
  if (req.session.user == undefined) {
    req = flash_message_helper.alert(req, {
      class: "danger",
      icon: "times",
      title: "Error",
      message: "Anda harus login untuk mengakses halaman!",
    });

    res.redirect("/auth/login");
    res.end();
  } else next();
};

module.exports = { guest, auth };
