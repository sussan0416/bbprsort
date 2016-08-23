// ==UserScript==
// @name         BitBucket Pull Requests Sort 拡張
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Takahiro Suzuki
// @match        https://bitbucket.org/dashboard/pullrequests*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @require      https://cdn.jsdelivr.net/tablesorter/2.17.4/js/jquery.tablesorter.min.js
// ==/UserScript==

(function($) {
    var bgImageUrl = "http://tablesorter.com/themes/blue/bg.gif";
    var ascImageUrl = "http://tablesorter.com/themes/blue/asc.gif";
    var descImageUrl = "http://tablesorter.com/themes/blue/desc.gif";
    var styles = '<style type="text/css"><!--table.tablesorter{font-family:arial;background-color:#CDCDCD;width:100%;text-align:left;}table.tablesorter tfoot tr th,table.tablesorter thead tr th{background-color:#e6EEEE;}table.tablesorter thead tr .tablesorter-headerUnSorted{background-image:url(\'' + bgImageUrl + '\');background-repeat:no-repeat;background-position:center right;cursor:pointer;}table.tablesorter thead tr .tablesorter-headerAsc{background-image:url(\'' + ascImageUrl + '\');background-repeat:no-repeat;background-position:center right;cursor:pointer;}table.tablesorter thead tr .tablesorter-headerDesc{background-image:url(\'' + descImageUrl + '\');background-repeat:no-repeat;background-position:center right;cursor:pointer;}--></style>';
    var fontAwsome = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">';
    var reloadTable = function() {
    };
    $.tablesorter.addParser({
        id: 'date',
        is: function(s) {
            // return false so this parser is not auto detected
            return false;
        },
        format: function(s, table, cell, cellIndex) {
            var $cell = $(cell);
            return $cell.find('div > time').attr('datetime') || s;
        },
        parsed: false,
        type: 'text'
    });
    $.tablesorter.addParser({
        id: 'status',
        is: function(s) {
            // return false so this parser is not auto detected
            return false;
        },
        format: function(s, table, cell, cellIndex) {
            var $cell = $(cell);
            return s.replace('/Success/', 1).replace('/Fail/', 0).replace('/In progress/', 0).replace('', -1);
        },
        parsed: false,
        type: 'number'
    });
    $(document).ready(function() {
        $('head link:last').after(fontAwsome);
        $('head link:last').after(styles);
        $('.pullrequest-list').addClass('tablesorter');
        $('.pullrequest-list').change(reloadTable);
        $('.pullrequest-list').tablesorter({
            headers: {
                3: {
                    sorter:'date'
                },
                4: {
                    sorter:'status'
                }
            }
        });
    });
})(jQuery);