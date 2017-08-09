$.ajax({
    type: 'GET',
    url: '/api/trains',
    dataType: 'json',
    success: function (data) {
        data.data.forEach(function (item) {
            $('#trains')
            .append("<li><a href='#" + item._id + "'>" + item.name + "</a></li>");
        });
    }
});
