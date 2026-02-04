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
