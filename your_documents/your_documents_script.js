var zero = document.getElementById("zero")
var one = document.getElementById("one")
var two = document.getElementById("two")
var three = document.getElementById("three")
var four = document.getElementById("four")
const goHome = document.getElementById("goHome")

goHome.addEventListener('click', function homeHandler(){
    window.location.href = window.location.href.replace("your_documents.html","index.html")
})


window.onload = function() {
    function setDefaultTextContent(elementId, localStorageKey) {
        const element = document.getElementById(elementId);
        const storedValue = window.localStorage.getItem(localStorageKey).split("-")[0] ;
        const doccode = window.localStorage.getItem(localStorageKey).split("-")[1]
        console.log(doccode)
        const code_span = element.firstElementChild
        console.log(code_span.id)
        if (storedValue === null || storedValue === "null") {
            element.textContent = "_";
        } else {
            element.innerHTML = storedValue+`<span hidden="true"id="${doccode}"></span>`;
        }
    }

    setDefaultTextContent("zero", "doc0");
    setDefaultTextContent("one", "doc1");
    setDefaultTextContent("two", "doc2");
    setDefaultTextContent("three", "doc3");
    setDefaultTextContent("four", "doc4");
}

function viewDoc(the_element) {
    if (the_element && the_element.textContent !== "_") {
        console.log(the_element)
        console.log(the_element.children)
        const code_span = the_element.firstElementChild
        const doccode = code_span.id; 
        const docname = the_element.textContent
        window.location.href = window.location.href.replace("your_documents.html" , `private/documents/${docname}-${doccode}.html`)
    }
}

zero.addEventListener('click', function connectorfunc() {
    viewDoc(zero);
});

one.addEventListener('click', function connectorfunc() {
    viewDoc(one);
});

two.addEventListener('click', function connectorfunc() {
    viewDoc(two);
});

three.addEventListener('click', function connectorfunc() {
    viewDoc(three);
});

four.addEventListener('click', function connectorfunc() {
    viewDoc(four);
});
