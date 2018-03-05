document.getElementById('myForm').addEventListener('submit', addBookmark);

function addBookmark(e) {
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    var bookmark = {
      name : siteName,
      url : siteUrl
    }
    if(!siteName || !siteUrl){
      alert("Please fill the form! ;)");
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (! siteUrl.match(regex)) {
      document.getElementById('myForm').reset()
      alert("Enter Valid Details");
      return false;
    }
    if (localStorage.getItem('bookmarks') === null) {
      var bookmarks = [];
      bookmarks.push(bookmark);
      //sets item in local storegae JSON.stringify()->helps to JSONify the string
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      fetchBookmarks();
    }
    else {
      // retrieving from local storage and parsing it
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      fetchBookmarks();
    }
    document.getElementById('myForm').reset();
    //prevents form from submitting
    e.preventDefault();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarksResults');
    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;
      bookmarksResults.innerHTML += '<div class = "well">' +
                                    '<h4>' + name +
                                    ' <a class = "btn btn-default" target = "_blank" href = "'+url+'">Visit</a>' +
                                    ' <a onclick = deleteBookmark(\''+url+'\') class = "btn btn-danger" href = "#">Delete</a>' +
                                    '</h4>' +
                                    '</div>';
    }
}

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i < bookmarks.length; i++) {
      if(bookmarks[i].url == url){
        //removes from the list
        bookmarks.splice(i, 1);
      }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}
