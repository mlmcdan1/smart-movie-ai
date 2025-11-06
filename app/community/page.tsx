import CommunityLeaderCard from '@/components/CommunityLeaderCard';
import CommentDisplayCard from '@/components/CommentDisplayCard';

const leaders = [
  {
    name: 'ScaryJoe',
    avatar: '',
    genre: 'Paranormal Horror',
    comment: "If you like The Conjuring, try 'The Medium'. Insane atmosphere and actual chills.",
  },
  {
    name: 'MoodyPixie',
    avatar: '',
    genre: 'Emotional Sci-Fi',
    comment: "'Arrival' is one of the best storytelling experiences ever. Deeply emotional and smart.",
  },
  {
    name: 'LaughTrackLarry',
    avatar: '',
    genre: 'Comedy & Parody',
    comment: "'Popstar: Never Stop Never Stopping' is underrated gold. Trust me.",
  },
];

const fanComments = [
  {
    username: 'MovieBuff23',
    comment: 'Just watched Barbarian. Mind blown 🤯',
  },
  {
    username: 'SpookyLuvr',
    comment: 'Conjuring 2 still hits. The nun is nightmare fuel!',
  },
  {
    username: 'SarahScreams',
    comment: 'I need more horror recs like Hereditary. Suggestions?',
  },
];

export default function CommunityPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 text-white md:px-12 lg:px-16">
      <header className="space-y-6 text-center md:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur">
          Community Pulse
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem]">Community Picks & Thoughts</h1>
          <p className="text-base text-white/70 md:text-lg">
            Tap into the SmartFlix hive mind. Explore curator spotlights, pick up hidden gems, and join the nightly
            discourse.
          </p>
        </div>
      </header>

      <section className="mt-12 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold uppercase tracking-[0.3em] text-white/70 md:text-2xl">
            Spotlight Curators
          </h2>
          <span className="text-xs uppercase tracking-[0.3em] text-white/40">Updated daily</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader) => (
            <CommunityLeaderCard key={leader.name} {...leader} />
          ))}
        </div>
      </section>

      <section className="mt-16 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold uppercase tracking-[0.3em] text-white/70 md:text-2xl">Fan Comments</h2>
          <span className="text-xs uppercase tracking-[0.3em] text-white/40">Live from the feed</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {fanComments.map((comment) => (
            <CommentDisplayCard key={comment.username} {...comment} />
          ))}
        </div>
      </section>
    </main>
  );
}
