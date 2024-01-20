module.exports = (err, req, res, next) => {
  console.log(`error has played : ${err}`);
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.kind === "ObjectId" && err.name === "CastError") {
    // console.log(err.kind, err.name);
    message = "resource not found";
    statusCode = 404;
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🤷‍♂️🤷‍♂️" : err.stack,
  });
};
