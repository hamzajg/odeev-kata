const SolutionService = {
    postSolution,
    fetchSolutions,
    callSwaggerCodeGen,
    updateSolution,
    deleteSolution
}

async function postSolution(newSolution) {
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

async function fetchSolutions() {
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

async function callSwaggerCodeGen(metadata) {
    try {
        const response = await fetch('http://localhost:8081/generators', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(metadata),
        });

        if (response.ok) {
            return response.blob();
            console.error('Project generated:');
        } else {
            console.error('Error generating project:', response.statusText);
        }
    } catch (error) {
        console.error('Error generating project:', error);
    }
}


async function updateSolution(id, updatedSolution) {
    try {
        const response = await fetch(`http://localhost:8081/solutions/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedSolution),
        });
        if (response.ok) {
            return await response.json();
        }
        console.error('Error updating solution:', response.statusText);
    } catch (error) {
        console.error('Error updating solution:', error);
    }
}

async function deleteSolution(id) {
    try {
        const response = await fetch(`http://localhost:8081/solutions/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            console.error('Error deleting solution:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting solution:', error);
    }
}

export {SolutionService};
