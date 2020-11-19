const theBody = document.querySelector('body');
console.log(theBody.style);
let theText = document.querySelector('h1');
let theButton = document.querySelector("#help");
theButton.addEventListener('click', change);

var grow = 0;

function change()
{
    grow++;
    if ((grow % 2) == 1)
    {
        theText.textContent = "Too big! Change me back!";
        theButton.style.minWidth = "1024px";
        theButton.style.minHeight = "512px";
        theText.style.fontSize = "56px";
        return;
    }
    if ((grow % 2) == 0)
    {
        theText.textContent = "Help me grow!"
        theButton.style.minWidth = "256px";
        theButton.style.minHeight = "128px";
        theText.style.fontSize = "24px";
        return;
    }
}