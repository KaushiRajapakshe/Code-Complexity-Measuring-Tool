$(document).ready(function() {
  $.ajax({
    url: '/history/files',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      const tableBody = $('#historyTableBody');
      tableBody.empty();

      data.forEach(function(file) {
        const date = new Date(file._id.getTimestamp()); // Assuming MongoDB ObjectID timestamp
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();

        const row = `
          <tr>
            <td>${file.name}</td>
            <td>${formattedDate}</td>
            <td>${formattedTime}</td>
            <td>
              <img src="/images/icon1.png" alt="Icon 1">
              <img src="/images/icon2.png" alt="Icon 2">
              <img src="/images/icon3.png" alt="Icon 3">
              <img src="/images/icon4.png" alt="Icon 4">
            </td>
          </tr>
        `;
        tableBody.append(row);
      });
    },
    error: function(error) {
      console.error('Error fetching file history:', error);
    }
  });
});