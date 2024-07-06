import React, { useState, useRef, useEffect } from 'react';
import musicFile from './music.mp3'; // Импорт аудио файла
import fonImage from './fon.jpg'; // Импорт изображения красивого фона
import kalendarImage from './kalendar.webp'; // Импорт изображения календаря

// SVG значки для плеера
const TriangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
  </svg>
);

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Состояние для отслеживания воспроизведения музыки
  const [showVolumeSlider, setShowVolumeSlider] = useState(false); // Состояние для отображения ползунка громкости
  const [volume, setVolume] = useState(50); // Состояние для громкости музыки (от 0 до 100)
  const audioRef = useRef(new Audio(musicFile)); // Создаем ref для элемента <audio> и передаем аудио файл
  const buttonRef = useRef(null); // Ref для кнопки
  const sliderRef = useRef(null); // Ref для ползунка громкости
  const [buttonYesActive, setButtonYesActive] = useState(false); // Состояние для активности кнопки "Да"
  const [buttonNoActive, setButtonNoActive] = useState(false); // Состояние для активности кнопки "Нет"

  const toggleMusic = () => {
    const audio = audioRef.current; // Получаем текущий экземпляр <audio>

    if (isPlaying) {
      audio.pause(); // Приостанавливаем воспроизведение, если музыка играет
      setShowVolumeSlider(false); // Скрываем ползунок громкости при паузе
    } else {
      audio.volume = volume / 100; // Устанавливаем громкость перед воспроизведением
      audio.play(); // Воспроизводим музыку, если она на паузе
      setShowVolumeSlider(true); // Показываем ползунок громкости при воспроизведении
    }

    setIsPlaying(!isPlaying); // Обновляем состояние воспроизведения на противоположное
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100; // Обновляем громкость аудио при изменении слайдера
  };

  const handleButtonClick = (button) => {
    if (button === 'yes') {
      setButtonYesActive(true);
      setButtonNoActive(false);
    } else if (button === 'no') {
      setButtonYesActive(false);
      setButtonNoActive(true);
    }
  };

  const handleSendClick = () => {
    // Логика для обработки отправки данных
    console.log('Данные отправлены!');
  };

  useEffect(() => {
    if (buttonRef.current && sliderRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const slider = sliderRef.current;
      slider.style.top = `${window.scrollY + buttonRect.top + buttonRect.height / 2 - slider.offsetHeight / 2}px`; // Центрируем ползунок относительно кнопки
      slider.style.left = `${buttonRect.right + 10}px`; // Расстояние от правой стороны кнопки
    }
  }, [showVolumeSlider, isPlaying]);

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#ccc', padding: '0', margin: '0', minHeight: '100vh' }}>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={fonImage} alt="Background" style={{ width: '100%', height: 'calc(100vh + 100px)', display: 'block' }} />
        <button
          ref={buttonRef}
          onClick={toggleMusic}
          style={{
            borderRadius: '50%', // Стиль для круглой кнопки
            width: '50px',
            height: '50px',
            backgroundColor: '#fff', // Фон кнопки (можно изменить цвет)
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
          }}
        >
          {isPlaying ? <PauseIcon /> : <TriangleIcon />}
        </button>
      </div>
      {showVolumeSlider && (
        <input
          ref={sliderRef}
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          style={{ width: '100px', position: 'absolute' }}
        />
      )}
      <p style={{ marginTop: '20px' }}>
        кто и сколько лет
      </p>
      <hr style={{ width: '50%', borderTop: '2px solid black', margin: '15px auto' }} />
      <p style={{ marginTop: '20px' }}>
        Приглашение куда-то
      </p>
      <p style={{ marginTop: '20px' }}>
        Уважаемые Друзья
      </p>
      <p style={{ marginTop: '30px', whiteSpace: 'pre-line' }}>
        С радостью приглашаем{'\n'}
        вас{'\n'}
        отметить вместе мой{'\n'}
        день рождения!
      </p>
      <p style={{ marginTop: '40px' }}>
        ДАТА ПРОВЕДЕНИЯ:
      </p>
      <p style={{ marginTop: '10px' }}>
        25 июля, 2024 год
      </p>
      {/* Вставляем изображение календаря */}
      <img src={kalendarImage} alt="Календарь" style={{ width: '100%', maxWidth: '600px', display: 'block', margin: '20px auto' }} />
      <p style={{ marginTop: '15px' }}>
        Начало в 24:00
      </p>
      <p style={{ marginTop: '20px' }}>
        Адрес проведения
      </p>
      <p style={{ marginTop: '20px' }}>
        город Уральск, проспект Абая, 61/1
      </p>
      <p style={{ marginTop: '20px' }}>
        "Пражские ночи"
      </p>
      <p style={{ marginTop: '5px' }}>
        ресторан
      </p>
      {/* Тексты подтверждения участия */}
      <div style={{ marginTop: '40px' }}>
        <p>
          ПРОСИМ ПОДТВЕРДИТЬ ВАШЕ
          <br />
          УЧАСТИЕ В МЕРОПРИЯТИИ
        </p>
        <p style={{ marginTop: '10px' }}>
          ЖДЕМ ВАШЕГО ОТВЕТА ДО 22.06
        </p>
        <p style={{ marginTop: '20px' }}>
          ВАШЕ ИМЯ-ФАМИЛИЯ
        </p>
        <input type="text" placeholder="Введите ваше имя и фамилию" style={{ marginTop: '5px', padding: '5px', width: '200px' }} />
        <p style={{ marginTop: '20px' }}>
          ИМЯ ВАШЕГО СПУТНИКА (ЕСЛИ ЕСТЬ)
        </p>
        <input type="text" placeholder="Введите имя вашего спутника" style={{ marginTop: '5px', padding: '5px', width: '200px' }} />
        <p style={{ marginTop: '30px' }}>
          БУДЕТЕ ПРИСУТСТВОВАТЬ?
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <button
            onClick={() => handleButtonClick('yes')}
            style={{
              width: '80px',
              height: '40px',
              backgroundColor: buttonYesActive ? 'black' : 'white',
              color: buttonYesActive ? 'white' : 'black', // Изменение цвета текста при активации
              border: '2px solid black',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Да
          </button>
          <button
            onClick={() => handleButtonClick('no')}
            style={{
              width: '80px',
              height: '40px',
              backgroundColor: buttonNoActive ? 'black' : 'white',
              color: buttonNoActive ? 'white' : 'black', // Изменение цвета текста при активации
              border: '2px solid black',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Нет
          </button>
        </div>
        <button
          onClick={handleSendClick}
          style={{
            marginTop: '20px',
            width: '200px',
            height: '50px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          ОТПРАВИТЬ!
        </button>
        <p style={{ marginTop: '30px' }}>
          С НЕТЕРПЕНИЕМ ЖДЕМ НАШЕЙ ВСТРЕЧИ
        </p>
      </div>
    </div>
  );
};

export default App;
