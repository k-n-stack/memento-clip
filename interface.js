let selectedThreads = 0;

let threads = JSON.parse(sessionStorage.getItem('stmn_threads'));
let threadContainer = document.querySelector('.threads-container');
let bookmarkContainer = document.querySelector('.bookmarks-container');

for (const thread of threads) {
  
  let threadDiv = document.createElement("div");
  threadDiv.classList.add('thread-container');
  threadDiv.innerHTML = thread.title;

  threadDiv.addEventListener('click', function (event) {
    let elements = document.querySelectorAll('.selected');
    for (const element of elements) {
      element.classList.remove('selected');
    }
    selectedThreads = thread.alphanumeric_id;
    if (selectedThreads === thread.alphanumeric_id) {
      threadDiv.classList.add('selected');
    }
    getBookmarks(thread.bookmarks);
  });

  threadContainer.appendChild(threadDiv);
}

function getBookmarks(bookmarks) {

  bookmarkContainer.innerHTML = '';
  
  for (const bookmark of bookmarks) {

    let bookmarkDiv = document.createElement("div");
    bookmarkDiv.classList.add('bookmark-container');
    let descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add('description');
    let urlA = document.createElement("a");
    urlA.classList.add('url');
    urlA.addEventListener('click', function (event) {
      window.test.openLink(bookmark.url);
    });

    descriptionDiv.innerHTML = bookmark.description;
    urlA.innerHTML = bookmark.url;

    bookmarkDiv.classList.add('bookmark-container');
    bookmarkDiv.appendChild(descriptionDiv);
    bookmarkDiv.appendChild(urlA);

    bookmarkContainer.appendChild(bookmarkDiv);

  }

}