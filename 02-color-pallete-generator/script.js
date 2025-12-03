const generateBtn = document.getElementById('generate-btn');
const paletteContainer = document.querySelector('.palette-container');

generateBtn.addEventListener('click', generatePalette);

paletteContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('copy-btn')) {
    const hexValue = e.target.previousElementSibling.textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(e.target))
      .catch(() => console.log('Error copying to clipboard'));
  } else if (e.target.classList.contains('color-box')) {
    const hexValue =
      e.target.nextElementSibling.querySelector('.hex-value').textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(() =>
        showCopySuccess(e.target.nextElementSibling.querySelector('.copy-btn'))
      )
      .catch(() => console.log('Error copying to clipboard'));
  }
});

function showCopySuccess(copyBtn) {
  copyBtn.classList.remove('far', 'fa-copy');
  copyBtn.classList.add('fas', 'fa-check');

  copyBtn.style.color = '#48bb78';

  setTimeout(() => {
    copyBtn.classList.remove('fas', 'fa-check');
    copyBtn.classList.add('fa', 'fa-copy');
    copyBtn.style.color = '';
  }, 1500);
}

function generatePalette() {
  const colors = [];

  for (let i = 0; i < 5; i++) {
    colors.push(getRandomColor());
  }

  updatePaletteDisplay(colors);
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updatePaletteDisplay(colors) {
  const colorsBoxes = document.querySelectorAll('.color-box');
  colorsBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector('.color');
    colorDiv.style.backgroundColor = color;
    const hexValue = box.querySelector('.hex-value');
    hexValue.textContent = color;
  });
}

generatePalette();
