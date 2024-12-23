import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Nuevo componente BookImage

/* function BookImage({ src, alt }) {
  const [imageSrc, setImageSrc] = useState('/placeholder.jpg');
  const [loadStatus, setLoadStatus] = useState('initial');

  useEffect(() => {
    // Si no hay src, usar placeholder
    if (!src) {
      console.warn('No se proporcionó URL de imagen');
      setLoadStatus('error');
      return;
    }

    // Resetear a placeholder si cambia la src
    setImageSrc('/placeholder.jpg');
    setLoadStatus('loading');

    // Crear objeto de imagen para precarga
    const img = new Image();
    img.src = src;

    // Manejadores de eventos
    img.onload = () => {
      console.log('Imagen cargada correctamente:', src);
      setImageSrc(src);
      setLoadStatus('loaded');
    };

    img.onerror = () => {
      console.error('Error al cargar la imagen:', src);
      setLoadStatus('error');
    };

    // Limpiar el efecto
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      style={{
        opacity: loadStatus === 'loading' ? 0.5 : 1,
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
}; */
function BookImage({ src, alt }) {
  const [imageSrc, setImageSrc] = useState('/placeholder.jpg');

  useEffect(() => {
    // Verificar si la URL es absoluta o relativa
    const normalizedSrc = src.startsWith('http')
      ? src
      : src.startsWith('/')
        ? src
        : `/images/${src}`;

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

// Resto del código igual...
const BookList = ({ libros = [] }) => {
  return (
    <div className="card-container">
      {libros.map((titulo) => (
        <div key={titulo.EAN} className='card'>
          <div className='text-container'>
            <div className='author-container'>
              <p className='author'>{titulo.nombreAutor}</p>
            </div>
            <div className='title-container'>
              <p className='title'>{titulo.titulo}</p>
            </div>
          </div>
          <div className='image-container'>
            <BookImage
              src={titulo.portada}
              alt={titulo.titulo}
            />
          </div>
          <div className='isbn'>{titulo.EAN}</div>
        </div>
      ))}
    </div>
  );
};

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