// script.js

// Function to open a modal
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

// Function to close a modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Optional: Close the modal when the user clicks outside the modal-content
window.addEventListener('click', function(e) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
