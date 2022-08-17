module.exports = function (err, _, res, _) {
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors.map((x) => x.message) });
      break;
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors.map((x) => x.message) });
      break;
    case "emptyEmail":
      res.status(400).json({ message: "Email is empty" });
      break;
    case "emptyPassword":
      res.status(400).json({ message: "Password is empty" });
      break;
    case "invalid":
      res.status(401).json({ message: "Invalid email or password" });
      break;
    case "empty":
      res.status(404).json({ message: "Item(s) not found" });
      break;
    case "unauthorized":
      res
        .status(401)
        .json({ message: "Invalid token or user has not logged in" });
      break;
    case "JsonWebTokenError":
      res
        .status(401)
        .json({ message: "Invalid token or user has not logged in" });
      break;
    case "forbidden":
      res.status(403).json({ message: "Forbidden access" });
      break;
    default:
      res.status(500).json({
        message: "Internal Server Error",
      });
      break;
  }
};
