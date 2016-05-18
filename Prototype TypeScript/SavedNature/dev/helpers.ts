/**
 * CreateDiv
 * 
 * Build a div and append it into the container(parent)
 */
function createDiv(elementName: string) {
    let el = document.createElement(elementName);
        
    document.body.appendChild(el);
    return el;
}