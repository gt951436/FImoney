require("dotenv").config();
const app = require("./src/app.js");

const PORT = process.env.PORT || 8080;

const { swaggerUi, specs } = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
