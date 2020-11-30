var enterButton = document.getElementById("enter");
var input = document.getElementById("task");
var date = document.getElementById("doBy");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");

// returns length of "task" input
function inputLength()
{
    return input.value.length;
}

// confirms "date" format is valid
function dateFormat()
{
    // checks basic format of mm/dd/yyyy
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date.value))
    {
        return false;
    }
    // divides date string into its three components
    var parts = date.value.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);
    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    // adjusts valid day entries in case of leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    {
        monthLength[1] = 29;
    }
    // checks that year and month are valid entries
    if(year < 0 || year > 3000 || month == 0 || month > 12)
    {
        return false;
    }
    // checks that day is a valid entry
    if (day > 0 && day <= monthLength[month - 1])
    {
        return true;
    }
}

// creates list item with input values
function createListElement() {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(date.value + "   " + input.value));
	ul.appendChild(li);
    input.value = ""; // resets input fields
    date.value = "";




    

	//START STRIKETHROUGH
	// because it's in the function, it only adds it for new items
	function crossOut() {
		li.classList.toggle("done");
	}

	li.addEventListener("click",crossOut);
	//END STRIKETHROUGH


	// START ADD DELETE BUTTON
	var dBtn = document.createElement("button");
	dBtn.appendChild(document.createTextNode("X"));
	li.appendChild(dBtn);
	dBtn.addEventListener("click", deleteListItem);
	// END ADD DELETE BUTTON


	//ADD CLASS DELETE (DISPLAY: NONE)
	function deleteListItem(){
		li.classList.add("delete")
	}
    //END ADD CLASS DELETE
}







// changes button text for 2 seconds after it is used to add an item
function changeText(button, newText, originalText)
{
    buttonId = document.getElementById(button);
      buttonId.textContent = newText;
      setTimeout(function() {document.getElementById(button).textContent = originalText; }, 2000);
}

// after "Add" button is pressed, checks validity of input and adds it to list if valid
function addListAfterClick(){
	if (inputLength() > 0 && dateFormat()) { //makes sure that an empty input field doesn't create a li
        createListElement();
    }
    else if (!dateFormat())
    {
        alert("Date must be entered as mm/dd/yyyy");
    }
}

// after return key is pressed, checks validity of input and adds it to list if valid
function addListAfterKeypress(event) 
{
    if (inputLength() > 0 && event.which === 13 && dateFormat()) 
    {
		createListElement();
    } 
    else if (inputLength() > 0 && event.which === 13 && !dateFormat())
    {
        alert("Date must be entered as mm/dd/yyyy");
    }
}

// adds event listeners to both input boxes and the button
enterButton.addEventListener("click",addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
date.addEventListener("keypress", addListAfterKeypress)