$(function(){
  function addUser(user){
    let html =  `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`;
    $("#user-search-result").append(html);
  }
  function addNoUser(){
    let html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
              </div>`;
    $("#user-search-result").append(html);
  }
  function addSelectUser(user_id, user_name){
    let html =  `<div class="chat-group-user clearfix" id="${user_id}">
                  <p class="chat-group-user__name">${user_name}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${user_id}" data-user-name="${user_name}">削除</div>
                </div>`;
    $("#chat-group-users").append(html);
  }
  function addMember(user_id){
    let html =  `<input name='group[user_ids][]' type='hidden' value='${user_id}'>
    `
    $(`#${user_id}`).append(html);

  }
  $("#user-search-field").on("keyup", function(){
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      dataType: 'json',
      data: {keyword: input}
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){        
        users.forEach(function(user){
          addUser(user);
        });
      }else if (input.length == 0){
        return false;
      }else{
        addNoUser();
      }
    })
    .fail(function(){
      alert("通信エラーです。ユーザーを表示できません");
    })
  });
  $("#user-search-result").on('click', ".user-search-add", function(){
    let user_id = $(this).data("user-id");
    let user_name = $(this).data("user-name");
    $(this).parent().remove();
    addSelectUser(user_id, user_name);
    addMember(user_id);
  });
});
