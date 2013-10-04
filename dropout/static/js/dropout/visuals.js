(function ($) {

/**
* @function
* @property {object} jQuery plugin which runs handler function once specified element is inserted into the DOM
* @param {function} handler A function to execute at the time when the element is inserted
* @param {bool} shouldRunHandlerOnce Optional: if true, handler is unbound after its first invocation
* @example $(selector).waitUntilExists(function);
*/

$.fn.waitUntilExists    = function (handler, shouldRunHandlerOnce, isChild) {
    var found       = 'found';
    var $this       = $(this.selector);
    var $elements   = $this.not(function () { return $(this).data(found); }).each(handler).data(found, true);

    if (!isChild)
    {
        (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
            window.setInterval(function () { $this.waitUntilExists(handler, shouldRunHandlerOnce, true); }, 500)
        ;
    }
    else if (shouldRunHandlerOnce && $elements.length)
    {
        window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
    }

    return $this;
};

}(jQuery));

var tutoring = {
    "BANTEAY MEANCHEY": [14.67, 17, 22.67, 12.67, 22.0, 36.33],
    "BATTAMBANG": [3.33, 9.67, 23.33, 33, 33.67, 29.67],
    "KAMPONG CHAM": [9, 34, 41, 40, 47, 71],
    "PHNOM PENH": [61.67, 64.5, 67.83, 67.17, 69.17, 72.5],
    "RATANAK KIRI": [0,0,0,50,25,90],
    "SVAY RIENG": [1.17, 2, 20.83, 31.33, 29.16, 35.33],
    "MAX": [61.67, 64.5, 67.83, 67.17, 69.17, 90]
};

var educationLevel = {
    "BATTAMBANG":[62.9, 25.3, 1.3],
    "PAILIN":[62.9, 25.3, 1.3],
    "BANTEAY MEANCHEY":[66.1, 15.4, 0.2],
    "KAMPONG CHAM":[65.0, 20.1, 0.4],
    "PHNOM PENH":[40.7, 40.8, 13.2],
    "SVAY RIENG": [61.4, 28.1, 1.9],
    "SIEM REAP":[58.0, 14.3, 1.2],
    "ODDAR MEANCHEY":[64.8,11.1,0.1],
    "PREAH VIHEAR":[61.1, 17.2, 0.5],
    "KAMPONG THOM": [64.7, 20.0, 0.5],
    "STUNG TRENG":[61.9, 14.1, 0.7],
    "KRATIE":[60.3, 20.1, 0.2],
    "MONDUL KIRI":[43.2, 12.1, 0.8],
    "PREY VENG":[65.6, 25.9, 0.4],
    "TAKEO": [53.4, 33.5, 0.5],
    "KAMPOT":[65.4, 23.1, 0.6],
    "KOH KONG":[52.2, 23.6, 1.4],
    "KAMPONG SPEU": [64.9, 21.7, 0.4],
    "PURSAT":[62.3, 19.5, 0.6],
    "KAMPONG CHHNANG":[65.2, 23.4, 0.2],
    "KANDAL": [55.6, 32.6, 1.8],
    "MAX": [66.1, 40.8, 13.2]
};

var dataLookup = {
    "tutoring": tutoring,
    "educationLevel": educationLevel
};

function TransitionToData(grade, dataSource){
    var regions = d3.selectAll('.region')[0];
    for (var i = 0; i<regions.length; i++){
        var name = regions[i].getAttribute('name');
        values = dataSource[name.toUpperCase()];
        if (values !== undefined){
            var node = d3.select('.region[name="'+name+'"]');
            var relevantValue = Math.floor(255*(values[grade]/dataSource['MAX'][grade]));
            node.transition()
                .attr('fill', "#0000"+relevantValue.toString(16));
        }
    }
}

function transition(){
    TransitionToData($("#numericValue").val(), dataLookup[$("#dataSource").val()]);
}

function clear(){
    d3.selectAll('.region').attr('fill', '#000000');
}

$('#svg-finished').waitUntilExists(function(){
    $('svg').on("mouseover", function(event){
        $('#hover').eq(0).text(event.target.getAttribute('name'));
    });
    $("#numericValue").change(function(){
        transition();
    });
    $("#dataSource").change(function(){
        clear();
        transition();
    });
});
