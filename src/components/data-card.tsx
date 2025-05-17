import type { ApiItem } from 'types'

interface DataCardProps {
  item: ApiItem
}

const DataCard: React.FC<DataCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]">
      {item.thumbnailUrl && (
        <img
          src={item.thumbnailUrl}
          alt={item.title || 'Item image'}
          className="w-full h-32 object-cover"
          loading="lazy" // Important for performance
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {item.title || `Item ${item.id}`}
        </h3>
        <p className="text-sm text-gray-600 mt-1">ID: {item.id}</p>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Ver detalles
          </a>
        )}
      </div>
    </div>
  )
}

export default DataCard
