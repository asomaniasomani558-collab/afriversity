import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InstitutionProfileData } from '../../types';
import { School, Check, ArrowRight, ShieldCheck, Globe, Image, MapPin } from 'lucide-react';

const REAL_CAMPUS_PHOTO_OPTIONS = [
  { label: 'University of Ghana (Balme Library)', url: '/images/campuses/ug_balme_library.jpg' },
  { label: 'University of Ghana (Great Hall)', url: '/images/campuses/ug_great_hall.jpg' },
  { label: 'KNUST (Main University Gate)', url: '/images/campuses/knust_main_gate.jpg' },
  { label: 'Ashesi University (Courtyard Quad)', url: '/images/campuses/ashesi_courtyard.jpg' },
  { label: 'University of Cape Coast (Quadrangle)', url: '/images/campuses/ucc_quad.jpg' },
  { label: 'UMaT Tarkwa (Mining Technology Complex)', url: '/images/campuses/umat_campus.jpg' }
];

export const InstitutionOnboardingModal: React.FC = () => {
  const { user, completeInstitutionOnboarding } = useApp();
  const [admissionsUrl, setAdmissionsUrl] = useState(
    user?.institutionData?.admissionsPortalUrl || 'https://admissions.ug.edu.gh'
  );
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>(
    user?.institutionData?.campusPhotoUrls || ['/images/campuses/ug_balme_library.jpg', '/images/campuses/ug_great_hall.jpg']
  );
  const [facultyInput, setFacultyInput] = useState('');
  const [faculties, setFaculties] = useState<string[]>(
    user?.institutionData?.faculties || ['College of Basic & Applied Sciences', 'College of Health Sciences', 'Business School']
  );

  if (!user || user.role !== 'institution' || user.onboardingComplete) {
    return null;
  }

  const togglePhoto = (url: string) => {
    if (selectedPhotos.includes(url)) {
      if (selectedPhotos.length > 1) {
        setSelectedPhotos(selectedPhotos.filter(p => p !== url));
      }
    } else {
      setSelectedPhotos([...selectedPhotos, url]);
    }
  };

  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (facultyInput.trim() && !faculties.includes(facultyInput.trim())) {
      setFaculties([...faculties, facultyInput.trim()]);
      setFacultyInput('');
    }
  };

  const handleFinish = () => {
    completeInstitutionOnboarding({
      admissionsPortalUrl: admissionsUrl,
      campusPhotoUrls: selectedPhotos,
      faculties
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#141210]/85 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F2] dark:bg-[#181410] text-[#1A1815] dark:text-[#FAF7F2] w-full max-w-xl rounded-xl shadow-2xl border border-[#E8DFD5] dark:border-[#332A22] flex flex-col max-h-[90vh] my-auto overflow-hidden">
        {/* Header */}
        <div className="bg-[#C85A32] text-white p-5 sm:p-6 shrink-0 border-b border-[#A84521]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]/90">
              <School className="w-4 h-4" />
              <span>Institution Portal Setup</span>
            </div>
            <button
              type="button"
              onClick={handleFinish}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#1B4332] hover:bg-[#122B20] text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              title="Save setup and enter dashboard"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save & Enter</span>
            </button>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold mt-2 text-white">
            {user.institutionData?.institutionName || 'Institutional Profile Verification'}
          </h2>
          <p className="text-xs text-[#FAF7F2]/90 mt-1">
            Ensure your authentic campus photos and official admissions links are configured for prospective African students.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* Zero-Fabrication Campus Photos Alert */}
          <div className="p-3 bg-[#FAF4E5] dark:bg-[#2E241A] border border-[#D49B37]/50 rounded-xl flex items-start gap-2.5 text-[#8C6215] dark:text-[#E6A820]">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="block">Strict Zero-Fabrication Campus Policy</strong>
              Only real, verified campus photography of accredited African institutions is permitted. Stock AI renders or generic Western campuses are strictly prohibited.
            </div>
          </div>

          {/* Official Admissions Portal Link */}
          <div>
            <label className="block text-xs font-bold text-[#1A1815] dark:text-[#FAF7F2] mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Official Admissions & Voucher Application URL *</span>
            </label>
            <input
              type="url"
              value={admissionsUrl}
              onChange={(e) => setAdmissionsUrl(e.target.value)}
              placeholder="https://admissions.ug.edu.gh or https://apps.knust.edu.gh"
              className="w-full px-3 py-2 bg-white dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
            />
            <span className="text-[10px] text-[#4A3E35]/70 dark:text-[#E8DFD5]/60 mt-1 block">
              Students will be directed to this official page when clicking "Apply Now".
            </span>
          </div>

          {/* Select Real Campus Photos */}
          <div>
            <label className="block text-xs font-bold text-[#1A1815] dark:text-[#FAF7F2] mb-2 flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Verified Campus Photography (Select at least 2)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {REAL_CAMPUS_PHOTO_OPTIONS.map((item) => {
                const isSelected = selectedPhotos.includes(item.url);
                return (
                  <button
                    key={item.url}
                    type="button"
                    onClick={() => togglePhoto(item.url)}
                    className={`relative rounded-lg overflow-hidden border text-left cursor-pointer group transition-all ${
                      isSelected ? 'ring-2 ring-[#C85A32] border-[#C85A32]' : 'border-[#E8DFD5] opacity-75'
                    }`}
                  >
                    <img src={item.url} alt={item.label} className="w-full h-20 object-cover" />
                    <div className="p-1.5 bg-white dark:bg-[#25201B] text-[10px] font-medium truncate">
                      {item.label}
                    </div>
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C85A32] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Faculties / Colleges */}
          <div>
            <label className="block text-xs font-bold text-[#1A1815] dark:text-[#FAF7F2] mb-1.5">
              Academic Faculties & Schools
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {faculties.map((fac) => (
                <span
                  key={fac}
                  className="px-2 py-1 bg-[#FAF4EB] dark:bg-[#2E241A] border border-[#E8DFD5] dark:border-[#3E332A] rounded text-[11px] font-medium flex items-center gap-1 text-[#4A3E35] dark:text-[#FAF7F2]"
                >
                  <span>{fac}</span>
                  <button
                    type="button"
                    onClick={() => setFaculties(faculties.filter(f => f !== fac))}
                    className="text-[#C85A32] hover:text-red-600 font-bold ml-1 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={facultyInput}
                onChange={(e) => setFacultyInput(e.target.value)}
                placeholder="Add faculty (e.g., Faculty of Law)"
                className="flex-1 px-3 py-1.5 bg-white dark:bg-[#25201B] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (facultyInput.trim()) {
                      setFaculties([...faculties, facultyInput.trim()]);
                      setFacultyInput('');
                    }
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (facultyInput.trim()) {
                    setFaculties([...faculties, facultyInput.trim()]);
                    setFacultyInput('');
                  }
                }}
                className="px-3 py-1.5 bg-[#FAF4EB] dark:bg-[#2E241A] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg font-semibold hover:border-[#C85A32] cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#FAF7F2] dark:bg-[#181410] border-t border-[#E8DFD5] dark:border-[#332A22] flex items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-[#4A3E35] dark:text-[#E8DFD5]/70">
            Admissions dashboard ready
          </span>

          <button
            type="button"
            onClick={handleFinish}
            className="px-6 py-2.5 bg-[#C85A32] hover:bg-[#A84521] text-white text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer shadow-md transition-colors ring-2 ring-[#D49B37]/40"
          >
            <Check className="w-4 h-4" />
            <span>Launch Institution Portal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
