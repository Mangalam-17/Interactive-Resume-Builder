const resumeForm = document.getElementById("resume-form");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const summaryInput = document.getElementById("summary");
const skillsInput = document.getElementById("skills");

const educationList = document.getElementById("education-list");
const experienceList = document.getElementById("experience-list");

const previewName = document.getElementById("preview-name");
const previewContact = document.getElementById("preview-contact");
const previewSummary = document.getElementById("preview-summary");
const previewEducation = document.getElementById("preview-education");
const previewExperience = document.getElementById("preview-experience");
const previewSkills = document.getElementById("preview-skills");

const progressBar = document.getElementById("progress-bar");

function addInputField(container) {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder =
    container.id === "education-list"
      ? "Degree, School, Year"
      : "Job Title, Company, Years";
  container.appendChild(input);
  input.addEventListener("input", () => {
    updatePreview();
    updateProgress();
  });
  return input;
}

document.getElementById("add-education").addEventListener("click", () => {
  addInputField(educationList);
  updateProgress();
});

document.getElementById("add-experience").addEventListener("click", () => {
  addInputField(experienceList);
  updateProgress();
});

addInputField(educationList);
addInputField(experienceList);

[nameInput, phoneInput, emailInput, summaryInput, skillsInput].forEach((el) =>
  el.addEventListener("input", () => {
    updatePreview();
    updateProgress();
  })
);

resumeForm.addEventListener("reset", () => {
  educationList.innerHTML = "";
  experienceList.innerHTML = "";
  addInputField(educationList);
  addInputField(experienceList);

  previewName.textContent = "";
  previewContact.textContent = "";
  previewSummary.textContent = "";
  previewEducation.innerHTML = "";
  previewExperience.innerHTML = "";
  previewSkills.textContent = "";

  updateProgress();
});

function updatePreview() {
  previewName.textContent = nameInput.value;
  previewContact.textContent = `Phone: ${phoneInput.value}${
    phoneInput.value && emailInput.value ? " | " : ""
  }Email: ${emailInput.value}`;
  previewSummary.textContent = summaryInput.value;

  const eduInputs = Array.from(educationList.querySelectorAll("input"));
  previewEducation.innerHTML = eduInputs
    .map((input) => input.value.trim())
    .filter((val) => val !== "")
    .map((val) => `<li>${val}</li>`)
    .join("");

  const expInputs = Array.from(experienceList.querySelectorAll("input"));
  previewExperience.innerHTML = expInputs
    .map((input) => input.value.trim())
    .filter((val) => val !== "")
    .map((val) => `<li>${val}</li>`)
    .join("");

  const skillsArray = skillsInput.value
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => skill !== "");
  previewSkills.textContent = skillsArray.join(", ");
}

function updateProgress() {
  let filledFields = 0;
  if (nameInput.value.trim() !== "") filledFields++;
  if (phoneInput.value.trim() !== "") filledFields++;
  if (emailInput.value.trim() !== "") filledFields++;
  if (summaryInput.value.trim() !== "") filledFields++;
  if (skillsInput.value.trim() !== "") filledFields++;

  const eduInputs = Array.from(educationList.querySelectorAll("input"));
  const expInputs = Array.from(experienceList.querySelectorAll("input"));

  const eduFilled = eduInputs.filter(
    (input) => input.value.trim() !== ""
  ).length;
  const expFilled = expInputs.filter(
    (input) => input.value.trim() !== ""
  ).length;

  const maxDynamicFields = eduInputs.length + expInputs.length;
  const totalDynamicFields = totalFields + maxDynamicFields;

  const totalFilled = filledFields + eduFilled + expFilled;

  const percent = Math.min(
    100,
    Math.round((totalFilled / totalDynamicFields) * 100)
  );

  progressBar.style.width = `${percent}%`;
}

document.getElementById("download-pdf").addEventListener("click", () => {
  const resume = document.getElementById("resume-preview");
  const opt = {
    margin: 0.4,
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().set(opt).from(resume).save();
});

const modeToggle = document.getElementById("mode-toggle");
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    modeToggle.textContent = "Switch back to light ☀️";
    modeToggle.setAttribute("aria-label", "Switch to Light Mode");
  } else {
    modeToggle.textContent = "Switch back to dark 🌙";
    modeToggle.setAttribute("aria-label", "Switch to Dark Mode");
  }
});

updatePreview();
updateProgress();
