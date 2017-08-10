const reloadTimeout = 5000;

function loadRules() {
    $.getJSON('/api/forward/rules', function (data) {
        var tbl_body = document.createElement("tbody");
        var odd_even = false;
        $.each(data, function () {
            var tbl_row = tbl_body.insertRow();
            tbl_row.className = odd_even ? "odd" : "even";
            $.each(this, function (k, v) {
                var cell = tbl_row.insertCell();
                cell.appendChild(document.createTextNode(v.toString()));
            })
            odd_even = !odd_even;
        })
        $("#rules-table").append(tbl_body);
    });
}

$(function () {
    $("#rules").sortable({
        revert: true
    });
    $("ul, li").disableSelection();
    loadRules();
});


