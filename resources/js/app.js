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
    const inputMessage = document.getElementById("userMessage").value;
    console.warn(inputMessage);

    const data = `<tr class="animated fadeInUp">
                  <td> ${inputMessage} </td>
                </tr>`;

    messageList.append(data);

  }