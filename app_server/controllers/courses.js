// axios removed, using fetch instead
const debug = require("debug")("app_server");

const coursesReadAll = (req, res) => {
  debug("-------------- READ ALL-------------------------------");
  fetch("http://localhost:3000/api/courses")
    .then((response) => response.json())
    .then((data) => {
      res.render("courses-list", {
        courses: data.courses,
      });
    })
    .catch((error) => {
      debug(error);
    });
};

const coursesReadOne = (req, res) => {
  debug("-------------- READ ONE-------------------------------");

  fetch(`http://localhost:3000/api/courses/${Number(req.params.id)}`)
    .then((response) => response.json())
    .then((data) => {
      res.render("course-info", {
        course: data,
      });
    })
    .catch((error) => {
      debug(error);
    });
};

const coursesDeleteOne = (req, res) => {
  debug("-------------- DELETE ONE-------------------------------");
  debug(req.params.id);
  fetch(`http://localhost:3000/api/courses/${Number(req.params.id)}`, {
    method: "DELETE",
  })
    .then((response) => {
      debug(response);
      res.redirect(`/courses/`);
    })
    .catch((error) => {
      debug(error);
    });
};

const renderForm = (req, res) => {
  res.render("course-form", {
    title: `New Course`,
    error: req.query.err,
  });
};

const coursesForm = (req, res) => {
  debug("----------------   FORM  -----------------------");
  renderForm(req, res);
};

const coursesAddOne = (req, res) => {
  debug("----------------   ADD ONE  -----------------------");
  //debug(req.body)
  if (!req.body.info || !req.body.name) {
    res.redirect(`/courses/new?err=val`);
  } else {
    fetch("http://localhost:3000/api/courses/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    })
      .then((response) => response.json())
      .then((data) => {
        debug(data);
        res.redirect("/courses");
      })
      .catch((error) => {
        debug(error);
      });
  }
};

module.exports = {
  coursesReadAll,
  coursesReadOne,
  coursesAddOne,
  coursesDeleteOne,
  coursesForm,
};
