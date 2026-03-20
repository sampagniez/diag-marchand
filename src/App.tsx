import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Map, CheckCircle2, ArrowRight, BarChart3, ChevronRight, ChevronLeft, Loader2, Download, PlayCircle
} from 'lucide-react';
import { questions, Dimension } from './data';
import { generateSynthesis, Synthesis } from './aiService';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';

type Page = 'intro' | 'quiz' | 'analyzing' | 'synthesis';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('intro');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loadingText, setLoadingText] = useState('Compilation des réponses...');
  const [synthesisData, setSynthesisData] = useState<Synthesis | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleStart = () => setCurrentPage('quiz');

  const handleAnswer = (score: number) => {
    const currentQ = questions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQ.id]: score }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentPage('analyzing');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const scores = useMemo(() => {
    const s: Record<Dimension, number> = { temps: 0, capital: 0, competences: 0, reseau: 0, experience: 0, risque: 0 };
    const counts: Record<Dimension, number> = { temps: 0, capital: 0, competences: 0, reseau: 0, experience: 0, risque: 0 };

    questions.forEach(q => {
      if (answers[q.id] !== undefined) {
        s[q.dimension] += answers[q.id];
        counts[q.dimension] += 1;
      }
    });

    for (const dim in s) {
      if (counts[dim as Dimension] > 0) {
        s[dim as Dimension] = Math.round(s[dim as Dimension] / counts[dim as Dimension]);
      }
    }
    return s;
  }, [answers]);

  // Simulate loading for report generation
  useEffect(() => {
    let isCancelled = false;
    if (currentPage === 'analyzing') {
      const fetchData = async () => {
        setLoadingText('Analyse IA de vos résultats (cela peut prendre quelques secondes)...');
        const s = await generateSynthesis(scores);
        if (!isCancelled) {
          setSynthesisData(s);
          setLoadingText('Génération de la synthèse...');
          setTimeout(() => {
            if (!isCancelled) setCurrentPage('synthesis');
          }, 500);
        }
      };

      const t1 = setTimeout(() => fetchData(), 500);
      return () => { clearTimeout(t1); isCancelled = true; };
    }
  }, [currentPage, scores]);

  const renderIntro = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto text-center space-y-8"
    >
      <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Map className="w-10 h-10 text-green-600" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
        Diagnostic stratégique du marchand de biens
      </h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-left space-y-6">
        <p className="text-lg text-slate-600">Cet outil va vous aider à :</p>
        <ul className="space-y-3">
          {[
            'Recueillir vos informations de manière structurée',
            'Faire un état des lieux de vos ressources actuelles',
            'Visualiser vos jauges sur 6 dimensions clés'
          ].map((item, i) => (
            <li key={i} className="flex items-center text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="pt-6 border-t border-slate-100">
          <p className="text-lg text-slate-600 mb-4">À la fin vous obtiendrez :</p>
          <ul className="space-y-3">
            {[
              'Un rapport 100% factuel de vos réponses',
              'Vos scores bruts sans interprétation',
              'Une base de travail pour votre propre réflexion'
            ].map((item, i) => (
              <li key={i} className="flex items-center text-slate-700">
                <ArrowRight className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors shadow-sm hover:shadow-md w-full sm:w-auto"
      >
        <PlayCircle className="w-5 h-5 mr-2" />
        Commencer le diagnostic
      </button>
    </motion.div>
  );

  const renderQuiz = () => {
    const currentQ = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    return (
      <motion.div
        key="quiz"
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
            <span>Question {currentQuestionIndex + 1} sur {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-green-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100">
          <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
            {currentQ.dimension}
          </span>
          <h2 className="text-2xl font-semibold text-slate-900 mb-8 leading-snug">
            {currentQ.text}
          </h2>

          <div className="space-y-3">
            {currentQ.answers.map((answer, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(answer.score)}
                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-green-600 hover:bg-green-50 transition-all text-slate-700 font-medium group flex justify-between items-center"
              >
                <span>{answer.text}</span>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-green-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${currentQuestionIndex === 0
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Précédent
          </button>
        </div>
      </motion.div>
    );
  };

  const renderAnalyzing = () => (
    <motion.div
      key="analyzing"
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
      className="max-w-md mx-auto text-center py-20"
    >
      <Loader2 className="w-16 h-16 text-green-600 animate-spin mx-auto mb-6" />
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Génération du rapport</h2>
      <p className="text-slate-500 font-medium animate-pulse">{loadingText}</p>
    </motion.div>
  );

  const renderSynthesis = () => {
    const dimensionLabels: Record<Dimension, string> = {
      temps: 'Temps disponible',
      capital: 'Capital',
      competences: 'Compétences',
      reseau: 'Réseau',
      experience: 'Expérience',
      risque: 'Tolérance au risque'
    };

    const handleDownloadPDF = async () => {
      const element = document.getElementById('synthesis-report');
      if (!element) {
        alert("Erreur : Impossible de trouver le contenu à exporter.");
        return;
      }

      setIsGeneratingPDF(true);
      try {
        // We use html-to-image because html2canvas does not support Tailwind v4's OKLCH colors
        const dataUrl = await htmlToImage.toPng(element, {
          cacheBust: true,
          pixelRatio: 2,
        });

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (element.clientHeight * pdfWidth) / element.clientWidth;
        let heightLeft = pdfHeight;
        let position = 0;

        pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();

        while (heightLeft > 0) {
          position -= pdf.internal.pageSize.getHeight();
          pdf.addPage();
          pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, pdfHeight);
          heightLeft -= pdf.internal.pageSize.getHeight();
        }

        pdf.save('diagnostic-mon-profil.pdf');
      } catch (e) {
        console.error("Erreur PDF:", e);
        alert("La génération du PDF a échoué. L'impression classique va s'ouvrir.");
        window.print();
      } finally {
        setIsGeneratingPDF(false);
      }
    };

    return (
      <motion.div
        key="synthesis"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8 pb-12 print:pb-0 print:space-y-6"
        style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
      >
        <div className="space-y-8 pb-8 print:pb-0">
          <div className="text-center mb-10 pt-4">
            <div className="inline-flex bg-slate-900 rounded-2xl p-4 items-center justify-center mx-auto mb-6 shadow-sm">
              <img src="/logo.png" alt="Greenbull Campus" className="h-10 md:h-12 object-contain" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Résultats du Diagnostic</h2>
            <p className="text-slate-600 mt-2 font-medium">Récapitulatif factuel de vos scores et analyse de votre profil.</p>
          </div>

          {/* Synthèse IA */}
          {synthesisData && (
            <div id="synthesis-report" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-8 print:shadow-none print:border-none print:p-0">
              <h3 className="font-bold text-slate-900 text-2xl mb-2 border-b border-slate-100 pb-4">Votre Profil Marchand</h3>

              <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
                <h4 className="font-bold text-green-900 text-xl mb-2 flex items-center">
                  <Map className="w-6 h-6 mr-2 text-green-600" /> Profil : {synthesisData.profil.nom}
                </h4>
                <p className="text-green-900/80 mb-4 text-sm leading-relaxed font-medium">
                  {synthesisData.profil.description}
                </p>
                <h5 className="font-semibold text-green-800 mb-2">Stratégie recommandée :</h5>
                <ul className="space-y-2 list-disc list-inside text-green-900/80 text-sm">
                  {synthesisData.profil.strategie.map((strat, i) => <li key={i}>{strat}</li>)}
                </ul>
              </div>

              <h3 className="font-bold text-slate-900 text-2xl mb-2 border-b border-slate-100 pb-4 pt-4">Votre Plan d'Action</h3>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { titre: "Étape 1 : Choisir un secteur", desc: synthesisData.planAction.etape1 },
                  { titre: "Étape 2 : Analyser 10 biens", desc: synthesisData.planAction.etape2 },
                  { titre: "Étape 3 : Identifier 3 opportunités", desc: synthesisData.planAction.etape3 },
                  { titre: "Étape 4 : Présenter une opération", desc: synthesisData.planAction.etape4 }
                ].map((etape, i) => (
                  <div key={i} className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" /> {etape.titre}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {etape.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jauges */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6 print:hidden">
            <h3 className="font-bold text-slate-900 text-xl mb-6 border-b border-slate-100 pb-4">Vos jauges par dimension</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {(Object.entries(scores) as [Dimension, number][]).map(([dim, score]) => (
                <div key={dim}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-medium text-slate-700">{dimensionLabels[dim]}</span>
                    <span className="text-sm font-bold text-slate-900">{score}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-green-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Détail des réponses */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6 print:hidden">
            <h3 className="font-bold text-slate-900 text-xl mb-6 border-b border-slate-100 pb-4">Détail de vos réponses</h3>
            <div className="space-y-10">
              {(Object.keys(dimensionLabels) as Dimension[]).map(dim => {
                const dimQuestions = questions.filter(q => q.dimension === dim);
                return (
                  <div key={dim} className="space-y-4">
                    <h4 className="font-bold text-green-600 uppercase tracking-wider text-sm">{dimensionLabels[dim]}</h4>
                    <ul className="space-y-3">
                      {dimQuestions.map(q => {
                        const score = answers[q.id];
                        const answer = q.answers.find(a => a.score === score);
                        return (
                          <li key={q.id} className="flex flex-col sm:flex-row sm:justify-between bg-slate-50 p-4 rounded-xl border border-slate-100 print:break-inside-avoid print:bg-white print:border-slate-300">
                            <span className="text-slate-600 text-sm mb-2 sm:mb-0 sm:mr-4 sm:w-1/2">{q.text}</span>
                            <span className="font-semibold text-slate-900 text-sm sm:w-1/2 sm:text-right">
                              {answer ? answer.text : 'Non répondu'}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-8 print:hidden">
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
          >
            {isGeneratingPDF ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Préparation du PDF...</>
            ) : (
              <><Download className="w-5 h-5 mr-2" /> Télécharger mon profil</>
            )}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white text-slate-900 font-sans selection:bg-green-100 selection:text-green-900">
      <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 sticky top-0 z-10 print:hidden text-white">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="font-bold text-xl tracking-tight flex items-center">
            <img src="/logo.png" alt="Greenbull Campus" className="h-8 md:h-10 object-contain" />
            <span className="ml-3 hidden sm:inline-block">DiagMDB</span>
          </div>
          {currentPage !== 'intro' && (
            <button
              onClick={() => {
                if (window.confirm('Voulez-vous vraiment recommencer à zéro ?')) {
                  setCurrentPage('intro');
                  setAnswers({});
                  setCurrentQuestionIndex(0);
                }
              }}
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              Recommencer
            </button>
          )}
        </div>
      </header>

      <main className="px-4 py-12 md:py-20 print:py-0 print:px-0">
        <AnimatePresence mode="wait">
          {currentPage === 'intro' && renderIntro()}
          {currentPage === 'quiz' && renderQuiz()}
          {currentPage === 'analyzing' && renderAnalyzing()}
          {currentPage === 'synthesis' && renderSynthesis()}
        </AnimatePresence>
      </main>
    </div>
  );
}
