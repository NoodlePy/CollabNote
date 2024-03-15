code_div = document.getElementById("code")
link_div = document.getElementById("link")
const delay = ms => new Promise(res => setTimeout(res, ms));
const yourDocsButton = document.getElementById("yourdocuments")

window.onload = function() {
  const link = window.location.href;
  var page_file = link.substring(link.length - 11);
  const code = page_file.replace(".html", "")
  link_div.innerHTML = link + `<span class="popuptext" id="linkPopup">Copied Link!</span>`
  code_div.innerHTML = code + `<span class="popuptext" id="codePopup">Copied Code!</span>`
  console.log(code)
  console.log(link)
}

async function showCodePopup() {
  console.log("code clicked")
  var popup = document.getElementById("codePopup");
  popup.classList.toggle("show");
  await delay(1000);
  popup.classList.toggle("show");
  navigator.clipboard.writeText((code_div.textContent).replace("Copied Code!", ""));
  console.log("fuc")
}

async function showLinkPopup() {
  console.log("link clicked")
  var popup = document.getElementById("linkPopup");
  popup.classList.toggle("show");
  await delay(1000);
  popup.classList.toggle("show");
  navigator.clipboard.writeText((link_div.textContent).replace("Copied Link!", ""));
}

yourDocsButton.addEventListener('click', function yourDocsHandler() {
  splittedLocation = window.location.href.split("/")
  item_to_replace = splittedLocation[splittedLocation.length - 1]
  window.location.href = window.location.href.replace("private/documents/"+item_to_replace , "your_documents.html")
})