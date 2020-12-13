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

// after "Add" button is pressed, checks validity of input and adds it to list if valid
function addListAfterClick(){
    if (inputLength() > 0 && dateFormat()) //makes sure that an empty input field doesn't create a li
    { 
        var string = date.value + "   " + input.value; 
        input.value = ""; // resets input fields
        date.value = "";   
        createListElement(string, false);
    }
    // error prompts
    else if (!dateFormat())
    {
        alert("Date must be entered as mm/dd/yyyy");
    }
    else if (inputLength() == 0)
    {
        alert("Task field has been left blank")
    }
}

// changes button text for 2 seconds after it is used to add an item
function changeText(button, newText, originalText)
{
    if (inputLength() > 0 && dateFormat()) 
    {
        buttonId = document.getElementById(button);
        buttonId.textContent = newText;
        setTimeout(function() {document.getElementById(button).textContent = originalText; }, 2000);
    }
}

// after return key is pressed, checks validity of input and adds it to list if valid
function addListAfterKeypress(event) 
{
    if (inputLength() > 0 && event.which === 13 && dateFormat()) 
    {
        var string = date.value + "   " + input.value
        createListElement(string, false);
        input.value = "";
        date.value = "";
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

// creates list item with input values
// "complete" term allows function to be called both after user input and when the page is being built from cookies
// default is for item to be incomplete, but it can be created as complete if that's how it was saved
function createListElement(string, complete) 
{
    // default places new item at end of list
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(string));
    ul.appendChild(li);

    // creates button to mark list items as done/not done
    function markDone() 
    {
	    li.classList.toggle("done");
    }
    if (complete)
    {
        markDone();
    }
	li.addEventListener("click",markDone);
    
    // adds 'X' to each list item that will delete them if clicked
    var del = document.createElement("button");
    del.appendChild(document.createTextNode("X"));
	li.appendChild(del);
	del.addEventListener("click", deleteListItem);
    function deleteListItem()
    {   
        del.parentElement.remove();
    }
}

// traverses list and sorts items, with the earliest date first
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

// parses string in the list item, dismissing the task description at the end and
// splitting the date into its three components, so it can be compared
// if the second date it found to be earlier than the first, the function returns true
// so that the sort List function will proceed to switch them
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

// sets all list items as visible
// changes color of button to indicate which filter is currently active
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

// sets only the list items not marked as done as visible
// changes color of button to indicate which filter is currently active
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

// sets only the list items marked as done as visible
// changes color of button to indicate which filter is currently active
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

// combines list items and their statuses into one string that can be stored as a cookie
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
    setCookie("list", cookieString, 30);
}

// setCookie and getCookie sourced from https://www.w3schools.com/js/js_cookies.asp
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

// automatically called whenever the site is loaded
// accesses most recent update of the "list cookie"
function restoreList()
{
    var string = getCookie("list");
    // parses string into its components, creating list items out of the odd-numbered ones
    // and setting their statuses as based on the even-numbered ones
    if (string != "")
    {
        var array = string.split("|");
        var i = 0;
        while (i < array.length)
        {
            if (array[i + 1] == "complete")
            {
                createListElement(array[i], true);
            }
            else
            {
                createListElement(array[i], false);
            }
            i = i + 2;
        }
    }
}
