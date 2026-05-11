import { useState } from 'react'

const QUESTIONS = [
  {
    q: 'Jaké je hlavní město České republiky?',
    options: ['Brno', 'Praha', 'Plzeň', 'Ostrava'],
    correct: 1,
  },
  {
    q: 'Která řeka je nejdelší v České republice?',
    options: ['Ohře', 'Morava', 'Vltava', 'Labe'],
    correct: 2,
  },
  {
    q: 'Ve kterém městě sídlí nejstarší česká univerzita?',
    options: ['Olomouc', 'Praha', 'Brno', 'Liberec'],
    correct: 1,
  },
  {
    q: 'Která česká hora je nejvyšší?',
    options: ['Sněžka', 'Praděd', 'Lysá hora', 'Říp'],
    correct: 0,
  },
  {
    q: 'Kolik krajů má Česká republika?',
    options: ['10', '12', '13', '14'],
    correct: 3,
  },
]

const LABELS = ['A', 'B', 'C', 'D']

function getRating(score) {
  if (score === 5) return { stars: '⭐⭐⭐⭐⭐', text: 'Perfektní výsledek!' }
  if (score === 4) return { stars: '⭐⭐⭐⭐', text: 'Skoro perfektní!' }
  if (score === 3) return { stars: '⭐⭐⭐', text: 'Ujde to!' }
  if (score === 2) return { stars: '⭐⭐', text: 'Trénuj dál!' }
  return { stars: '⭐', text: 'Nevzdávej se!' }
}

function getButtonClass(idx, selected, correct) {
  const base =
    'w-full border-2 rounded-xl p-4 text-left font-medium transition-all duration-200 flex items-center gap-3 '
  if (selected === null) {
    return base + 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 text-slate-700 cursor-pointer'
  }
  if (idx === correct) {
    return base + 'border-green-400 bg-green-50 text-green-800'
  }
  if (idx === selected) {
    return base + 'border-red-400 bg-red-50 text-red-800'
  }
  return base + 'border-slate-100 bg-slate-50 text-slate-400 cursor-default'
}

function getIcon(idx, selected, correct) {
  if (selected === null) return null
  if (idx === correct) return <span className="text-green-500 font-bold text-lg">✓</span>
  if (idx === selected) return <span className="text-red-500 font-bold text-lg">✗</span>
  return null
}

export default function App() {
  const [screen, setScreen] = useState('start')
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)

  const question = QUESTIONS[current]
  const progress = ((current + (selected !== null ? 1 : 0)) / QUESTIONS.length) * 100

  function handleStart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setScreen('quiz')
  }

  function handleAnswer(idx) {
    if (selected !== null) return
    setSelected(idx)
    if (idx === question.correct) setScore(s => s + 1)
  }

  function handleNext() {
    if (current < QUESTIONS.length - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
    } else {
      setScreen('result')
    }
  }

  const rating = getRating(score)

  if (screen === 'start') {
    return (
      <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">Kvíz: Česká geografie</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Otestuj své znalosti o České republice! 5 otázek o městech, řekách, horách a dalším.
          </p>
          <button
            onClick={handleStart}
            className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white rounded-xl px-8 py-4 text-lg font-semibold w-full transition-all duration-200 cursor-pointer"
          >
            Spustit kvíz
          </button>
        </div>
      </div>
    )
  }

  if (screen === 'result') {
    return (
      <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="text-5xl mb-3">{rating.stars}</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">{rating.text}</h2>
          <p className="text-slate-400 mb-6 text-sm">Kvíz dokončen</p>
          <div className="bg-sky-50 rounded-2xl py-6 mb-8">
            <span className="text-6xl font-bold text-blue-500">{score}</span>
            <span className="text-3xl text-slate-400 font-semibold">/5</span>
            <p className="text-slate-500 mt-1 text-sm">správných odpovědí</p>
          </div>
          <button
            onClick={handleStart}
            className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white rounded-xl px-8 py-4 text-lg font-semibold w-full transition-all duration-200 cursor-pointer"
          >
            Zkusit znovu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-400">
            {current + 1} / {QUESTIONS.length}
          </span>
          <span className="text-sm font-semibold text-blue-500">
            {score} správně
          </span>
        </div>

        <div className="bg-slate-100 rounded-full h-2.5 mb-6 overflow-hidden">
          <div
            className="bg-blue-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="text-xl font-semibold text-slate-800 mb-5 leading-snug min-h-[56px]">
          {question.q}
        </h2>

        <div className="flex flex-col gap-3 mb-6">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={getButtonClass(idx, selected, question.correct)}
            >
              <span className="text-slate-400 font-mono text-sm font-bold w-5 shrink-0">
                {LABELS[idx]}.
              </span>
              <span className="flex-1">{opt}</span>
              {getIcon(idx, selected, question.correct)}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div className="space-y-3">
            <p className={`text-center text-sm font-semibold ${selected === question.correct ? 'text-green-600' : 'text-red-500'}`}>
              {selected === question.correct ? '✓ Správně!' : `✗ Správná odpověď je ${question.options[question.correct]}`}
            </p>
            <button
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white rounded-xl py-3 font-semibold w-full transition-all duration-200 cursor-pointer"
            >
              {current < QUESTIONS.length - 1 ? 'Další otázka →' : 'Zobrazit výsledek'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
