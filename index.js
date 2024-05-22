document.addEventListener('DOMContentLoaded', function() {
    // Sign-up form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting the default way

            const formData = new FormData(this);
            const jsonData = {};

            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            fetch('http://localhost/ITIS%20Project/ITIS_Project_BE/sign_up.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Handle the response from the server
                alert(data.message); // Display the response message
                if (data.success) {
                    window.location.href = 'log_in.html'; // Redirect to login page
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    }

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting the default way

            const formData = new FormData(this);
            const jsonData = {};

            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            fetch('http://localhost/ITIS%20Project/ITIS_Project_BE/log_in.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Handle the response from the server
                alert(data.message); // Display the response message
                if (data.success) {
                    window.location.href = 'library.html'; // Redirect to library page
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    }

     // Load PDFs when library page is loaded
     if (window.location.pathname.endsWith('library.html')) {
        const pdfList = document.getElementById('pdf-list');

        fetch('http://localhost/ITIS%20Project/ITIS_Project_BE/download_file.php')
            .then(response => response.json())
            .then(pdfs => {
                pdfs.forEach(pdf => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = pdf.url;
                    link.textContent = pdf.name;
                    link.setAttribute('download', pdf.name);
                    listItem.appendChild(link);
                    pdfList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to load PDFs.');
            });
    }
});

// Functions to change pages
function changeToLogIn() {
    window.location.href = 'log_in.html';
}

function changeToSignUp() {
    window.location.href = 'sign_up.html';
}
