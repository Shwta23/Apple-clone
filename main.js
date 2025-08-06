document.addEventListener('DOMContentLoaded', function () {
  const videoContainer = document.querySelector('.video-container');
  const playPauseButton = document.getElementById('ctrlIcon');
  const video = document.querySelector('video');
  const content = document.getElementById('content'); // Reference for the content display area
  

  // Variable to store the last scroll position
  let lastScrollY = window.scrollY;
  let resizingInProgress = false; // To prevent resizing while scrolling upwards
  let isScrollingDown = true; // Tracks whether the user is scrolling down

  // Function to resize video based on scroll position and keep it centered
  function adjustVideoSize() {
    const scrollY = window.scrollY;

    // Only resize the video when scrolling down and prevent resizing while scrolling upwards
    if (scrollY > lastScrollY) {
      isScrollingDown = true; // Scrolling down
    } else {
      isScrollingDown = false; // Scrolling up
    }

    if (isScrollingDown) {
      // When scrolling down, adjust the video size
      if (scrollY > 0) {
        const newWidth = Math.max(100 - scrollY * 0.1, 85.2); // Minimum width at 85.2vw
        videoContainer.style.width = `${newWidth}vw`;
        videoContainer.style.margin = '0 auto'; // Center the video container

        const borderRadius = newWidth < 100 ? '1.5rem' : '0';
        video.style.borderRadius = borderRadius;

        if (newWidth === 100) {
          video.style.transitionDuration = '0.3s'; // Faster transition when resizing to full viewport
        } else {
          video.style.transitionDuration = '0.5s'; // Normal speed when resizing down
        }
      }
    } else if (!isScrollingDown && scrollY <= 0) {
      // When scrolling up, and we are at the top of the page, reset video size to full
      videoContainer.style.width = '100vw';
      video.style.borderRadius = '0';
      video.style.transitionDuration = '0.3s'; // Fast transition back to full width
    }

    // Update last scroll position
    lastScrollY = scrollY;
  }

  // Listen to scroll events
  window.addEventListener('scroll', adjustVideoSize);

  // Toggle play/pause icon and video state
  function togglePlayPause() {
    const isPlaying = !video.paused;
    video[isPlaying ? 'pause' : 'play']();
    playPauseButton.classList.toggle('fa-play', isPlaying);
    playPauseButton.classList.toggle('fa-pause', !isPlaying);
  }

  // Initialize button state based on video playback
  function setButtonState() {
    playPauseButton.classList.toggle('fa-play', video.paused);
    playPauseButton.classList.toggle('fa-pause', !video.paused);
  }

  if (playPauseButton && video) {
    setButtonState();
    playPauseButton.addEventListener('click', togglePlayPause);
    video.addEventListener('click', togglePlayPause);
    video.addEventListener('play', setButtonState);
    video.addEventListener('pause', setButtonState);
  }

  




 // Toggler button for content switching
  function toggleContent(selectedCategory) {
    document.querySelectorAll('.toggle-button').forEach((button) => {
      button.classList.remove('button-selected');
      button.classList.add('button-default');
    });

    const selectedButton = Array.from(document.querySelectorAll('.toggle-button')).find(
      (button) => button.textContent === selectedCategory
    );
    if (selectedButton) {
      selectedButton.classList.add('button-selected');
      selectedButton.classList.remove('button-default');
    }

    let filePath;
    if (selectedCategory === 'Laptops') {
      filePath = 'laptops.html';
    } else if (selectedCategory === 'Desktops') {
      filePath = 'desktops.html';
    } else if (selectedCategory === 'Displays') {
      filePath = 'displays.html';
    }

    fetch(filePath)
      .then(response => response.text())
      .then(data => {
        content.innerHTML = data;
      })
      .catch(error => {
        content.innerHTML = '<p>Error loading content.</p>';
        console.error('Error:', error);
      });
  }

  document.querySelectorAll('.toggle-button').forEach((button) => {
    button.addEventListener('click', () => {
      toggleContent(button.textContent);
    });
  });

  // Show "Laptops" as the default on page load
  toggleContent('Laptops');








// Select all containers and buttons using class selectors
const containers = document.querySelectorAll('.scrollcontent'); // Multiple scroll containers
const backButtons = document.querySelectorAll('.leftscroll'); // Back buttons
const frontButtons = document.querySelectorAll('.rightscroll'); // Front buttons

// Loop through each container and set up the corresponding functionality
containers.forEach((container, index) => {
  const back = backButtons[index];
  const front = frontButtons[index];

  // Calculate the width of one card
  var cardWidth = document.querySelector('.card').offsetWidth + 20; // Add gap if any
  
  front.onclick = function () {
    sideScroll(container, 'right', cardWidth * 1.2); // Adjust step for smoother scroll
  };
  
  back.onclick = function () {
    sideScroll(container, 'left', cardWidth * 1.2);  // Adjust step
  };
  
  // Side scrolling function with smooth behavior
  function sideScroll(element, direction, distance) {
    const scrollPosition = direction === 'left'
      ? element.scrollLeft - distance
      : element.scrollLeft + distance;
    element.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    setTimeout(() => updateScrollButtonColors(container, back, front), 300); // Delay to ensure buttons update after scroll
  }

  // Update button colors when at the edges
  function updateScrollButtonColors(container, back, front) {
    // Check if at the left edge
    if (Math.round(container.scrollLeft) <= 0) {
      back.style.backgroundColor = '#e2e2e5'; // Active color when at left edge
      back.style.pointerEvents = 'none';
    } else {
      back.style.backgroundColor = '#f3f3f4'; // Active color when scrolling
      back.style.pointerEvents = 'auto';
    }

    // Check if at the right edge
    if (Math.round(container.scrollLeft + container.clientWidth) >= container.scrollWidth) {
      front.style.backgroundColor = '#f3f3f4'; // Edge color when at the right edge
      front.style.pointerEvents = 'none';
      back.style.backgroundColor = '#e2e2e5'; // Change to black when at the right edge
    } else {
      front.style.backgroundColor = '#e2e2e5'; // Active color when scrolling
      front.style.pointerEvents = 'auto';
      back.style.backgroundColor = '#f3f3f4'; // Active color for back button when scrolling
    }
  }

  // Ensure the function updates on both page load and scrolling
  container.addEventListener('scroll', () => updateScrollButtonColors(container, back, front));
  window.addEventListener('load', () => updateScrollButtonColors(container, back, front));
});


});



