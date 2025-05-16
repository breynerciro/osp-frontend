import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sobre OSP</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            OSP (Overwatch Sentinel Platform) es una plataforma de software para la vigilancia automatizada 
            basada en visión por computadora, diseñada para funcionar sobre hardware de bajo consumo como Raspberry Pi.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            Utiliza la implementación pi-tensorflow-lite-object-detection, la cual permite detectar objetos 
            definidos previamente dentro del campo visual de la cámara. El sistema permite configurar un área 
            específica dentro de la imagen -conocida como "zona segura"- que delimita el espacio de vigilancia.
          </p>
          
          <p className="text-lg text-gray-700">
            Cuando un objeto de interés entra en dicha zona, el sistema activa automáticamente la grabación de video. 
            De este modo, se optimiza el uso de recursos, ya que solo se almacena material cuando se detecta actividad relevante.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;