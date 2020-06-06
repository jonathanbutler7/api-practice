'use strict';
//register all listeners function

// $('#breed-button').on('click', function() {
//     let breed = $('#breeds').val();
//     console.log(breed) 
// });

//listener on fetch pic button
function fetchClick() {
    $('#button').on('click', function () {
        getNumDogs();
    });
}

//take user's number input, place in url, and fetch that many images
function getNumDogs () {
    const numDogs = $('#numInput').val();
    if (numDogs >= 1 && numDogs <= 50) {
        fetch(`https://dog.ceo/api/breeds/image/random/${numDogs}`)
        .then(response => response.json())
        .then(response => displayImages(response));
        if (numDogs > 1) {
            $('#plural').html('NOW LOOK AT THESE DOGS!');
            $('#numError').addClass('hidden');
        }
    } else {
        $('#numError').removeClass('hidden');
    }
}

function numWatcher() {
    $('#numInput').keydown()
}

//fetch list from dog API
function getList() {
    $('#breeds').on('click', function () {
        fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(response => populateList(response));
    });
}

//take dropdown list and define variable
function listSelection() {
    $('#breed-button').on('click', function() {
        let breed = $('#breeds').val();
        console.log(breed)
        if (breed === "-- Select breed --") {
            $('#breedError').removeClass('hidden')
        } else {
            $('#section').removeClass('hidden');
            $('#breedError').addClass('hidden')
            fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
                .then(response => response.json())
                .then(response => displayBreed(response))
                .catch(error => alert('Something went wrong, please try again later.'))
        }
    });
}

// function blankClick() {
//     $('#breed-button').on('click', function() {
//         let breed = $('#breeds').val();
//         console.log(breed);
//                 if (breed === '-- Select breed --') {
//             $('#breedError').removeClass('hidden');
//         } 
//     })
// }

function blankClick() {
    $('#breed-button').on('click', function() {
        let breed = $('#breeds').val();
        if (breed === '-- Select breed --') {
            $('#breedError').removeClass('hidden')
        } 
    })
}

//fetch list of breeds contained in object, convert to array, populate dropdown list
function populateList(response) {
    let opts = Object.keys(response.message);

    for (let i = 0; i < opts.length; i++) {
     $('#breeds').append(`<option value="${opts[i]}">${opts[i]}</option>`);
    };
    listSelection();
}

//display the requested number of random images
function displayImages(response) {
    let string = ''
    for (let i = 0; i < response.message.length; i++) {
        let pic = (`<img id="dogpic" src="${response.message[i]}" class="results-img">`
        ) 
        $('.results').removeClass('hidden');
        string = string.concat(pic)
    } $('.results-img').html(string);
}

function displayBreed(response) {
    let breedpic = (`<img id="dogpic" src="${response.message}" class="results-img">`
    )
    $('#section').removeClass('hidden');
    // console.log(breedpic)
    $('.results-img').html(breedpic);
}

function listenToSelectBreed() {
    $('#breeds').on('change', function() {
        $('#section').addClass('hidden');
        $('#breedError').addClass('hidden');
    })
    $('#numInput').change(function() {
        $('#section').addClass('hidden');
        $('#numError').addClass('hidden');
    })
}

$(function() {
    fetchClick();
    getList();
    listenToSelectBreed();
    blankClick();
})