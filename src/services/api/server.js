const app = require('./web/app');

const { PORT = '8181' } = process.env;

app.listen(Number(PORT), () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on http://localhost:${PORT}`);
});
