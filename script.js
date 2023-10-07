// script.js
async function convertImage() {
    const fileInput = document.getElementById('fileInput');
    const outputImage = document.getElementById('outputImage');
    
    if (!fileInput.files[0]) {
        alert('Please select a file!');
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    try {
        const response = await fetch('http://localhost:8000/convert', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        outputImage.src = url;
        outputImage.style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('File conversion failed!');
    }
}
