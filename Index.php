<?php include "resources/includes/header.php" ?>

<div class="container">
  <div class="row">
    <h3 class="mx-auto p-3"><img src="resources/img/storage.svg" width="30" alt=""> <b>Local Storage</b><span class="font-weight-light ml-2">Messenger</span></h3>
  </div>
</div>

<!-- Form Container-->
<div id="content">
  <div class="container">
    <div class="row">
      <div class="col-md-10 col-sm-12 mx-auto">
        <form action="" id="form">
          <textarea class="mb-3" name="" id="userMessage"></textarea>
          <input type="submit" class="btn btn-dark btn-block" value="Save Message">
        </form>
      </div>
      <div class="col-md-10 col-sm-12 mx-auto mt-5">
        <h4 class="font-weight-light">Your Saved Messages</h4>
<!--        <div id="message-list"></div>-->
        <table class="table table-hover table-striped">
          <thead>
          <tr>
            <th>Message History</th>
          </tr>
          </thead>
          <tbody id="message-list">

          </tbody>
        </table>
      </div>

    </div>
  </div>
</div>



<?php include "resources/includes/footer.php"; ?>
