import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  School, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Image, 
  Edit3, 
  Save, 
  Check, 
  ExternalLink,
  BookOpen
} from 'lucide-react';

const REAL_CAMPUS_PHOTO_OPTIONS = [
  { label: 'Balme Library Quadrangle', url: '/images/campuses/ug_balme_library.jpg' },
  { label: 'Great Hall & Convocation Grounds', url: '/images/campuses/ug_great_hall.jpg' },
  { label: 'KNUST Main Gate Entrance', url: '/images/campuses/knust_main_gate.jpg' },
  { label: 'Ashesi Academic Courtyard', url: '/images/campuses/ashesi_courtyard.jpg' },
  { label: 'UCC Cape Coast Quad', url: '/images/campuses/ucc_quad.jpg' },
  { label: 'UMaT Tarkwa Mining Complex', url: '/images/campuses/umat_campus.jpg' }
];

export const InstitutionProfileView: React.FC = () => {
  const { user, updateInstitutionProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const instData = user?.institutionData;

  const [name, setName] = useState(instData?.institutionName || 'University of Ghana, Legon');
  const [type, setType] = useState(instData?.institutionType || 'University');
  const [country, setCountry] = useState(instData?.country || 'Ghana');
  const [city, setCity] = useState(instData?.city || 'Legon, Accra');
  const [website, setWebsite] = useState(instData?.officialWebsite || 'https://ug.edu.gh');
  const [email, setEmail] = useState(instData?.officialEmail || 'admissions@ug.edu.gh');
  const [phone, setPhone] = useState(instData?.phone || '+233 30 221 3820');
  const [description, setDescription] = useState(
    instData?.description || 'The premier university in Ghana, founded in 1948, dedicated to achieving global impact through teaching, research, and pan-African community leadership.'
  );
  const [admissionsUrl, setAdmissionsUrl] = useState(instData?.admissionsPortalUrl || 'https://admissions.ug.edu.gh');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>(
    instData?.campusPhotoUrls || ['/images/campuses/ug_balme_library.jpg', '/images/campuses/ug_great_hall.jpg']
  );

  const togglePhoto = (url: string) => {
    if (selectedPhotos.includes(url)) {
      if (selectedPhotos.length > 1) {
        setSelectedPhotos(selectedPhotos.filter(u => u !== url));
      }
    } else {
      setSelectedPhotos([...selectedPhotos, url]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateInstitutionProfile({
      institutionName: name,
      institutionType: type,
      country,
      city,
      officialWebsite: website,
      officialEmail: email,
      phone,
      description,
      admissionsPortalUrl: admissionsUrl,
      campusPhotoUrls: selectedPhotos
    });

    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const isVerified = user?.verificationStatus === 'verified';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DFD5] dark:border-[#332A22] pb-5">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#D49B37] mb-1 flex items-center gap-1.5">
            <School className="w-3.5 h-3.5" />
            <span>Institution Showcase & Administration</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
            {instData?.institutionName || 'University Profile'}
          </h1>
          <p className="text-xs sm:text-sm text-[#4A3E35] dark:text-[#E8DFD5]/80 mt-1">
            Maintain verified institutional details, authentic campus photography, and admissions portal links.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Saved!</span>
            </span>
          )}
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-[#FAF4EB] dark:bg-[#2E241A] hover:bg-[#C85A32] hover:text-white border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel' : 'Edit Showcase'}</span>
          </button>
        </div>
      </div>

      {isEditing ? (
        /* EDIT PROFILE FORM */
        <form onSubmit={handleSave} className="bg-white dark:bg-[#181410] p-6 sm:p-8 rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] shadow-xs space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Institution Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Institution Type *</label>
              <input
                type="text"
                required
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">Country *</label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">City / Campus Location *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Admissions Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Official Website *</label>
              <input
                type="url"
                required
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Official Admissions Portal URL *</label>
              <input
                type="url"
                required
                value={admissionsUrl}
                onChange={(e) => setAdmissionsUrl(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Institution Overview & History</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] rounded-lg text-xs resize-none"
            />
          </div>

          {/* Select Real Campus Photos */}
          <div>
            <label className="block font-semibold mb-1.5 flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Campus Photography Showcase (Select Verified Views)</span>
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

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E8DFD5] dark:border-[#332A22]">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-[#4A3E35] dark:text-[#E8DFD5] font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#C85A32] hover:bg-[#A84521] text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Showcase</span>
            </button>
          </div>
        </form>
      ) : (
        /* PUBLIC SHOWCASE VIEW */
        <div className="space-y-6">
          {/* Main University Identity Card */}
          <div className="bg-white dark:bg-[#181410] rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] overflow-hidden shadow-xs">
            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF4EB] dark:bg-[#2E241A] text-[#C85A32] uppercase">
                      {instData?.institutionType || 'University'}
                    </span>
                    {isVerified ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EBF4EE] dark:bg-[#18281E] border border-[#2D6A4F] text-[#1B4332] dark:text-[#4EBA87] text-[11px] font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>National Accreditation Verified</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF4E5] dark:bg-[#2E241A] border border-[#D49B37] text-[#8C6215] dark:text-[#E6A820] text-[11px] font-medium">
                        Pending NAB Review
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1815] dark:text-[#FAF7F2]">
                    {instData?.institutionName}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                      <span>{instData?.city}, {instData?.country}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#D49B37]" />
                      <span>{instData?.officialEmail}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#D49B37]" />
                      <span>{instData?.phone}</span>
                    </span>
                  </div>
                </div>

                <a
                  href={instData?.admissionsPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#C85A32] hover:bg-[#A84521] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
                >
                  <span>Admissions Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/90 leading-relaxed bg-[#FAF7F2] dark:bg-[#1F1915] p-4 rounded-xl border border-[#E8DFD5]/60 dark:border-[#332A22]">
                {instData?.description}
              </p>
            </div>
          </div>

          {/* Authentic Campus Photography Showcase (Requirement: Real pictures) */}
          <div className="bg-white dark:bg-[#181410] rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8DFD5] dark:border-[#332A22] pb-3">
              <div>
                <h3 className="font-serif text-base font-bold text-[#1A1815] dark:text-[#FAF7F2] flex items-center gap-2">
                  <Image className="w-4 h-4 text-[#C85A32]" />
                  <span>Authentic Campus Grounds</span>
                </h3>
                <p className="text-xs text-[#4A3E35] dark:text-[#E8DFD5]/70">
                  Real campus photography sourced from official grounds
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#1B4332] dark:text-[#4EBA87] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero AI Renders</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(instData?.campusPhotoUrls || ['/images/campuses/ug_balme_library.jpg', '/images/campuses/ug_great_hall.jpg']).map((url, idx) => (
                <div
                  key={url + idx}
                  className="relative rounded-xl overflow-hidden border border-[#E8DFD5] dark:border-[#332A22] group shadow-xs"
                >
                  <img
                    src={url}
                    alt={`${instData?.institutionName} Campus`}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">
                    {url.includes('balme') ? 'Balme Library & Quad' : url.includes('great_hall') ? 'Great Hall & University Avenue' : 'Main Academic Grounds'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Colleges & Faculties */}
          <div className="bg-white dark:bg-[#181410] rounded-2xl border border-[#E8DFD5] dark:border-[#332A22] p-6 space-y-3 shadow-xs">
            <h3 className="font-serif text-base font-bold text-[#1A1815] dark:text-[#FAF7F2] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D49B37]" />
              <span>Colleges & Academic Faculties</span>
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {(instData?.faculties || ['College of Basic & Applied Sciences', 'College of Health Sciences', 'College of Humanities', 'Business School']).map((fac) => (
                <span
                  key={fac}
                  className="px-3 py-1.5 bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#D8C7B5] dark:border-[#3E332A] text-[#1A1815] dark:text-[#FAF7F2] rounded-lg text-xs font-medium"
                >
                  {fac}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
