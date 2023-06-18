// initiate submit & reset on form
document.getElementById('bkForm').addEventListener('submit', saveBookmark);
//document.getElementById('bkForm').addEventListener('reset', resetBookmark);

// save bookmark
function saveBookmark(e) {

    // store existing values
    var bkName = document.getElementById('bkName').value;
    var bkURL = document.getElementById('bkURL').value;
    var bkId = document.getElementById('bkId').value;

    //confirm submit validaiton
    var valid = validateForm(bkName, bkURL)
    if (valid == true) {

        //store values into an array
        var bookmark = {
            name: bkName,
            url: bkURL,
            id: bkId
        }

        // if create new bookmark
        if (document.querySelector(".bk-form").classList.contains("create")) {

            // check if bookmark is empty
            if (localStorage.getItem("bookmark") === null) {
                //create new array
                var bkArray = [];

                //add bookmarks to array
                bkArray.push(bookmark);

                //update all id's
                bkArray.forEach((item, i) => {
                    item.id = i + 1;
                });

                // store bookmarks in local storage  
                localStorage.setItem("bookmark", JSON.stringify(bkArray));
                confirmationBookmark(bkName, bkURL)

            } else {
                // get bookmarks from storage
                var bkArray = JSON.parse(localStorage.getItem("bookmark"));

                //add bookmark to arry
                bkArray.push(bookmark);
                //update all id's
                bkArray.forEach((item, i) => {
                    item.id = i + 1;
                });

                // store updated bookmarks in local storage  
                localStorage.setItem("bookmark", JSON.stringify(bkArray));

                confirmationBookmark(bkName, bkURL)
            }
        }

        //if edit existing bookmark
        if (document.querySelector(".bk-form").classList.contains("edit")) {

            // get bookmarks from storage
            var bkArray = JSON.parse(localStorage.getItem("bookmark"));

            //find existing ID & match with updated value
            const index = bkArray.findIndex((a) => a.id == bookmark.id)

            //match existing value with new value
            bkArray[index] = bookmark

            // store updated bookmarks in local storage  
            localStorage.setItem("bookmark", JSON.stringify(bkArray));
        }


        //initialize bookmark list
        fetchBookmarks();

        //Clear form after submit
        document.getElementById("bkForm").reset();

        //Remove Booking Form pop-up
        document.querySelector(".bk-form").classList.remove("active");

        //Remove Edit / Create state Form pop-up
        document.querySelector(".bk-form").classList.remove("create");
        document.querySelector(".bk-form").classList.remove("edit");
    }
    //Prevent from navigating to new URL
    e.preventDefault();

}

// reset bookmark - edit bookmark only
function resetBookmark(e) {

    // locate bookmark form for status check
    var bkStatus = document.querySelector(".bk-form");

    // fire only for edit journey only
    if (bkStatus.classList.contains("edit")) {
        // store existing ID
        var bkId = document.getElementById('bkId').value;

        //store locations to update pre-existing values
        var BkNameEdit = document.getElementById('bkName');
        var BkURLEdit = document.getElementById('bkURL');

        // get bookmarks from storage
        var bkArray = JSON.parse(localStorage.getItem("bookmark"));

        //find existing ID & match with updated value
        var index = bkArray.findIndex((a) => a.id == bkId)

        BkNameEdit.value = bkArray[index].name;
        BkURLEdit.value = bkArray[index].url;

        //Prevent from normal refresh
        e.preventDefault();
    }

}

//Open Existing bookmark to Edit
function editBookmark(id) {

    //store new Bookmark values
    var BkNameEdit = document.getElementById('bkName');
    var BkURLEdit = document.getElementById('bkURL');
    var BkIdEdit = document.getElementById('bkId');

    // Get bookmarks from localStorage
    var bkArray = JSON.parse(localStorage.getItem("bookmark"));

    //search for current bookmark with existing bookmark
    for (var i = 0; i < bkArray.length; i++) {
        if (bkArray[i].id == id) {
            var currentBookmark = bkArray[i]
            //Update existing bookmark value
            BkNameEdit.value = currentBookmark.name;
            BkURLEdit.value = currentBookmark.url;
            BkIdEdit.value = currentBookmark.id;
        }
    }
    openBookmarkFormEdit()
}

//On Delete bookmark 
function deleteBookmark(id) {
    // Get bookmarks from localStorage
    var bkArray = JSON.parse(localStorage.getItem("bookmark"));

    //serach for bookmark ID
    for (var i = 0; i < bkArray.length; i++) {
        if (bkArray[i].id == id) {
            // remove from array
            bkArray.splice(i, 1);
        }
    }
    localStorage.setItem("bookmark", JSON.stringify(bkArray));

    //re-initialize bookmark list
    fetchBookmarks();
}

//Validation on Submit
function validateForm(bkName, bkURL) {

    //store bookmark Alerts
    var bkNameAlert = document.getElementById("bkNameAlert");
    var bkURLAlert = document.getElementById("bkURLAlert");

    // if either bookmark Name or URL are empty fire alerts
    if (!bkName || !bkURL || bkName == '' || bkURL == '') {
        // if bookmark Name is empty create and fire
        if (!bkName || bkName == '') {
            document.querySelector(".bkName-ctn").classList.add("error-active")
            bkNameAlert.classList.add("active");
            bkNameAlert.innerHTML = '<div class="error-alert">' +
                '<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" aria-hidden="true" viewBox="0 0 20 20" focusable="false">' +
                '<path d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm.022 8c.54 0 .978.467.978 1.148v5.704c0 .685-.438 1.148-.978 1.148C9.466 16 9 15.533 9 14.852V9.148C9 8.463 9.466 8 10.022 8zm-.016-4c.553 0 .994.504.994 1.145 0 .64-.438 1.14-.994 1.14S9 5.783 9 5.142 9.453 4 10.006 4z" fill-rule="evenodd"></path>' +
                '</svg></div>' +
                '<div class="error-msg">Please enter a bookmark name</div>';
            //disable submit CTA
            document.getElementById("bkSubmit").setAttribute('disabled', '');
            document.getElementById("bkEdit").setAttribute('disabled', '');
        }
        // if bookmark url is empty create and fire
        if (!bkURL || bkURL == '') {
            document.querySelector(".bkURL-ctn").classList.add("error-active")
            bkURLAlert.classList.add("active");
            bkURLAlert.innerHTML = '<div class="error-alert">' +
                '<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" aria-hidden="true" viewBox="0 0 20 20" focusable="false">' +
                '<path d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm.022 8c.54 0 .978.467.978 1.148v5.704c0 .685-.438 1.148-.978 1.148C9.466 16 9 15.533 9 14.852V9.148C9 8.463 9.466 8 10.022 8zm-.016-4c.553 0 .994.504.994 1.145 0 .64-.438 1.14-.994 1.14S9 5.783 9 5.142 9.453 4 10.006 4z" fill-rule="evenodd"></path>' +
                '</svg></div>' +
                '<div class="error-msg">Please enter a valid URL</div>';
            document.getElementById("bkSubmit").setAttribute('disabled', '');
            document.getElementById("bkEdit").setAttribute('disabled', '');
        }

        return false;

    } else {
        return true;
    }
}

// Validation for bookmark name
function validateBkName() {
    //intilaize triggers
    var bkName = document.getElementById('bkName').value;
    var bkNameAlert = document.getElementById("bkNameAlert");
    var bkURLAlert = document.getElementById("bkURLAlert");

    // if bookmark name is empty then disable submit & enable error styling
    if (!bkName) {
        document.querySelector(".bkName-ctn").classList.add("error-active")
        bkNameAlert.classList.add("active");
        bkNameAlert.innerHTML = '<div class="error-alert">' +
            '<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" aria-hidden="true" viewBox="0 0 20 20" focusable="false">' +
            '<path d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm.022 8c.54 0 .978.467.978 1.148v5.704c0 .685-.438 1.148-.978 1.148C9.466 16 9 15.533 9 14.852V9.148C9 8.463 9.466 8 10.022 8zm-.016-4c.553 0 .994.504.994 1.145 0 .64-.438 1.14-.994 1.14S9 5.783 9 5.142 9.453 4 10.006 4z" fill-rule="evenodd"></path>' +
            '</svg></div>' +
            '<div class="error-msg">Please enter a bookmark name</div>';
        document.getElementById("bkSubmit").setAttribute('disabled', '');
        document.getElementById("bkEdit").setAttribute('disabled', '');
    }

    // if bookmark name is not empty remove error styling
    if (bkName) {
        bkNameAlert.innerHTML = ""
        document.querySelector(".bkName-ctn").classList.remove("error-active")
        bkNameAlert.classList.remove("active");

        // only enable submit CTA if both URL & Name are validated
        if (!bkNameAlert.classList.contains("active") && !bkURLAlert.classList.contains("active")) {
            document.getElementById("bkSubmit").removeAttribute("disabled");
            document.getElementById("bkEdit").removeAttribute("disabled");
        }
    }

}

// Validation for Bookmark URL
function validateBkURL() {
    var bkURL = document.getElementById('bkURL').value;
    var bkNameAlert = document.getElementById("bkNameAlert")
    var bkURLAlert = document.getElementById("bkURLAlert")
    var expression = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    var regex = new RegExp(expression);

    // if bookmark url is empty OR if bookmark url does not match regex (is valid URL) fire error message then disable cta
    if (!bkURL || !bkURL.match(regex)) {
        document.querySelector(".bkURL-ctn").classList.add("error-active")
        bkURLAlert.classList.add("active");
        bkURLAlert.innerHTML = '<div class="error-alert">' +
            '<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" aria-hidden="true" viewBox="0 0 20 20" focusable="false">' +
            '<path d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm.022 8c.54 0 .978.467.978 1.148v5.704c0 .685-.438 1.148-.978 1.148C9.466 16 9 15.533 9 14.852V9.148C9 8.463 9.466 8 10.022 8zm-.016-4c.553 0 .994.504.994 1.145 0 .64-.438 1.14-.994 1.14S9 5.783 9 5.142 9.453 4 10.006 4z" fill-rule="evenodd"></path>' +
            '</svg></div>' +
            '<div class="error-msg">Please enter a valid URL</div>';
        document.getElementById("bkSubmit").setAttribute('disabled', '');
        document.getElementById("bkEdit").setAttribute('disabled', '');
    }

    // if bookmark url is not empty & if bookmark url matches regex (is valid url) then remove error message
    if (bkURL && bkURL.match(regex)) {
        bkURLAlert.innerHTML = ""
        bkURLAlert.classList.remove("active");
        document.querySelector(".bkURL-ctn").classList.remove("error-active")

        // only enable submit CTA if both URL & Name are validated
        if (!bkNameAlert.classList.contains("active") && !bkURLAlert.classList.contains("active")) {
            document.getElementById("bkSubmit").removeAttribute("disabled");
            document.getElementById("bkEdit").removeAttribute("disabled");
        }
    }

}

// Open Bookmark Form to create new bookmark
function openBookmarkFormCreate() {
    document.querySelector(".bk-form").classList.add("create");
    document.querySelector(".bk-form").classList.add("active");

}

// Open Bookmark Form to edit existing bookmark
function openBookmarkFormEdit() {
    document.querySelector(".bk-form").classList.add("edit");
    document.querySelector(".bk-form").classList.add("active");
}

// Close Bookmark Form
function closeBookmarkForm() {
    document.querySelector(".bk-form").classList.remove("active");
    //Reset form type create/edit
    document.querySelector(".bk-form").classList.remove("create");
    document.querySelector(".bk-form").classList.remove("edit");
    //Reset form values
    document.getElementById("bkForm").reset();
    //Remove error values
    document.querySelectorAll('.error-active').forEach(e => e.classList.remove("error-active"));
}

// Initalize Bookmark Grid List
function fetchBookmarks() {
    //get current bookmarks
    var bkCoreArray = JSON.parse(localStorage.getItem("bookmark"));

    //  if Array dosent exist add message to notify customer to add bookmark
    if (bkCoreArray == "" || bkCoreArray == null) {
        document.querySelector("h2.bkList-h2").setHTML("Please create a new bookmark");
    } else {
        document.querySelector("h2.bkList-h2").setHTML("Bookmark List:");
    }
    //set location of gridlist for bookmarks and controls for pagination
    var bkList = document.getElementById("bkGrid");
    var bkPagination = document.getElementById("bkControls");

    //set default view & amount of bookmarks to be displayed per view
    let current_view = 1;
    let rows = 20;

    //inititalize load of bookmark view
    function displayBookmarks(bkCoreArray, container, bk_per_view, view) {


        //clear the container to add new bookmarks
        container.innerHTML = "";
        //view starts on 1 but array starts on 0
        view--;

        //create views of overall array
        let view_start = bk_per_view * view;
        let view_end = view_start + bk_per_view
        //create sub array of existing view
        let bkViewArray = bkCoreArray.slice(view_start, view_end);

        //to create bookmark items
        for (let i = 0; i < bkViewArray.length; i++) {
            var name = bkViewArray[i].name;
            var url = bkViewArray[i].url;
            //to makesure URL containst either HTTP or HTTPS
            if (!url.startsWith("http")) {
                //if not add https://
                url = 'https://' + url;
            }
            var id = bkViewArray[i].id;
            bkList.innerHTML += '<div class="bk-item"> <span class="bk-bookmark"><img class="bk-favi" src="https://www.google.com/s2/favicons?domain=' + url + '&sz=64"><a class="bk-name" target="_blank" href="' + url + '"><h3>' + name + '</h3></a></span>' +
                '<span class="bk-buttons">' +
                '<a class="bk-edit" onclick="editBookmark(\'' + id + '\')" href="#">Edit</a>' +
                '<a class="bk-delete" onclick="deleteBookmark(\'' + id + '\')" href="#">Delete</a>' +
                '</span></div>';
        }


    }

    // inititalize Intial Controls (Pagination)
    function setupControls(bkCoreArray, container, bk_per_page) {

        //  if Array dosent dont create controls or if last bookmark is deleted clear controls
        if (bkCoreArray == "" || bkCoreArray == null) {
            container.innerHTML = "";
        } else {
            container.innerHTML = "";
            //calcualte overall views count
            let view_count = Math.ceil(bkCoreArray.length / bk_per_page);

            //create & append back control
            var btn = bkButtonBack(view_count);
            container.appendChild(btn);

            //for each view create numbered control.
            for (let i = 1; i < view_count + 1; i++) {
                let btn = bkViewsButton(i, bkCoreArray, view_count);
                container.appendChild(btn);
            }
            //create & append forward control
            var btn = bkButtonForward(view_count);
            container.appendChild(btn);

            //initalize active state of controls
            bkButtonState(current_view, view_count);
        }
    }

    // Create View Controls (Pagination)
    function bkViewsButton(view, bkCoreArray, view_count) {
        let button = document.createElement('button');
        button.innerText = view;
        //custom data attribute to store corrisponding view to value of button
        button.setAttribute("data-bk-view", view);

        //add intial active state to current view controller
        if (current_view == view) button.classList.add('active');

        //onclick navigate to matching view
        button.addEventListener('click', function () {
            current_view = view;
            displayBookmarks(bkCoreArray, bkList, rows, current_view);
            //initalize state of controls
            bkButtonState(current_view, view_count)
        })
        return button;
    }

    // Create Back Control (Pagination)
    function bkButtonBack(view_count) {
        let button = document.createElement('button');
        button.innerText = "<";
        button.classList.add("bk-previous");

        //onclick navigate to previous view
        button.addEventListener('click', function () {
            current_view = current_view - 1;
            displayBookmarks(bkCoreArray, bkList, rows, current_view);
            //initalize state of controls
            bkButtonState(current_view, view_count)
        })
        return button;
    }

    // Create Forward Control (Pagination)
    function bkButtonForward(view_count) {
        let button = document.createElement('button');
        button.innerText = ">";
        button.classList.add("bk-forward");

        //onclick navigate to next view
        button.addEventListener('click', function () {
            current_view = current_view + 1;
            displayBookmarks(bkCoreArray, bkList, rows, current_view);
            //initalize state of controls
            bkButtonState(current_view, view_count)
        })
        return button;
    }

    // inititalize Status of Controls (Pagination)
    // ie: active state & enabling prev/forward buttons
    function bkButtonState(current_view, view_count) {

        // If current view is first or less then hide Previous button
        if (current_view <= 1) {
            document.querySelector("#bkControls .bk-previous").setAttribute("disabled", true);
        } else {
            document.querySelector("#bkControls .bk-previous").removeAttribute("disabled");
        }

        // If current view matches overall views & if current view is greater than 1 hide Forward button
        if (current_view == view_count && current_view >= 1 || view_count <= 1) {
            document.querySelector("#bkControls .bk-forward").setAttribute("disabled", true);
        } else {
            document.querySelector("#bkControls .bk-forward").removeAttribute("disabled");
        }

        // Remove existing active state
        let current_btn = document.querySelector("#bkControls button.active");
        current_btn.classList.remove('active');

        // Confirm current active state matches current view
        let new_current_btn = document.querySelector('#bkControls button[data-bk-view="' + current_view + '"]');
        // add active state to view control (pagination cta)
        new_current_btn.classList.add('active');
    }

    //initialize 
    displayBookmarks(bkCoreArray, bkList, rows, current_view);
    setupControls(bkCoreArray, bkPagination, rows);
}

// Initalize Confimation of Bookmark Creation / Edit
function confirmationBookmark(bkName, bkURL) {

    // target confirmation area
    var bkConfirmation = document.getElementById("bk-confirm");

    //to makesure URL containst either HTTP or HTTPS
    if (!bkURL.startsWith("http")) {
        //if not add https://
        var bkConfiURL = 'https://' + bkURL;
    }

    //create bookmark pop-up
    bkConfirmation.innerHTML = '<div class="bk-confirmation">' +
        '<div id="bk-confirm-pbr"><span class="bk-confirm-prg"></span></div>' +
        '<div class="bk-confirmation-ctn">' +
        '<h2>Bookmark has been added!</h2>' +
        '<p>Your bookmark has been and added to the list, summary below:</p>' +
        '<span class="bk-confirm-ctn">' +
        '<p class="label">Bookmark Name:</p>' +
        '<p>' + bkName + '</p>' +
        '<p class="label">Bookmark URL:</p>' +
        '<a href="' + bkConfiURL + '">' + bkURL + '</a>' +
        '</span></div></div>';

    //initialize pop-up progress bar
    var width = 0;
    var bkProgress = document.querySelector('#bk-confirm-pbr .bk-confirm-prg')
    var id = setInterval(frame, 30);
    function frame() {
        if (width >= 100) {
            //once progress equals 100 reset bar for next call 
            clearInterval(id);
            //remove pop-up
            bkConfirmation.innerHTML = ''
        } else {
            width++;
            bkProgress.style.width = width + '%';
        }
    }

}