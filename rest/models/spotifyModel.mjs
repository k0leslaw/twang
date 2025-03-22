import 'dotenv/config';

let spotify_token = undefined;

/**
 * Connect to Spotify API
 */
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

async function getSpotifyToken() {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ grant_type: 'client_credentials' })
        });

        if (!response.ok) {
            throw new Error(`Spotify token request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Error fetching Spotify token:", error);
        return null;
    }
};

/**
 * Fetch Spotify API token
 */
async function refreshSpotifyToken() {
    spotify_token = await getSpotifyToken();
    if (spotify_token) {
        console.log("Spotify API token retrieved");
    } else {
        console.error("Failed to fetch Spotify API token");
    }
}

/**
 * Spotify API Requests
 */
async function searchSpotify(query, type) {
    const token = await getSpotifyToken();
    if (!token) {
        throw new Error("Failed to retrieve Spotify token");
    }

    const url = new URL("https://api.spotify.com/v1/search");
    url.searchParams.append("q", query);
    url.searchParams.append("type", type);

    const response  = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Spotify API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export { getSpotifyToken, refreshSpotifyToken, searchSpotify }