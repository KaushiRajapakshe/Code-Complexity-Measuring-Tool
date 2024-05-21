document.addEventListener('DOMContentLoaded', function() {
    // Function to handle file upload
    document.getElementById('uploadBtn').addEventListener('click', function() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.txt,.java'; // Allow only text and Java files
      fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
          console.log('File selected:', file.name);
          uploadFile(file);
        } else {
          console.log('No file selected');
        }
      });
      fileInput.click();
    });
  
    // Function to upload file to server using jQuery's $.ajax
  function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    $.ajax({
      url: '/upload',
      data: formData,
      type: 'POST',
      processData: false, // Do not process data
      contentType: false, // Do not set content type
      success: (data) => {
        console.log('Formatted code received:', data);
        // Display formatted code in placeholder
        //document.getElementById('placeholder').innerText = data;
        displayFormattedCode(data);
      },
      error: (xhr, status, error) => {
        console.error('Error uploading file:', error);
        document.getElementById('placeholder').innerText = 'Error uploading file: ' + error;
      }
    });
  }

  // Function to display formatted code with line numbers
  function displayFormattedCode(code) {
    const lines = code.split('\n');
    const formattedCodeElement = document.getElementById('formattedCode');
    formattedCodeElement.innerHTML = '';

    lines.forEach((line, index) => {
      const lineNumber = document.createElement('span');
      lineNumber.className = 'line-number';
      lineNumber.textContent = (index + 1).toString().padStart(4, ' ') + ' ';

      const codeLine = document.createElement('span');
      codeLine.textContent = line;

      const lineContainer = document.createElement('div');
      lineContainer.appendChild(lineNumber);
      lineContainer.appendChild(codeLine);

      formattedCodeElement.appendChild(lineContainer);
    });
  }
  
  
  });
  