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
function createListElement() 
{
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(date.value + "   " + input.value));
	ul.appendChild(li);
    input.value = ""; // resets input fields
    date.value = "";

    // creates button to mark list items as done/not node
    function markDone() 
    {
		li.classList.toggle("done");
	}

	li.addEventListener("click",markDone)

	// adds 'X' to each list item that will delete them if clicked
	var dBtn = document.createElement("button");
	dBtn.appendChild(document.createTextNode("X"));
	li.appendChild(dBtn);
	dBtn.addEventListener("click", deleteListItem);
    function deleteListItem()
    {
		li.classList.add("delete")
	}
}

function sortList()
{
    var list = document.getElementById("list");
    var switching = true;
    var shouldSwitch, a, i;
    while (switching)
    {
        switching = false;
        a = list.getElementsByTagName("li");
        for (i = 0; i < (a.length - 1); i++)
        {
            shouldSwitch = checkForSwitch (a[i], a[i + 1]);
            console.log(i);
            if (shouldSwitch)
            {
                a[i].parentNode.insertBefore(a[i + 1], a[i]);
                switching = true;
                break;
            }  
        }
    }
}

function checkForSwitch(a, b)
{
    var aString = a.innerHTML;
    var aParts = aString.split("   ");
    var aDateString = aParts[0];
    var aDate = aDateString.split("/");
    var aMonth = parseInt(aDate[0], 10);
    var aDay = parseInt(aDate[1], 10);
    var aYear = parseInt(aDate[2], 10);

    var bString = b.innerHTML;
    var bParts = bString.split("   ");
    var bDateString = bParts[0];
    var bDate = bDateString.split("/");
    var bMonth = parseInt(bDate[0], 10);
    var bDay = parseInt(bDate[1], 10);
    var bYear = parseInt(bDate[2], 10);

    if (bYear < aYear)
    {
        return true;
    }
    else if ((bYear == aYear) && (bMonth < aMonth))
    {
        return true;
    }
    else if ((bYear == aYear) && (bMonth == aMonth) && (bDay < aDay))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function showAll()
{
    var i;
    list = document.getElementById("list");
    li = list.getElementsByTagName("li");
    for (i = 0; i < li.length; i++)
    {
        li[i].style.display = "";
    }
    document.getElementById("all").style.backgroundColor = "#55761a";
    document.getElementById("incomplete").style.backgroundColor = "#264e2c";
    document.getElementById("complete").style.backgroundColor = "#264e2c";
}

function showIncomplete()
{
    var i;
    list = document.getElementById("list");
    li = list.getElementsByTagName("li");
    for (i = 0; i < li.length; i++)
    {
        if ($(li[i]).hasClass("done"))
        {
            li[i].style.display = "none";
        }
        else
        {
            li[i].style.display = "";
        }
    }
    document.getElementById("all").style.backgroundColor = "#264e2c";
    document.getElementById("incomplete").style.backgroundColor = "#55761a";
    document.getElementById("complete").style.backgroundColor = "#264e2c";
}

function showComplete()
{
    var i;
    list = document.getElementById("list");
    li = list.getElementsByTagName("li");
    for (i = 0; i < li.length; i++)
    {
        if ($(li[i]).hasClass("done"))
        {
            li[i].style.display = "";
        }
        else
        {
            li[i].style.display = "none";
        }
    }
    document.getElementById("all").style.backgroundColor = "#264e2c";
    document.getElementById("incomplete").style.backgroundColor = "#264e2c";
    document.getElementById("complete").style.backgroundColor = "#55761a";
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
    else if (inputLength() == 0)
    {
        alert("Task field has been left blank")
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

function saveData()
{
    list = document.getElementById("list");
    li = list.getElementsByTagName("li");
    var i;
    var array = [];
    for (i = 0; i < li.length; i++)
    {
        if ($(li[i]).hasClass("done"))
        {
            var text = li[i].innerHTML;
            var splitText = text.split("<");
            var justText = splitText[0];
            var string = justText + "|complete";
            array.push(string);
        }
        else
        {
            var text = li[i].innerHTML;
            var splitText = text.split("<");
            var justText = splitText[0];
            var string = justText + "|incomplete";
            array.push(string);
        }
    }
    var cookieString = array.join('|');
    console.log(cookieString);
    setCookie("list", cookieString, 30);
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function restoreList()
{
    var string = getCookie("list");
    console.log(string);
    if (string.length > 0)
    {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(array[i]))
        ul.appendChild(li);
        
        function markDone() 
        {
		    li.classList.toggle("done");
	    }
	    li.addEventListener("click",markDone)
        if (array[i + 1] == "complete")
        {
            li.classList.toggle("done");
        }
        var dBtn = document.createElement("button");
	    dBtn.appendChild(document.createTextNode("X"));
	    li.appendChild(dBtn);
	    dBtn.addEventListener("click", deleteListItem);
        function deleteListItem()
        {
		    li.classList.add("delete")
        }
    }
}
