'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Download, Wallet, PieChart, Clock, Plus } from 'lucide-react'

export default function App() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isMobile, setIsMobile] = useState(true)
  
  const screenshots = [
    "/home.jpeg",
    "/gastos.jpeg",
    "/presupuesto.jpeg",
    "/stats.jpeg",
  ]

  const features = [
    { icon: Wallet, title: "Control de Gastos", description: "Gestiona tus finanzas de manera eficiente" },
    { icon: PieChart, title: "Estadísticas Detalladas", description: "Visualiza tus gastos con gráficos intuitivos" },
    { icon: Clock, title: "Seguimiento en Tiempo Real", description: "Mantén un registro actualizado de tus transacciones" },
    { icon: Plus, title: "Gestión Simple", description: "Agrega y edita gastos fácilmente" }
  ]

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const nextImage = () => {
    const increment = isMobile ? 1 : 2
    setCurrentImage((prev) => (prev + increment >= screenshots.length ? 0 : prev + increment))
  }

  const prevImage = () => {
    const decrement = isMobile ? 1 : 2
    setCurrentImage((prev) => (prev - decrement < 0 ? screenshots.length - decrement : prev - decrement))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          <div className="w-24 h-24 rounded-xl overflow-hidden">
          </div>
          <div className="flex-1">
            <h1 className="text-pink-600 text-3xl font-bold mb-2">Gastos</h1>
            <p className="text-gray-600 mb-4">Gestiona tus finanzas personales de manera simple y efectiva.</p>
            <div className="flex items-center gap-4">
                <a 
                href="https://expo.dev/accounts/frn/projects/GestorGastosClaru/builds/60a18f51-1916-4397-85fa-3beba9ad347e"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-pink-500 hover:bg-pink-900 text-white rounded-lg flex items-center"
              >
                <Download className="mr-2 h-5 w-5" />
                Instalar
              </a>
            </div>
          </div>
        </div>
  <div className="relative mb-12 bg-gray-100 rounded-xl p-8">
          <div className="flex overflow-hidden">
            <div 
              className="flex transition-transform duration-300" 
              style={{ transform: `translateX(-${currentImage * (isMobile ? 100 : 50)}%)` }}
            >
              {screenshots.map((src, index) => (
                <div key={index} className={`flex-shrink-0 ${isMobile ? 'w-full' : 'w-1/2'} px-2`}>
                  <div className="max-w-sm mx-auto">
                    <Image
                      src={src}
                      alt={`Screenshot ${index + 1}`}
                      width={400}
                      height={800}
                      className="rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <feature.icon className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-pink-600 font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="prose max-w-none">
          <h2 className="text-pink-600 text-2xl font-bold mb-4">Acerca de la aplicación</h2>
          <p className="text-gray-600 mb-4">
            Mi aplicación de control de gastos te ayuda a mantener tus finanzas organizadas. 
            Con una interfaz intuitiva y herramientas poderosas, podrás:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-8">
            <li>Registrar gastos e ingresos fácilmente</li>
            <li>Visualizar estadísticas detalladas de tus gastos</li>
            <li>Establecer presupuestos mensuales</li>
            <li>Categorizar tus transacciones</li>
            <li>Ver informes detallados de tu actividad financiera</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
