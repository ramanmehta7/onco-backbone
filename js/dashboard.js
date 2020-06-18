$(document).ready(function () {
    $('.classroom').click(function () {
        openClassroom();
    });

    $('.community').click(function () {
        openCommunity();
    });
});

function openClassroom() {
    window.location.href = 'resources.php';
}

function openCommunity() {
    window.location.href = 'community.php';
}