// Tab switching
const tabText = document.getElementById('tab-text');
const tabImage = document.getElementById('tab-image');
const textSection = document.getElementById('text-section');
const imageSection = document.getElementById('image-section');

tabText.addEventListener('click', () => {
  tabText.classList.add('active');
  tabImage.classList.remove('active');
  textSection.classList.remove('hidden');
  imageSection.classList.add('hidden');
});

tabImage.addEventListener('click', () => {
  tabImage.classList.add('active');
  tabText.classList.remove('active');
  imageSection.classList.remove('hidden');
  textSection.classList.add('hidden');
});

// Populate font select
const fontSelect = document.getElementById('font-select');
figlet.fonts((err, fonts) => {
  if (err) return;
  fonts.forEach(f => {
    const option = document.createElement('option');
    option.value = f;
    option.textContent = f;
    fontSelect.appendChild(option);
  });
});

// Text conversion
const convertTextBtn = document.getElementById('convert-text');
const textInput = document.getElementById('text-input');
const textOutput = document.getElementById('text-output');
convertTextBtn.addEventListener('click', () => {
  const text = textInput.value || '';
  const font = fontSelect.value;
  const width = parseInt(document.getElementById('width-input').value, 10) || 80;
  figlet.text(text, { font, horizontalLayout: 'default', verticalLayout: 'default', width }, (err, data) => {
    if (err) {
      textOutput.textContent = 'Error: ' + err.message;
    } else {
      textOutput.textContent = data;
    }
  });
});

// Image conversion
const convertImageBtn = document.getElementById('convert-image');
const imageInput = document.getElementById('image-input');
const imageOutput = document.getElementById('image-output');
convertImageBtn.addEventListener('click', () => {
  const file = imageInput.files[0];
  const width = parseInt(document.getElementById('width-image-input').value, 10) || 80;
  if (!file) return alert('Please select an image file.');
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const aspect = img.height / img.width;
      canvas.width = width;
      canvas.height = Math.round(width * aspect * 0.5);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const chars = '@%#*+=-:. ';
      let ascii = '';
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const idx = (y * canvas.width + x) * 4;
          const r = imageData.data[idx];
          const g = imageData.data[idx + 1];
          const b = imageData.data[idx + 2];
          const brightness = (r + g + b) / 3 / 255;
          const charIndex = Math.floor((1 - brightness) * (chars.length - 1));
          ascii += chars[charIndex];
        }
        ascii += '\n';
      }
      imageOutput.textContent = ascii;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}); 