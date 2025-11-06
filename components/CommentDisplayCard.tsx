type Props = {
  username: string;
  comment: string;
};

export default function CommentDisplayCard({ username, comment }: Props) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_12px_40px_-25px_rgba(15,23,42,0.85)] backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">{username}</p>
      <p className="mt-3 text-sm leading-relaxed text-white/80">{comment}</p>
    </article>
  );
}
