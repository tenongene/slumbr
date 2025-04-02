import express from "express";
import morgan from "morgan";
import { GoogleAuth } from "google-auth-library";
import axios from "axios";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan("common"));
app.use(cors(), function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const userList = [
  {
    email: 'ofeliap@gmail.com',
    password: '123456',
    patientId: '555f3471-021a-e245-8f01-b14aad324265',
  },
  {
    email: 'odeliad@gmail.com',
    password: '123456',
    patientId: 'b1958d3e-a6c9-cf1b-868f-273c4346e198',
  },
  {
    email: 'wilfred.stark@gatech.edu',
    password: '654321',
    patientId: '806265ee-2f07-34d6-3c7e-16c9dae79041',
  },
  {
    email: 'noel.feeney@gmail.com',
    password: '123456',
    patientId: '715e1472-942a-88b7-c8a9-ffa1e5730e70',
  },
  {
    email: 'carrol.tomoko@gmail.com',
    password: '123456',
    patientId: '4677fbab-045f-dd0f-24f5-b429eacfd57d',
  },
  {
    email: 'nakisha.stanton@gmail.com',
    password: '123456',
    patientId: '51e4757f-c3b5-8f49-ecb8-80e50c5cec88',
  },
  {
    email: 'miguel.hernandes@gatech.edu',
    password: '654321',
    patientId: '0cd80639-69c6-bb69-b845-29cec1be6009',
  },
  {
    email: 'duncan.littel@gatech.edu',
    password: '654321',
    patientId: '519796da-0829-c121-abf9-9bae292c6f22',
  },
  {
    email: 'joel.brekke@gatech.edu',
    password: '654321',
    patientId: 'ce2868fb-ff65-1046-6d40-cb311f713261',
  },
  {
    email: 'irving.jacobi@gatech.edu',
    password: '654321',
    patientId: '5a6776aa-a149-cab2-39d0-3f9249e8ed1d',
  },
];



// Load service account JSON key (Ensure the path is correct)
const auth = new GoogleAuth({
  keyFile: process.env.KEY_FILE_PATH,
  scopes: [
    "https://www.googleapis.com/auth/cloud-healthcare",
    "https://www.googleapis.com/auth/cloud-platform",
  ],
});

// Google Cloud Healthcare API details
const BASE_URL = process.env.FHIR_BASE_URL;

// Function to get an access token
async function getAccessToken() {
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  return accessToken.token;
}


//POST request for login/auth
app.post("/api/healthcare/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const user = userList.find(user => user.email === email && user.password === password);

  if (user) {
    res.status(200).send({message: "User authenticated!", patientId: user.patientId, email: user.email});
  } else {
    res.status(401).send("Invalid email or password..... Please try again.");
  }
});


// GET request to read FHIR resource
app.get("/api/healthcare/patient/:id", async (req, res) => {
  const patientId = req.params.id;
  console.log("Fetching FHIR resource with ID:", patientId);

  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(`${BASE_URL}/Patient/${patientId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/fhir+json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error fetching FHIR resource:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// POST request to create FHIR resource
app.post("/api/healthcare/questionnaire", async (req, res) => {
  const fhirResource = req.body;
  console.log(req.body);

  try {
    const accessToken = await getAccessToken();
    const response = await axios.post(
      `${BASE_URL}/QuestionnaireResponse`,
      fhirResource,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/fhir+json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error creating FHIR resource:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});



// GET request to read medications
app.get("/api/healthcare/medications/:id", async (req, res) => {
  const patientId = req.params.id;
  console.log("Fetching FHIR medications for ID:", patientId);

  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(`${BASE_URL}/MedicationStatement?patient=${patientId}&status=active`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/fhir+json",
      },
    });

    if (response.data && response.data.entry) {
     
      const medicationStatements = response.data.entry.map((entry) => entry.resource);
      res.status(200).json(medicationStatements); 
    } else if (response.data && !response.data.entry) {
        res.status(200).json([]);
    }
    else {
      console.error("Unexpected FHIR response:", response.data);
      res.status(500).json({ error: "Unexpected FHIR response" });
    }
  } catch (error) {
    console.error(
      "Error fetching FHIR resource:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});


//GET request to read conditions
app.get("/api/healthcare/conditions/:id", async (req, res) => {
  const patientId = req.params.id;
  console.log("Fetching FHIR conditions for ID:", patientId);

  try {
    const accessToken = await getAccessToken(); 

    const response = await axios.get(`${BASE_URL}/Condition?subject=Patient/${patientId}&clinical-status=active`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/fhir+json",
      },
    });

    if (response.data && response.data.entry) {
      const conditions = response.data.entry.map((entry) => entry.resource);
      res.status(200).json(conditions);
    } else if (response.data && !response.data.entry) {
      res.status(200).json([]); 
    } else {
      console.error("Unexpected FHIR response:", response.data);
      res.status(500).json({ error: "Unexpected FHIR response" });
    }
  } catch (error) {
    console.error(
      "Error fetching FHIR resource:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});


























/////////////////////========================================///////////////////////////////////
app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});

export default app;
