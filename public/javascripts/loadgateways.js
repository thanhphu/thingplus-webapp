$.ajax({
    type: 'GET',
    url: '/gateways/forward',
    dataType: 'json',
    success: function (data) {
        data.data.forEach(function (item) {
            $('#gateways').append("<p><a href='#" + item.id + "'>" + item.name + "</a></p>");
        });
    }
});
