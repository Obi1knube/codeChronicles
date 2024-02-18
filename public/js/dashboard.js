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
      document.location.replace('/dashboard');
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
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }
};

// Function to handle the addition of a comment
const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-content').value.trim();

  if (content) {
    const blog_id = event.target.closest('.row').dataset.id;

    const response = await fetch(`/api/blogs/${blog_id}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to add comment');
    }
  }
};

// Attach event listener to the new blog form submission
document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

// Attach event listener to the blog list for delete button clicks
document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);

// Attach event listener to the comment form submission
document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
