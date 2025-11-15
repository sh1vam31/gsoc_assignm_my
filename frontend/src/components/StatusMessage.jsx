

const StatusMessage = ({ error, loading, lastUpdated }) => {
  if (!error && !loading && !lastUpdated) return null

  const getMessageConfig = () => {
    if (error) {
      return {
        type: 'error',
        icon: 'fa-exclamation-circle',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        borderColor: 'border-red-500 dark:border-red-400',
        textColor: 'text-red-800 dark:text-red-300',
        message: error
      }
    }
    
    if (loading) {
      return {
        type: 'info',
        icon: 'fa-spinner fa-spin',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        borderColor: 'border-blue-500 dark:border-blue-400',
        textColor: 'text-blue-800 dark:text-blue-300',
        message: 'Loading dashboard data...'
      }
    }
    
    return {
      type: 'success',
      icon: 'fa-check-circle',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-500 dark:border-green-400',
      textColor: 'text-green-800 dark:text-green-300',
      message: 'Data updated successfully!'
    }
  }

  const config = getMessageConfig()

  return (
    <div 
      className={`${config.bgColor} ${config.textColor} border-l-4 ${config.borderColor} 
                  p-4 rounded-lg mb-6 animate-slide-down flex items-center gap-3`}
    >
      <i className={`fas ${config.icon} text-xl`}></i>
      <span className="font-medium">{config.message}</span>
    </div>
  )
}

export default StatusMessage
