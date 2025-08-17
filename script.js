// Elements
const resumeForm = document.getElementById('resume-form');

const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const summaryInput = document.getElementById('summary');
const skillsInput = document.getElementById('skills');

const educationList = document.getElementById('education-list');
const experienceList = document.getElementById('experience-list');

const previewName = document.getElementById('preview-name');
const previewContact = document.getElementById('preview-contact');
const previewSummary = document.getElementById('preview-summary');
const previewEducation = document.getElementById('preview-education');
const previewExperience = document.getElementById('preview-experience');
const previewSkills = document.getElementById('preview-skills');

// Add dynamic education and experience inputs
function addInputField(container) {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder =
    container.id === 'education-list'
      ? 'Degree, School, Year'
      : 'Job Title, Company, Years';
  container.appendChild(input);
  input.addEventListener('input', updatePreview);
  return input;
}

document.getElementById('add-education').addEventListener('click', () => {
  addInputField(educationList);
});

document.getElementById('add-experience').addEventListener('click', () => {
  addInputField(experienceList);
});

// Initialize with one input each
addInputField(educationList);
addInputField(experienceList);

// Update preview on input change
[nameInput, phoneInput, emailInput, summaryInput, skillsInput].forEach((el) =>
  el.addEventListener('input', updatePreview)
);

resumeForm.addEventListener('reset', () => {
  // Clear dynamic fields
  educationList.innerHTML = '';
  experienceList.innerHTML = '';
  addInputField(educationList);
  addInputField(experienceList);
  // Clear preview text
  previewName.textContent = '';
  previewContact.textContent = '';
  previewSummary.textContent = '';
  previewEducation.innerHTML = '';
  previewExperience.innerHTML = '';
  previewSkills.textContent = '';
});

function updatePreview() {
  previewName.textContent = nameInput.value;
  previewContact.textContent = `Phone: ${phoneInput.value}${
    phoneInput.value && emailInput.value ? ' | ' : ''
  }Email: ${emailInput.value}`;
  previewSummary.textContent = summaryInput.value;

  // Education list
  const eduInputs = Array.from(educationList.querySelectorAll('input'));
  previewEducation.innerHTML = eduInputs
    .map((input) => input.value.trim())
    .filter((val) => val !== '')
    .map((val) => `<li>${val}</li>`)
    .join('');

  // Experience list
  const expInputs = Array.from(experienceList.querySelectorAll('input'));
  previewExperience.innerHTML = expInputs
    .map((input) => input.value.trim())
    .filter((val) => val !== '')
    .map((val) => `<li>${val}</li>`)
    .join('');

  // Skills
  const skillsArray = skillsInput.value
    .split(',')
    .map((skill) => skill.trim())
    .filter((skill) => skill !== '');
  previewSkills.textContent = skillsArray.join(', ');
}

// Dark/Light mode toggle
const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Update button icon and aria-label
  if (document.body.classList.contains('dark-mode')) {
    modeToggle.textContent = 'Switch back to light ☀️';
    modeToggle.setAttribute('aria-label', 'Switch to Light Mode');
  } else {
    modeToggle.textContent = 'Switch back to dark 🌙';
    modeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
  }
});
