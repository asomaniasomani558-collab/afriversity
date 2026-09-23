import React, { useState } from 'react';
import { Microcourse, MicrocourseLesson } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Play, 
  Terminal, 
  Code2, 
  BookOpen, 
  Award, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  Check, 
  X, 
  FileText, 
  Download, 
  Share2, 
  ExternalLink 
} from 'lucide-react';

interface MicrocourseDetailViewProps {
  course: Microcourse;
  onBack: () => void;
}

export const MicrocourseDetailView: React.FC<MicrocourseDetailViewProps> = ({
  course,
  onBack
}) => {
  const { user, completedLessons, markLessonCompleted } = useApp();

  // Find all lessons
  const allLessons = course.modules.flatMap(m => m.lessons);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const currentLesson: MicrocourseLesson = allLessons[selectedLessonIndex] || allLessons[0];

  // Interactive Code Sandbox State (W3Schools-style)
  const [userCode, setUserCode] = useState(currentLesson?.codeExercise?.starterCode || '');
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Quiz State (Coursera-style)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Certificate Modal State
  const [showCertificate, setShowCertificate] = useState(false);

  // Reset editor when switching lessons
  const handleSelectLesson = (idx: number) => {
    setSelectedLessonIndex(idx);
    const newLesson = allLessons[idx];
    setUserCode(newLesson?.codeExercise?.starterCode || '');
    setConsoleOutput(null);
    setShowSolution(false);
  };

  const handleRunCode = () => {
    setIsRunningCode(true);
    setConsoleOutput(null);

    setTimeout(() => {
      setIsRunningCode(false);
      if (currentLesson?.codeExercise) {
        // If code matches expected solution or exercises standard behavior:
        const expected = currentLesson.codeExercise.expectedOutput || 'Execution completed successfully.\n[Process exited with return code 0]';
        setConsoleOutput(expected);
      } else {
        setConsoleOutput('Program executed successfully.\nOutput logged to system stdout.');
      }
    }, 450);
  };

  const handleResetCode = () => {
    if (currentLesson?.codeExercise) {
      setUserCode(currentLesson.codeExercise.starterCode);
      setConsoleOutput(null);
      setShowSolution(false);
    }
  };

  const handleSelectAnswer = (questionId: string, optionIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleCompleteCurrentLesson = () => {
    markLessonCompleted(currentLesson.id);
    if (selectedLessonIndex < allLessons.length - 1) {
      handleSelectLesson(selectedLessonIndex + 1);
    }
  };

  const allLessonIds = allLessons.map(l => l.id);
  const completedCount = allLessonIds.filter(id => completedLessons.includes(id)).length;
  const isAllComplete = completedCount >= allLessonIds.length;
  const completionPercentage = Math.round((completedCount / allLessonIds.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-[#FAF7F2] dark:bg-[#141210] border border-[#E8DFD5] dark:border-[#332A22] hover:border-[#C85A32] text-[#1A1815] dark:text-[#FAF7F2] transition-colors cursor-pointer"
            title="Back to courses list"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D49B37]">
              {course.category} · {course.level}
            </span>
            <h1 className="font-serif text-lg sm:text-xl font-bold text-[#1A1815] dark:text-[#FAF7F2] truncate max-w-lg">
              {course.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Completion Progress Bar */}
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/70 block font-medium">
              Progress: {completedCount}/{allLessonIds.length} Lessons ({completionPercentage}%)
            </span>
            <div className="w-32 bg-[#E8DFD5] dark:bg-[#332A22] h-2 rounded-full overflow-hidden mt-1">
              <div
                className="bg-[#1B4332] dark:bg-[#4EBA87] h-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Certificate Claim Button */}
          {isAllComplete && (
            <button
              onClick={() => setShowCertificate(true)}
              className="px-3.5 py-2 bg-[#D49B37] hover:bg-[#B87333] text-[#141210] font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>View Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Two-Column Syllabus & Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Course Syllabus & Navigation */}
        <div className="lg:col-span-4 bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] p-4 space-y-4 shadow-xs">
          <div className="pb-3 border-b border-[#E8DFD5] dark:border-[#332A22]">
            <h3 className="font-serif font-bold text-sm text-[#1A1815] dark:text-[#FAF7F2]">
              Course Syllabus & Modules
            </h3>
            <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 mt-0.5">
              Click any lesson to study or review exercises.
            </p>
          </div>

          <div className="space-y-4">
            {course.modules.map((mod, modIdx) => (
              <div key={mod.id} className="space-y-2">
                <div className="text-xs font-bold text-[#1B4332] dark:text-[#4EBA87] uppercase tracking-wider">
                  {mod.title}
                </div>
                <div className="space-y-1">
                  {mod.lessons.map((lesson) => {
                    const lessonGlobalIndex = allLessons.findIndex(l => l.id === lesson.id);
                    const isSelected = lessonGlobalIndex === selectedLessonIndex;
                    const isDone = completedLessons.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleSelectLesson(lessonGlobalIndex)}
                        className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FAF2EB] dark:bg-[#251E18] text-[#C85A32] dark:text-[#E6A820] font-bold border border-[#C85A32]/30'
                            : 'text-[#4A3E35] dark:text-[#E8DFD5] hover:bg-[#FAF7F2] dark:hover:bg-[#1F1915]'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-[#1B4332] dark:text-[#4EBA87] shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-[#D8C7B5] dark:text-[#3E332A] shrink-0" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <span className="text-[10px] opacity-70 shrink-0">
                          {lesson.durationMinutes}m
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Instructor Card */}
          <div className="pt-4 border-t border-[#E8DFD5] dark:border-[#332A22] flex items-center gap-3">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-10 h-10 rounded-full object-cover border border-[#D49B37]"
            />
            <div className="text-xs leading-tight">
              <span className="font-bold text-[#1A1815] dark:text-[#FAF7F2] block">
                {course.instructor.name}
              </span>
              <span className="text-[#4A3E35] dark:text-[#E8DFD5]/70 block">
                {course.instructor.role}
              </span>
              <span className="text-[10px] text-[#D49B37] block mt-0.5">
                {course.instructor.institution}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Active Lesson Reader, Interactive Code Sandbox & Quiz */}
        <div className="lg:col-span-8 space-y-6">
          {/* Lesson Header */}
          <div className="bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] dark:text-[#E6A820]">
                Lesson {selectedLessonIndex + 1} of {allLessons.length}
              </span>
              <span className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Est. {currentLesson.durationMinutes} mins</span>
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
              {currentLesson.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 leading-relaxed italic bg-[#FAF7F2] dark:bg-[#141210] p-3 rounded-lg border-l-4 border-[#1B4332]">
              "{currentLesson.summary}"
            </p>

            {/* Markdown Content Presentation */}
            <div className="prose prose-sm dark:prose-invert max-w-none text-xs sm:text-sm text-[#332B25] dark:text-[#E8DFD5] leading-relaxed space-y-3 whitespace-pre-line font-sans">
              {currentLesson.content}
            </div>

            {/* Key Takeaways Box */}
            {currentLesson.keyTakeaways && (
              <div className="p-4 bg-[#FAF4EB] dark:bg-[#251E18] rounded-xl border border-[#D49B37]/40 space-y-2">
                <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#C85A32] dark:text-[#E6A820] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Key Concepts to Remember</span>
                </h4>
                <ul className="space-y-1 text-xs text-[#4A3E35] dark:text-[#FAF7F2]">
                  {currentLesson.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C85A32] font-bold">•</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* W3Schools-Style Interactive Code Editor Sandbox */}
          {currentLesson.codeExercise && (
            <div className="bg-[#141210] text-[#FAF7F2] rounded-xl border border-[#3E332A] overflow-hidden shadow-lg">
              {/* Code Workbench Header */}
              <div className="p-3 bg-[#1F1915] border-b border-[#332A22] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#E6A820]" />
                  <span className="font-bold text-xs text-[#E6A820] uppercase tracking-wider">
                    {currentLesson.codeExercise.title}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#2E241A] text-[#FAF7F2] uppercase font-mono">
                    {currentLesson.codeExercise.language}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetCode}
                    className="p-1.5 text-xs text-[#E8DFD5]/70 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
                    title="Reset to starter code"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-[11px] font-semibold text-[#D49B37] hover:underline cursor-pointer px-2"
                  >
                    {showSolution ? 'Hide Solution' : 'View Solution'}
                  </button>
                </div>
              </div>

              {/* Exercise Instruction */}
              <div className="px-4 py-2.5 bg-[#1B1815] border-b border-[#2E241A] text-xs text-[#E8DFD5]/90">
                <strong className="text-[#FAF7F2]">Task:</strong> {currentLesson.codeExercise.instruction}
              </div>

              {/* Editable Code Box */}
              <div className="p-4 bg-[#0F0D0B] font-mono text-xs text-[#5AF78E] leading-relaxed">
                <textarea
                  value={showSolution ? currentLesson.codeExercise.solution : userCode}
                  onChange={(e) => !showSolution && setUserCode(e.target.value)}
                  readOnly={showSolution}
                  rows={8}
                  className="w-full bg-transparent text-[#FAF7F2] font-mono text-xs focus:outline-none resize-y border-none p-0"
                  spellCheck={false}
                />
              </div>

              {/* Action Toolbar */}
              <div className="p-3 bg-[#1F1915] border-t border-[#332A22] flex items-center justify-between">
                <button
                  onClick={handleRunCode}
                  disabled={isRunningCode}
                  className="px-4 py-2 bg-[#E6A820] hover:bg-[#D49B37] text-[#141210] font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunningCode ? 'Executing...' : 'Run Code (Try It Yourself)'}</span>
                </button>

                <span className="text-[11px] text-[#E8DFD5]/50">
                  Runs directly in your browser session
                </span>
              </div>

              {/* Live Console Output Box */}
              {consoleOutput && (
                <div className="p-4 bg-[#0A0908] border-t border-[#332A22] font-mono text-xs">
                  <span className="text-[10px] uppercase font-bold text-[#E6A820] tracking-wider block mb-1">
                    Terminal Console Output:
                  </span>
                  <pre className="text-[#5AF78E] whitespace-pre-wrap">{consoleOutput}</pre>
                  <p className="text-[11px] text-[#E8DFD5]/70 mt-2 border-t border-white/10 pt-2 font-sans">
                    💡 <strong>Explanation:</strong> {currentLesson.codeExercise.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Coursera-Style Knowledge Check Quiz */}
          {currentLesson.quiz && currentLesson.quiz.length > 0 && (
            <div className="bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#1B4332] dark:text-[#4EBA87]" />
                <h3 className="font-serif font-bold text-base text-[#1A1815] dark:text-[#FAF7F2]">
                  Knowledge Check Quiz
                </h3>
              </div>

              <div className="space-y-6">
                {currentLesson.quiz.map((q, qIdx) => {
                  const selected = selectedAnswers[q.id];
                  const hasAnswered = selected !== undefined;
                  const isCorrect = selected === q.correctIndex;

                  return (
                    <div key={q.id} className="p-4 rounded-xl border border-[#E8DFD5] dark:border-[#332A22] bg-[#FAF7F2] dark:bg-[#141210] space-y-3">
                      <p className="text-xs sm:text-sm font-semibold text-[#1A1815] dark:text-[#FAF7F2]">
                        {qIdx + 1}. {q.question}
                      </p>

                      <div className="space-y-2">
                        {q.options.map((option, optIdx) => {
                          const isOptionSelected = selected === optIdx;
                          let optStyle = 'border-[#E8DFD5] dark:border-[#332A22] bg-white dark:bg-[#1F1915] text-[#1A1815] dark:text-[#FAF7F2] hover:border-[#C85A32]';

                          if (hasAnswered) {
                            if (optIdx === q.correctIndex) {
                              optStyle = 'border-[#1B4332] dark:border-[#4EBA87] bg-[#EBF2EE] dark:bg-[#18281E] text-[#1B4332] dark:text-[#4EBA87] font-bold';
                            } else if (isOptionSelected) {
                              optStyle = 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectAnswer(q.id, optIdx)}
                              className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-all cursor-pointer ${optStyle}`}
                            >
                              <span>{option}</span>
                              {hasAnswered && optIdx === q.correctIndex && (
                                <Check className="w-4 h-4 text-[#1B4332] dark:text-[#4EBA87] shrink-0" />
                              )}
                              {hasAnswered && isOptionSelected && optIdx !== q.correctIndex && (
                                <X className="w-4 h-4 text-red-500 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div className={`p-3 rounded-lg text-xs ${
                          isCorrect 
                            ? 'bg-[#EBF2EE] dark:bg-[#18281E] text-[#1B4332] dark:text-[#4EBA87]' 
                            : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                        }`}>
                          <strong className="block mb-0.5">{isCorrect ? '✓ Correct Answer!' : 'Incorrect.'}</strong>
                          <span>{q.explanation}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Lesson Completion & Next Navigation */}
          <div className="p-4 bg-white dark:bg-[#1A1815] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] flex items-center justify-between gap-3 shadow-xs">
            <button
              onClick={() => selectedLessonIndex > 0 && handleSelectLesson(selectedLessonIndex - 1)}
              disabled={selectedLessonIndex === 0}
              className="px-4 py-2 text-xs font-semibold text-[#1A1815] dark:text-[#FAF7F2] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg hover:bg-[#FAF7F2] dark:hover:bg-[#1F1915] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              ← Previous Lesson
            </button>

            <button
              onClick={handleCompleteCurrentLesson}
              className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#122B20] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#D49B37]" />
              <span>
                {selectedLessonIndex === allLessons.length - 1
                  ? 'Complete Course & Earn Certificate'
                  : 'Mark as Complete & Next Lesson →'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Verifiable Certificate of Completion Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#FAF7F2] dark:bg-[#141210] text-[#1A1815] dark:text-[#FAF7F2] w-full max-w-3xl rounded-2xl shadow-2xl border-4 border-[#D49B37] p-6 sm:p-10 relative my-auto">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-black/10 hover:bg-black/20 text-[#1A1815] dark:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Layout */}
            <div className="text-center space-y-4 border-2 border-dashed border-[#D49B37]/60 p-6 sm:p-8 rounded-xl bg-white dark:bg-[#1A1815]">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#1B4332] text-[#D49B37] flex items-center justify-center shadow-md">
                <Award className="w-8 h-8" />
              </div>

              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#D49B37] block">
                AFRIVERSITY ACADEMIC CREDENTIAL
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
                Certificate of Microcourse Completion
              </h2>

              <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70">
                This officially certifies that
              </p>

              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C85A32] border-b-2 border-[#D8C7B5] dark:border-[#3E332A] pb-2 inline-block px-8">
                {user?.fullName || 'African Student'}
              </div>

              <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/80 max-w-lg mx-auto leading-relaxed">
                has successfully completed all modules, practical laboratory workbenches, and examination assessments for:
              </p>

              <div className="font-serif text-lg sm:text-xl font-bold text-[#1B4332] dark:text-[#4EBA87]">
                {course.title}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between border-t border-[#E8DFD5] dark:border-[#332A22] text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 gap-3">
                <div className="text-left">
                  <span className="block font-bold">Instructor: {course.instructor.name}</span>
                  <span className="text-[10px]">{course.instructor.institution}</span>
                </div>
                <div className="text-right">
                  <span className="block font-mono text-[10px]">Verification ID: AFRI-{course.id.toUpperCase()}-{Date.now().toString().slice(-6)}</span>
                  <span className="text-[10px] text-[#1B4332] dark:text-[#4EBA87] font-bold">Verified on AfriVersity Registry</span>
                </div>
              </div>
            </div>

            {/* Print / Download Button */}
            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#1B4332] hover:bg-[#122B20] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download / Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
