const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let uploadedScripts = []; 

app.post('/api/upload-script', (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content) {
        return res.status(400).json({ success: false, message: "Missing title or content" });
    }

    const newScript = {
        id: Date.now(),
        title: title,
        content: content,
        author: author || "Anonymous",
        date: new Date().toISOString()
    };

    uploadedScripts.push(newScript);
    console.log(`New script received: ${title}`);

    res.status(200).json({ success: true, message: "Script uploaded successfully!" });
});

app.get('/api/scripts', (req, res) => {
    res.json(uploadedScripts);
});

app.listen(3000, () => console.log('API running on port 3000'));
