// let progress = 0;
// const bar = document.getElementById("progress-bar");
// const loader = document.getElementById("preloader");

// const interval = setInterval(() => {
//     progress += 4;
//     bar.style.width = progress + "%";

//     if (progress >= 100) {
//         clearInterval(interval);
//         setTimeout(() => {
//             loader.style.display = "none";
//         }, 150);
//     }
// }, 75);

// ------------------------

// const loader = document.getElementById("preloader");
// const body = document.body;

// let progress = 0;
// const bar = document.getElementById("progress-bar");

// body.classList.add("preloader-active");  // Add class at start (optional if your HTML already has it)

// const interval = setInterval(() => {
//     progress += 9;
//     bar.style.width = progress + "%";

//     if (progress >= 100) {
//         clearInterval(interval);
//         setTimeout(() => {
//             loader.style.display = "none";

//             // Remove the preloader-active class to start animations
//             body.classList.remove("preloader-active");

//             // Optionally, if you need to trigger JS animations or other stuff, do it here
//             // startOtherAnimations();

//         }, 200);
//     }
// }, 70);



// ----------------------------------



document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("preloader");
    const bar = document.getElementById("progress-bar");

    let progress = 0;

    const interval = setInterval(() => {
        progress += 5;
        bar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);

            setTimeout(() => {
                loader.style.opacity = "0";
                loader.style.pointerEvents = "none";

                setTimeout(() => {
                    loader.style.display = "none";

                    // 🔥 START ALL ANIMATIONS
                    document.body.classList.remove("preloader-active");

                }, 100);

            }, 200);
        }
    }, 40);
});
