import type { User } from '@/lib/types'

export function UserHeader({ user }: { user: User }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg md:text-xl font-bold">
              {user.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
              Welcome back, {user.name}!
            </h2>
            <p className="text-gray-600 text-sm md:text-base break-all">{user.email}</p>
            <p className="text-xs md:text-sm text-gray-500">
              Last login: {new Date(user.lastLogin).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col sm:text-right gap-2 sm:gap-0 items-start">
          <span className="bg-orange-100 text-orange-800 text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-full whitespace-nowrap">
            {user.role}
          </span>
          <p className="text-xs md:text-sm text-gray-500 sm:mt-2 whitespace-nowrap">
            Member since {new Date(user.joinDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}
