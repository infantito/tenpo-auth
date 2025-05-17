const Footer = () => {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
      <h3 className="text-md font-medium text-blue-800 mb-2">
        Mejora teórica para optimizar las llamadas al backend
      </h3>
      <p className="text-sm text-blue-700">
        Para mejorar la eficiencia en la carga de 2000 elementos, se podrían implementar las
        siguientes estrategias:
      </p>
      <ul className="list-disc pl-5 mt-2 text-sm text-blue-700 space-y-1">
        <li>Paginación en el servidor con carga incremental (infinita) del lado del cliente</li>
        <li>
          Implementación de caché con tiempo de expiración para reducir peticiones redundantes
        </li>
        <li>
          Solicitar solo los campos necesarios para reducir el tamaño de la respuesta (GraphQL o
          endpoints especializados)
        </li>
        <li>Compresión de respuestas HTTP para reducir el tiempo de transferencia</li>
      </ul>
    </div>
  )
}

export default Footer
