import { Router } from 'express';
import { exportService } from '../../services/export.service';
import { ExportType, ExportFormat } from '@prisma/client';

const router = Router();

// Создать экспорт
router.post('/create', async (req, res) => {
  try {
    const { businessId, type, format, filters } = req.body;

    const exportRecord = await exportService.createExport(
      businessId,
      type as ExportType,
      format as ExportFormat,
      filters
    );

    res.json(exportRecord);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Получить статус экспорта
router.get('/:exportId', async (req, res) => {
  try {
    const { exportId } = req.params;
    const exportRecord = await exportService.getExport(exportId);

    if (!exportRecord) {
      return res.status(404).json({ error: 'Export not found' });
    }

    res.json(exportRecord);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Список экспортов бизнеса
router.get('/business/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    const exports = await exportService.listExports(businessId);
    res.json(exports);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
