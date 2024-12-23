// app.js

// Show and hide pages
const splashScreen = document.getElementById('splash-screen');
const vitalsPage = document.getElementById('vitals-page');
const historyPage = document.getElementById('history-page');
const remindersPage = document.getElementById('reminders-page');

setTimeout(() => {
    splashScreen.classList.add('hidden');
    splashScreen.style.display('none')
    vitalsPage.classList.remove('hidden');
}, 3000); // Splash screen delay

// Handle vitals form submission
const vitalsForm = document.getElementById('vitals-form');
const vitalsHistory = [];

vitalsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const heartRate = document.getElementById('heart-rate').value;
    const bloodPressure = document.getElementById('blood-pressure').value;
    const weight = document.getElementById('weight').value;
    const notes = document.getElementById('notes').value;
    const location = document.getElementById('location').value;

    const date = new Date().toLocaleDateString();
    const newEntry = { date, heartRate, bloodPressure, weight, notes, location };
    vitalsHistory.push(newEntry);
    updateHistoryTable();
    vitalsForm.reset();
    alert('Vitals saved successfully!');
});

function updateHistoryTable() {
    const tbody = historyPage.querySelector('tbody');
    tbody.innerHTML = '';
    vitalsHistory.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.heartRate}</td>
            <td>${entry.bloodPressure}</td>
            <td>${entry.weight}</td>
            <td>${entry.notes}</td>
            <td>${entry.location}</td>
        `;
        tbody.appendChild(row);
    });
}

// Handle geolocation
const locationInput = document.getElementById('location');
const getLocationButton = document.getElementById('get-location');

getLocationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                locationInput.value = `Lat: ${latitude}, Long: ${longitude}`;
            },
            (error) => {
                alert('Error getting location: ' + error.message);
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

// Handle reminders form submission
const remindersForm = document.getElementById('reminders-form');

remindersForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const reminderTime = document.getElementById('reminder-time').value;
    alert(`Reminder set for ${reminderTime}`);
});
