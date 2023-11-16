const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser"); // body-parser ミドルウェアを追加

const app = express();

const PORT = 5000;

app.set("view engine", "ejs");
app.use(express.static("public"));

// body-parserの設定
app.use(bodyParser.json());

// MySQLに接続
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // ご自身のMySQLのユーザー名
  password: "", // ご自身のMySQLのパスワード
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
  res.render("index", { text: "nodejsとexpress" });
});

// スコアを保存するエンドポイント
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
    res.status(200).send("スコアがデータベースに保存されました。");
  });
});

app.listen(PORT, () => console.log(`${PORT}でサーバー起動中`));
