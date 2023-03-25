var express = require("express");
var axios = require("axios");
var router = express.Router();

/* POST token */
router.get("/login/oauth/access_token", async function (req, res, next) {
  const { code } = req.query;
  try {
    const result = await axios({
      url: "https://github.com/login/oauth/access_token",
      method: "post",
      headers: {
        Accept: "application/json",
      },
      params: {
        client_id: "7a2d102304bf70a39a54",
        client_secret: "1e62e4e8d11bb34b58f36a79ef9659dd9d18c240",
        code: code,
      },
    });
    const { access_token } = result.data;
    res.cookie("access_token", access_token);
    res.redirect("http://127.0.0.1:3000");
  } catch (err) {
    console.log("err", err);
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
    console.log("err", err.response.status);
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
    console.log("err", err.response.status);
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
    created,
    assignee,
    mentioned,
  } = req.query;
  console.log("c", created, assignee, mentioned);
  const url =
    repo === "myIssue"
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
        created,
        assignee,
        mentioned,
      },
    });
    console.log(result.status);
    res.status(result.status).send(result.data);
  } catch (err) {
    console.log("err", err.response.status);
    res.status(err.response.status).send(err.response.data);
  }
});

/* GET repo issues */
router.get("/taskList/repo", async function (req, res, next) {
  const { owner, repo, page, state, labels, category, direction } = req.query;
  try {
    const result = await axios({
      url: `https://api.github.com/repos/${owner}/${repo}/issues`,
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
      },
    });
    console.log(result.status);
    res.status(result.status).send(result.data);
  } catch (err) {
    console.log("err", err.response.status);
    res.status(err.response.status).send(err.response.data);
  }
});

/* PATCH issue state */
router.get("/updateState", async function (req, res) {
  const { owner, repo, issue_number, state } = req.query;
  console.log("into update", state);
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

    console.log("status", result.data.title, result.data.state);
    res.status(result.status).send(result.data.state);
  } catch (err) {
    console.log("err", err.response.status);
    res.status(err.response.status).send(err.response.data);
  }
});

/* GET issue */
router.get("/taskDetail", async function (req, res) {
  const { owner, repo, issue_number } = req.query;
  console.log(owner, repo, issue_number);
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
    console.log("err", err.response.status);
    res.status(err.response.status).send(err.response.data);
  }
});

/* POST issue */
router.post("/postTask", async function (req, res) {
  const { owner, repo } = req.query;
  const { title, body, labels } = req.body;
  console.log("here", owner, repo, title, body);
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
    console.log("err", err.response.status, err.response.data);
    res.status(err.response.status).send(err.response.data);
  }
});

/* PATCH issue */
router.post("/updateTask", async function (req, res) {
  const { owner, repo, issue_number } = req.query;
  const { title, body, labels } = req.body;
  console.log("here", owner, repo, title, body);
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
    console.log("err", err.response.status, err.response.data);
    res.status(err.response.status).send(err.response.data);
  }
});

module.exports = router;
