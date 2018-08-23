console.log('Script loaded in!');
let indexCount;
let clickedRowID;
if (localStorage.getItem('index')){
  console.error('OUR INDEX IS UNDEFINED!');
  indexCount = localStorage.getItem('index').length;
} else {
  indexCount = 0;
}

const messageList = $('#message-list');

/* Event Listeners */
  //Form Submitted
  eventListener();

  function eventListener() {
    document.querySelector('#form').addEventListener('click', newMessage);

    /* Remove message from list*/
    messageList.click(removeMessage);

    /* Document Ready */
    document.addEventListener('DOMContentLoaded',localStorageOnLoad);

  }


  /* Functions */
  function newMessage(e) {
    e.preventDefault();

    /* Get the value that the user typed */
    const inputMessage = $("#userMessage").val();

    /* Remove Button */
    const removeButton = `<img src="./resources/img/delete.svg" width="20" alt="">`;


    const data = `<tr class="animated fadeInUp font-weight-light remove-message" id="${indexCount}" onclick="rowID(this.id)">
                  <td>${inputMessage}<div class="float-right">${removeButton}</div> </td>
                </tr>`;

    messageList.append(data);

    /*Add to local storage */
    addMessageToLocalStorage(inputMessage, indexCount);
    indexCount++;
    /* Reset textarea to blank */
    $("#userMessage").val("");
  }

  /* Remove message from DOM */
  function removeMessage(e) {

    if (e.delegateTarget.childNodes[1].classList.contains("remove-message")){

      /* Grab Element To Be Deleted */
      let element = document.getElementById(clickedRowID);

      element.remove();

      /* Remove item(s) from local storage */
      //Grab the text content of the item
      const messageText = element.firstElementChild.textContent;

      removeMessageFromLocalStorage(messageText);

    }
  }

  function addMessageToLocalStorage(message, idx) {
    let msg = retrieveMessageFromStorage();
    let index = retrieveIndexFromStorage();

    //Add message into array
    index.push(idx);
    msg.push(message);

    //Convert array to string
    localStorage.setItem('index', JSON.stringify(index));
    localStorage.setItem('msg', JSON.stringify(msg));

  }

  function retrieveMessageFromStorage(){
    let msg;
    const messagesLS = localStorage.getItem('msg');
    /* Get values but if they are null we crate and empty array to house them */
    if( messagesLS === null ) {
      msg = [];
    } else  {
      msg = JSON.parse(messagesLS);
    }

    return msg;
  }

function retrieveIndexFromStorage(){
  let idx;
  const idxLS = localStorage.getItem('index');
  /* Get values but if they are null we crate and empty array to house them */
  if( idxLS === null ) {
    idx = [];
  } else  {
    idx = JSON.parse(idxLS);
  }

  return idx;
}

  function localStorageOnLoad() {
    let messages = retrieveMessageFromStorage();
    let idx = retrieveIndexFromStorage();

    let count = 0;
    messages.forEach(function (msg) {
      /* Remove Button */
      const removeButton = `<img src="./resources/img/delete.svg" width="20" alt="">`;


      const data = `<tr class="animated fadeInUp font-weight-light remove-message" id="${idx[count]}" onclick="rowID(this.id)">
                  <td>${msg}<div class="float-right">${removeButton}</div> </td>
                </tr>`;

      messageList.append(data);
      count ++;
    });

  }

  function rowID(id) {
    console.error('Function -> rowID <- :: CLICKED ID OF ' + id);
    clickedRowID = id;
  }

  function removeMessageFromLocalStorage(elem) {
    const elemDelete = elem.substr(0, elem.length -1 );
    let msg = retrieveMessageFromStorage();
    let idx = retrieveIndexFromStorage();

    msg.forEach(function (mLS, index) {
      if(elemDelete === mLS) {
        msg.splice(index, 1);
        idx.splice(clickedRowID, 1);
      }
    });
    localStorage.setItem('msg', JSON.stringify(msg));
    localStorage.setItem('index', JSON.stringify(idx));
  }