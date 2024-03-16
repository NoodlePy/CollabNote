code_div = document.getElementById("code")
link_div = document.getElementById("link")
const delay = ms => new Promise(res => setTimeout(res, ms));
const yourDocsButton = document.getElementById("yourdocuments")

window.onload = function() {
  const link = window.location.href;
  var page_file = link.substring(link.length - 11);
  const code = page_file.replace(".html", "")
  link_div.innerHTML = link 
  code_div.innerHTML = code
  console.log(code)
  console.log(link)
}

async function copyCode() {
  const codeDiv = document.getElementById("code");
  const codeText = codeDiv.textContent.trim();
  await navigator.clipboard.writeText(codeText);

  // Show popup message
  const popup = document.getElementById("popup");
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 2000); // Hide the message after 2 seconds
}

async function copyLink() {
  const linkDiv = document.getElementById("link");
  const linkText = linkDiv.textContent.trim();
  await navigator.clipboard.writeText(linkText);

  // Show popup message
  const popup = document.getElementById("popup");
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 2000); // Hide the message after 2 seconds
}


yourDocsButton.addEventListener('click', function yourDocsHandler() {
  splittedLocation = window.location.href.split("/")
  item_to_replace = splittedLocation[splittedLocation.length - 1]
  window.location.href = window.location.href.replace("private/documents/"+item_to_replace , "your_documents.html")
})

