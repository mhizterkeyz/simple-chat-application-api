const app = require("./src/app");
const config = require("./src/shared/config");

const { port } = config();

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
