const cacheFirst = async ({ request, fallbackUrl }) => {
    // Vérifie si la réponse est déjà dans le cache
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache; // Retourne la réponse mise en cache si elle existe
    }

    try {
        // Si la réponse n'est pas en cache, tente de la récupérer depuis le réseau
        const responseFromNetwork = await fetch(request);
        const cache = await caches.open("cache"); // Ouvre (ou crée) le cache nommé "cache"
        await cache.put(request, responseFromNetwork.clone()); // Met en cache la réponse du réseau
        return responseFromNetwork; // Retourne la réponse du réseau
    } catch (error) {
        // Si une erreur survient lors de la récupération depuis le réseau
        const fallbackResponse = await caches.match(fallbackUrl); // Essaie de trouver une réponse de secours dans le cache
        if (fallbackResponse) {
            return fallbackResponse; // Retourne la réponse de secours si elle existe
        }
        // Si aucune réponse de secours n'est trouvée, retourne une réponse d'erreur
        return new Response("Network error", {
            status: 408, // Code de statut HTTP pour une erreur de délai d'attente de la demande
            headers: { "Content-Type": "text/plain" }
        });
    }
};

// Écoute l'événement fetch pour gérer les requêtes
self.addEventListener("fetch", (event) => {
    event.respondWith(
        cacheFirst({
            request: event.request, // Passe la requête en cours
            fallbackUrl: "/" // URL de secours à utiliser en cas d'échec
        })
    );
});
