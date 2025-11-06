type Props = {
  name: string;
  avatar?: string;
  genre: string;
  comment: string;
};

export default function CommunityLeaderCard({ name, avatar, genre, comment }: Props) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-6 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.85)] backdrop-blur">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_65%)]" />
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 text-lg font-semibold text-white/80">
          {avatar ? <img src={avatar} alt={name} className="h-full w-full object-cover" /> : initials}
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/50">{genre}</p>
        </div>
      </div>
      <p className="relative z-10 mt-4 text-sm leading-relaxed text-white/75">&ldquo;{comment}&rdquo;</p>
    </article>
  );
}
