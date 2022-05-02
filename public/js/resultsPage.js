

const openYouTube = function(id) {
    window.open($(`#${id}`).parent().parent().find('#trailer')[0].innerText);
}

const openPlayerDialog = function(id) {

    var divEl = document.createElement("div");
    divEl.innerHTML = "<iframe id=" + "\"trailerVideo\"" + "src=" + `${$(`#${id}`).parent().parent().find('#play')[0].innerText}`+"></iframe>"
    $(`#${id}`).parent().parent().find('#play')[0].innerText;

    $('body').append(divEl);

    $(divEl).dialog({
        title: 'Playing Trailer',
        close: function () {
            $(this).dialog('destroy');
            $(this).remove();
        },
        width: '65vw',
        height: '50vw',
        resizable: false,
        open: function () {
            $(this).parent().css('height', '70vh');
            $(this).css('height', '65vh');
        },
        position: {my:'center',at: 'top'}
    })
}