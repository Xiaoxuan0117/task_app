var express = require("express");
var axios = require("axios");
var router = express.Router();

/* POST token */
router.get("/login/oauth/access_token", async function (req, res, next) {
  const { code, state } = req.query;
  if (state !== "79843ijkiruwtuw943q") {
    res.status(404).redirect("http://127.0.0.1:3000/404");
  }
  try {
    const result = await axios({
      url: "https://github.com/login/oauth/access_token",
      method: "post",
      headers: {
        Accept: "application/json",
      },
      params: {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRETS,
        code: code,
      },
    });
    const { access_token } = result.data;

    res.cookie("access_token", access_token);
    res.redirect("http://127.0.0.1:3000/");
  } catch (err) {
    res.status(err.response.status).redirect("http://127.0.0.1:3000/404");
  }
});

/*GET USER */
router.get("/user", async function (req, res) {
  try {
    const result = await axios.get("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${req.cookies.access_token}`,
      },
    });

    res.status(result.status).send(result.data);
  } catch (err) {
    res.status(err.response.status).send(err.response.data);
  }
});

/*GET REPOS */
router.get("/repos", async function (req, res) {
  try {
    const result = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${req.cookies.access_token}`,
      },
    });
    res.status(result.status).send(result.data);
  } catch (err) {
    res.status(err.response.status).send(err.response.data);
  }
});

/* GET issues */
router.get("/taskList", async function (req, res, next) {
  const {
    owner,
    repo,
    page,
    state,
    labels,
    category,
    direction,
    creator,
    assignee,
    mentioned,
  } = req.query;
  const url =
    repo.length === 0
      ? "https://api.github.com/issues"
      : `https://api.github.com/repos/${owner}/${repo}/issues`;
  try {
    const result = await axios({
      url: url,
      method: "get",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${req.cookies.access_token}`,
      },
      params: {
        page,
        state,
        labels,
        category,
        direction,
        filter: req.query.category,
        per_page: 10,
        pulls: false,
        creator,
        assignee,
        mentioned,
      },
    });
    res.status(result.status).send(result.data);
  } catch (err) {
    res.status(err.response.status).send(err.response.data);
  }
});

/* PATCH issue state */
router.get("/updateState", async function (req, res) {
  const { owner, repo, issue_number, state } = req.query;
  try {
    const result = await axios.patch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`,
      {
        state: state,
      },
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${req.cookies.access_token}`,
        },
      }
    );

    res.status(result.status).send(result.data.state);
  } catch (err) {
    res.status(err.response.status).send(err.response.data);
  }
});

/*GET search issues*/
router.get("/taskSearch", async function (req, res) {
  console.log(req.query);
  console.log("q", req.query.query);
  const { query, order, page } = req.query;
  try {
    const result = await axios({
      url: "https://api.github.com/search/issues",
      method: "get",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${req.cookies.access_token}`,
      },
      params: {
        q: query,
        order: order,
        page,
        per_page: 10,
      },
    });
    res.status(result.status).send(result.data);
  } catch (err) {
    res.status(err.response.status).send(err.response.data);
  }
});

/* GET issue */
router.get("/taskDetail", async function (req, res) {
  const { owner, repo, issue_number } = req.query;
  try {
    const result = await axios({
      url: `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`,
      method: "get",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${req.cookies.access_token}`,
      },
    });

    const comment = await axios({
      url: `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}/comments`,
      method: "get",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${req.cookies.access_token}`,
      },
    });
    res
      .status(result.status)
      .send({ ...result.data, comments_data: comment.data });
  } catch (err) {
    res.status(err.response.status).send(err.response.data);
  }
});

/* POST issue */
router.post("/postTask", async function (req, res) {
  const { owner, repo } = req.query;
  const { title, body, labels } = req.body;
  try {
    const result = await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      {
        title: title,
        body: body,
        labels: labels,
      },
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${req.cookies.access_token}`,
        },
      }
    );
    res.status(result.status).send(result.data.state);
  } catch (err) {
    res.status(err.response.status).send(err.response.data);
  }
});

/* PATCH issue */
router.post("/updateTask", async function (req, res) {
  const { owner, repo, issue_number } = req.query;
  const { title, body, labels } = req.body;
  try {
    const result = await axios.patch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`,
      {
        title: title,
        body: body,
        labels: labels,
      },
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${req.cookies.access_token}`,
        },
      }
    );
    res.status(result.status).send(result.data.state);
  } catch (err) {
    res.status(err.response.status).send(err.response.data);
  }
});

module.exports = router;
