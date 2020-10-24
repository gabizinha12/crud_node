module.exports = {
  MONGODB_URI:
    NODE_ENV === "production"
      ? "mongodb+srv://deploy:deploy@cluster0.offec.mongodb.net/crud?retryWrites=true&w=majority"
      : "mongodb+srv://softwrap:softwrap@cluster0.offec.mongodb.net/crud?retryWrites=true&w=majority",
};
