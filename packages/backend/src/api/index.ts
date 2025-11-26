import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import authRoutes from './routes/auth';
import businessRoutes from './routes/business';
import bookingsRoutes from './routes/bookings';
import servicesRoutes from './routes/services';
import staffRoutes from './routes/staff';
import reviewsRoutes from './routes/reviews';
import paymentsRoutes from './routes/payments';
import loyaltyRoutes from './routes/loyalty';
import notificationsRoutes from './routes/notifications';
import exportRoutes from './routes/export';
import dashboardRoutes from './routes/dashboard';

const app = express();
const PORT = process.env.API_PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Статические файлы для экспорта
app.use('/exports', express.static('exports'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API сервер запущен на порту ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});

export default app;
