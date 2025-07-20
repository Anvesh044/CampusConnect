import { useState } from 'react';
import AddDriveForm from './AddDriveForm';
import DriveList from './DriveList';
import AnalyticsDashboard from './AnalyticsDashboard';
import StudentTable from './StudentTable';
import UploadOfferLetter from './UploadOfferLetter';
import SendNotification from './StudentNotifications';

export default function TpoDashboard() {
  const [activeTab, setActiveTab] = useState('add');

  const renderSection = () => {
    switch (activeTab) {
      case 'add':
        return <AddDriveForm />;
      case 'list':
        return <DriveList />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'students':
        return <StudentTable />;
      case 'uploadOffer':
        return <UploadOfferLetter />;
      case 'sendNotif':
        return <SendNotification />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-green-100">
        <h1 className="text-3xl font-bold mb-8 text-center text-green-800">
          📂 TPO Dashboard
        </h1>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <TabButton label="➕ Add Drive" active={activeTab === 'add'} onClick={() => setActiveTab('add')} />
          <TabButton label="📁 View Drives" active={activeTab === 'list'} onClick={() => setActiveTab('list')} />
          <TabButton label="📊 Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <TabButton label="🎓 Manage Students" active={activeTab === 'students'} onClick={() => setActiveTab('students')} />
          <TabButton label="📤 Upload Offer Letter" active={activeTab === 'uploadOffer'} onClick={() => setActiveTab('uploadOffer')} />
          <TabButton label="🔔 Send Notification" active={activeTab === 'sendNotif'} onClick={() => setActiveTab('sendNotif')} />
        </div>

        {/* Section Renderer */}
        <div className="pt-4 border-t border-gray-300">{renderSection()}</div>
      </div>
    </div>
  );
}

// Green-themed Tab Button Component
function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 font-medium rounded-full transition duration-200 ${
        active
          ? 'bg-green-600 text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-800'
      }`}
    >
      {label}
    </button>
  );
}
