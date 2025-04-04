'use server'

import { PlayerCard } from "@/app/components/PlayerCard";
import { fetchProfileByProfileId } from "@/utils/models/profile/profile.action";
import { getSession } from "@/utils/auth.utils";
import { PageProps } from "@/utils/interfaces/NextComponent";
import { Profile } from "@/utils/models/profile/profile.model";
import { Meetup } from "@/utils/models/meetups/meetup.model";
import { fetchMeetupsByRsvpProfileId } from "@/utils/models/meetups/meetup.action";
import { MeetupCard } from "@/app/meetups/MeetupCard";
// Assuming fetchFavoritesByFavoriteProfileId is intended, but fetchGamesByFavoriteProfileId is used. Sticking to the used function.
import { fetchGamesByFavoriteProfileId } from "@/utils/models/game/game.action";
import { Game } from "@/utils/models/game/game.model";
import { GameResult } from "@/app/games/GameResult"; // Assuming this component displays a single game card/result

import React from "react";
import {Carousel, SlideData} from "@/app/games/Carousel"; // Import the Carousel component


// Give the component a descriptive name
export default async function UserProfilePage(props: PageProps<{}>) {

    const session = await getSession();

    // --- Improved Not Signed In State ---
    if (!session?.profile?.profileId) { // Check more robustly for profileId
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-200px)]"> {/* Adjust min-height as needed */}
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md mx-auto">
                    <h1 className="text-2xl font-semibold text-gh-red-600 mb-4">Access Restricted</h1>
                    <p className="text-gray-700">
                        You must be signed in to view your profile information.
                    </p>
                    {/* Optional: Add a sign-in button/link here */}
                    {/* <Link href="/signin" className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Sign In</Link> */}
                </div>
            </div>
        );
    }

    // --- Data Fetching ---
    // Use Promise.all for concurrent fetching (optional but good practice)
    const [profile, meetups, favoriteGames] = await Promise.all([
        fetchProfileByProfileId(session.profile.profileId),
        fetchMeetupsByRsvpProfileId(session.profile.profileId),
        fetchGamesByFavoriteProfileId(session.profile.profileId)
    ]);

    // Optional: Add error handling for fetches if needed

    // Transform favoriteGames into the SlideData format for the Carousel
    const favoriteGamesSlides: SlideData[] = favoriteGames ? favoriteGames.map((game: Game) => ({
        title: game.gameName,
        button: "View Game",
        src: game.gameImageUrl || "/images/default-game-image.png", // Use a default image if imageUrl is missing
        gameId: game.gameId,
    })) : [];

    // console.log(profile, 'Profile fetched');
    // console.log(meetups, 'Meetups fetched');
    // console.log(favoriteGames, 'Favorite games fetched');
    // console.log(favoriteGamesSlides, 'Favorite games slides');


    // --- Main Content Rendering ---
    return (
        // Use a container with padding for overall structure
        <div className="container mx-auto px-4 py-8 md:py-12 space-y-12"> {/* Added vertical space between sections */}

            {/* --- Profile Section --- */}
            <section aria-labelledby="profile-heading" className="flex flex-col items-center">
                {/* Hidden heading for accessibility if PlayerCard doesn't have one */}
                <h1 id="profile-heading" className="sr-only">User Profile</h1>
                {profile ? (
                    <PlayerCard profile={profile}/>
                ) : (
                    <p className="text-center text-gray-500">Could not load profile information.</p> // Handle profile fetch failure
                )}
            </section>

            {/* --- Meetups Section --- */}
            <section aria-labelledby="meetups-heading">
                <h2 id="meetups-heading" className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
                    My Meetups
                </h2>
                {meetups && meetups.length > 0 ? (
                    // Use a responsive grid for meetup cards
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {meetups.map((meetup) => (
                            // Ensure MeetupCard itself has appropriate styling (padding, shadow, rounded corners etc.)
                            <MeetupCard meetup={meetup} key={meetup.meetupId}/> // Use a stable ID for the key!
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 italic text-center md:text-left">
                        You haven't hosted or joined any meetups yet.Try it and have fun!
                    </p> // Empty state message
                )}
            </section>

            <section aria-labelledby="favorite-games-heading" className="mt-8">
                <h2 id="favorite-games-heading"
                    className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
                    My Favorite Games
                </h2>
                {favoriteGames && favoriteGames.length > 0 ? (
                    <div className="mt-4">
                        <Carousel slides={favoriteGamesSlides}/>
                    </div>
                ) : (
                    <p className="text-gray-600 italic text-center md:text-left">
                        You haven't added any favorite games yet.
                    </p>
                )}
            </section>

        </div>
    );
}