$(document).ready(function () {
    $('#menu-toggle-button').click(function () {
        $('.ui.sidebar')
            .sidebar('setting', 'transition', 'push')
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

    // TAB
    $('.menu .item')
        .tab();
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