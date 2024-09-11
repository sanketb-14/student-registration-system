// Wait for the DOM content to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('student-form');
    const recordsContainer = document.getElementById('records-container');
    let students = JSON.parse(localStorage.getItem('students')) || []; // Retrieve stored students or initialize an empty array

      // Function to display all student records on the page
    function displayStudents() {
        recordsContainer.innerHTML = '';
        students.forEach((student, index) => {
            const studentEl = document.createElement('div');
            studentEl.classList.add('student-record'); // Add class for styling
            studentEl.innerHTML = `
                <p><strong>Name:</strong> ${student.name}</p>
                <p><strong>ID:</strong> ${student.id}</p>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Contact:</strong> ${student.contact}</p>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            `;
            // Create student record with edit and delete buttons
            recordsContainer.appendChild(studentEl);  // Append record to the container
        });
    }

    // Function to save the updated list of students to local storage

    function saveStudents() {
        localStorage.setItem('students', JSON.stringify(students));
    }


    // Event listener for form submission

    form.addEventListener('submit', (e) => {
        e.preventDefault();   // Prevent form submission from refreshing the page
        const name = document.getElementById('student-name').value;
        const id = document.getElementById('student-id').value;
        const email = document.getElementById('student-email').value;
        const contact = document.getElementById('student-contact').value;
         
        // Validate input fields before adding a new student
        if (validateInputs(name, id, email, contact)) {
            students.push({ name, id, email, contact }); // Add new student to the array
            saveStudents(); // Save updated list to localStorage
            displayStudents();  // Update the UI
            form.reset();    // Reset form fields
        }
    });

    // Function to validate input fields
    function validateInputs(name, id, email, contact) {
        const nameRegex = /^[A-Za-z\s]+$/; // Only allow alphabetic characters for the name
        const idRegex = /^\d+$/; // Only allow numeric values for student ID
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
        const contactRegex = /^\d+$/; // Only allow numeric values for contact number

        if (!nameRegex.test(name)) {
            alert('Please enter a valid name (only characters)');
            return false;
        }
        if (!idRegex.test(id)) {
            alert('Please enter a valid student ID (only numbers)');
            return false;
        }
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }
        if (!contactRegex.test(contact)) {
            alert('Please enter a valid contact number (only numbers)');
            return false;
        }
        return true;
    }
    // Function to edit a student's detail
    window.editStudent = (index) => {
        const student = students[index];
        const studentEl = recordsContainer.children[index];
        studentEl.innerHTML = `
            <input type="text" id="edit-name-${index}" value="${student.name}" required>
            <input type="text" id="edit-id-${index}" value="${student.id}" required>
            <input type="email" id="edit-email-${index}" value="${student.email}" required>
            <input type="tel" id="edit-contact-${index}" value="${student.contact}" required>
            <button onclick="updateStudent(${index})">Update</button>
            <button onclick="cancelEdit(${index})">Cancel</button>
        `; // Replace the student's details with input fields for editing
        studentEl.classList.add('edit-mode');
    };

      // Function to update a student's details after editing
    window.updateStudent = (index) => {
        const name = document.getElementById(`edit-name-${index}`).value;
        const id = document.getElementById(`edit-id-${index}`).value;
        const email = document.getElementById(`edit-email-${index}`).value;
        const contact = document.getElementById(`edit-contact-${index}`).value;

        if (validateInputs(name, id, email, contact)) {
            students[index] = { name, id, email, contact };
            saveStudents();
            displayStudents();
        }
    };
    // Function to cancel the edit operation and restore the original view
    window.cancelEdit = (index) => {
        displayStudents();
    };
     // Function to delete a student record
    window.deleteStudent = (index) => {
        if (confirm('Are you sure you want to delete this student record?')) {
            students.splice(index, 1);
            saveStudents();
            displayStudents();
        }
    };

    // Initial call to display students when the page loads

    displayStudents();
});
