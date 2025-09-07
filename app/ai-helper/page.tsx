'use client';

import { useState } from 'react';

const moodOptions = ['Happy', 'Sad', 'Excited', 'Chill', 'Romantic', 'Scary'];
const scaryOptions = ['Ghosts & Hauntings', 'Zombies & Monsters', 'Gory', 'Psychological', 'Not-So-Scary'];
const yearOptions = ['2020s', '2010s', '2000s', '90s', '80s', 'Classic'];
const ratingOptions = ['Underrated', 'Overrated', 'Critically Acclaimed', 'Hidden Gem'];

export default function AIHelperPage() {
  const [step, setStep] = useState(0);
  const [aiResponse, setAIResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({
    mood: '',
    subMood: '',
    year: '',
    rating: '',
  });

  const handleSelect = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));

    // If mood is "Scary", go to scary sub-mood question
    if (step === 0 && value === 'Scary') {
      setStep(1); // next is scary options
    }
    // Skip scary step if mood isn’t scary
    else if (step === 0 && value !== 'Scary') {
      setStep(2); // skip directly to year
    }
    // From sub-scary to year
    else if (step === 1) {
      setStep(2);
    }
    else {
      setStep(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setAnswers({ mood: '', subMood: '', year: '', rating: '' });
    setStep(0);
  };

  const handleAsk = async () => {
    setLoading(true);
    const prompt = `Suggest a movie for someone feeling "${answers.mood}"${answers.subMood ? ` in a "${answers.subMood}" way` : ''},
    , looking for a film from the "${answers.year}" that is "${answers.rating}." Keep it short, fun, and include why they'll love it.`;

    try {
        const res = await fetch('/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        const data = await res.json();
        setAIResponse(data.result || 'No response from AI.');
    } catch {
        setAIResponse('Something went wrong.');
    } finally {
        setLoading(false);
    }
  }

  const renderOptions = (options: string[], key: keyof typeof answers) => (
    <div className="flex flex-wrap gap-3 justify-center mt-6">
      {options.map(option => (
        <button
          key={option}
          onClick={() => handleSelect(key, option)}
          className="bg-gray-800 hover:bg-blue-600 transition text-white px-4 py-2 rounded shadow"
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">AI Help Me Pick</h1>

      {step === 0 && (
        <>
          <p className="text-lg">What mood are you in?</p>
          {renderOptions(moodOptions, 'mood')}
        </>
      )}

      {step === 1 && (
        <>
          <p className="text-lg">What kind of scary are you in the mood for?</p>
          {renderOptions(scaryOptions, 'subMood')}
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-lg">Pick a release era:</p>
          {renderOptions(yearOptions, 'year')}
        </>
      )}

      {step === 3 && (
        <>
          <p className="text-lg">What kind of film are you in the mood for?</p>
          {renderOptions(ratingOptions, 'rating')}
        </>
      )}

      {step === 4 && (
          <div className="max-w-xl mt-8 space-y-4">
          <p className="text-xl font-semibold">Here's what you picked:</p>
          <ul className="text-left space-y-2">
            <li><strong>Mood:</strong> {answers.mood}</li>
            {answers.mood === 'Scary' && <li><strong>Scary Type:</strong> {answers.subMood}</li>}
            <li><strong>Release Era:</strong> {answers.year}</li>
            <li><strong>Preference:</strong> {answers.rating}</li>
          </ul>
      
          <button
            onClick={handleAsk}
            className="mt-6 bg-green-600 hover:bg-green-700 transition px-6 py-2 rounded text-white font-bold"
            disabled={loading}
          >
            {loading ? 'Asking AI...' : 'Ask AI for a Movie'}
          </button>
      
          {aiResponse && (
            <div className="mt-6 p-4 bg-gray-800 rounded shadow text-left">
              <p className="text-lg whitespace-pre-line">{aiResponse}</p>
            </div>
          )}
      
          <button
            onClick={handleRestart}
            className="mt-4 bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded text-white font-bold"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}