// Function to handle the creation of a new blog
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create blog');
    }
  }
};

// Function to handle the deletion of a blog
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete blog');
    }
  }
};

// Attach event listener to the new blog form submission
document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

// Attach event listener to the blog list for delete button clicks
document
  .querySelector('.blog-list')
  .addEventListener('click', delButtonHandler);

//   In this modified code, the newFormHandler function handles the creation of a new blog.
//   It retrieves the title and content values from the form, sends a POST request to the /api/blogs endpoint,
//   and redirects to the profile page if the request is successful.

// The delButtonHandler function handles the deletion of a blog. It checks if the clicked element has a data-id attribute,
//  retrieves the blog ID from the attribute, sends a DELETE request to the /api/blogs/:id endpoint,
//  and redirects to the profile page if the request is successful.

// Make sure to update your HTML file to use the correct element IDs and class names for the form and list elements.
