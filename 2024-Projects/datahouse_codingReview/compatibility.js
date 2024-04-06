const fs = require('fs');

// Read input data from JSON file
const personnelData = fs.readFileSync('personnel.json');
const { team, applicants } = JSON.parse(personnelData);

// Function to calculate compatibility score between a team member and an applicant
function calculateCompatibilityScore(teamMember, applicant) {
    // Calculate the difference in attributes between the team member and the applicant
    const intelligenceDiff = Math.abs(teamMember.attributes.intelligence - applicant.attributes.intelligence);
    const strengthDiff = Math.abs(teamMember.attributes.strength - applicant.attributes.strength);
    const enduranceDiff = Math.abs(teamMember.attributes.endurance - applicant.attributes.endurance);
    const spicyFoodToleranceDiff = Math.abs(teamMember.attributes.spicyFoodTolerance - applicant.attributes.spicyFoodTolerance);

    // Calculate the average difference
    const averageDiff = (intelligenceDiff + strengthDiff + enduranceDiff + spicyFoodToleranceDiff) / 4;

    // Normalize the average difference to a compatibility score between 0 and 1
    const compatibilityScore = 1 - (averageDiff / 10);

    // Ensure the compatibility score falls within the [0, 1] range
    return Math.max(0, Math.min(1, compatibilityScore));
}

// Function to calculate compatibility
function calculateCompatibility(team, applicants) {
    return applicants.map(applicant => {
        var compatibilityScore = calculateCompatibilityScore(team[1], applicant);
        return { name: applicant.name, score: compatibilityScore };
    });
}

// Calculate compatibility scores
const scoredApplicants = calculateCompatibility(team, applicants);

// Prepare output data
const scoreData = { scoredApplicants };

// Write output data to JSON file
const outputJson = JSON.stringify(scoreData, null, 2);
fs.writeFileSync('scores.json', outputJson);

console.log('Compatibility scores calculated and written to scores.json');