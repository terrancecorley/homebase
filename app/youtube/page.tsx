// https://www.googleapis.com/youtube/v3/activities?part=contentDetails,snippet&home=true&maxResults=50&key=${process.env.YOUTUBE_API_KEY}
// app/api/youtube-activity/route.js

import { google } from "googleapis";

interface YouTubeActivityItem {
    id: string;
    snippet?: {
        title?: string;
        description?: string;
        thumbnails?: {
            default?: {
                url?: string;
            };
        };
    };
    contentDetails?: {
        upload?: {
            videoId?: string;
        };
        like?: {};
        subscribe?: {};
        playlistItem?: {};
    };
}

interface YouTubeActivityResponse {
    activity?: YouTubeActivityItem[];
    error?: string;
}

async function getLatestYouTubeActivity(): Promise<YouTubeActivityResponse> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey) {
        console.error("YouTube API Key not configured on the server.");
        return { error: "YouTube API Key not configured." };
    }

    if (!channelId) {
        console.error("YouTube Channel ID not configured on the server.");
        return { error: "YouTube Channel ID not configured." };
    }

    try {
        const youtube = google.youtube({
            version: "v3",
            auth: apiKey,
        });

        const response = await youtube.activities.list({
            part: ["snippet", "contentDetails"],
            channelId: channelId,
            maxResults: 5,
        });

        console.log(response.data.items);

        return { activity: response.data.items as YouTubeActivityItem[] };
    } catch (error: any) {
        console.error("Error fetching YouTube activity:", error);
        return { error: "Failed to fetch YouTube activity." };
    }
}

export default async function Home() {
    const { activity, error } = await getLatestYouTubeActivity();

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Latest YouTube Activity (Server-Side Rendered)</h1>
            {activity && activity.length > 0 ? (
                <ul>
                    {activity.map((item) => (
                        <li key={item.id}>
                            <strong>{item.snippet?.title}</strong>
                            <p>{item.snippet?.description}</p>
                            {item.snippet?.thumbnails?.default?.url && (
                                <img
                                    src={item.snippet.thumbnails.default.url}
                                    alt="Thumbnail"
                                />
                            )}
                            {item.contentDetails?.upload?.videoId && (
                                <p>
                                    Video ID:{" "}
                                    {item.contentDetails.upload.videoId}
                                </p>
                            )}
                            {item.contentDetails?.like && <p>Liked a video.</p>}
                            {item.contentDetails?.subscribe && (
                                <p>Subscribed to a channel.</p>
                            )}
                            {item.contentDetails?.playlistItem && (
                                <p>Added a video to a playlist.</p>
                            )}
                            <hr />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    {activity
                        ? "No recent activity found."
                        : "Loading activity..."}
                </p>
            )}
        </div>
    );
}
