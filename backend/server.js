import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { GoogleAuth } from 'google-auth-library';
import axios from 'axios';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan('common'));
app.use(cors(), function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});


// Load service account JSON key (Ensure the path is correct)
const auth = new GoogleAuth({
  keyFile: process.env.KEY_FILE_PATH,
  scopes: ["https://www.googleapis.com/auth/cloud-healthcare", "https://www.googleapis.com/auth/cloud-platform"],
});

// Google Cloud Healthcare API details
const BASE_URL = process.env.FHIR_BASE_URL;

// Function to get an access token
async function getAccessToken() {
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  return accessToken.token;
};

// POST request to create a FHIR resource
app.post("/api/healthcare", async (req, res) => {

  const fhirResource = req.body;
  console.log(req.body);

  try {
    const accessToken = await getAccessToken(); 
    const response = await axios.post(`${BASE_URL}/QuestionnaireResponse`, fhirResource, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/fhir+json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error creating FHIR resource:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});



app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});