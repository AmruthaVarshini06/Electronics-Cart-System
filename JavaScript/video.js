document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".video-container video");

  if (!video) return;

  video.muted = true;

  video.addEventListener("loadedmetadata", () => {
    video.currentTime = 0.1;
    video.play().catch(() => {
      document.addEventListener(
        "click",
        () => video.play(),
        { once: true }
      );
    });
  });
});
