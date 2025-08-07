import { MaterialModel } from "./material.model.js";
import { CreateMaterialInput, PatchMaterialInput, UpdateMaterialInput } from "./material.types.js";
import { AppError } from "../../utils/appError.util.js";

const getAllMaterials = async () => {
  return MaterialModel.find().populate("course uploadedBy").select("-__v");
};

const getMaterialById = async (id: string) => {
  const material = await MaterialModel.findById(id).populate("course uploadedBy").select("-__v");
  if (!material) {
    throw new AppError(`Material with ID ${id} not found`, 404);
  }
  return material;
};

const createMaterial = async (data: CreateMaterialInput) => {
  const newMaterial = await MaterialModel.create(data);
  return getMaterialById(newMaterial._id.toString());
};

const updateMaterial = async (id: string, data: UpdateMaterialInput) => {
  const updated = await MaterialModel.findByIdAndUpdate(
    id,
    data as Parameters<typeof MaterialModel.findByIdAndUpdate>[1],
    {
      new: true,
      runValidators: true,
    }
  ).populate("course uploadedBy").select("-__v");

  if (!updated) throw new AppError(`Material with ID ${id} not found`, 404);
  return updated;
};

const patchMaterial = async (id: string, data: PatchMaterialInput) => {
  const patched = await MaterialModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate("course uploadedBy").select("-__v");

  if (!patched) throw new AppError(`Material with ID ${id} not found`, 404);
  return patched;
};

const deleteMaterial = async (id: string) => {
  const deleted = await MaterialModel.findByIdAndDelete(id);
  if (!deleted) throw new AppError(`Material with ID ${id} not found`, 404);
  return deleted;
};

export const materialService = {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  patchMaterial,
  deleteMaterial,
};