const SolutionService = {
    postSolution,
    fetchSolutions
}

async function postSolution (newSolution) {
    try {
        const response = await fetch('http://localhost:8081/solutions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSolution),
        });

        if (response.ok) {
            console.error('Solution added:');
        } else {
            console.error('Error adding solution:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding solution:', error);
    }
}

async function fetchSolutions () {
    try {
        const response = await fetch('http://localhost:8081/solutions');

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error fetching solutions:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching solutions:', error);
    }
}

export {SolutionService};