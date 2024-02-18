document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('comment'); // Replace 'yourFormId' with the actual ID of your form

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const serializedData = {};

    for (const [key, value] of formData.entries()) {
      serializedData[key] = value;
    }

    fetch('./api/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serializedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data sent successfully:', data);
        // Handle success response here
      })
      .catch((error) => {
        console.error('Error sending data:', error);
        // Handle error here
      });
  });
});
