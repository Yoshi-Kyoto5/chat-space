$(function(){
      function buildHTML(message){
        if ( message.image ) {
          var html =
          `<div class="message">
              <div class="message_upper-info">
                <div class="message__upper-info__talker">
                  ${message.user_name}
                </div>
                <div class="message__upper-info__date">
                  ${message.created_at}
                </div>
              </div>
              <div class="message__text">
                <p class="lower-message__content">
                  ${message.content}
                </p>
              </div>
              <img src=${message.image} >
            </div>`
          return html;
        } else {
          var html =
          `<div class="message">
              <div class="message_upper-info">
                <div class="message__upper-info__talker">
                  ${message.user_name}
                </div>
                <div class="message__upper-info__date">
                  ${message.created_at}
                </div>
              </div>
              <div class="message__text">
                <p class="lower-message__content">
                  ${message.content}
                </p>
              </div>
            </div>`
          return html;
        };
      }
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
      $('.message').append(html);
      $('.message').animate({scrollTop: $('.message')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
     })
     .fail({
       alert('メッセージ送信に失敗しました');
     });
  })
});