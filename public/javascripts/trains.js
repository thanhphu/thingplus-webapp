const reloadTimeout = 5000;
var trains;
var cars;

function loadCars(trainId) {
    $.ajax({
        type: 'GET',
        url: '/api/train/' + trainId,
        dataType: 'json',
        success: function (data) {
            var trainList = data;
            trainList.forEach((train) => {
                if (train.cars) {
                    for (i = 0; i < train.cars.length; i++) {
                        carId = train.cars[i];
                        count = train.counts[i];
                        var carClass = "<li class='car'>";
                        if (count > 2)
                            carClass = "<li class='car crowded'>";
                        $('#cars' + trainId)
                            .append(carClass +
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
        success: function (data) {
            $('#trains').empty();
            trains = data.data;
            trains.forEach((item) => {
                $('#trains')
                    .append("<li>" +
                    item.name +
                    "<ul id='cars" + item._id + "' class='cars'></ul>" +
                    "</li>");
                loadCars(item._id);
            });
            $(".cars").sortable({
                revert: true
            });
        }
    });
    setTimeout(loadTrains, reloadTimeout);
}

$(function () {
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
