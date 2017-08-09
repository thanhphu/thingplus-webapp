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
                    train.cars.forEach((carId) => {
                        console.log('#cars' + trainId);
                        $('#cars' + trainId)
                            .append("<li class='car'>" +
                                "<a href='#'>" + carId + "</a>" +
                                "</li>");
                    });
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
            trains = data.data;
            trains.forEach((item) => {
                $('#trains')
                    .append("<li>" +
                        "<span class='glyphicon glyphicon-blackboard' aria-hidden='true'></span>" +
                        item.name +
                        "<ul id='cars" + item._id + "'></ul>" +
                        "</li>");
                loadCars(item._id);
            });
        }
    });
}

$(function() {
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