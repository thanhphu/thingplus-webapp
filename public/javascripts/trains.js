const reloadTimeout = 5000;
var trains;
var cars;

function loadCars(trainId) {
    $.ajax({
        type: 'GET',
        url: '/api/train/' + trainId,
        dataType: 'json',
        success: function(data) {
            var trainList = data;
            trainList.forEach((train) => {
                if (train.cars) {
                    for (i = 0; i < train.cars.length; i++) {
                        carId = train.cars[i];
                        count = train.counts[i];
                        $('#cars' + trainId)
                            .append("<li class='car'>" +
                                "<a href='#'>Car " + (i + 1) + ":" + count + "</a>" +
                                "</li>");
                    }
                }
            });
        }
    });
}

function loadTrains() {
    $.ajax({
        type: 'GET',
        url: '/api/trains',
        dataType: 'json',
        success: function(data) {
            $('#trains').empty();
            trains = data.data;
            trains.forEach((item) => {
                $('#trains')
                    .append("<li>" +
                        "<span class='glyphicon glyphicon-blackboard' aria-hidden='true'></span>" +
                        item.name +
                        "<ul id='cars" + item._id + "' class='cars'></ul>" +
                        "</li>");
                loadCars(item._id);
            });
        }
    });
    setTimeout(loadTrains, reloadTimeout);
}

$(function() {
    $(".cars").sortable({
        revert: true
    });
    $("#trains").sortable({
        revert: true
    });
    $("#draggable").draggable({
        connectToSortable: "#trains",
        helper: "clone",
        revert: "invalid"
    });
    $("ul, li").disableSelection();
});

loadTrains();
