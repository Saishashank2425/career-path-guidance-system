// Function to display career recommendations
function displayRecommendations(recommendations) {
    const recommendationsSection = document.getElementById('recommendations');
    const recommendationsList = document.getElementById('recommendationsList');
    
    recommendationsList.innerHTML = '';
    
    recommendations.forEach(career => {
        const careerCard = document.createElement('div');
        careerCard.className = 'recommendation-card';
        
        careerCard.innerHTML = `
            <div class="recommendation-header">
                <h3 class="recommendation-title">${career.title}</h3>
                <span class="match-score">${career.match}% Match</span>
            </div>
            <p class="recommendation-description">${career.description}</p>
            <div class="career-details">
                ${career.salary ? `<div class="detail-item"><i class="fas fa-rupee-sign"></i> <strong>Salary:</strong> ${career.salary}</div>` : ''}
                ${career.agency ? `<div class="detail-item"><i class="fas fa-building"></i> <strong>Organization:</strong> ${career.agency}</div>` : ''}
                ${career.securityClearance ? `<div class="detail-item"><i class="fas fa-shield-alt"></i> <strong>Security:</strong> ${career.securityClearance}</div>` : ''}
            </div>
            
            <div class="roadmap">
                <h4><i class="fas fa-map-marked-alt"></i> Career Roadmap:</h4>
                <ul>
                    ${career.roadmap.map(step => `<li><i class="fas fa-check-circle"></i> ${step}</li>`).join('')}
                </ul>
            </div>
        `;
        
        recommendationsList.appendChild(careerCard);
    });
}

// Career recommendation form
document.getElementById('careerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        country: document.getElementById('country').value,
        qualifications: document.getElementById('qualifications').value,
        hobbies: document.getElementById('hobbies').value,
        age: document.getElementById('age').value,
        knowledge: document.getElementById('knowledge').value,
        experience: document.getElementById('experience').value,
        degree: document.getElementById('degree').value
    };
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<div class="loading"></div> Getting Recommendations...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('/api/career-recommendation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayRecommendations(data.recommendations);
        } else {
            alert('Error getting recommendations. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error getting recommendations. Please try again.');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});