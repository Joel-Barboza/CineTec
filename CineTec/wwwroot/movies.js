
const enviar = () => {
    // obtiene y lee el input en movies
    const movieName = document.getElementById("movieInput").value;

    try {
        const response = await fetch("http://localhost:5000/api/Movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset:UTF-8",
            },
            body: JSON.stringify(movieName) // el mensaje que se envia
        })

        if (!response.ok) {
            throw new Error("Error al obtener películas");
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error al enviar películas al servidor:", error);
        throw error;
    }
}