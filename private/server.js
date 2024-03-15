const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const htmlContent = `
 
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./mega_style.css">
  <script src="https://cdn.ckeditor.com/ckeditor5/39.0.2/decoupled-document/ckeditor.js"></script>
</head>

<body>
  <header>
    <nav>
      <div class="container">
        <h1>CollaborativeNote+</h1>
      </div>
    </nav>
    <div class="your-projects-button-container">
      <a class="zeroclass yourdocuments cta-button" id="yourdocuments">Your Documents</a>
    </div>
  </header>
  <!-- Create the toolbar container -->
  <div id="toolbar-container"></div>
  <div id="editor" class="notepad">
    <p>Begin writing!</p>
  </div>
  
  <div class="container">
    <div class="invite-container">
      <h2>Invite Others With:</h2>
      <div class="popup" type="text" id="code" onclick="copyCode()">_

      </div>
      <p>OR</p>
      <div class="popup" type="text" id="link" onclick="copyLink()">_

      </div>
    </div>
  </div>
  <div id="popup" class="popup-message">Copied!</div>
  <script src=./mega_js.js></script>
  <script>
    DecoupledEditor
      .create(document.querySelector('#editor'))
      .then(editor => {
        const toolbarItems = editor.ui.view.toolbar.items
        const toolbarContainer = document.querySelector('#toolbar-container');
        const elementToRemove = editor.ui.view.toolbar.element.querySelector('.ck-file-dialog-button');
        elementToRemove.remove();
        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
      })
      .catch(error => {
        console.error(error);
      });

  </script>
</body>

</html>
    `


// Middleware
app.use(bodyParser.json());

// Enable CORS
app.use(cors()); // This will allow all origins by default. You can configure it for specific origins if needed.

// Process the form data for POST requests to /process
app.post('/process', (req, res) => {
    const docname = req.body.docname;
    const doccode = req.body.doccode;
    // Handle the docname data here
    console.log(__dirname);
    const docFilename = `${__dirname}/documents/${docname}`+"-"+`${doccode}`+".html";
    
    fs.writeFile(docFilename, htmlContent, (err) => {
        if (err) {
          console.error('Error creating document:', err);
          res.status(500).json({
            status: 'error',
            message: 'Failed to create the document',
          });
        } else {
          console.log('Document created successfully');
          res.json({
            status: 'success',
            message: 'Document created successfully!',
          });
        }
    });
});

app.get('/find', (req, res) => {
  const doccode = req.query.doccode; // Get the doccode from the query parameters
  var fileName = ``;
  fs.readdir('documents/', (err, files) => {
    files.forEach(file => {
      console.log(file);
      foundFile = file.includes(doccode)
      if (foundFile) {
        fileName = file
        res.status(200).send(fileName);
      } 
    });
  });
});


// Start the server
const port = 5500;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});