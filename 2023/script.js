document.addEventListener("DOMContentLoaded", function () {
    const snowflakesContainer = document.querySelector(".snowflakes");

    for (let i = 0; i < 100; i++) {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 2 + 1}s`; // Varying animation duration for a more natural effect
        snowflakesContainer.appendChild(snowflake);
    }

    const cursor = document.createElement("div");
    cursor.classList.add("cursor");
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", function (e) {
        cursor.style.left = e.pageX - cursor.offsetWidth / 2 + "px";
        cursor.style.top = e.pageY - cursor.offsetHeight / 2 + "px";
    });
});
