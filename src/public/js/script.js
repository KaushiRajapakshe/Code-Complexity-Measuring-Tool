const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}

const getComplexity = () => {
    $.ajax({
        url: '/api/complexity',
        type: 'GET',
        success: (result) => {
            getCodeComplexity(result.data);
        }
    })
}

const postComplexity = (cart) => {
    $.ajax({
        url: '/api/cood',
        data: cart,
        type: 'POST',
        success: (result) => {
            alert(result.message);
            location.reload();
        }
    })
}

const getCodeComplexity = (items) => {
    items.forEach((item) => {
        let itemToAppend =
            '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img id="cardImg" class="activator" src="' +
            item.path +
            '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' +
            item.title +
            '<i class="material-icons right">more_vert</i></span><p><a href="#">' +
            "</a></p></div>" +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' +
            item.subTitle +
            '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' +
            item.description +
            "</p>" +
            "</div></div></div>";
        $("#card-section").append(itemToAppend);
    });
};

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.subTitle = $('#subTitle').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    console.log(formData);
    postComplexity(formData);
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    });
    $('.modal').modal();
    getComplexity();
});
