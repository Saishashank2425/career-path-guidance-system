const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Sample country career data
const countryCareerData = {
    "India": {
        "Government": [
            {
                title: "IAS Officer (Indian Administrative Service)",
                match: 92,
                salary: "₹56,100 - ₹2,50,000/month",
                description: "Senior civil servant responsible for policy implementation and administration",
                roadmap: [
                    "Complete graduation in any discipline",
                    "Prepare for UPSC Civil Services Examination",
                    "Clear Prelims, Mains, and Interview",
                    "Complete training at LBSNAA"
                ],
                agency: "Central/State Government",
                officialLink: "https://upsc.gov.in",
                helpfulLinks: [
                    "https://www.drishtiias.com/to-the-points/paper4/civil-services-in-india",
                    "https://unacademy.com/upsc"
                ]
            }
            // Additional government roles can be added here...
        ],
        "Private": [
            {
                title: "Software Engineer",
                match: 87,
                salary: "CAD $60,000 - $120,000/year",
                description: "Develop software applications and systems",
                roadmap: [
                    "Complete CS degree or bootcamp",
                    "Build technical portfolio",
                    "Network in tech community",
                    "Apply to Canadian tech companies"
                ],
                agency: "Technology Sector",
                officialLink: "https://www.jobbank.gc.ca",
                helpfulLinks: [
                    "https://www.indeed.ca",
                    "https://www.glassdoor.ca"
                ]
            }
            // Additional private roles can be added here...
        ]
    }
};

// Function to generate career recommendations based on user input
function generateCareerRecommendation(qualifications, hobbies, age, knowledge, experience, degree, country = 'India') {
    const countryData = countryCareerData[country] || countryCareerData['India'];
    let allCareers = [...countryData.Government, ...countryData.Private];
    
    let scoredCareers = allCareers.map(career => {
        let adjustedMatch = career.match;

        if (qualifications === 'bachelor') adjustedMatch += 5;
        else if (qualifications === 'master') adjustedMatch += 10;

        if (experience === 'senior') adjustedMatch += 8;
        else if (experience === 'mid') adjustedMatch += 5;
        else if (experience === 'none') adjustedMatch -= 5;

        if (degree === 'Computer Science' && career.title.toLowerCase().includes('software')) {
            adjustedMatch += 15;
        }
        
        return { ...career, match: adjustedMatch };
    });

    return scoredCareers.sort((a, b) => b.match - a.match).slice(0, 3); // return top 3 recommendations
}

// API endpoint for career recommendations
app.post('/api/career-recommendation', (req, res) => {
    const { qualifications, hobbies, age, knowledge, experience, degree, country } = req.body;
    const recommendations = generateCareerRecommendation(qualifications, hobbies, age, knowledge, experience, degree, country);
    
    res.json({ success: true, recommendations: recommendations });
});

// Start the server on port 5000
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});