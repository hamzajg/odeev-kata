const DiagramService = {
    postDiagram,
    fetchDiagrams,
    updateDiagram,
    deleteDiagram
}

async function postDiagram (newDiagram) {
    try {
        const response = await fetch('http://localhost:8081/diagrams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDiagram),
        });

        if (response.ok) {
            console.error('Diagram added:');
        } else {
            console.error('Error adding diagram:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding diagram:', error);
    }
}

async function fetchDiagrams () {
    try {
        const response = await fetch('http://localhost:8081/diagrams');

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error fetching diagrams:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching diagrams:', error);
    }
}


async function updateDiagram(id, updatedDiagram) {
    try {
        const response = await fetch(`http://localhost:8081/diagrams/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedDiagram),
        });
        if (response.ok) {
            return await response.json();
        }
        console.error('Error updating diagram:', response.statusText);
    } catch (error) {
        console.error('Error updating diagram:', error);
    }
}

async function deleteDiagram(id) {
    try {
        const response = await fetch(`http://localhost:8081/diagrams/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            console.error('Error deleting diagram:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting diagram:', error);
    }
}

export {DiagramService};
