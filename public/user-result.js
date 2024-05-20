// User-specific JavaScript code
document.addEventListener('DOMContentLoaded', (event) => {
    const userId = 1;  // Replace with actual user ID logic

    fetch(`/api/user/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.querySelector('.grade').textContent = user.grade;

            let gradeDescription;
            let complexityDescription;

            switch (user.grade) {
                case 'A':
                    gradeDescription = 'Excellent';
                    complexityDescription = `Complexity Score: ${user.complexityScore}. Your code is well-structured and showcases exceptional clarity and simplicity, with minimal to no complexity issues detected.`;
                    break;
                case 'B':
                    gradeDescription = 'Good';
                    complexityDescription = `Complexity Score: ${user.complexityScore}. Your code is solid with good clarity and structure, but there is room for some minor improvements.`;
                    break;
                case 'C':
                    gradeDescription = 'Fair';
                    complexityDescription = `Complexity Score: ${user.complexityScore}. Your code is functional but could benefit from better organization and simplification to improve readability and maintainability.`;
                    break;
                case 'D':
                    gradeDescription = 'Poor';
                    complexityDescription = `Complexity Score: ${user.complexityScore}. Your code has significant complexity issues that hinder readability and maintainability. Consider refactoring to simplify and clarify your code.`;
                    break;
                case 'F':
                    gradeDescription = 'Fail';
                    complexityDescription = `Complexity Score: ${user.complexityScore}. Your code has major issues with structure and clarity, making it difficult to understand and maintain. Extensive refactoring is needed.`;
                    break;
                default:
                    gradeDescription = 'Unknown';
                    complexityDescription = `Complexity Score: ${user.complexityScore}.`;
            }

            document.querySelector('.grade-description').textContent = gradeDescription;
            document.querySelector('.complexity-description').textContent = complexityDescription;

            const tipsList = document.querySelector('.tips ul');
            tipsList.innerHTML = '';
            user.suggestions.forEach(suggestion => {
                const li = document.createElement('li');
                li.textContent = suggestion;
                tipsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
});
