require("dotenv").config();
const morgan = require("morgan");
const uuid = require("uuid");
const connectDB = require("./config/mongo");

const express = require("express");
const app = express();
const cors = require("cors");

const dialogflow = require("dialogflow");

connectDB();

const PORT = process.env.PORT || 7000;

const projectId = process.env.PROJECT_ID || "enrollmate-407011";
const credentialsPath =
  process.env.CREDENTIALS_PATH || "./enrollmate-407011-ea285dbe5588.json";

process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

async function runSample(query) {
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: query,
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult.fulfillmentText;
  const queryText = responses[0].queryResult.queryText;

  if (result) {
    return {
      user: queryText,
      bot: result,
    };
  } else {
    return Error("No intent matched");
  }
}



app.get("/", async (req, res) => {
  //   const { query } = req.query;
  try {
    // const result = await runSample(query);
    return res.status(200).json({ message: "Server for hotel chatbot" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
});

app.use("/mailer", require('./mailer/mailer'))

app.post("/reply", async (req, res) => {
  try {
    const { query } = req.body;
    const result = await runSample(query);
    return res.status(200).json({ message: "Success", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server up in port ${PORT}`);
});
