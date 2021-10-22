export default () => ({
  port: parseInt(process.env.PORT),
  mongoUrl: process.env.MONGODB_URL,
});
