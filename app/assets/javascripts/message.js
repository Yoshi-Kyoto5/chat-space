$(function(){
      function buildHTML(message){
        if ( message.image ) {
          var html =
          `<div class="message" data-message-id="${message.id}">` +
              `<div class="message_upper-info">` +
                `<div class="message__upper-info__talker">` +
                  message.user_name +
                `</div>` +
                `<div class="message__upper-info__date">` +
                  message.created_at +
                `</div>` +
              `</div>` +
              `<div class="message__text">` +
                `<p class="lower-message__content">` +
                  message.content +
                `</p>` +
              `<img src="` + message.image + `"class="lower-message__image" >` +
              `</div>` +
          `</div>`
        } else if (message.content) {
          var html =
          `<div class="message"  data-message-id="${message.id}">` +
              `<div class="message_upper-info">` +
                `<div class="message__upper-info__talker">` +
                  message.user_name +
                `</div>` +
                `<div class="message__upper-info__date">` +
                  message.created_at +
                `</div>` +
              `</div>` +
              `<div class="message__text">` +
                `<p class="lower-message__content">` +
                  message.content +
                `</p>` +
              `</div>` +
            `</div>`
        } else if (message.image) {
          var html =
          `<div class="message"  data-message-id="${message.id}">` +
              `<div class="message_upper-info">` +
                `<div class="message__upper-info__talker">` +
                  message.user_name +
                `</div>` +
                 `<div class="message__upper-info__date">` +
                  message.created_at +
                `</div>` +
               `</div>` +
              `</div>` +
              `<img src="` + message.image + `"class="lower-message__image" >` +
              `</div>` +
           `</div>`
        };
        return html;
      };
      
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
     .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
     })
     .fail(function(){
      alert("送信できませんでした。");
     })
     .always(function(){
      $('.submit-btn').prop('disabled', false);
     });
  })
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      type: 'GET',
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages) {
      if (messages.length !== 0){
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});