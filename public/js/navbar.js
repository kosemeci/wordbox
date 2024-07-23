
const newBoxButton = document.getElementById("newBox");
const wordBoxBrand = document.getElementById("wordBoxBrand");

newBoxButton.addEventListener("click", function() {
    console.log("hello world");
    window.location.href = '/mybox';
});

wordBoxBrand.addEventListener("click", function () {
    window.location.href = 'index';
});