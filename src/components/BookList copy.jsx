import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function BookImage({ src, alt }) {
  const [imageSrc, setImageSrc] = useState('/placeholder.jpg');

  useEffect(() => {
    // Log EXHAUSTIVO de rutas
    console.log('Ruta original:', src);

    const normalizedSrc = src.startsWith('http')
      ? src
      : src.startsWith('/')
        ? src
        : `/images/${src}`;

    console.log('Ruta normalizada:', normalizedSrc);
    console.log('Intentando cargar imagen:', normalizedSrc);

    const img = new Image();
    img.src = normalizedSrc;

    img.onload = () => {
      console.log('Imagen cargada con éxito:', normalizedSrc);
      setImageSrc(normalizedSrc);
    };

    img.onerror = () => {
      console.error('Error al cargar la imagen:', normalizedSrc);
      setImageSrc('/placeholder.jpg');
    };
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      style={{
        opacity: imageSrc === '/placeholder.jpg' ? 0.5 : 1,
        transition: 'opacity 0.3s ease-in-out',
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }}
      onError={(e) => {
        console.error('Imagen no cargada en el renderizado:', src);
        e.target.src = '/placeholder.jpg';
      }}
    />
  );
}

BookImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

function BookList({ libros = [] }) {
  useEffect(() => {
    console.log('Libros recibidos:', libros);

    const imageRoutes = libros.map(libro => ({
      EAN: libro.EAN,
      portada: libro.portada,
      fullPath: libro.portada.startsWith('/')
        ? libro.portada
        : `/images/${libro.portada}`
    }));

    console.log('Rutas de imágenes:', imageRoutes);
  }, [libros]);

  return (
    <div className="card-container">
      {libros.map((libro) => (
        <div key={libro.EAN} className='card'>
          <div className='text-container'>
            <div className='author-container'>
              <p className='author'>{libro.nombreAutor}</p>
            </div>
            <div className='title-container'>
              <p className='title'>{libro.titulo}</p>
            </div>
          </div>
          <div className='image-container'>
            <BookImage
              src={libro.portada}
              alt={libro.titulo}
            />
          </div>
          <div className='isbn'>{libro.EAN}</div>
        </div>
      ))}
    </div>
  );
}

BookList.propTypes = {
  libros: PropTypes.arrayOf(
    PropTypes.shape({
      EAN: PropTypes.string.isRequired,
      nombreAutor: PropTypes.string.isRequired,
      titulo: PropTypes.string.isRequired,
      portada: PropTypes.string.isRequired
    })
  )
};

BookList.defaultProps = {
  libros: []
};

export default BookList;