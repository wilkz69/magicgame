const input = document.getElementById('number-input');
const readBtn = document.getElementById('read-btn');
const loading = document.getElementById('loading');
const loadingBar = document.getElementById('loading-bar');
const loadingText = document.getElementById('loading-text');
const explosion = document.getElementById('explosion');
const result = document.getElementById('result');
const bgMusic = document.getElementById('background-audio'); // Corrected ID

const loadingMessages = [
  'Connecting to your mind via bluetooth...',
  'Reading ur mind...',
  'Ignoring all childhood traumas...',
  'Calculating GDP = C+I+G+(X-M)...',
];

function cycleLoadingText(messages, element, interval) {
  let index = 0;
  element.textContent = messages[index];
  return setInterval(() => {
    index = (index + 1) % messages.length;
    element.textContent = messages[index];
  }, interval);
}

readBtn.addEventListener('click', () => {
  // Ensure background music plays after user interaction
  if (bgMusic && bgMusic.paused) {
    bgMusic.play().catch(e => console.log('Autoplay blocked:', e));
  }

  const value = input.value.trim();
  if (value === '') {
    alert('Please enter a number first!');
    return;
  }

  input.disabled = true;
  readBtn.disabled = true;

  result.classList.add('hidden');
  explosion.classList.add('hidden');
  explosion.classList.remove('visible');

  loading.classList.remove('hidden');
  loadingBar.style.width = '0%';

  const cycle = cycleLoadingText(loadingMessages, loadingText, 1500);

  let progress = 0;
  const loadingDuration = 6000;
  const intervalTime = 100;
  const increment = (intervalTime / loadingDuration) * 100;

  const loadingInterval = setInterval(() => {
    progress += increment;
    if (progress > 100) progress = 100;
    loadingBar.style.width = progress + '%';
  }, intervalTime);

  setTimeout(() => {
    clearInterval(loadingInterval);
    clearInterval(cycle);

    loading.classList.add('hidden');

    explosion.classList.remove('hidden');
    explosion.classList.add('visible');

    const originalSrc = explosion.src;
    explosion.src = '';
    explosion.offsetHeight;
    explosion.src = originalSrc;

    setTimeout(() => {
      explosion.classList.add('hidden');
      explosion.classList.remove('visible');

      result.innerHTML = `You were thinking of the NUMBER <strong>${value}</strong> 😱 🤔`;
      result.classList.remove('hidden');

      input.disabled = false;
      readBtn.disabled = false;

      loadingBar.style.width = '0%';
      loadingText.textContent = '';
      input.value = '';
    }, 1500);
  }, loadingDuration);
});
