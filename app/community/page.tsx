import CommunityLeaderCard from "@/components/CommunityLeaderCard";
import CommentDisplayCard from "@/components/CommentDisplayCard";

export default function CommunityPage() {
    return (
        <main className="px-6 py-10 text-white">
            <h1 className="text-3xl font-bold mb-6">
                Community Picks & Thoughts
            </h1>
            
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <CommunityLeaderCard
                            name="ScaryJoe"
                            avatar=""
                            genre="Paranormal Horror"
                            comment="If you like The Conjuring, Try 'The Medium'. Insane atmosphere and actual chills."
                        />
                        <CommunityLeaderCard
                            name="MoodyPixie"
                            avatar=""
                            genre="Emotional Sci-fi"
                            comment="'Arrival' is one of the best storytelling experiences ever. Deeply emotional and smart."
                        />
                        <CommunityLeaderCard
                            name="LaughTrackLarry"
                            avatar=""
                            genre="Comedy & Parody"
                            comment="'Popstar: Never Stop Never Stopping' is underrated GOLD. Trust me. "
                        />
                    </div>
                </h2>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">\
                    Fan Comments
                </h2>
                <div className="space-y-4">
                    <CommentDisplayCard
                        username="MovieBuff23"
                        comment="just watched Barbarian. Mind blown 🤯"
                    />
                    <CommentDisplayCard
                        username="SpookyLuvr"
                        comment="Conjuring 2 still hits. The nun is nightmanre fuel!"
                    />
                    <CommentDisplayCard
                        username="SarahScreams"
                        comment="I need more horror recs like Hereditary. Suggestions? "
                    />
                </div>
            </section>
        </main>
    );
}