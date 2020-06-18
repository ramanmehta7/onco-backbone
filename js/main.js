$("#classroom-modal-button").click(function () {
    showModal("#classroom-modal");
});

$("#unite-modal-button").click(function () {
    showModal("#unite-modal");
});

$("#community-modal-button").click(function () {
    showModal("#community-modal");
});

$("#sign-up-button").click(function () {
    showModal("#sign-up-modal");
});

$("#sign-in-button").click(function () {
    showModal("#sign-in-modal");
});

function showModal(selector, inverted = false) {
    if (inverted) {
        $(selector)
            .modal({
                inverted: true
            })
            .modal('show');
    } else {
        $(selector)
            .modal('show');
    }
}

$(document).ready(function () {
    showModal("#sign-up-modal", true);
});