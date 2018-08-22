console.log('Script loaded in!');

const messageList = $('#message-list');

/* Event Listeners */
  //Form Submitted
  eventListener();

  function eventListener() {
    document.querySelector('#form').addEventListener('click', newMessage);
  }


  /* Functions */
  function newMessage(e) {
    e.preventDefault();

    console.warn('Form Submitted');

    /* Get the value that the user typed */
    const inputMessage = $("#userMessage").val();
    console.warn(inputMessage);

    /* Remove Button */
    const removeButton = `<a class="remove-message"><img src="./resources/img/delete.svg" width="20" alt=""></a>`;


    const data = `<tr class="animated fadeInUp font-weight-light">
                  <td> ${inputMessage} <span class="float-right">${removeButton}</span> </td>
                </tr>`;

    messageList.append(data);

  }