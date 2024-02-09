// Function to handle the logout action
const logout = async () => {
  // Send a POST request to the logout API endpoint
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // If successful, redirect the browser to the homepage
    document.location.replace("/");
  } else {
    // If response is not ok, display the error message
    alert(response.statusText);
  }
};

// Attach event listener to the logout button
document.querySelector("#logout").addEventListener("click", logout);
