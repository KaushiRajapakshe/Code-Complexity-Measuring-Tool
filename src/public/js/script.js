document.addEventListener('DOMContentLoaded', function() {
    // Function to handle file upload
    document.getElementById('uploadBtn').addEventListener('click', function() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.txt,.java'; // Allow only text and Java files
      fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        uploadFile(file);
      });
      fileInput.click();
    });
  
    // Function to upload file to server
    function uploadFile(file) {
      const formData = new FormData();
      formData.append('file', file);
  
      fetch('/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        // Display formatted code in placeholder
        document.getElementById('placeholder').innerText = data;
      })
      .catch(error => console.error('Error uploading file:', error));
    }
  
    // Function to handle code formatting
    document.getElementById('formatBtn').addEventListener('click', function() {
      // You can add additional formatting logic here if needed
      // For now, let's just log a message
      console.log('Format Code button clicked');
    });
  });
  