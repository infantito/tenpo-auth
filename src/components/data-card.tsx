import type { DataCardProps } from 'types/components'

const DataCard = (props: DataCardProps) => {
  const { item } = props

  return (
    <div className="h-full bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]">
      {item.thumbnailUrl && (
        <div className="h-32 w-full overflow-hidden">
          <img
            src="https://picsum.photos/id/237/200/300"
            alt={item.title || 'Item image'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-4 flex flex-col h-[calc(100%-8rem)]">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
          {item.title || `Item ${item.id}`}
        </h3>
        <p className="text-sm text-gray-600 mb-2">ID: {item.id}</p>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-block text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Ver detalles
          </a>
        )}
      </div>
    </div>
  )
}

export default DataCard
