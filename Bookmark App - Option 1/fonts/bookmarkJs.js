
// initiate submit on form
document.getElementById('bookmarkForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e, id) {

    var bookmarkName = document.getElementById('bookmarkName').value;
    var bookmarkURL = document.getElementById('bookmarkURL').value;
    var bookmarkId = document.getElementById('bookmarkId').value;

    //confirm submit validation
    if (!validateForm(bookmarkName, bookmarkURL)) {
        return false;
    }

    //store values into an array
    var bookmark = {
        name: bookmarkName,
        url: bookmarkURL,
        id: bookmarkId
    }

    // if create

    if (document.querySelector(".bookingForm-ctn").classList.contains("create")) {

        // check if bookmark is empty
        if (localStorage.getItem("bookmark") === null) {
            //if empty
            //create array
            var bookmarkArr = [];

            //add bookmarks to array
            bookmarkArr.push(bookmark);

            bookmarkArr.forEach((item, i) => {
                item.id = i + 1;
            });

            // setbookmarks as array 
            localStorage.setItem("bookmark", JSON.stringify(bookmarkArr));
        } else {
            // else array exists
            // get bookmarks from storage
            var bookmarkArr = JSON.parse(localStorage.getItem("bookmark"));

            //add bookmark to arry
            bookmarkArr.push(bookmark);

            bookmarkArr.forEach((item, i) => {
                item.id = i + 1;
            });

            // add updated bookmark to array 
            localStorage.setItem("bookmark", JSON.stringify(bookmarkArr));
        }

    }

    //if edit

    if (document.querySelector(".bookingForm-ctn").classList.contains("edit")) {

        // get bookmarks from storage
        var bookmarkArr = JSON.parse(localStorage.getItem("bookmark"));

        const index = bookmarkArr.findIndex((e) => e.id == bookmark.id)

        bookmarkArr[index] = bookmark

        localStorage.setItem("bookmark", JSON.stringify(bookmarkArr));

    }

    //re-fetch bookmarks
    fetchBookmarks();

    //clear form after submit
    document.getElementById("bookmarkForm").reset();

    e.preventDefault();
    document.querySelector(".bookingForm-ctn").classList.remove("active");
}


//Edit bookmark 
function editBookmark(id) {

    var bookmarkNameEdit = document.getElementById('bookmarkName');
    var bookmarkURLEdit = document.getElementById('bookmarkURL');
    var bookmarkIdEdit = document.getElementById('bookmarkId');
    // Get boomarks from localStorage
    var bookmarkArr = JSON.parse(localStorage.getItem("bookmark"));
    //loop through bookmarks
    for (var i = 0; i < bookmarkArr.length; i++) {
        if (bookmarkArr[i].id == id) {
            var currentBookmark = bookmarkArr[i]

            bookmarkIdEdit.value = currentBookmark.id;
            bookmarkNameEdit.value = currentBookmark.name;
            bookmarkURLEdit.value = currentBookmark.url;

            // console.log(bookmarkArr[i]);
        }
    }

    openBookmarkFormEdit()

}

//Delete bookmark 

function deleteBookmark(url) {
    // Get boomarks from localStorage
    var bookmarkArr = JSON.parse(localStorage.getItem("bookmark"));
    //loop through bookmarks
    for (var i = 0; i < bookmarkArr.length; i++) {
        if (bookmarkArr[i].url == url) {
            // remove from array
            bookmarkArr.splice(i, 1);
        }
    }
    localStorage.setItem("bookmark", JSON.stringify(bookmarkArr));

    //re-fetch bookmarks
    fetchBookmarks();
}


// validation on submit
function validateForm(bookmarkName, bookmarkURL) {

    var bookmarkNameAlert = document.getElementById("bookmarkNameAlert");
    var bookmarkURLAlert = document.getElementById("bookmarkURLAlert");

    if (!bookmarkName || !bookmarkURL) {
        // if bookmark Name is empty
        if (!bookmarkName) {
            bookmarkNameAlert.classList.add("active");
            bookmarkNameAlert.innerHTML = '<div class="error-alert">' +
                '<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" aria-hidden="true" viewBox="0 0 20 20" focusable="false">' +
                '<path d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm.022 8c.54 0 .978.467.978 1.148v5.704c0 .685-.438 1.148-.978 1.148C9.466 16 9 15.533 9 14.852V9.148C9 8.463 9.466 8 10.022 8zm-.016-4c.553 0 .994.504.994 1.145 0 .64-.438 1.14-.994 1.14S9 5.783 9 5.142 9.453 4 10.006 4z" fill-rule="evenodd"></path>' +
                '</svg></div>' +
                '<div class="field-error__message">Please enter a bookmark name</div>';
            document.getElementById("bookmarkSubmit").setAttribute('disabled', '');
        }

        // if bookmark URL is empty
        if (!bookmarkURL) {
            bookmarkURLAlert.classList.add("active");
            bookmarkURLAlert.innerHTML = '<div class="error-alert">' +
                '<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" aria-hidden="true" viewBox="0 0 20 20" focusable="false">' +
                '<path d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm.022 8c.54 0 .978.467.978 1.148v5.704c0 .685-.438 1.148-.978 1.148C9.466 16 9 15.533 9 14.852V9.148C9 8.463 9.466 8 10.022 8zm-.016-4c.553 0 .994.504.994 1.145 0 .64-.438 1.14-.994 1.14S9 5.783 9 5.142 9.453 4 10.006 4z" fill-rule="evenodd"></path>' +
                '</svg></div>' +
                '<div class="field-error__message">Please enter a valid URL</div>';
            document.getElementById("bookmarkSubmit").setAttribute('disabled', '');
        }
        return false;
    }
    return true;
}



// validate bookmark name
function validateBookmarkName() {
    var bookmarkName = document.getElementById('bookmarkName').value;
    var bookmarkNameAlert = document.getElementById("bookmarkNameAlert")
    var bookmarkURLAlert = document.getElementById("bookmarkURLAlert")

    // if bookmark name is empty then disable cta
    if (!bookmarkName) {
        document.querySelector(".bookmarkName-ctn").classList.add("error-active")
        bookmarkNameAlert.classList.add("active");
        bookmarkNameAlert.innerHTML = '<div class="error-alert">' +
            '<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" aria-hidden="true" viewBox="0 0 20 20" focusable="false">' +
            '<path d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm.022 8c.54 0 .978.467.978 1.148v5.704c0 .685-.438 1.148-.978 1.148C9.466 16 9 15.533 9 14.852V9.148C9 8.463 9.466 8 10.022 8zm-.016-4c.553 0 .994.504.994 1.145 0 .64-.438 1.14-.994 1.14S9 5.783 9 5.142 9.453 4 10.006 4z" fill-rule="evenodd"></path>' +
            '</svg></div>' +
            '<div class="error-msg">Please enter a bookmark name</div>';
        document.getElementById("bookmarkSubmit").setAttribute('disabled', '');
    }

    // if bookmark name is not empty then enable cta
    if (bookmarkName) {
        bookmarkNameAlert.innerHTML = ""
        document.querySelector(".bookmarkName-ctn").classList.remove("error-active")
        bookmarkNameAlert.classList.remove("active");
        // only enable if both URL & Name are valid
        if (!bookmarkNameAlert.classList.contains("active") && !bookmarkURLAlert.classList.contains("active")) {
            document.getElementById("bookmarkSubmit").removeAttribute("disabled");
        }
    }

}

// validate bookmark URL
function validateBookmarkURL() {
    var bookmarkURL = document.getElementById('bookmarkURL').value;
    var bookmarkNameAlert = document.getElementById("bookmarkNameAlert")
    var bookmarkURLAlert = document.getElementById("bookmarkURLAlert")
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    // if bookmark url is empty OR if bookmark url does not match regex (is valid) then disable cta
    if (!bookmarkURL || !bookmarkURL.match(regex)) {
        document.querySelector(".bookmarkURL-ctn").classList.add("error-active")
        bookmarkURLAlert.classList.add("active");
        bookmarkURLAlert.innerHTML = '<div class="error-alert">' +
            '<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" aria-hidden="true" viewBox="0 0 20 20" focusable="false">' +
            '<path d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm.022 8c.54 0 .978.467.978 1.148v5.704c0 .685-.438 1.148-.978 1.148C9.466 16 9 15.533 9 14.852V9.148C9 8.463 9.466 8 10.022 8zm-.016-4c.553 0 .994.504.994 1.145 0 .64-.438 1.14-.994 1.14S9 5.783 9 5.142 9.453 4 10.006 4z" fill-rule="evenodd"></path>' +
            '</svg></div>' +
            '<div class="error-msg">Please enter a valid URL</div>';
        document.getElementById("bookmarkSubmit").setAttribute('disabled', '');
    }

    // if bookmark url is not empty OR if bookmark url matches regex (is valid) then enable cta
    if (bookmarkURL && bookmarkURL.match(regex)) {
        bookmarkURLAlert.innerHTML = ""
        bookmarkURLAlert.classList.remove("active");
        document.querySelector(".bookmarkURL-ctn").classList.remove("error-active")
        // only enable if both URL & Name are valid
        if (!bookmarkNameAlert.classList.contains("active") && !bookmarkURLAlert.classList.contains("active")) {
            document.getElementById("bookmarkSubmit").removeAttribute("disabled");
        }
    }

}


function openBookmarkFormCreate() {
    document.querySelector(".bookingForm-ctn").classList.add("create");
    document.querySelector(".bookingForm-ctn").classList.add("active");

}

function openBookmarkFormEdit() {
    document.querySelector(".bookingForm-ctn").classList.add("edit");
    document.querySelector(".bookingForm-ctn").classList.add("active");
}

function closeBookmarkForm() {
    document.querySelector(".bookingForm-ctn").classList.remove("active");
    document.getElementById("bookmarkForm").reset();
    document.querySelector(".bookingForm-ctn").classList.remove("create");
    document.querySelector(".bookingForm-ctn").classList.remove("edit");
    document.querySelectorAll('.error-active').forEach(e => e.classList.remove("error-active"));
}


//pagenation
function fetchBookmarks() {
    //set current bookmark
    var bookmarkPN = JSON.parse(localStorage.getItem("bookmark"));

    //set location of list and pagination
    var listelement = document.getElementById("bookmarkGrid");
    var bkpagination = document.getElementById("bkPagination");

    //set default page & amount of items to be displayed at once
    let current_view = 1;
    let rows = 2;

    //
    function displayList(bookmarkPN, container, bk_per_view, view) {
        //clear the container to add new bookmarkers
        container.innerHTML = "";
        //page starts on 1 but array starts on 0
        view--;

        //get starting view of bookmarks
        let view_start = bk_per_view * view;
        let view_end = view_start + bk_per_view
        let paginatedItems = bookmarkPN.slice(view_start, view_end);

        // Create
        for (let i = 0; i < paginatedItems.length; i++) {
            var name = paginatedItems[i].name;
            var url = paginatedItems[i].url;
            var id = paginatedItems[i].id;
            listelement.innerHTML += '<div class="bookmark-item" ><img class="favicon-bookmark" src="https://www.google.com/s2/favicons?domain=' + url + '&sz=64"><a target="_blank" href="' + url + '"><h3>' + name + '</h3></a> ' +
                '<a class="edit-bookmark" onclick="editBookmark(\'' + id + '\')" href="#">Edit</a>' +
                '<a class="delete-bookmark" onclick="deleteBookmark(\'' + url + '\')" href="#">Delete</a></div>';
        }

    }

    function setupPagination(bookmarkPN, wrapper, bk_per_page, view) {
        wrapper.innerHTML = "";
        let view_count = Math.ceil(bookmarkPN.length / bk_per_page);

        var btn = PaginationButtonBack(view_count);
        wrapper.appendChild(btn);
        for (let i = 1; i < view_count + 1; i++) {
            let btn = PaginationButton(i, bookmarkPN, view_count);
            wrapper.appendChild(btn);
        }
        var btn = PaginationButtonForward(view_count);
        wrapper.appendChild(btn);
        PaginationButtonActive(current_view, view_count);
    }

    function PaginationButton(view, bookmarkPN, view_count) {
        let button = document.createElement('button');
        button.innerText = view;
        button.setAttribute("data-bk-view", view);
        if (current_view == view) button.classList.add('active');

        button.addEventListener('click', function () {
            current_view = view;
            displayList(bookmarkPN, listelement, rows, current_view);
            PaginationButtonActive(current_view, view_count)
        })
        return button;
    }

    function PaginationButtonBack(view_count) {
        let button = document.createElement('button');
        button.innerText = "<";
        button.classList.add("prevBk");

        button.addEventListener('click', function () {
            current_view = current_view - 1;
            console.log(current_view);
            displayList(bookmarkPN, listelement, rows, current_view);
            PaginationButtonActive(current_view, view_count)
        })
        return button;
    }

    function PaginationButtonForward(view_count) {
        let button = document.createElement('button');
        button.innerText = ">";
        button.classList.add("forwBk");

        button.addEventListener('click', function () {
            current_view = current_view + 1;
            console.log(current_view);
            displayList(bookmarkPN, listelement, rows, current_view);
            PaginationButtonActive(current_view, view_count)
        })
        return button;
    }

    function PaginationButtonActive(current_view, view_count) {
        if (current_view <= 1) {
            document.querySelector(".bkPagenumbers .prevBk").classList.add('hide')
        } else {
            document.querySelector(".bkPagenumbers .prevBk").classList.remove('hide')
        }

        if (current_view == view_count && current_view > 1) {
            document.querySelector(".bkPagenumbers .forwBk").classList.add('hide')
        } else {
            document.querySelector(".bkPagenumbers .forwBk").classList.remove('hide')
        }

        // remove existing active
        let current_btn = document.querySelector(".bkPagenumbers button.active");
        current_btn.classList.remove('active');

        // add existing active
        let new_current_btn = document.querySelector('.bkPagenumbers button[data-bk-view="' + current_view + '"]');
        new_current_btn.classList.add('active');
    }

    displayList(bookmarkPN, listelement, rows, current_view);
    setupPagination(bookmarkPN, bkpagination, rows);

}
