$(function(){
  function buildHTML(message){
    if (message.image.url) {
      var html =  `<div class="main_message__list">
                    <div class="main_message__header">
                      <div class="main_message__header_user">
                      ${message.user_name}
                      </div>
                      <div class="main_message__header_date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="main_message__message">
                      <div class="main_message__message_body"></div>
                      ${message.body}
                      <image class="main_message__message_image" src="${message.image.url}">
                    </div>
                  </div>`
    } else {
      var html =  `<div class="main_message__list">
                    <div class="main_message__header">
                      <div class="main_message__header_user">
                      ${message.user_name}
                      </div>
                      <div class="main_message__header_date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="main_message__message">
                      <div class="main_message__message_body"></div>
                      ${message.body}
                    </div>
                  </div>`
    }
    return html
  }
  $("#new_message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action'); 
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_message').append(html)
      $('.main_message').animate({ scrollTop: $('.main_message')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.main_form__btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.main_form__btn').prop('disabled', false);
    })
  });
});
