import 'dotenv/config';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

let access_token = null;
let tokenExpiration = null;

async function getAccessToken () {
    if (access_token && tokenExpiration && Date.now() < tokenExpiration) {
        return access_token;
    }

    const auth_string = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            "Authorization": `Basic ${auth_string}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`Spotify Auth Error: ${data.error || 'Unknown error'}`);
    }

    access_token = data.access_token;
    tokenExpiration = Date.now() + data.expires_in * 1000;
    return access_token;
}

async function searchSpotify (query) {
    const token = await getAccessToken();
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {  
        console.error(`Spotify API Error ${response.status}: ${await response.text()}`);  
        throw new Error(`Spotify API request failed with status ${response.status}`);  
    }

    const data = await response.json();
    return data.tracks ? data.tracks.items : [];
}

export { getAccessToken, searchSpotify }