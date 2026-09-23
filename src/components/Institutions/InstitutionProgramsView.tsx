import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InstitutionProgram } from '../../types';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Check, 
  Search, 
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export const InstitutionProgramsView: React.FC = () => {
  const { 
    user, 
    institutionPrograms, 
    addInstitutionProgram, 
    updateInstitutionProgram, 
    deleteInstitutionProgram 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [level, setLevel] = useState<InstitutionProgram['level']>('Undergraduate');
  const [faculty, setFaculty] = useState('College of Basic & Applied Sciences');
  const [duration, setDuration] = useState('4 Years (Full-Time)');
  const [tuitionNotes, setTuitionNotes] = useState('GH₵ 2,850 / year (Regular Ghanaian) · $4,500 / year (International)');
  const [admissionRequirements, setAdmissionRequirements] = useState('WASSCE Aggregate 08 or better in 3 Core + 3 Elective Subjects');
  const [applicationUrl, setApplicationUrl] = useState(user?.institutionData?.admissionsPortalUrl || 'https://admissions.ug.edu.gh');

  const institutionName = user?.institutionData?.institutionName || user?.fullName || 'University of Ghana, Legon';

  const myPrograms = institutionPrograms.filter(
    p => p.institutionId === user?.id || p.institutionName === institutionName
  );

  const filteredPrograms = myPrograms.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return p.name.toLowerCase().includes(q) || 
      p.faculty.toLowerCase().includes(q) || 
      (p.level && p.level.toLowerCase().includes(q)) ||
      (p.degreeType && p.degreeType.toLowerCase().includes(q));
  });

  const handleOpenAdd = () => {
    setEditingProgramId(null);
    setName('');
    setLevel('Undergraduate');
    setFaculty('College of Basic & Applied Sciences');
    setDuration('4 Years (Full-Time)');
    setTuitionNotes('GH₵ 2,850 / year (Regular Ghanaian)');
    setAdmissionRequirements('WASSCE Aggregate 12 or better');
    setApplicationUrl(user?.institutionData?.admissionsPortalUrl || 'https://admissions.ug.edu.gh');
    setModalOpen(true);
  };

  const handleOpenEdit = (prog: InstitutionProgram) => {
    setEditingProgramId(prog.id);
    setName(prog.name);
    setLevel((prog.level as any) || 'Undergraduate');
    setFaculty(prog.faculty);
    setDuration(prog.duration);
    setTuitionNotes(prog.tuitionNotes || '');
    setAdmissionRequirements(prog.admissionRequirements || (prog.wassceCutoff ? `WASSCE Aggregate ${prog.wassceCutoff}` : ''));
    setApplicationUrl(prog.applicationUrl);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingProgramId) {
      updateInstitutionProgram(editingProgramId, {
        name,
        level,
        faculty,
        duration,
        tuitionNotes,
        admissionRequirements,
        applicationUrl
      });
    } else {
      addInstitutionProgram({
        institutionId: user?.id || 'inst-current',
        institutionName,
        name,
        level,
        faculty,
        duration,
        tuitionNotes,
        admissionRequirements,
        applicationUrl
      });
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFD5] dark:border-[#332A22] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Institution Portal · Academic Offerings</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            Programmes Management
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 mt-1 max-w-2xl">
            Publish and update degree courses, admission cut-off criteria, and direct portal links for prospective African applicants.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Programme</span>
        </button>
      </div>

      {/* Search & Counter Bar */}
      <div className="p-4 bg-white dark:bg-[#181410] rounded-xl border border-[#E8DFD5] dark:border-[#332A22] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#4A3E35]/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search published degree programmes..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
          />
        </div>

        <div className="text-[#4A3E35] dark:text-[#E8DFD5]/70">
          <strong>{filteredPrograms.length}</strong> programmes listed
        </div>
      </div>

      {/* Programmes List */}
      {filteredPrograms.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#181410] rounded-2xl border border-dashed border-[#D8C7B5] dark:border-[#3E332A] space-y-3">
          <BookOpen className="w-10 h-10 text-[#C85A32] mx-auto opacity-70" />
          <h3 className="font-serif text-base font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            No programmes found
          </h3>
          <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 max-w-sm mx-auto">
            Add undergraduate or postgraduate degree offerings to help African students explore your institution.
          </p>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded-lg cursor-pointer"
          >
            Add First Programme
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white dark:bg-[#181410] rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs transition-all hover:border-[#D49B37]/60"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#1A1815] dark:text-[#FAF7F2]">
                    {prog.name}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF4EB] dark:bg-[#2E241A] text-[#C85A32] dark:text-[#E6A820] uppercase">
                    {prog.level}
                  </span>
                  {prog.verified && (
                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-[#1B4332] dark:text-[#4EBA87]">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/80 flex flex-wrap items-center gap-2">
                  <span>Faculty: <strong>{prog.faculty}</strong></span>
                  <span>·</span>
                  <span>Duration: <strong>{prog.duration}</strong></span>
                </div>

                <div className="text-[11px] text-[#1B4332] dark:text-[#4EBA87] font-semibold bg-[#EBF4EE] dark:bg-[#18281E] p-2 rounded-lg border border-[#2D6A4F]/20">
                  Cut-Off / Criteria: {prog.admissionRequirements}
                </div>

                {prog.tuitionNotes && (
                  <div className="text-[11px] text-[#4A3E35]/80 dark:text-[#E8DFD5]/70 italic">
                    Fee guideline: {prog.tuitionNotes}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={prog.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#FAF7F2] dark:bg-[#25201B] hover:border-[#C85A32] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#C85A32]" />
                </a>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(prog)}
                  className="p-2 hover:bg-[#FAF4EB] dark:hover:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg transition-colors cursor-pointer text-xs"
                  title="Edit Programme"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#1B4332]" />
                </button>

                <button
                  type="button"
                  onClick={() => deleteInstitutionProgram(prog.id)}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-950/50 border border-[#D8C7B5] dark:border-[#3E332A] text-neutral-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer text-xs"
                  title="Delete Programme"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Programme Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141210]/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#181410] rounded-2xl p-6 max-w-lg w-full border border-[#E8DFD5] dark:border-[#332A22] shadow-2xl space-y-4 text-xs text-[#1A1815] dark:text-[#FAF7F2] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8DFD5] dark:border-[#332A22] pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-[#C85A32]">
                <BookOpen className="w-4 h-4" />
                <span>{editingProgramId ? 'Edit Degree Programme' : 'Add Degree Programme'}</span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[#4A3E35] dark:text-[#E8DFD5] font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block font-semibold mb-1">Programme Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., BSc Computer Science, MB ChB Medicine"
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Degree Level *</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate (MSc / PhD)</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Certificate">Certificate / Short Course</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 4 Years (Full-Time)"
                    className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Faculty / College *</label>
                <input
                  type="text"
                  required
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  placeholder="e.g., College of Basic and Applied Sciences"
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Admission Requirements & Cut-Off *</label>
                <textarea
                  rows={2}
                  required
                  value={admissionRequirements}
                  onChange={(e) => setAdmissionRequirements(e.target.value)}
                  placeholder="WASSCE cut-off aggregate, prerequisite elective subjects..."
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tuition / Fee Guideline</label>
                <input
                  type="text"
                  value={tuitionNotes}
                  onChange={(e) => setTuitionNotes(e.target.value)}
                  placeholder="GH₵ / year or International fee note"
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Official Application URL *</label>
                <input
                  type="url"
                  required
                  value={applicationUrl}
                  onChange={(e) => setApplicationUrl(e.target.value)}
                  placeholder="https://admissions.ug.edu.gh"
                  className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8DFD5] dark:border-[#332A22]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-[#4A3E35] dark:text-[#E8DFD5] font-semibold hover:underline cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C85A32] hover:bg-[#A84521] text-white font-semibold rounded-lg shadow-sm cursor-pointer"
                >
                  {editingProgramId ? 'Update Programme' : 'Publish Programme'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
