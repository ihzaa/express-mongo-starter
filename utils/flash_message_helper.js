module.exports = {
  alert: (req, data) => {
    req.flash("alert", "1");
    if (data.class) req.flash("alert_class", data.class);
    if (data.icon) req.flash("alert_icon", data.icon);
    if (data.title) req.flash("alert_title", data.title);
    if (data.message) req.flash("alert_message", data.message);
    return req;
  },
};
