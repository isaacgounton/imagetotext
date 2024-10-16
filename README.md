# imagetotext

# GPT Vision Image Transcription App

This web application allows users to transcribe text from images using OpenAI's GPT-4 model with Vision capabilities. The application extracts the text exactly as it appears in the image, including special characters, diacritics, and formatting, and allows users to manually review and correct the transcription.

## Features

- **Image Upload**: Upload images containing text via drag-and-drop or file input.
- **Text Transcription**: Extracts text from the image using GPT-4, preserving formatting and special characters.
- **Manual Editing**: Users can click inside the editor to manually correct the extracted text.
- **Save Corrections**: Save the manually corrected text for future use.
- **Copy Text**: Easily copy the transcribed or corrected text to the clipboard.
- **API Key Storage**: Users can input and save their OpenAI API key in the browser for reuse during the session.

## Requirements

- An OpenAI API Key with access to the GPT-4 model.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/isaacgounton/imagetotext.git
cd imagetotext
```

### 2. Install Dependencies

There are no additional server-side dependencies for this project since it runs entirely on the client side (JavaScript and HTML). Make sure you have an internet connection to load external libraries like Quill.js.

### 3. Usage

1. **Open the `index.html` file in your browser.**
2. **Enter your OpenAI API key** by clicking on the "Enter API Key" button and inputting your key.
3. **Upload an image** by dragging and dropping it into the designated area or by using the file input.
4. The app will automatically extract the text from the image.
5. **Click inside the editor** to manually correct the text if needed.
6. After editing, click **"Save"** to lock in the changes or **"Copy Text"** to copy the transcription to your clipboard.

### 4. OpenAI API Key

To use the application, you must enter a valid OpenAI API key. The key will be stored locally in your browser, so you won’t need to re-enter it during your session. To input your key:
- Click the **"Enter API Key"** button.
- Input your key into the text field.
- Your API key will be saved in the browser’s localStorage.

### 5. Example Workflow

1. **Input OpenAI API Key**: Click the button to input your OpenAI API key.
2. **Upload Image**: Drag and drop an image into the drop zone, or click to select a file from your computer.
3. **Text Extraction**: The app will automatically extract the text and display it in the editor.
4. **Manual Corrections**: Click inside the text editor to make any manual corrections, and then click "Save."
5. **Copy Text**: After corrections, click "Copy Text" to copy the transcribed content to your clipboard.

## File Structure

```
├── index.html           # Main HTML file
├── script.js            # JavaScript logic for handling image processing, API interaction, and UI updates
├── styles.css           # Styles for the app interface
└── README.md            # This README file
```

## Technologies Used

- **OpenAI GPT-4 Model**: For text extraction and transcription.
- **Quill.js**: Rich text editor for displaying and editing transcribed content.
- **HTML/CSS/JavaScript**: The app runs entirely on the client side.
  
## Future Improvements

- **Language Detection**: Automatically detect the language of the text to improve OCR accuracy.
- **Multiple Image Support**: Enable the ability to upload and transcribe multiple images at once.
- **Advanced Error Highlighting**: Automatically detect and highlight parts of the text that may have been misinterpreted by the OCR.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and make a pull request with your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact

If you have any questions or feedback, feel free to reach out to [your-email@example.com].

---

This `README.md` provides a clear guide for anyone wanting to use, contribute to, or further develop your application. Feel free to modify the content based on your specific project details!