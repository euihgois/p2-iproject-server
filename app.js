const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routes/index"));

app.listen(port, () => {
  console.log(`WNAI app listening on port ${port}`);
});
