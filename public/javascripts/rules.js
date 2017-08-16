const reloadTimeout = 5000;

function loadRules() {
    $.getJSON('/api/forward/rules', function (data) {
        $("tbody").empty();
        var tbl_body_rules = document.createElement("tbody");
        var tbl_body_templates = document.createElement("tbody");
        var odd_even = false;
        $.each(data.data, function () {
            var tbl_row;
            if (this.template) {
                tbl_row = tbl_body_templates.insertRow();
            } else {
                tbl_row = tbl_body_rules.insertRow();
            }
            tbl_row.className = odd_even ? "odd" : "even";
            
            $.each(this, function (k, v) {
                var cell = tbl_row.insertCell();
                var text = v.toString();
                if (v instanceof Object) {
                    text = JSON.stringify(v);
                }
                cell.appendChild(document.createTextNode(text));
            })
            odd_even = !odd_even;
        })
        $("#rules-table").append(tbl_body_rules);
        $("#templates-table").append(tbl_body_templates);
    });
}

$(function () {
    $("#rules").sortable({
        revert: true
    });
    $("#accordion").accordion({
        collapsible: true,
        heightStyle: "content"
    })
    $("ul, li").disableSelection();
    loadRules();
});


