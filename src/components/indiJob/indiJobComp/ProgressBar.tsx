interface ProgressBarProps {
    progress: number
    total: number
    current: number
  }
  
  export function ProgressBar({ progress, total, current }: ProgressBarProps) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Progress: {progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100">
          <div 
            className="h-full rounded-full bg-blue-500" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600">
          {current} candidates interviewed ({progress}%) out of {total} target candidates
        </p>
      </div>
    )
  }
  
  