const ProjectService = {
    postProject,
    fetchProjects,
    updateProject,
    deleteProject
}

async function postProject(newProject){
    try {
        const response = await fetch('http://localhost:8081/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProject),
        });

        if (response.ok) {
            console.error('Project added:');
        } else {
            console.error('Error adding project:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding project:', error);
    }
}

async function fetchProjects(){
    try {
        const response = await fetch('http://localhost:8081/projects');

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error fetching projects:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}



async function updateProject(id, updatedProject) {
    try {
        const response = await fetch(`http://localhost:8081/projects/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedProject),
        });
        if (response.ok) {
            return await response.json();
        }
        console.error('Error updating project:', response.statusText);
    } catch (error) {
        console.error('Error updating project:', error);
    }
}

async function deleteProject(id) {
    try {
        const response = await fetch(`http://localhost:8081/projects/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            console.error('Error deleting project:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting project:', error);
    }
}

export {ProjectService};
