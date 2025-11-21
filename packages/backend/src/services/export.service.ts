import { PrismaClient, ExportType, ExportFormat, ExportStatus } from '@prisma/client';
import { Parser } from 'json2csv';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

class ExportService {
  private exportDir = path.join(__dirname, '../../exports');

  constructor() {
    // Создаем директорию для экспорта если её нет
    if (!fs.existsSync(this.exportDir)) {
      fs.mkdirSync(this.exportDir, { recursive: true });
    }
  }

  async createExport(
    businessId: string,
    type: ExportType,
    format: ExportFormat,
    filters?: any
  ) {
    const exportRecord = await prisma.dataExport.create({
      data: {
        businessId,
        type,
        format,
        filters,
        status: ExportStatus.PENDING,
      },
    });

    // Запускаем экспорт асинхронно
    this.processExport(exportRecord.id).catch(console.error);

    return exportRecord;
  }

  private async processExport(exportId: string) {
    try {
      await prisma.dataExport.update({
        where: { id: exportId },
        data: { status: ExportStatus.PROCESSING },
      });

      const exportRecord = await prisma.dataExport.findUnique({
        where: { id: exportId },
      });

      if (!exportRecord) return;

      let data: any[] = [];

      // Получаем данные в зависимости от типа
      switch (exportRecord.type) {
        case ExportType.BOOKINGS:
          data = await this.getBookingsData(exportRecord.businessId, exportRecord.filters);
          break;
        case ExportType.CLIENTS:
          data = await this.getClientsData(exportRecord.businessId);
          break;
        case ExportType.REVENUE:
          data = await this.getRevenueData(exportRecord.businessId, exportRecord.filters);
          break;
        case ExportType.ANALYTICS:
          data = await this.getAnalyticsData(exportRecord.businessId, exportRecord.filters);
          break;
        case ExportType.FULL:
          data = await this.getFullData(exportRecord.businessId);
          break;
      }

      // Экспортируем в нужный формат
      let fileUrl: string;
      switch (exportRecord.format) {
        case ExportFormat.CSV:
          fileUrl = await this.exportToCSV(data, exportId);
          break;
        case ExportFormat.EXCEL:
          fileUrl = await this.exportToExcel(data, exportId);
          break;
        case ExportFormat.JSON:
          fileUrl = await this.exportToJSON(data, exportId);
          break;
        default:
          throw new Error('Unsupported format');
      }

      await prisma.dataExport.update({
        where: { id: exportId },
        data: {
          status: ExportStatus.COMPLETED,
          fileUrl,
          completedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Export failed:', error);
      await prisma.dataExport.update({
        where: { id: exportId },
        data: { status: ExportStatus.FAILED },
      });
    }
  }

  private async getBookingsData(businessId: string, filters?: any) {
    const where: any = { businessId };

    if (filters?.startDate) {
      where.date = { gte: new Date(filters.startDate) };
    }
    if (filters?.endDate) {
      where.date = { ...where.date, lte: new Date(filters.endDate) };
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        user: true,
        service: true,
        staff: true,
      },
      orderBy: { date: 'desc' },
    });

    return bookings.map(b => ({
      ID: b.id,
      Дата: new Date(b.date).toLocaleDateString('ru-RU'),
      Время: `${b.startTime} - ${b.endTime}`,
      Клиент: `${b.user.firstName} ${b.user.lastName || ''}`,
      Телефон: b.user.phone,
      Услуга: b.service.name,
      Мастер: b.staff ? `${b.staff.firstName} ${b.staff.lastName}` : '-',
      Цена: b.price,
      Статус: b.status,
    }));
  }

  private async getClientsData(businessId: string) {
    const bookings = await prisma.booking.findMany({
      where: { businessId },
      include: { user: true },
      distinct: ['userId'],
    });

    const clientStats = await Promise.all(
      bookings.map(async (b) => {
        const userBookings = await prisma.booking.findMany({
          where: { userId: b.userId, businessId },
        });

        const totalSpent = userBookings.reduce((sum, booking) => sum + booking.price, 0);

        return {
          ID: b.user.id,
          Имя: `${b.user.firstName} ${b.user.lastName || ''}`,
          Телефон: b.user.phone,
          Email: b.user.email || '-',
          'Всего записей': userBookings.length,
          'Потрачено': totalSpent,
          'Бонусы': b.user.bonusPoints,
          'Дата регистрации': new Date(b.user.createdAt).toLocaleDateString('ru-RU'),
        };
      })
    );

    return clientStats;
  }

  private async getRevenueData(businessId: string, filters?: any) {
    const where: any = { businessId, status: 'COMPLETED' };

    if (filters?.startDate) {
      where.createdAt = { gte: new Date(filters.startDate) };
    }
    if (filters?.endDate) {
      where.createdAt = { ...where.createdAt, lte: new Date(filters.endDate) };
    }

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return transactions.map(t => ({
      ID: t.id,
      Дата: new Date(t.createdAt).toLocaleDateString('ru-RU'),
      Тип: t.type,
      Сумма: t.amount,
      'Способ оплаты': t.paymentMethod || '-',
      Статус: t.status,
    }));
  }

  private async getAnalyticsData(businessId: string, filters?: any) {
    const where: any = { businessId };

    if (filters?.startDate) {
      where.date = { gte: new Date(filters.startDate) };
    }
    if (filters?.endDate) {
      where.date = { ...where.date, lte: new Date(filters.endDate) };
    }

    const analytics = await prisma.analytics.findMany({
      where,
      orderBy: { date: 'desc' },
    });

    return analytics.map(a => ({
      Дата: new Date(a.date).toLocaleDateString('ru-RU'),
      Просмотры: a.views,
      Записи: a.bookings,
      Выручка: a.revenue,
      'Новые клиенты': a.newClients,
    }));
  }

  private async getFullData(businessId: string) {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: {
        staff: true,
        services: true,
        bookings: {
          include: {
            user: true,
            service: true,
            staff: true,
          },
        },
        reviews: {
          include: { user: true },
        },
      },
    });

    return [business];
  }

  private async exportToCSV(data: any[], exportId: string): Promise<string> {
    const parser = new Parser();
    const csv = parser.parse(data);

    const filename = `export-${exportId}.csv`;
    const filepath = path.join(this.exportDir, filename);

    fs.writeFileSync(filepath, csv);

    return `/exports/${filename}`;
  }

  private async exportToExcel(data: any[], exportId: string): Promise<string> {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    const filename = `export-${exportId}.xlsx`;
    const filepath = path.join(this.exportDir, filename);

    XLSX.writeFile(workbook, filepath);

    return `/exports/${filename}`;
  }

  private async exportToJSON(data: any[], exportId: string): Promise<string> {
    const filename = `export-${exportId}.json`;
    const filepath = path.join(this.exportDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));

    return `/exports/${filename}`;
  }

  async getExport(exportId: string) {
    return prisma.dataExport.findUnique({
      where: { id: exportId },
    });
  }

  async listExports(businessId: string) {
    return prisma.dataExport.findMany({
      where: { businessId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const exportService = new ExportService();
