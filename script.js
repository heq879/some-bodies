document.addEventListener('DOMContentLoaded', function () {
    // Get initial language state from localStorage
    let isEnglish = localStorage.getItem('isEnglish') === 'true';

    // Function to update language for input labels and values
    function updateInputLanguage(toEnglish) {
        const inputLabels = document.querySelectorAll('.input-field label');
        inputLabels.forEach(function(label) {
            label.textContent = toEnglish 
                ? label.getAttribute('data-en')
                : label.getAttribute('data-zh');
        });

        // Input placeholder texts for textarea (if applicable)
        const inputFields = document.querySelectorAll('.case-info input, .case-info textarea');
        inputFields.forEach(function(input) {
            input.placeholder = toEnglish 
                ? input.getAttribute('data-en-placeholder')
                : input.getAttribute('data-zh-placeholder');
        });
    }

    // Function to update all language texts except nav bar
    function updateLanguageTexts(toEnglish) {
        const chineseTextElements = document.querySelectorAll('.chinese-text');
        chineseTextElements.forEach(function(element) {
            element.textContent = toEnglish 
                ? element.getAttribute('data-en')
                : element.getAttribute('data-zh');
        });

        // Update dropdown menu elements (if applicable)
        const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(function(link) {
            link.textContent = toEnglish 
                ? link.getAttribute('data-en')
                : link.getAttribute('data-cn');
        });

        // Update input fields and labels
        updateInputLanguage(toEnglish);

        // Update submit button text
        const submitButton = document.getElementById('submit-btn');
        if (submitButton) {
            submitButton.textContent = toEnglish 
                ? submitButton.getAttribute('data-en')
                : submitButton.getAttribute('data-zh');
        }
    }

    // Function to apply language state
    function applyLanguageState() {
        if (isEnglish) {
            document.documentElement.setAttribute('lang', 'en'); // Set lang to English
            document.body.classList.add('eng');
            updateLanguageTexts(true);
        } else {
            document.documentElement.setAttribute('lang', 'zh'); // Set lang to Chinese
            document.body.classList.remove('eng');
            updateLanguageTexts(false);
        }
    }

    // Language toggle click handler
    document.getElementById('lang-toggle').addEventListener('click', function() {
        isEnglish = !isEnglish;
        
        // Save to localStorage
        localStorage.setItem('isEnglish', isEnglish);
        
        // Toggle the 'eng' class
        document.body.classList.toggle('eng');
        
        // Update the lang attribute on <html>
        document.documentElement.setAttribute('lang', isEnglish ? 'en' : 'zh');
        
        // Update texts and inputs
        updateLanguageTexts(isEnglish);
    });

    // Apply language state on page load
    applyLanguageState();

    // Cursor styling
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.pageX}px`;
            cursor.style.top = `${e.pageY}px`;
        });
    }

    // Case number functionality
    let caseNumber = 1; // This will be the starting number
    const caseNumberSpan = document.getElementById('case-number');
    
    // Check if #case-number exists before initializing
    if (caseNumberSpan) {
        caseNumberSpan.textContent = caseNumber.toString().padStart(6, '0');
    }

    const submitButton = document.getElementById('submit-btn');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            // Increment the case number by 1
            caseNumber++;

            // Format the case number to always have 6 digits (e.g., 000001, 000002)
            const formattedCaseNumber = caseNumber.toString().padStart(6, '0');

            // Update the case number on the page
            if (caseNumberSpan) {
                caseNumberSpan.textContent = formattedCaseNumber;
            }

            // Get all input fields and textarea elements within the .case-info div
            const inputFields = document.querySelectorAll('.case-info input, .case-info textarea');
            
            // Loop through each input field and clear its value
            inputFields.forEach(function(input) {
                input.value = ''; // Clear the content of the input field
            });
        });
    }

    // Hover effect for images
    const hoverImages = document.querySelectorAll('.hover-image');
    hoverImages.forEach(image => {
        const imageUrl = image.getAttribute('data-image');
        image.style.backgroundImage = `url('${imageUrl}')`;
    });
});

//need update!