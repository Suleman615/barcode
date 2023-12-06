


function openScanner(fieldName) {
    localStorage.setItem('field', fieldName)
    window.location.assign('/scanner.html')
}


let field = localStorage.getItem('field')

let scannedCode = localStorage.getItem('code')


document.getElementById(field).value = scannedCode



