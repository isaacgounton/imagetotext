const imageInput = document.getElementById('imageInput');
const result = document.getElementById('result');
const editButtons = document.getElementById('editButtons');
const editButton = document.getElementById('editButton');
const saveButton = document.getElementById('saveButton');
const copyButton = document.getElementById('copyButton');
const loader = document.getElementById('loader');
const dropZone = document.getElementById('dropZone');
const apiKeyInput = document.getElementById('apiKeyInput');
const apiKeyToggle = document.getElementById('apiKeyToggle');

// Function to store and retrieve API key from localStorage
function saveApiKey(apiKey) {
  localStorage.setItem('openai_api_key', apiKey);
}

function getApiKey() {
  return localStorage.getItem('openai_api_key');
}

// Set the stored API key (if any) when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const savedApiKey = getApiKey();
  if (savedApiKey) {
    apiKeyInput.value = savedApiKey;
    console.log('API key loaded from localStorage');
  }
});

// Initialize Quill editor
let quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']
    ]
  }
});

// Remove initial disabling of the editor
// Now, the editor will allow users to interact with it immediately.

// Toggle API key input and save the API key to localStorage when entered
apiKeyToggle.addEventListener('click', () => {
  apiKeyInput.style.display = apiKeyInput.style.display === 'none' ? 'block' : 'none';
  apiKeyToggle.textContent = apiKeyInput.style.display === 'none' ? 'Enter API Key' : 'Hide API Key';

  // Save the API key to localStorage when the user enters it
  if (apiKeyInput.value.trim()) {
    saveApiKey(apiKeyInput.value.trim());
    console.log('API key saved to localStorage');
  }
});

// Function to process image and fetch transcription
async function processImage(file) {
  const apiKey = getApiKey(); // Retrieve the saved API key from localStorage
  if (!apiKey) {
    alert('Please enter your OpenAI API Key');
    return;
  }

  quill.setText(''); // Clear the editor
  editButtons.style.display = 'none';
  loader.style.display = 'block';
  result.style.display = 'none';

  try {
    const base64Image = await fileToBase64(file);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text", 
                text: "Transcribe the text in this image exactly as it appears, paying close attention to special characters, accents, and diacritics. Provide only the transcription without any additional comments or prefixes. Make sure to:\\n\\n1. Recognize and transcribe all sections of the text separately as they are displayed in the image.\\n2. Maintain the same formatting, including line breaks, section numbers, and punctuation.\\n3. Preserve all special characters and accents exactly as they appear.\\n4. If any text appears multiple times, repeat it exactly as shown in the image.\\n5. Ensure no part of the text is omitted or modified.\\n6. Transcribe the text exactly as it is, even if the language or words are unfamiliar."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],              
          },
        ],
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const transcribedText = data.choices[0].message.content;

    quill.setText(transcribedText);
    result.style.display = 'block';
    editButtons.style.display = 'block';
    result.classList.add('animate__animated', 'animate__fadeIn');
  } catch (error) {
    console.error('Error:', error);
    quill.setText(`Error: ${error.message}. Please check your API key and try again.`);
    result.style.display = 'block';
  } finally {
    loader.style.display = 'none';
  }
}

// Convert image to Base64
async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
}

// Event listeners for file input
imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    processImage(file);
  }
});

// Drag and drop functionality for image input
dropZone.addEventListener('click', () => {
  imageInput.click();
});
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    processImage(file);
  }
});

// Paste functionality for image input
document.addEventListener('paste', (e) => {
  const items = e.clipboardData.items;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf('image') !== -1) {
      const file = items[i].getAsFile();
      processImage(file);
      break;
    }
  }
});

// Enable manual editing when clicking inside the editor
quill.root.addEventListener('click', () => {
  quill.enable();
  editButton.style.display = 'none';
  saveButton.style.display = 'inline-block';
  saveButton.classList.add('animate__animated', 'animate__fadeIn');
});

// Save the manual corrections
saveButton.addEventListener('click', () => {
  quill.disable();
  const correctedText = quill.getText(); // Get the corrected text

  // Do something with the corrected text, e.g., save it or send it to your backend
  console.log('Corrected Text:', correctedText);

  saveButton.style.display = 'none';
  editButton.style.display = 'inline-block';
  editButton.classList.add('animate__animated', 'animate__fadeIn');
});

// Copy functionality
copyButton.addEventListener('click', () => {
  const textToCopy = quill.getText();
  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = copyButton.textContent;
    copyButton.textContent = 'Copied!';
    copyButton.classList.add('animate__animated', 'animate__pulse');
    setTimeout(() => {
      copyButton.textContent = originalText;
      copyButton.classList.remove('animate__animated', 'animate__pulse');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
});
