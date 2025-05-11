export default function SettingsButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
    >
      Settings
      {/* Not Yet */}
    </button>
  );
}
