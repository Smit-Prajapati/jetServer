const selectSsd = document.getElementById('capacitySelector');
const textGroup = document.querySelector('.text-group-ssd');

// Dynamically create text elements based on options
const options = selectSsd.options;
const textElements = [];

// Create text elements for each option
for (let i = 0; i < options.length; i++) {
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', '50%'); // Center horizontally
  text.setAttribute('y', '50%'); // Center vertically
  text.setAttribute('fill', '#1A2657'); // Match the original path's color
  text.setAttribute('dominant-baseline', 'middle'); // Vertical alignment
  text.setAttribute('text-anchor', 'middle'); // Horizontal alignment
  text.setAttribute('font-size', '24'); // Font size
  text.setAttribute('filter', "url(#filter2_d_36_1589)");
  text.classList.add("text-ram");
  text.textContent = `${options[i].value}`; // Display the capacity
  text.classList.add('hidden-text'); // Initially hide all text elements
  textGroup.appendChild(text);
  textElements.push(text);
}

// Track currently active text
let activeIndex = 0;
textElements[activeIndex].classList.add('active-text'); // Show the first text
textElements[activeIndex].classList.remove('hidden-text');
// textElements[activeIndex].classList.add('text-1'); // Make the first element visible immediately

// Event listener for dropdown change
selectSsd.addEventListener('change', function (event) {
  const newIndex = event.target.selectedIndex;

  if (newIndex === activeIndex) return; // If the same option is selected, do nothing

  const currentText = textElements[activeIndex];
  const newText = textElements[newIndex];

  // Slide out current text
  currentText.classList.remove('active-text');
  currentText.classList.add('slide-out');

  // Slide in new text
  newText.classList.remove('hidden-text', 'slide-out');
  newText.classList.add('slide-in', 'active-text');

  // After the animation, reset classes
  setTimeout(() => {
    currentText.classList.remove('slide-out');
    currentText.classList.add('hidden-text');
    newText.classList.remove('slide-in');
  }, 900); // Match animation duration

  // Update active index
  activeIndex = newIndex;
});





const addStorageButton = document.getElementById('addStorageButton');
const selectContainer = document.getElementById('ssdStorageContainer');

addStorageButton.addEventListener('click', () => {
  // Create a new select element
  const newSelect = document.createElement('select');
  newSelect.className = 'ssdSelect';

  // Add options to the new select element
  const options = [
    { value: '10', text: '10GB' },
    { value: '20', text: '20GB' },
    { value: '30', text: '30GB' },
    { value: '40', text: '40GB' },
    { value: '50', text: '50GB' }
  ];

  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option.value;
    opt.textContent = option.text;
    newSelect.appendChild(opt);
  });

  // Create a container for the new select element
  const newContainer = document.createElement('div');
  newContainer.className = 'select-container';
  newContainer.appendChild(newSelect);

  // Append the new container to the selectContainer div
  selectContainer.appendChild(newContainer);
});







document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("ssd-storage-select-container");
  const addStorageButton = document.getElementById("addStorageButton");

  let selectCount = 1;

  // Update cloud text content
  const updateCloud = (selectId, cloudId) => {
    const selectElement = document.getElementById(selectId);
    const cloud = document.getElementById(cloudId);
    const textContent = cloud.querySelector(".text-content");

    textContent.textContent = `${selectElement.value}GB`;
  };

  // Show new cloud
  const showCloud = (cloudId) => {
    const cloud = document.getElementById(cloudId);
    cloud.classList.add("visible", "animated");
    setTimeout(() => cloud.classList.remove("animated"), 2000); // Remove animation class after animation ends
  };

  // Update initial cloud value
  updateCloud("ssdStorageSelect1", "cloud1");

  // Add change event to first select list
  document
    .getElementById("ssdStorageSelect1")
    .addEventListener("change", () => updateCloud("ssdStorageSelect1", "cloud1"));

  // Add new storage
  addStorageButton.addEventListener("click", () => {
    selectCount++;
    if (selectCount > 3) return; // Limit to 3 clouds

    // Create new select list
    const newSelectContainer = document.createElement("div");
    newSelectContainer.classList.add("select-container");

    const newSelect = document.createElement("select");
    newSelect.id = `ssdStorageSelect${selectCount}`;
    newSelect.classList.add("ssdStorage");
    newSelect.innerHTML = `
      <option value="10">10GB</option>
      <option value="20">20GB</option>
      <option value="30">30GB</option>
      <option value="40">40GB</option>
      <option value="50">50GB</option>
    `;
    

    newSelectContainer.appendChild(newSelect);
    container.insertBefore(newSelectContainer, addStorageButton);

    const cloudId = `cloud${selectCount}`;
    updateCloud(newSelect.id, cloudId);
    showCloud(cloudId);

    // Add change event to the new select list
    newSelect.addEventListener("change", () =>
      updateCloud(newSelect.id, cloudId)
    );
  });
});

















