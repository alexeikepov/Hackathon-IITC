import { Request, Response, NextFunction } from "express";
import { materialService } from "./material.services.js";
import { AuthenticatedRequest } from "../../utils/globalTypes.util.js";

const getAllMaterials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const materials = await materialService.getAllMaterials();
    res.json({ materials });
  } catch (err) {
    next(err);
  }
};

const getMaterialById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const material = await materialService.getMaterialById(req.params.id);
    res.json({ material });
  } catch (err) {
    next(err);
  }
};

const createMaterial = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const material = await materialService.createMaterial({
      ...req.body,
      uploadedBy: req.user!.id, // ⬅️ שם המשתמש מהטוקן
    });
    res.status(201).json({ material });
  } catch (err) {
    next(err);
  }
};

const updateMaterial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const material = await materialService.updateMaterial(req.params.id, req.body);
    res.json({ material });
  } catch (err) {
    next(err);
  }
};

const patchMaterial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const material = await materialService.patchMaterial(req.params.id, req.body);
    res.json({ material });
  } catch (err) {
    next(err);
  }
};

const deleteMaterial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await materialService.deleteMaterial(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const materialController = {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  patchMaterial,
  deleteMaterial,
};