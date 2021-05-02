const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose")
const cors = require("cors")

const app = express();
//use your id / password here 
const dbUrl = "mongodb+srv://<id>:<password>@cluster0.unhpj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(cors())

mongoose.connect(dbUrl, {  useUnifiedTopology: true, useNewUrlParser: true })

mongoose.connection.once("open", () => {
	console.log("connection has been made...")
})

app.use("/graphql", graphqlHTTP({
	graphiql: true,
	schema,
}));

app.listen(4000, () => {
  console.log("listening 4000....");
});
