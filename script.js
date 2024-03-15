const popupContainer = document.getElementById('popup-container');
const createButton = document.getElementsByClassName('create')[0]
const joinButton = document.getElementsByClassName('join')[0]
const doccodeInput = document.getElementById("doccode-input")
const docnameInput = document.getElementById("docname-input")
const submitDocnameButton = document.getElementById('submit-docname-button');
const submitDoccodeButton = document.getElementById('submit-doccode-button');
const yourDocsButton = document.getElementById("yourdocuments")
const goHome = document.getElementById("goHome")

goHome.addEventListener('click', function homeHandler(){
    window.location.href = window.location.href.replace("your_documents.html","index.html")
})

function generateCode() {
  const charList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  var code = ""
  for (let i = 0; i < 6; i++) {
    code += charList[Math.floor(Math.random() * charList.length)];
  }
  return code;
}

// Function to show a popup by ID with a fade-in effect
function showPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = 'flex';
    // Use a setTimeout to allow the browser to apply the opacity change
    setTimeout(() => {
      popup.style.opacity = '1';
    }, 0);
  }
}

// Function to hide a popup by ID
function hidePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    // Gradually reduce the opacity
    let opacity = 1;
    const fadeOutInterval = setInterval(() => {
      opacity -= 0.1; // Reduce opacity by 0.1 each time (adjust as needed)
      popup.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(fadeOutInterval); // Stop the interval when opacity is 0
        popup.style.display = 'none';
      }
    }, 30); // Adjust the interval duration (in milliseconds) for smoother animation
  }
}

function appendNewDocument(given_docname, given_doccode) {
  // Loop to shift documents from doc4 to doc1
  for (let i = 4; i > 0; i--) {
    const currentKey = "doc" + i;
    const previousKey = "doc" + (i - 1);

    const valueToMove = window.localStorage.getItem(previousKey);
    if (valueToMove !== null) {
      window.localStorage.setItem(currentKey, valueToMove);
    }
  }

  // Set the newest document in doc0
  window.localStorage.setItem("doc0", given_docname + "-" + given_doccode);
}

function handleDocnameSubmit(event) {
  event.preventDefault();
  const docname = docnameInput.value.trim();
  const doccode = generateCode();

  if (docname) {
    console.log('Docname: ' + docname);
    hidePopup('docname-popup');

    // Create a new XMLHttpRequest
    var request = new XMLHttpRequest();

    // Configure the request to send data to your server
    request.open("POST", "http://localhost:5500/process", true);
    request.setRequestHeader("Content-Type", "application/json");

    // Define a callback function to handle the response from the server
     // Define a callback function to handle the response from the server
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          // Request was successful, handle the response from the server here
          console.log("Response from server:", request.responseText);
        }
        appendNewDocument(docname,doccode)
        // Redirect the user to the new HTML page
        var current_window_loc = window.location.href
        const file_name = docname + "-" + doccode
        current_window_loc = current_window_loc.replace("index.html",`private/documents/${file_name}.html`)
        window.location.href = current_window_loc
      } else {
        // Request failed
        console.error("Request failed:", request.status, request.statusText);
      }
     }

    // Create an object containing the data you want to send to the server
    const dataToSend = { docname: docname, doccode: doccode};

    // Convert the data to JSON and send it
    request.send(JSON.stringify(dataToSend));

    docnameInput.value = '';
  }
}

function handleDoccodeSubmit(event) {
  // Send a request to the server to find the file by doccode
  event.preventDefault();
  const doccode = doccodeInput.value.trim(); // Replace with the actual doccode
  
  // Create a new XMLHttpRequest
  const request = new XMLHttpRequest();

  // Configure the request to send data to your server
  request.open('GET', `http://localhost:5500/find?doccode=${doccode}`, true);

  // Define a callback function to handle the response from the server
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        // Request was successful, handle the response from the server here
        const fileName = request.responseText;
        console.log('File name:', fileName);
        appendNewDocument(fileName.replace(".html",""),doccode)
        window.location.href = (window.location.href.replace("index.html","")+`private/documents/${fileName}`)
      } else {
        // Request failed
        console.error('Request failed:', request.status, request.statusText);
      }
    }
  };

  // Send the request to the server
  request.send();
}

submitDocnameButton.addEventListener('click', handleDocnameSubmit);
submitDoccodeButton.addEventListener('click', handleDoccodeSubmit);


docnameInput.addEventListener('keypress' , function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    submitDocnameButton.click();
  }
});

createButton.addEventListener('click' , function createHandler (){
  showPopup('docname-popup');
})

joinButton.addEventListener('click', function joinHandler() {
  showPopup("doccode-popup");
})

yourDocsButton.addEventListener('click', function yourDocsHandler() {
  window.location.href = window.location.href.replace("index.html","your_documents.html")
})

function closePopupOnEscape(event) {
  if (event.key === "Escape") {
    hidePopup('docname-popup'); 
    hidePopup('doccode-popup');
  }
}

document.addEventListener('keydown', closePopupOnEscape);