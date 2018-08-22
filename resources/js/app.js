console.log('Script loaded in!');

const messageList = $('#message-list');

/* Event Listeners */
  //Form Submitted
  eventListener();

  function eventListener() {
    document.querySelector('#form').addEventListener('click', newMessage);

    /* Remove message from list*/
    messageList.click(removeMessage);
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


    const data = `<tr class="animated fadeInUp font-weight-light remove-message">
                  <td> ${inputMessage} <div class="float-right">${removeButton}</div> </td>
                </tr>`;

    messageList.append(data);

    /*Add to local storage */
    addMessageToLocalStorage(inputMessage);

  }

  /* Remove message from DOM */
  function removeMessage(e) {
    //console.log(e.delegateTarget.childNodes[1].classList.contains("remove-message"));

    // if (e.target.classList.contains("remove-message")){
    if (e.delegateTarget.childNodes[1].classList.contains("remove-message")){
      console.warn('This contains the .remove-message class.');
      e.delegateTarget.childNodes[1].remove();

    } else {
      console.warn('Class not found');
    }
  }

  function addMessageToLocalStorage(message) {
    console.log('Local Storage Function with parameter value ' + message);
    let msg = retrieveMessageFromStorage();
    console.log(msg);

    //Add message into array
    msg.push(message);

    //Convert array to string
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