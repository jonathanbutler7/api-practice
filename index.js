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
    fetch(`https://dog.ceo/api/breeds/image/random/${numDogs}`)
    .then(response => response.json())
    .then(response => displayImages(response));
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
        fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(response => response.json())
        .then(response => displayBreed(response))
        .catch(error => alert('Something went wrong, please try again later.'))
    });
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
    console.log(response.message)
    let string = ''
    for (let i = 0; i < response.message.length; i++) {
        let pic = (`<img src="${response.message[i]}" class="results-img">`
        ) 
        $('.results').removeClass('hidden');
        string = string.concat(pic)
    } $('.results-img').html(string);
}

function displayBreed(response) {
    let breedpic = (`<img src="${response.message}" class="results-img">`
    )
    $('.results').removeClass('hidden');
    console.log(breedpic)
    $('#section').html(breedpic);
}

$(function() {
    fetchClick();
    getList();
})