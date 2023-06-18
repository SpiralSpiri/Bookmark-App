function fetchConfirmation() {

    //get current bookmarks
    var bkCoreArray = JSON.parse(localStorage.getItem("bookmark"));
    var bkConfirmation = document.getElementById("bkConfirmation");

    //get array begins at 0
    var bkLastEntryIndex = bkCoreArray.length - 1;

    var bkConfiName = bkCoreArray[bkLastEntryIndex].name;
    var bkConfiURL = bkCoreArray[bkLastEntryIndex].url;

    //to makesure URL containst either HTTP or HTTPS
    if (!bkConfiURL.startsWith("http")) {
        //if not add https://
        var bkConfiURLUpdated = 'https://' + bkConfiURL;
    }


    //insert confirmation of recently created array
    bkConfirmation.innerHTML += '<p class="label">Bookmark Name:</p><p>' + bkConfiName + '</p>' +
        '<p class="label">Bookmark URL:</p>' +
        '<a target="_blank" href="' + bkConfiURLUpdated + '">' + bkConfiURL + '</a>';
}

function returntoGrid(){
    window.location = "./index.html";
}