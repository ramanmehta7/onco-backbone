let categoryContent = [
    {category: 'Information Technology', title: 'Design and Analysis of Algorithms'},
    {category: 'Information Technology', title: 'Data Structures'},
    {category: 'Information Technology', title: 'C++'},
    {category: 'Mechanical', title: 'Machine Structure'},
    {category: 'Mechanical', title: 'Welding Technology'},
    {category: 'Electronics', title: 'Digital System'},
    {category: 'Electronics', title: 'Communication System'},
    {category: 'Electrical', title: 'Current Flow'},
    {category: 'Electrical', title: 'Mathematics'},
    {category: 'Computer Science', title: 'Java'},
    {category: 'Computer Science', title: 'Big Data'},
    {category: 'Civil', title: 'Water Dynamic'},
    {category: 'Civil', title: 'Structural Science'},
];

$(document).ready(function () {

    $('#menu-toggle-button').click(function () {
        $('.ui.sidebar')
            .sidebar('setting', 'transition', 'overlay')
            .sidebar('setting', 'closable', true)
            .sidebar('setting', 'dimPage', false)
            .sidebar('toggle');
    });

    let w = window.innerWidth;
    if (w > 900) {
        $('.ui.sidebar')
            .sidebar('setting', 'transition', 'push')
            .sidebar('setting', 'closable', false)
            .sidebar('setting', 'dimPage', false)
            .sidebar('show');
    }

    // Search
    $('.ui.search')
        .search({
            type: 'category',
            source: categoryContent
        });


    // Tab
    $('.menu .item')
        .tab();

    // chart
    // var ctx = document.getElementById("barChart").getContext('2d');
    // var barChart = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sst", "Sun"],
    //         datasets: [{
    //             label: 'data-1',
    //             data: [12, 19, 3, 17, 28, 24, 7],
    //             backgroundColor: "rgba(255,0,0,1)"
    //         }, {
    //             label: 'data-2',
    //             data: [30, 29, 5, 5, 20, 3, 10],
    //             backgroundColor: "rgba(0,0,255,1)"
    //         }]
    //     }
    // });
    //
    //
    // // Pie
    // var oilCanvas = document.getElementById("oilChart");
    //
    // Chart.defaults.global.defaultFontFamily = "Lato";
    // Chart.defaults.global.defaultFontSize = 18;
    //
    // var oilData = {
    //     labels: [
    //         "Saudi Arabia",
    //         "Russia",
    //         "Iraq",
    //         "United Arab Emirates",
    //         "Canada"
    //     ],
    //     datasets: [
    //         {
    //             data: [133.3, 86.2, 52.2, 51.2, 50.2],
    //             backgroundColor: [
    //                 "#FF6384",
    //                 "#63FF84",
    //                 "#84FF63",
    //                 "#8463FF",
    //                 "#6384FF"
    //             ]
    //         }]
    // };
    //
    // var pieChart = new Chart(oilCanvas, {
    //     type: 'pie',
    //     data: oilData
    // });


});

$(window).resize(function () {
    let w = window.innerWidth;
    if (w > 900) {
        $('.ui.sidebar')
            .sidebar('setting', 'transition', 'push')
            .sidebar('setting', 'closable', false)
            .sidebar('setting', 'dimPage', false)
            .sidebar('show');
    } else {
        $('.ui.sidebar')
            .sidebar('hide');
    }
});

function searchContent() {

    // Notes
    let url = getResources("http://127.0.0.1:8000/getResources");
    let nextUrl = url[0];
    let prevUrl = url[1];

    if (nextUrl === "") {
        $(".next-resource").addClass("disabled");
    } else {
        $(".next-resource").removeClass("disabled");
    }

    if (prevUrl === "") {
        $(".prev-resource").addClass("disabled");
    } else {
        $(".prev-resource").removeClass("disabled");
    }

    $(".next-resource").click(function () {
        if (nextUrl !== "") {
            url = getResources(nextUrl);
            nextUrl = url[0];
            prevUrl = url[1];
        }
    });

    $(".prev-resource").click(function () {
        if (prevUrl !== "") {
            url = getResources(prevUrl);
            nextUrl = url[0];
            prevUrl = url[1];
        }
    });

    // Previous Year
    let prev_url = getPreviousYear("http://127.0.0.1:8000/getPreviousYear");
    let prev_nextUrl = prev_url[0];
    let prev_prevUrl = prev_url[1];

    if (prev_nextUrl === "") {
        $(".next-previous-year").addClass("disabled");
    } else {
        $(".next-previous-year").removeClass("disabled");
    }

    if (prev_prevUrl === "") {
        $(".prev-previous-year").addClass("disabled");
    } else {
        $(".prev-previous-year").removeClass("disabled");
    }

    $(".next-previous-year").click(function () {
        if (prev_nextUrl !== "") {
            prev_url = getPreviousYear(prev_nextUrl);
            prev_nextUrl = prev_url[0];
            prev_prevUrl = prev_url[1];
        }
    });

    $(".prev-previous-year").click(function () {
        if (prev_prevUrl !== "") {
            prev_url = getPreviousYear(prev_prevUrl);
            prev_nextUrl = prev_url[0];
            prev_prevUrl = prev_url[1];
        }
    });
}

function getResources(uri) {

    $("#resource-data-tab").addClass('loading');
    let input_string = document.getElementById("dropdown-search").value;
    let url = "";

    $.ajax({
        url: uri,
        type: 'GET',
        async: false,
        data: {
            "input_string": input_string,
        },
        "success": function (data) {
            console.log(data);
            url = populateResourceTab(data);
        },
        "error": function (XMLHttpRequest) {
            console.log(XMLHttpRequest.status);
        },
    });
    return url;
}

function getPreviousYear(uri) {

    $("#previous-year-data-tab").addClass('loading');
    let input_string = document.getElementById("dropdown-search").value;
    let url = "";

    $.ajax({
        url: uri,
        type: 'GET',
        async: false,
        data: {
            "input_string": input_string,
        },
        "success": function (data) {
            url = populatePreviousYearTab(data);
        },
        "error": function (XMLHttpRequest) {
            console.log(XMLHttpRequest.status);
        },
    });
    return url;
}


function populateResourceTab(data) {

    let nextUrl = "";
    let prevUrl = "";
    document.getElementById("resouce-tab").innerHTML = '';

    if (data["data"]["resources"].length > 0) {
        for (let index = 0; index < data["data"]["resources"].length; index++) {
            $('#resouce-tab').append('<div class="item"> <i class="map marker icon"></i>' +
                '<div class="content">' +
                '<div class="header">' + data["data"]["resources"][index]['title'] + ' | ' + data["data"]["resources"][index]['level'] +
                '<div class="right floated">' + data["data"]["resources"][index]['branch'] + '</div> </div>' +
                '<div class="description">' +
                '<br>' +
                '<div>' + data["data"]["resources"][index]['content'] + '</div>' +
                '<br>' +
                '<div class="left floated">' + data["data"]["resources"][index]['subject_name'] + '</div>' +
                '<br>' +
                '<div class="ui yellow large disabled rating" data-rating="' + data["data"]["resources"][index]['rating'] + '" data-max-rating="5"></div>' +
                '<div class="right floated">' + data["data"]["resources"][index]['category'] + ' | ' + data["data"]["resources"][index]['session'] + '</div>' +
                '</div> </div> </div>');
        }

        //rating
        $('.ui.rating')
            .rating();

    } else {
        $('#resouce-tab').append('<div class="item">' +
            '<div class="content">' +
            '<img class="empty-list" src="resources/img/list-is-empty.png">' +
            '<br> <br>' +
            '<div class="header empty-list-header">Sorry, Nothing to show here.</div>' +
            '</div> </div>');
    }
    $("#resource-data-tab").removeClass('loading');

    nextUrl = data["data"]["next_url"];
    prevUrl = data["data"]["prev_url"];
    if (nextUrl === "") {
        $(".next-resource").addClass("disabled");
    } else {
        $(".next-resource").removeClass("disabled");
    }

    if (prevUrl === "") {
        $(".prev-resource").addClass("disabled");
    } else {
        $(".prev-resource").removeClass("disabled");
    }

    return [nextUrl, prevUrl];
}

function populatePreviousYearTab(data) {

    let nextUrl = "";
    let prevUrl = "";
    document.getElementById("previous-year-tab").innerHTML = '';

    if (data["data"]["previous_year"].length > 0) {
        for (let index = 0; index < data["data"]["previous_year"].length; index++) {
            $('#previous-year-tab').append('<div class="item"> <i class="map marker icon"></i>' +
                '<div class="content">' +
                '<div class="header">' + data["data"]["previous_year"][index]['title'] + ' | ' + data["data"]["previous_year"][index]['level'] +
                '<div class="right floated">' + data["data"]["previous_year"][index]['branch'] + '</div> </div>' +
                '<div class="description">' +
                '<br>' +
                '<div>' + data["data"]["previous_year"][index]['content'] + '</div>' +
                '<br>' +
                '<div class="left floated">' + data["data"]["previous_year"][index]['subject_name'] + '</div>' +
                '<br>' +
                '<div class="ui yellow large disabled rating" data-rating="' + data["data"]["previous_year"][index]['rating'] + '" data-max-rating="5"></div>' +
                '<div class="right floated">' + data["data"]["previous_year"][index]['category'] + ' | ' + data["data"]["previous_year"][index]['session'] + '</div>' +
                '</div> </div> </div>');
        }

        //rating
        $('.ui.rating')
            .rating();

    } else {
        $('#previous-year-tab').append('<div class="item">' +
            '<div class="content">' +
            '<img class="empty-list" src="resources/img/list-is-empty.png">' +
            '<br> <br>' +
            '<div class="header empty-list-header">Sorry, Nothing to show here.</div>' +
            '</div> </div>');
    }
    $("#previous-year-data-tab").removeClass('loading');

    nextUrl = data["data"]["next_url"];
    prevUrl = data["data"]["prev_url"];
    if (nextUrl === "") {
        $(".next-previous-year").addClass("disabled");
    } else {
        $(".next-previous-year").removeClass("disabled");
    }

    if (prevUrl === "") {
        $(".prev-previous-year").addClass("disabled");
    } else {
        $(".prev-previous-year").removeClass("disabled");
    }

    return [nextUrl, prevUrl];
}