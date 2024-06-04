$(document).ready(function() {
    $.ajax({
        url: 'api/visualization',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            const tableBody = $('#historyTableBody');
            tableBody.empty();

            data.forEach(function(file) {
                let date, formattedDate, formattedTime;

                // Extract the ObjectId string from the nested structure
                if (file._id && file._id.$oid) {
                    date = new Date(parseInt(file._id.$oid.substring(0, 8), 16) * 1000);
                } else {
                    date = new Date();
                }

                formattedDate = date.toLocaleDateString();
                formattedTime = date.toLocaleTimeString();

                const row = `
          <tr data-file-id="${file._id.$oid}">
            <td class="file-name">${file.filename}</td>
            <td>${formattedDate}</td>
            <td>${formattedTime}</td>
            <td>
              <img src="../src/public/images/download.png" alt="Icon 1" class="table-image">
              <img src="../src/public/images/bin.png" alt="Icon 2" class="table-image delete-btn">
              <img src="../src/public/images/refresh.png" alt="Icon 3" class="table-image rename-btn">
              <img src="../src/public/images/eye.png" alt="Icon 4" class="table-image">
            </td>
          </tr>
        `;
                tableBody.append(row);
            });

            // Add click event listener for delete buttons
            $('.delete-btn').on('click', function() {
                const fileId = $(this).closest('tr').data('file-id');
                deleteFile(fileId);
            });

            // Add click event listener for rename buttons
            $('.rename-btn').on('click', function() {
                const fileId = $(this).closest('tr').data('file-id');
                const newName = prompt('Enter new file name:');
                if (newName !== null && newName.trim() !== '') {
                    renameFile(fileId, newName);
                }
            });
        }
    });
});

function deleteFile(fileId) {
    $.ajax({
        url: `api/visualization/files/${fileId}`,
        method: 'DELETE',
        success: function() {
            // Remove the corresponding row from the table
            $(`tr[data-file-id="${fileId}"]`).remove();
        },
        error: function(error) {
            console.error('Error deleting file:', error);
        }
    });
}

function renameFile(fileId, newName) {
    $.ajax({
        url: `api/visualization/files/${fileId}`,
        method: 'PUT',
        data: { newName: newName },
        success: function() {
            // Update the file name in the corresponding row
            $(`tr[data-file-id="${fileId}"] .file-name`).text(newName);
        },
        error: function(error) {
            console.error('Error renaming file:', error);
        }
    });
}



