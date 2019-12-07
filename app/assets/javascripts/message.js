$(function(){
  function formatDate(strDate){
    var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var format = 'YYYY/MM/DD(WW) hh:mm:ss'
    var date = new Date(strDate);

    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + (date.getDate())).slice(-2));
    format = format.replace(/WW/g, weekday[date.getDay()]);
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    return format;
  }
  function buildHTML(message){
    var formated_date = formatDate(message.created_at);
    var image_html = "";
    if (message.image.url){
      image_html = `<image class="main_message__message_image" src="${message.image.url}"></image>`;
    }
    var html =  `<div class="main_message__list" data-message-id="${message.id}">
                  <div class="main_message__header">
                    <div class="main_message__header_user">
                    ${message.user_name}
                    </div>
                    <div class="main_message__header_date">
                    ${formated_date}
                    </div>
                  </div>
                  <div class="main_message__message">
                    <div class="main_message__message_body"></div>
                    ${message.body}
                    ${image_html}
                  </div>
                </div>`;
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
  var reloadMessages = function(){
    var message_ids = $('div.main_message__list').map(function(){
      return $(this).data('message-id');
    });
    var last_message_id = Math.max.apply(null, message_ids);
    $.ajax({
      url: "api/messages",
      type: "GET",
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      var insertHTML ='';
      $.each(messages, function(i, message){
        insertHTML += buildHTML(message);
      });
      $('.main_message').append(insertHTML)
      console.log("success");
    })
    .fail(function(){
      console.log("error");
    })
  };
  setInterval(reloadMessages, 7000);
});
