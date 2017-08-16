const interested = ['id','deviceModels','name','sensors','status']

$.ajax({
    type: 'GET',
    url: '/gateways/forward',
    dataType: 'json',
    success: function (data) {
        $("tbody").empty();
        var tbl_body = document.createElement("tbody");
        var odd_even = false;

        $.each(data.data, function () {
            var tbl_row = tbl_body.insertRow();
            tbl_row.className = odd_even ? "odd" : "even";
            $.each(this, function (k, v) {
                if (!$.inArray(k, interested)) {
                    return;
                }
                var cell = tbl_row.insertCell();
                var text = v.toString();
                if (v instanceof Object) {
                    text = JSON.stringify(v);
                }
                cell.appendChild(document.createTextNode(text));
            })
            odd_even = !odd_even;
        })
        $("#gateways-table").append(tbl_body);
    }
});
