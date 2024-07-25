document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.card');

        // Her kart için click olay dinleyicisi ekle
        cards.forEach(card => {
            card.addEventListener('click', () => {
                console.log(card.id);
                window.location.href="/boxes/level_"+card.id;
            });
        });
});
