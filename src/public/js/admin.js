document.addEventListener('DOMContentLoaded', () => {
    const socket = io(); 

    socket.on('ruleAdded', (rule) => {
        displayNotification(`New rule added: ${rule.description}`);
        loadRules();
    });

    socket.on('ruleUpdated', (rule) => {
        displayNotification(`Rule updated: ${rule.description}`);
        loadRules();
    });

    socket.on('ruleDeleted', (id) => {
        displayNotification(`Rule deleted with ID: ${id}`);
        loadRules();
    });

    loadRules();

    document.getElementById('add-rule-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addRule();
        loadRules();
    });
});

async function loadRules() {
    const response = await fetch('/admin/rules');
    const rules = await response.json();

    const rulesContainer = document.getElementById('rules-container');
    rulesContainer.innerHTML = '';

    const factors = ['Cs', 'Ctc', 'Cnc', 'Ci', 'TW', 'Cps', 'Cr', 'Cp'];

    factors.forEach(factor => {
        const factorRules = rules.filter(rule => rule.factor === factor).sort((a, b) => severityOrder(a.severity) - severityOrder(b.severity));

        if (factorRules.length > 0) {
            const factorContainer = document.createElement('div');
            factorContainer.className = 'factor-container';

            const factorTitle = document.createElement('h2');
            factorTitle.textContent = factor;
            factorContainer.appendChild(factorTitle);

            factorRules.forEach(rule => {
                const ruleElement = document.createElement('div');
                ruleElement.className = 'rule';

                const descriptionElement = document.createElement('div');
                descriptionElement.className = 'rule-description';
                descriptionElement.textContent = rule.description;
                ruleElement.appendChild(descriptionElement);

                const severityElement = document.createElement('div');
                severityElement.className = 'rule-severity';
                severityElement.textContent = rule.severity;
                ruleElement.appendChild(severityElement);

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => {
                    if (editButton.textContent === 'Edit') {
                        descriptionElement.contentEditable = true;
                        severityElement.contentEditable = true;
                        editButton.textContent = 'Save';
                    } else {
                        descriptionElement.contentEditable = false;
                        severityElement.contentEditable = false;
                        updateRule(rule._id, descriptionElement.textContent, severityElement.textContent);
                        editButton.textContent = 'Edit';
                    }
                });
                ruleElement.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    deleteRule(rule._id);
                    loadRules();
                });
                ruleElement.appendChild(deleteButton);

                factorContainer.appendChild(ruleElement);
            });

            rulesContainer.appendChild(factorContainer);
        }
    });
}

async function addRule() {
    const factor = document.getElementById('factor').value;
    const severity = document.getElementById('severity').value;
    const description = document.getElementById('description').value;

    const validationMessage = document.getElementById('validation-message');

    if (!description.trim()) {
        validationMessage.textContent = 'Please fill out all the fields';
        validationMessage.style.color = 'red';
        return;
    }

    validationMessage.textContent = '';

    await fetch('/admin/rules', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ factor, severity, description }),
    });

    document.getElementById('add-rule-form').reset();
}

async function updateRule(id, description, severity) {
    await fetch(`/admin/rules/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, severity }),
    });
}

async function deleteRule(id) {
    await fetch(`/admin/rules/${id}`, {
        method: 'DELETE',
    });
}

function severityOrder(severity) {
    const order = {
        'Bad': 1,
        'Medium': 2,
        'Good': 3
    };
    return order[severity];
}

function displayNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}
