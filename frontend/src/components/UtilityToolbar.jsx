

const UtilityToolbar = ({ onRefresh, loading }) => {
  return (
    <div className="fixed right-6 top-24 flex flex-col gap-3 z-50">
      {/* Refresh Button */}
      <button
        onClick={onRefresh}
        disabled={loading}
        className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all 
                   hover:scale-110 active:scale-95 disabled:opacity-50 group"
        title="Refresh Data"
      >
        <i className={`fas fa-sync-alt text-brand-blue text-lg ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-300'}`}></i>
      </button>

      {/* Info Button */}
      <button
        className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all 
                   hover:scale-110 active:scale-95 group"
        title="Dashboard Info"
      >
        <i className="fas fa-info-circle text-brand-green text-lg group-hover:scale-110 transition-transform"></i>
      </button>
    </div>
  )
}

export default UtilityToolbar
