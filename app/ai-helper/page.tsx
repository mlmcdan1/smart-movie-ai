'use client';

import { useMemo, useState } from 'react';
import { FiArrowRightCircle, FiRefreshCw } from 'react-icons/fi';

type StepKey = 'mood' | 'scary' | 'era' | 'style' | 'summary';

type Answers = {
  mood: string;
  scary: string;
  era: string;
  style: string;
};

type Option = {
  value: string;
  label: string;
  hint?: string;
  icon?: string;
};

type ParsedRecommendation = {
  title: string | null;
  year: number | null;
  reason: string | null;
  posterUrl: string | null;
  raw: string;
};

const TMDB_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

const moodOptions: Option[] = [
  { value: 'Happy', label: 'Happy & upbeat', hint: 'Looking for something light with smiles.', icon: '😊' },
  { value: 'Chill', label: 'Chill & relaxed', hint: 'Low-key pacing and cozy vibes.', icon: '🛋️' },
  { value: 'Excited', label: 'Excited & hyped', hint: 'High energy and big moments.', icon: '⚡' },
  { value: 'Romantic', label: 'Romantic', hint: 'Love stories and big feelings.', icon: '💘' },
  { value: 'Scary', label: 'Craving a scare', hint: 'Let’s dial in the kind of fear.', icon: '👻' },
  { value: 'Thoughtful', label: 'Thoughtful', hint: 'Something layered to unpack.', icon: '🧠' },
];

const scaryOptions: Option[] = [
  { value: 'Ghosts & Hauntings', label: 'Ghosts & Hauntings', hint: 'Creaky houses, shadows, whispers.' },
  { value: 'Psychological', label: 'Psychological', hint: 'Mind games and slow dread.' },
  { value: 'Slashers', label: 'Slashers', hint: 'Classic cat-and-mouse terror.' },
  { value: 'Monsters', label: 'Monsters', hint: 'Creatures, beasts, and legends.' },
  { value: 'Not-So-Scary', label: 'Not-so-scary', hint: 'Spooky fun without nightmares.' },
];

const eraOptions: Option[] = [
  { value: '2020s', label: 'Fresh (2020s)', hint: 'Latest releases & buzzy gems.' },
  { value: '2010s', label: 'Recent (2010s)', hint: 'Modern hits with polish.' },
  { value: '2000s', label: '2000s', hint: 'A little nostalgia, lots of remixing.' },
  { value: '90s', label: '1990s', hint: 'Videostore staples and early CGI fun.' },
  { value: '80s', label: '1980s', hint: 'Analog charm, synths, big hair.', icon: '📼' },
  { value: 'Classic', label: 'Classics', hint: 'Anything pre-80s with legacy.' },
];

const styleOptions: Option[] = [
  { value: 'Hidden Gem', label: 'Hidden gem', hint: 'Underrated picks worth bragging about.' },
  { value: 'Crowd-Pleaser', label: 'Crowd pleaser', hint: 'Universally loved and easy to sell.' },
  { value: 'Critically Acclaimed', label: 'Critically acclaimed', hint: 'Awards, reviews, prestige points.' },
  { value: 'Feel-good', label: 'Feel-good', hint: 'Wholesome, uplifting, good vibes.' },
  { value: 'Wild Card', label: 'Wild card', hint: 'Surprising, bold, maybe weird.' },
];

const orderedSteps: StepKey[] = ['mood', 'scary', 'era', 'style', 'summary'];

const initialAnswers: Answers = {
  mood: '',
  scary: '',
  era: '',
  style: '',
};

function computeActiveStep(answers: Answers): StepKey {
  if (!answers.mood) return 'mood';
  if (answers.mood === 'Scary' && !answers.scary) return 'scary';
  if (!answers.era) return 'era';
  if (!answers.style) return 'style';
  return 'summary';
}

async function fetchPosterUrl(title: string, year: number | null) {
  if (!TMDB_KEY || !title) return null;

  const params = new URLSearchParams({
    api_key: TMDB_KEY,
    query: title,
    include_adult: 'false',
    language: 'en-US',
  });

  if (year && Number.isFinite(year)) {
    params.append('primary_release_year', String(year));
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?${params.toString()}`);
    if (!response.ok) return null;

    const data = await response.json();
    const hit = data.results?.[0];
    if (!hit) return null;

    if (hit.poster_path) return `${TMDB_IMAGE_BASE}/w500${hit.poster_path}`;
    if (hit.backdrop_path) return `${TMDB_IMAGE_BASE}/w780${hit.backdrop_path}`;
    return null;
  } catch {
    return null;
  }
}

function parseRecommendationText(text: string): { title: string | null; year: number | null; reason: string | null } {
  const trimmed = text.trim();
  if (!trimmed) {
    return { title: null, year: null, reason: null };
  }

  const firstLine = trimmed.split(/\n+/)[0] ?? trimmed;

  const pattern =
    /^(?<title>.+?)(?:\s*\((?<year>\d{4})(?:[^)]*)\))?\s*(?:[-–—:]\s*)(?<reason>.+)$/;

  const match = firstLine.match(pattern);

  if (!match || !match.groups) {
    const quoted = firstLine.match(/["“](.+?)["”]/);
    const fallbackTitle = quoted ? quoted[1].trim() : null;
    const fallbackYearMatch = firstLine.match(/\b(19|20)\d{2}\b/);
    const fallbackYearParsed = fallbackYearMatch ? Number.parseInt(fallbackYearMatch[0], 10) : null;
    const fallbackYear = Number.isNaN(fallbackYearParsed as number) ? null : fallbackYearParsed;
    const splitReason = firstLine.split(/[-–—:]/).slice(1).join('-').trim();
    return {
      title: fallbackTitle,
      year: fallbackYear,
      reason: splitReason || firstLine.trim(),
    };
  }

  const rawTitle = match.groups.title?.trim().replace(/^['"]|['"]$/g, '') ?? null;
  const yearStr = match.groups.year;
  const reason = match.groups.reason?.trim() ?? null;

  let year: number | null = null;
  if (yearStr) {
    const parsed = Number.parseInt(yearStr, 10);
    if (!Number.isNaN(parsed)) {
      year = parsed;
    }
  }

  return { title: rawTitle, year, reason };
}

export default function AIHelperPage() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [currentStep, setCurrentStep] = useState<StepKey>('mood');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<ParsedRecommendation | null>(null);

  const orderedProgress = useMemo(
    () => orderedSteps.filter((key) => key !== 'scary' || answers.mood === 'Scary'),
    [answers.mood]
  );

  const progressStep = currentStep === 'scary' && answers.mood !== 'Scary' ? 'era' : currentStep;
  const currentIndex = Math.max(orderedProgress.indexOf(progressStep), 0);

  const handleSelect = (key: keyof Answers, value: string) => {
    setAiResponse('');
    setError(null);
    setRecommendation(null);

    const nextAnswers: Answers = {
      ...answers,
      [key]: value,
    };

    if (key === 'mood') {
      nextAnswers.scary = '';
    }

    setAnswers(nextAnswers);
    setCurrentStep(computeActiveStep(nextAnswers));
  };

  const handleBack = () => {
    setAiResponse('');
    const activeIndex = orderedProgress.indexOf(currentStep);
    if (activeIndex <= 0) return;
    setCurrentStep(orderedProgress[activeIndex - 1]);
  };

  const handleRestart = () => {
    setAnswers(initialAnswers);
    setCurrentStep('mood');
    setAiResponse('');
    setError(null);
    setRecommendation(null);
  };

  const handleAsk = async () => {
    if (currentStep !== 'summary') {
      setCurrentStep(computeActiveStep(answers));
      return;
    }

    const { mood, scary, era, style } = answers;
    if (!mood || !era || !style || (mood === 'Scary' && !scary)) {
      setError('Fill out each step first.');
      return;
    }

    const prompt = `Recommend a widely known, easily streamable movie for someone feeling "${mood}"${
      mood === 'Scary' && scary ? ` with a "${scary}" vibe` : ''
    }, wanting something from the "${era}" era that fits a "${style}" style. Reply in exactly this format (no extra text): Title (Year) — one punchy reason they'll love it. Do not invent films and only choose titles with official posters on TMDB.`;

    try {
      setLoading(true);
      setError(null);
      setRecommendation(null);
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'SmartFlix could not fetch a response.');
      }
      const text = typeof data.result === 'string' ? data.result : 'No response from SmartFlix.';
      setAiResponse(text);

      const parsed = parseRecommendationText(text);

      if (!parsed.title) {
        setRecommendation({ title: null, year: parsed.year, reason: parsed.reason, posterUrl: null, raw: text });
      } else {
        const posterUrl = await fetchPosterUrl(parsed.title, parsed.year);
        setRecommendation({
          title: parsed.title,
          year: parsed.year,
          reason: parsed.reason,
          posterUrl,
          raw: text,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong reaching SmartFlix.');
    } finally {
      setLoading(false);
    }
  };

  const renderOptions = (options: Option[], key: keyof Answers) => (
    <div className="mt-6 grid gap-3 md:grid-cols-2">
      {options.map((option) => {
        const selected = answers[key] === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(key, option.value)}
            className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-left transition ${
              selected
                ? 'border-cyan-300/70 bg-cyan-500/15 text-white shadow-[0_18px_45px_-28px_rgba(6,182,212,0.9)]'
                : 'border-white/12 bg-white/[0.05] text-white/75 hover:border-white/25 hover:text-white'
            }`}
            aria-pressed={selected}
          >
            <span className="text-xl" aria-hidden>
              {option.icon ?? '🎬'}
            </span>
            <span>
              <span className="block text-base font-semibold text-white">{option.label}</span>
              {option.hint && <span className="mt-1 block text-sm text-white/65">{option.hint}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-5xl flex-col gap-8 px-6 py-12 md:px-10">
      <header className="space-y-4 text-center md:text-left">
        <h1 className="text-3xl font-bold text-white md:text-4xl">SmartFlix Concierge</h1>
        <p className="text-white/70">
          Tap through a handful of quick questions and we’ll surface one movie that fits the vibe. You can always tweak a step or
          restart to explore a different direction.
        </p>
      </header>

      <section className="rounded-3xl border border-white/12 bg-white/[0.035] p-6 backdrop-blur">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span className="uppercase tracking-[0.35em] text-white/50">Progress</span>
            <span>
              Step {currentIndex + 1} of {orderedProgress.length}
            </span>
          </div>
          <div className="flex h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / orderedProgress.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {currentStep === 'mood' && (
            <>
              <h2 className="text-xl font-semibold text-white">How’s the room feeling?</h2>
              <p className="text-sm text-white/65">Pick the vibe you want tonight to feel like.</p>
              {renderOptions(moodOptions, 'mood')}
            </>
          )}

          {currentStep === 'scary' && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-white">Dial in the scare level</h2>
                <button
                  type="button"
                  onClick={() => handleSelect('mood', 'Chill')}
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60 hover:text-white"
                >
                  Switch mood
                </button>
              </div>
              <p className="text-sm text-white/65">Tell us what kind of fright sounds fun.</p>
              {renderOptions(scaryOptions, 'scary')}
            </>
          )}

          {currentStep === 'era' && (
            <>
              <h2 className="text-xl font-semibold text-white">Pick a release window</h2>
              <p className="text-sm text-white/65">Stay modern or throw it back—your call.</p>
              {renderOptions(eraOptions, 'era')}
            </>
          )}

          {currentStep === 'style' && (
            <>
              <h2 className="text-xl font-semibold text-white">What kind of recommendation?</h2>
              <p className="text-sm text-white/65">Let SmartFlix know how adventurous to get.</p>
              {renderOptions(styleOptions, 'style')}
            </>
          )}

          {currentStep === 'summary' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Your brief</h2>
                <p className="text-sm text-white/65">Here’s what SmartFlix will use to tailor the pick.</p>
              </div>
              <ul className="space-y-2 text-white/80">
                <li>
                  <strong className="text-white">Mood:</strong> {answers.mood}
                  {answers.mood === 'Scary' && answers.scary ? ` · ${answers.scary}` : ''}
                </li>
                <li>
                  <strong className="text-white">Release era:</strong> {answers.era}
                </li>
                <li>
                  <strong className="text-white">Recommendation style:</strong> {answers.style}
                </li>
              </ul>

              <button
                type="button"
                onClick={handleAsk}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/50"
              >
                {loading ? 'Pairing your movie…' : 'Ask SmartFlix'}
                {!loading && <FiArrowRightCircle className="text-lg" />}
              </button>

              {error && <p className="text-sm text-rose-300">{error}</p>}
              {recommendation && (
                <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur">
                  <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
                    <div className="overflow-hidden rounded-xl border border-white/15 bg-black/30">
                      {recommendation.posterUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element -- runtime TMDB image
                        <img
                          src={recommendation.posterUrl}
                          alt={recommendation.title ?? 'SmartFlix recommendation'}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full min-h-[200px] w-full items-center justify-center text-4xl text-cyan-200">
                          🎬
                        </div>
                      )}
                    </div>
                    <div className="space-y-3 text-left">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">SmartFlix suggests</p>
                        <h3 className="text-xl font-semibold text-white">
                          {recommendation.title ?? 'No title returned'}
                          {recommendation.year ? <span className="text-white/70"> ({recommendation.year})</span> : null}
                        </h3>
                      </div>
                      {recommendation.reason && (
                        <p className="text-sm leading-relaxed text-white/80">{recommendation.reason}</p>
                      )}
                      {!recommendation.posterUrl && (
                        <p className="text-xs text-amber-300">
                          Couldn’t locate official artwork for this pick—tap “Ask SmartFlix” again for an alternate.
                        </p>
                      )}
                      <p className="text-xs text-white/45">Raw: {recommendation.raw}</p>
                    </div>
                  </div>
                </div>
              )}
              {!recommendation && aiResponse && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-5 text-left text-sm text-white/80">
                  <p className="whitespace-pre-line">{aiResponse}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 'mood'}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60 transition hover:text-white disabled:cursor-not-allowed disabled:text-white/20"
          >
            Back a step
          </button>
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60 transition hover:text-white"
          >
            <FiRefreshCw className="text-sm" />
            Reset flow
          </button>
        </div>
      </section>
    </main>
  );
}
