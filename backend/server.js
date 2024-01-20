const express = require("express");
const path = require("path");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");
const dataBase = require("./config/db");
const passport = require("passport");
const session = require("express-session");

const setPassport = require("./config/setPassport");
// const UserModel = require("./models/UserModel");
// const ProductModel = require("./models/ProductModel");
// const OrdertModel = require("./models/OrderModel");
const Port = process.env.PORT || 8000;

dotenv.config();
dataBase();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  "access-control-allow-credentials": true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// files
const productsRoute = require("./routes/products");
const notFound = require("./middleware/notFound");
const usersRoute = require("./routes/usersRoute");
const orderRoute = require("./routes/orderRoute");
const uploadFileRoute = require("./routes/adminControllers/uploadFileRoute");
const errorHandler = require("./middleware/errorHandler");

const _dirname = path.resolve(); //G:\reactProshop
//  (current:G:\reactProshop\backend\server.js)

app.use("/uploads", express.static(path.join(_dirname, "uploads")));
//path name                            //joins("dirname/uploads")

// Routes
app.use("/api", productsRoute);
app.use("/api/users", usersRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadFileRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("welcome to backend server");
  });
}

app.use("/unauthorized", (req, res, next) => {
  const err = new Error("unauthorised cridentials");
  next(err);
});

app.use(notFound);
app.use(errorHandler);
app.listen(Port, () => {
  console.log(`server is runnig on ${Port}`);
});
