// server.js
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

initializeApp({
  credential: applicationDefault(), // Or use serviceAccount if needed
});

const db = getFirestore();

// Multer setup
const upload = multer({ dest: 'uploads/' });

app.post('/upload-resume', upload.single('resume'), async (req, res) => {
  const file = req.file;
  const usn = req.body.usn;

  if (!file || !usn) {
    return res.status(400).json({ error: 'Missing file or USN' });
  }

  try {
    const dataBuffer = fs.readFileSync(file.path);
    const parsed = await pdfParse(dataBuffer);

    await db.collection('resumes').doc(usn).set({
      text: parsed.text,
      uploadedAt: new Date(),
    });

    fs.unlinkSync(file.path); // Delete temp file

    return res.status(200).json({ message: 'Resume uploaded successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to process resume' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
