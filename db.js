if (process.env.NODE_ENV == "production") {
  module.exports = {
    MONGODB_URI:
      "mongodb+srv://deploy:deploy@cluster0.offec.mongodb.net/crud?retryWrites=true&w=majority",
  };
} else {
  module.exports = {
    MONGODB_URI:
      "mongodb+srv://softwrap:softwrap@cluster0.offec.mongodb.net/crud?retryWrites=true&w=majority",
  };
}
