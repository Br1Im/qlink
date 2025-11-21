# Qlink Public Assets

## Иконки и Favicon

### favicon.svg
- **Размер**: 64x64px
- **Формат**: SVG
- **Использование**: Основная иконка сайта в браузере
- **Дизайн**: Буква "Q" на градиентном фоне (синий → голубой)

### icon.svg
- **Размер**: 512x512px
- **Формат**: SVG
- **Использование**: Иконка приложения для PWA
- **Дизайн**: Увеличенная версия favicon

### apple-touch-icon.svg
- **Размер**: 180x180px
- **Формат**: SVG
- **Использование**: Иконка для iOS устройств (добавление на главный экран)
- **Дизайн**: Адаптированная версия для Apple

## Manifest

### manifest.json
- **PWA манифест** для установки сайта как приложения
- Содержит метаданные приложения
- Определяет иконки и цвета темы

## SEO

### robots.txt
- Разрешает индексацию всех страниц
- Указывает на sitemap.xml

## Цветовая схема

- **Primary**: #2563EB (Blue 600)
- **Secondary**: #06B6D4 (Cyan 500)
- **Gradient**: Linear от синего к голубому

## Использование

Все иконки автоматически подключаются через `layout.tsx`:

```typescript
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.svg', sizes: '180x180' }],
  },
};
```

## Поддержка браузеров

- ✅ Chrome/Edge (SVG favicon)
- ✅ Firefox (SVG favicon)
- ✅ Safari (SVG + Apple Touch Icon)
- ✅ iOS Safari (Apple Touch Icon)
- ✅ Android Chrome (PWA manifest)

## PWA Features

При установке как PWA:
- Иконка на главном экране
- Полноэкранный режим
- Цвет темы #2563EB
- Название "Qlink"
