/* ============================================
   CARLOSUITE | ADVISTA CREATIONS
   Main JavaScript File
   Clean, minimal functionality
   ============================================ */

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    /* ============================================
       MOBILE MENU TOGGLE (if needed)
       ============================================ */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Note: This is optional - add mobile-menu-btn to HTML if needed
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.textContent = '✕';
            } else {
                mobileMenuBtn.textContent = '☰';
            }
        });
    }
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a, .nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
            }
        });
    });
    
    /* ============================================
       PROJECT STAGE TRACKER (for operations.html)
       ============================================ */
    const stageItems = document.querySelectorAll('.stage-item');
    const progressBar = document.getElementById('stageProgress');
    const progressPercent = document.getElementById('progressPercent');
    
    if (stageItems.length > 0) {
        // Load saved progress from localStorage
        function loadSavedProgress() {
            const savedStages = localStorage.getItem('carlosuite_stages');
            if (savedStages) {
                const completedStages = JSON.parse(savedStages);
                stageItems.forEach((item, index) => {
                    if (completedStages.includes(index)) {
                        item.classList.add('stage-completed');
                    }
                });
            }
            updateProgress();
        }
        
        // Save progress to localStorage
        function saveProgress() {
            const completed = [];
            stageItems.forEach((item, index) => {
                if (item.classList.contains('stage-completed')) {
                    completed.push(index);
                }
            });
            localStorage.setItem('carlosuite_stages', JSON.stringify(completed));
        }
        
        // Update progress bar percentage
        function updateProgress() {
            const completedStages = document.querySelectorAll('.stage-completed').length;
            const totalStages = stageItems.length;
            const percentage = (completedStages / totalStages) * 100;
            
            if (progressBar) {
                progressBar.style.width = percentage + '%';
            }
            if (progressPercent) {
                progressPercent.textContent = Math.round(percentage) + '%';
            }
            
            saveProgress();
        }
        
        // Add click handler to each stage
        stageItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('stage-completed');
                updateProgress();
            });
        });
        
        // Load saved progress
        loadSavedProgress();
    }
    
    /* ============================================
       SCRIPT GENERATOR TOOL (for operations.html)
       ============================================ */
    const generateScriptBtn = document.getElementById('generateScriptBtn');
    const scriptTypeSelect = document.getElementById('scriptType');
    const clientNameInput = document.getElementById('clientName');
    const scriptOutput = document.getElementById('scriptOutput');
    const copyScriptBtn = document.getElementById('copyScriptBtn');
    
    if (generateScriptBtn) {
        generateScriptBtn.addEventListener('click', function() {
            const scriptType = scriptTypeSelect ? scriptTypeSelect.value : 'inquiry';
            let clientName = clientNameInput ? clientNameInput.value : '[Client Name]';
            
            // If client name is empty, use placeholder
            if (!clientName.trim()) {
                clientName = '[Client Name]';
            }
            
            let script = '';
            
            switch(scriptType) {
                case 'inquiry':
                    script = 'Hello ' + clientName + ',\n\n' +
                        'Thank you for reaching out to Carlosuite | AdVista Creations.\n\n' +
                        'We appreciate your interest in working with us.\n\n' +
                        'Kindly share the following details so we can understand your project better:\n\n' +
                        '- Business/Brand Name\n' +
                        '- Type of project\n' +
                        '- Deadline\n' +
                        '- Inspiration or references\n' +
                        '- Budget range\n\n' +
                        'Once received, we shall review your request and guide you through the next steps.\n\n' +
                        'We look forward to working with you.';
                    break;
                    
                case 'deposit':
                    script = 'Hello ' + clientName + ',\n\n' +
                        'Your deposit has been successfully received.\n\n' +
                        'Your project has now been officially scheduled and work begins immediately.\n\n' +
                        'You will receive progress updates throughout the project timeline.\n\n' +
                        'Thank you for choosing Carlosuite | AdVista Creations.';
                    break;
                    
                case 'revision':
                    script = 'Hello ' + clientName + ',\n\n' +
                        'Thank you for the feedback.\n\n' +
                        'The requested changes fall outside the approved revision scope and would require an additional revision fee due to the extent of the modifications requested.\n\n' +
                        'Kindly confirm if you would like us to proceed.\n\n' +
                        'Additional revision fee: $10 per revision beyond package limits.';
                    break;
                    
                case 'delay':
                    script = 'Hello ' + clientName + ',\n\n' +
                        'We would like to provide a progress update regarding your project.\n\n' +
                        'Work is currently ongoing and we are finalizing the next stage.\n\n' +
                        'We appreciate your patience and will share the updated version by [Date/Time].\n\n' +
                        'Thank you.';
                    break;
                    
                case 'delivery':
                    script = 'Hello ' + clientName + ',\n\n' +
                        'Thank you for working with Carlosuite | AdVista Creations.\n\n' +
                        'Attached are your finalized project files.\n\n' +
                        'We appreciate the opportunity to work with your brand and look forward to future collaborations.\n\n' +
                        'Kindly share feedback or a testimonial regarding your experience.\n\n' +
                        'Thank you.';
                    break;
                    
                case 'outreach':
                    script = 'Hello ' + clientName + ',\n\n' +
                        'I recently came across your brand and noticed strong potential in your visual presentation.\n\n' +
                        'I would love to help improve and modernize your branding/social media presence through strategic creative design.\n\n' +
                        'I have attached a few observations and recommendations that could help strengthen your online appearance.\n\n' +
                        'If interested, I would be happy to discuss further.\n\n' +
                        'Regards,\n' +
                        'Carlosuite | AdVista Creations';
                    break;
                    
                default:
                    script = 'Please select a script type from the dropdown menu.';
            }
            
            if (scriptOutput) {
                scriptOutput.value = script;
                scriptOutput.style.display = 'block';
            }
        });
    }
    
    // Copy script to clipboard
    if (copyScriptBtn) {
        copyScriptBtn.addEventListener('click', function() {
            if (scriptOutput && scriptOutput.value) {
                scriptOutput.select();
                document.execCommand('copy');
                
                // Show temporary success feedback
                const originalText = copyScriptBtn.textContent;
                copyScriptBtn.textContent = 'Copied to clipboard';
                copyScriptBtn.style.backgroundColor = '#c8a96b';
                copyScriptBtn.style.color = '#000000';
                
                setTimeout(function() {
                    copyScriptBtn.textContent = originalText;
                    copyScriptBtn.style.backgroundColor = '';
                    copyScriptBtn.style.color = '';
                }, 2000);
            }
        });
    }
    
    /* ============================================
       POLICY TOGGLE SECTIONS (for operations.html)
       ============================================ */
    const policyHeaders = document.querySelectorAll('.policy-header');
    
    if (policyHeaders.length > 0) {
        policyHeaders.forEach(function(header) {
            // Set initial state - first policy open by default
            const content = header.nextElementSibling;
            const icon = header.querySelector('.toggle-icon');
            
            if (content && icon && content.style.display !== 'block') {
                // Check if this is the first policy
                const isFirst = header === policyHeaders[0];
                if (isFirst) {
                    content.style.display = 'block';
                    icon.textContent = '▼';
                } else {
                    content.style.display = 'none';
                    icon.textContent = '▶';
                }
            }
            
            header.addEventListener('click', function() {
                const targetContent = this.nextElementSibling;
                const targetIcon = this.querySelector('.toggle-icon');
                
                if (targetContent.style.display === 'none' || !targetContent.style.display) {
                    targetContent.style.display = 'block';
                    if (targetIcon) targetIcon.textContent = '▼';
                } else {
                    targetContent.style.display = 'none';
                    if (targetIcon) targetIcon.textContent = '▶';
                }
            });
        });
    }
    
    /* ============================================
       PRICE CALCULATOR (for start.html)
       ============================================ */
    const serviceCheckboxes = document.querySelectorAll('.service-checkbox');
    const totalPriceSpan = document.getElementById('totalPrice');
    const selectedServicesList = document.getElementById('selectedServicesList');
    
    if (serviceCheckboxes.length > 0) {
        function updatePriceCalculator() {
            let total = 0;
            let selectedServices = [];
            
            serviceCheckboxes.forEach(function(checkbox) {
                if (checkbox.checked) {
                    const price = parseInt(checkbox.getAttribute('data-price')) || 0;
                    const serviceName = checkbox.getAttribute('data-service');
                    total += price;
                    if (serviceName && price > 0) {
                        selectedServices.push(serviceName + ' ($' + price + ')');
                    } else if (serviceName) {
                        selectedServices.push(serviceName + ' (Quote based)');
                    }
                }
            });
            
            if (totalPriceSpan) {
                totalPriceSpan.textContent = total;
            }
            
            if (selectedServicesList) {
                if (selectedServices.length > 0) {
                    let html = '';
                    for (var i = 0; i < selectedServices.length; i++) {
                        html += '<li>' + selectedServices[i] + '</li>';
                    }
                    selectedServicesList.innerHTML = html;
                } else {
                    selectedServicesList.innerHTML = '<li>No services selected</li>';
                }
            }
        }
        
        serviceCheckboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', updatePriceCalculator);
        });
        
        // Initial calculation
        updatePriceCalculator();
    }
    
    /* ============================================
       INQUIRY FORM HANDLER (for start.html)
       ============================================ */
    const inquiryForm = document.getElementById('inquiryForm');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName') ? document.getElementById('fullName').value : '';
            const businessName = document.getElementById('businessName') ? document.getElementById('businessName').value : '';
            const email = document.getElementById('email') ? document.getElementById('email').value : '';
            const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';
            const projectType = document.getElementById('projectType') ? document.getElementById('projectType').value : '';
            const projectDesc = document.getElementById('projectDesc') ? document.getElementById('projectDesc').value : '';
            const deadline = document.getElementById('deadline') ? document.getElementById('deadline').value : '';
            const inspiration = document.getElementById('inspiration') ? document.getElementById('inspiration').value : '';
            const budget = document.getElementById('budget') ? document.getElementById('budget').value : '';
            
            // Build WhatsApp message
            let message = '*NEW INQUIRY - Carlosuite*\n\n';
            message += '*Name:* ' + fullName + '\n';
            message += '*Business:* ' + businessName + '\n';
            message += '*Email:* ' + email + '\n';
            message += '*Phone:* ' + phone + '\n';
            message += '*Project Type:* ' + projectType + '\n';
            message += '*Project Description:* ' + projectDesc + '\n';
            if (deadline) message += '*Deadline:* ' + deadline + '\n';
            if (inspiration) message += '*Inspiration:* ' + inspiration + '\n';
            message += '*Budget:* ' + budget + '\n\n';
            message += '*Please respond to this inquiry.*';
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappNumber = '254717194197';
            const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodedMessage;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Show confirmation
            alert('Thank you for your inquiry. You will be redirected to WhatsApp to complete your message.');
        });
    }
    
    /* ============================================
       OUTREACH TRACKER (for intel.html)
       ============================================ */
    const outreachCheckbox = document.getElementById('outreachComplete');
    const outreachDate = document.getElementById('outreachDate');
    
    if (outreachCheckbox && outreachDate) {
        // Load saved state
        const savedOutreach = localStorage.getItem('carlosuite_outreach');
        if (savedOutreach === 'true') {
            outreachCheckbox.checked = true;
        }
        
        const lastOutreachDate = localStorage.getItem('carlosuite_outreach_date');
        if (lastOutreachDate) {
            outreachDate.textContent = 'Last completed: ' + lastOutreachDate;
        }
        
        outreachCheckbox.addEventListener('change', function() {
            if (this.checked) {
                const today = new Date();
                const dateString = today.toLocaleDateString();
                outreachDate.textContent = 'Last completed: ' + dateString;
                localStorage.setItem('carlosuite_outreach', 'true');
                localStorage.setItem('carlosuite_outreach_date', dateString);
            } else {
                outreachDate.textContent = '';
                localStorage.setItem('carlosuite_outreach', 'false');
                localStorage.removeItem('carlosuite_outreach_date');
            }
        });
    }
    
    /* ============================================
       QUALITY CHECKLIST (for intel.html)
       ============================================ */
    const checklistItems = document.querySelectorAll('.checklist-item input');
    
    if (checklistItems.length > 0) {
        // Load saved checklist state
        for (var i = 0; i < checklistItems.length; i++) {
            const checkbox = checklistItems[i];
            const savedState = localStorage.getItem('carlosuite_checklist_' + i);
            if (savedState === 'true') {
                checkbox.checked = true;
                const parentItem = checkbox.closest('.checklist-item');
                if (parentItem) {
                    parentItem.style.opacity = '0.6';
                }
            }
            
            checkbox.addEventListener('change', function(index) {
                return function() {
                    const isChecked = this.checked;
                    localStorage.setItem('carlosuite_checklist_' + index, isChecked);
                    const parentItem = this.closest('.checklist-item');
                    if (parentItem) {
                        parentItem.style.opacity = isChecked ? '0.6' : '1';
                    }
                };
            }(i));
        }
    }
    
    /* ============================================
       COPY OUTREACH SCRIPT BUTTON (for intel.html)
       ============================================ */
    const copyOutreachBtn = document.getElementById('copyOutreachScript');
    
    if (copyOutreachBtn) {
        copyOutreachBtn.addEventListener('click', function() {
            const scriptBox = document.querySelector('.script-box');
            if (scriptBox) {
                // Get text content without the button
                const textElements = scriptBox.querySelectorAll('p');
                let scriptText = '';
                textElements.forEach(function(el) {
                    scriptText += el.innerText + '\n\n';
                });
                
                // Copy to clipboard
                const textarea = document.createElement('textarea');
                textarea.value = scriptText.trim();
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                // Show feedback
                const originalText = copyOutreachBtn.textContent;
                copyOutreachBtn.textContent = 'Copied!';
                setTimeout(function() {
                    copyOutreachBtn.textContent = originalText;
                }, 2000);
            }
        });
    }
    
    /* ============================================
       ACTIVE NAVIGATION HIGHLIGHT
       ============================================ */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-link, .nav-links a');
    
    navLinksAll.forEach(function(link) {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && linkPage === 'index.html') {
            link.classList.add('active');
        }
    });
    
    /* ============================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================ */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    /* ============================================
       SYSTEM READY
       ============================================ */
    console.log('Carlosuite | AdVista Creations — System Online');
    console.log('Principles: Systems before scaling | Professionalism before popularity');
});