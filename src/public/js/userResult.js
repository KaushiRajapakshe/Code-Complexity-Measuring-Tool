const id = 1;  // Later we can replace with actual user ID logic

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`/user/result?id=${id}`);
        const data = await response.json();

        document.querySelector('.grade').textContent = data.grade;
        document.querySelector('.complexity-description').textContent = 'Complexity Score: ' + data.userResult.Cp;

        const tipsList = document.querySelector('.tips ul');
        data.suggestedRules.forEach(rule => {
            const li = document.createElement('li');
            li.textContent = rule;
            tipsList.appendChild(li);
        });
    } catch (err) {
        console.error('Error fetching user result:', err);
    }
});

function testNewCode() {
    window.location.href = '/test-new-code';  // Redirect to the page where user can test a new code
}

$(function () {
    $("#header").load("views/header.html");
    $("#footer").load("views/footer.html");
});