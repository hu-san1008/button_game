const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

const PORT = 5000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "button_game_db"
});

connection.connect(err => {
  if (err) {
    console.error("MySQLとの接続中にエラーが発生しました: " + err.stack);
    return;
  }
  console.log("MySQLに接続しました。");
});

app.get("/", (req, res) => {
  // データベースからスコアを取得して降順に並べ替えるクエリ
  const query = "SELECT * FROM button_game_score ORDER BY score DESC";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("データベースからの取得中にエラーが発生しました: " + err);
      res.status(500).send("エラーが発生しました。");
      return;
    }

    // ランキングデータをEJSテンプレートに渡して表示
    res.render("index", { ranking: results });
  });
});

app.post("/save-score", (req, res) => {
  const { score } = req.body;

  // データベースにスコアを保存
  const query = `INSERT INTO button_game_score (score) VALUES (${score})`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("データベースへの保存中にエラーが発生しました: " + err);
      res.status(500).send("エラーが発生しました。");
      return;
    }

    // 保存後、再度ランキングを取得してテンプレートに渡す
    const selectQuery = "SELECT * FROM button_game_score ORDER BY score DESC";
    connection.query(selectQuery, (err, rankingResults) => {
      if (err) {
        console.error("データベースからの取得中にエラーが発生しました: " + err);
        res.status(500).send("エラーが発生しました。");
        return;
      }

      // ランキングデータをEJSテンプレートに渡して表示
      res.render("index", { ranking: rankingResults });
    });
  });
});

app.listen(PORT, () => console.log(`${PORT}でサーバー起動中`));
