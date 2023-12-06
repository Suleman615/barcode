

let field
function openScanner(fieldName) {
    field = fieldName
    window.location.assign('/scanner.html')
}


let scannedCode = localStorage.getItem('code')


document.getElementById(field).value = scannedCode



