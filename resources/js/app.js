console.log('Script loaded in!');
let indexCount;
let clickedRowID;
if (localStorage.getItem('index')){
  console.error('OUR INDEX IS UNDEFINED!');
  indexCount = localStorage.getItem('index').length;
} else {
  //Retreive localstorage array size
  //indexCount = localStorage.getItem('index').length;
  indexCount = 0;
  //console.error(indexCount);
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

    console.warn('Form Submitted');

    /* Get the value that the user typed */
    const inputMessage = $("#userMessage").val();

    console.warn(inputMessage);

    /* Remove Button */
    const removeButton = `<img src="./resources/img/delete.svg" width="20" alt="">`;


    const data = `<tr class="animated fadeInUp font-weight-light remove-message" id="${indexCount}" onclick="rowID(this.id)">
                  <td>${inputMessage}<div class="float-right">${removeButton}</div> </td>
                </tr>`;

    messageList.append(data);

    /*Add to local storage */
    addMessageToLocalStorage(inputMessage, indexCount);
    indexCount++;

  }

  /* Remove message from DOM */
  function removeMessage(e) {
    //console.log(e.delegateTarget.childNodes[1].classList.contains("remove-message"));

    // if (e.target.classList.contains("remove-message")){
    if (e.delegateTarget.childNodes[1].classList.contains("remove-message")){
      console.warn('This contains the .remove-message class.');
      console.warn('___ ID FOR THIS TABLE ROW IS : #' + clickedRowID);
      //console.error(e.delegateTarget.childNodes);
      /* Grab Element To Be Deleted */
      let element = document.getElementById(clickedRowID);
      // console.log(element);
      /* WORKING BUT ... Newly added items won't be deleted. Try a refresh! */
      element.remove();
      //element.parentNode.removeChild(clickedRowID);
      //e.delegateTarget.childNodes[1].remove();

      /* Remove item(s) from local storage */
      //Grab the text content of the item
      const messageText = element.firstElementChild.textContent;
      //console.log(messageText);

      removeMessageFromLocalStorage(messageText);

    } else {
      console.warn('Class not found');
    }
  }

  function addMessageToLocalStorage(message, idx) {
    console.log('Local Storage Function with parameter value ' + message + ' With ID of ' + idx);
    let msg = retrieveMessageFromStorage();
    let index = retrieveIndexFromStorage();

    console.log(msg + ' ID OF ' + index.length);

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
    // console.warn(messages);

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
        console.warn('WE HAVE A MATCH');
        console.warn('Removing ' + elemDelete + ' from local storage . . .');
        msg.splice(index, 1);
        idx.splice(clickedRowID, 1);
      } else {
        //console.warn('NO MATCH FOUND, Elem is ' + elemDelete + ' ' + elemDelete.length + ' Local Storage was ' + mLS + ' ' + mLS.length );
      }
    });
    console.error('NEW Local Storage Message Array Is ' + msg);
    console.error('NEW Local Storage INDEX Array Is ' + idx);
    localStorage.setItem('msg', JSON.stringify(msg));
    localStorage.setItem('index', JSON.stringify(idx));

  }